var express = require('express');
var flight_update = express.Router();
var mParticle = require('mparticle');
var logger = require('morgan');
const {flights, flight_search, airport_code, eJ_flight_price} = require('./eJ_app.js');

const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

//https://demo.mp.com/mp/flight_update?flight=EZY7512&departure_date=2023-07-23&delay=180
//mParticle Workshop ---> easyJet ---> Custom Feed ---> Levarti (Disruption)
var config = new mParticle.Configuration(
    'us2-0de9a21b32cca340b649e7886c134428',
    'hsVsm8K6ZEvD7J0XPrIrURMxpafHXf9niCIhz21q3-dsZrtUXSk5nmdSd2P_ME7m'
);
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

var affected_passengers = [];

async function audience_query(flight_no, departure_date) {

    const query = 'SELECT customerid, mpid, firstname, lastname, gender, outbound_flight, outbound_departure_date, inbound_flight, inbound_departure_date FROM ops-8075.Views.view_departure WHERE (outbound_flight LIKE \'' + flight_no + '%\' AND outbound_departure_date LIKE \'' + departure_date + '%\') OR (inbound_flight LIKE ' +  '\'' + flight_no + '%\' AND inbound_departure_date LIKE \'' + departure_date + '%\')';

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
        query: query,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    rows.forEach(row => affected_passengers.push(row));
}

flight_update.get('/', async function(req, res) {

    await audience_query(req.query['flight'], req.query['departure_date']);
    console.log('affected passgeners: ' + affected_passengers.length)

    var batches = []
    for (var i=0; i<affected_passengers.length; i++) {
        var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
        batch.context = { 
            "data_plan": {
                "plan_id": "dp_example",
                "plan_version": 1
            }
        }
        var user_identities = new mParticle.UserIdentities();
    
        user_identities.customerid = affected_passengers[i]['customerid'];
        batch.user_identities = user_identities;
        batch.mp_deviceid = '48ad4e3b-4137-4ed0-93db-69c896116767';
    
        var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.other, 'flight_update');
        event.custom_attributes = {
            "Flight_No.": affected_passengers[i]['outbound_flight'].indexOf(req.query['flight']) > -1 ? affected_passengers[i]['outbound_flight']:affected_passengers[i]['inbound_flight'],
            "Passenger": affected_passengers[i]['gender'].indexOf('M') > -1 ? "Mr. " + affected_passengers[i]['firstname'] + " " + affected_passengers[i]['lastname'] : "Mrs. " + affected_passengers[i]['firstname'] + " " + affected_passengers[i]['lastname'],
            "Departure_Airport": flights[req.query['flight']]['F-City'],
            "Arrival_Airport": flights[req.query['flight']]['T-City'],
            "Departure_Time": req.query['departure_date'] + "T" + flights[req.query['flight']]['F-Time'] + ":00+00:00",
            "Delay_Time": req.query['delay']
        };
  
        batch.addEvent(event);
        batches.push(batch);
    }

    if (affected_passengers.length > 0) {
        var callback = function(error, data, response) {
            if (error) {
                res.send('Error: ' + error);
            } else {
                res.header("Content-Type",'application/json');
                res.send(JSON.stringify({
                    "Flight_No.": req.query['flight'],
                    "Departure_Airport": flights[req.query['flight']]['F-City'],
                    "Arrival_Airport": flights[req.query['flight']]['T-City'],
                    "Departure_Time": req.query['departure_date'] + "T" + flights[req.query['flight']]['F-Time'] + ":00+00:00",
                    "Delay_Time": req.query['delay']
                }, null, 4));
            }
        }
        api.bulkUploadEvents(batches, callback);
    }
    
});

module.exports = flight_update;