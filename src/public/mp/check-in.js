'use strict'

var express = require('express');
var check_in = express.Router();
var mParticle = require('mparticle');
const {flights, flight_search, airport_code, eJ_flight_price} = require('./eJ_app.js');

//https://demo.mp.com/mp/check_in?customerid=98760603&flight=EZY8105&departure_date=2023-06-21T06:30:00+00:00
//mParticle Workshop ---> easyJet ---> Custom Feed ---> Levarti (Disruption)
var config = new mParticle.Configuration(
    'us2-0de9a21b32cca340b649e7886c134428',
    'hsVsm8K6ZEvD7J0XPrIrURMxpafHXf9niCIhz21q3-dsZrtUXSk5nmdSd2P_ME7m'
);
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

check_in.get('/', function(req, res) {
    
    var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
    batch.context = { 
        "data_plan": {
            "plan_id": "dp_example",
            "plan_version": 1
        }
    }
    var user_identities = new mParticle.UserIdentities();
    
    user_identities.customerid = req.query['customerid'];
    batch.user_identities = user_identities;
    batch.mp_deviceid = '48ad4e3b-4137-4ed0-93db-69c896116767';
    
    var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.other, 'flight_check_in');
    event.custom_attributes = {
        "Flight_No.": req.query['flight'],
        "Departure_Airport": flights[req.query['flight']]['F-City'],
        "Arrival_Airport": flights[req.query['flight']]['T-City'],
        "Departure_Time": req.query['departure_date'],
        "Flight_Distance": flights[req.query['flight']]['Distance'],
        "Flight_Duration": flights[req.query['flight']]['Duration'],
        "Checkin_Time": (new Date().toISOString().split(".")[0]+"+00:00")
    };
  
    batch.addEvent(event);
    
    var body = [batch];
    var callback = function(error, data, response) {
        if (error) {
            res.send('Error: ' + error);
        } else {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify({
                'Checked-In': req.query['flight'],
                'Distance': flights[req.query['flight']]['Distance'],
                'Duration': flights[req.query['flight']]['Duration']
            }, null, 4))
        }
    };

    api.bulkUploadEvents(body, callback);
    
});

module.exports = check_in;