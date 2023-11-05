var express = require('express');
var book_flight = express.Router();
var mParticle = require('mparticle');
const {flights, flight_search, airport_code, eJ_flight_price} = require('./eJ_app.js');

//https://demo.mp.com/mp/book_flight?customerid=98760614&from=London
//mParticle Workshop ---> easyJet ---> Custom Feed ---> eRes System
var config = new mParticle.Configuration(
    'us2-65576bc2bf1ec449bae46934f5e63182',
    'lgWE_Irbh7hHA9VWJbX0jZr69W893eLs6I2kOI5gtDtvbsQ3zLuG_AaEOilt62W_');
    //'us2-44914446e4bbc344892d3a67603d31b1',
    //'TAZJMsciCeApddVJvK-BJq7PfNcOlxVlIEDk_SZQFYwiJVDGRC-Oag9PduYHNdND');
var apiClient = new mParticle.ApiClient()
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2'
var api = new mParticle.EventsApi(config, apiClient);

function random_flight(from, flight_search, to="") {
    
    var matched = [];
    Object.keys(flight_search).forEach(key => {
        if (key.indexOf(from) >= 0) {
            matched.push(key);
        }
    });
    var from_city = random_choice(matched)
    if (to == "") {
        var to_city = random_choice(Object.keys(flight_search[from_city]))
    } else {
        var to_city = to
    }
    
    return flight_search[from_city][to_city][random_choice(Object.keys(flight_search[from_city][to_city]))]
    
}

function random_choice(a_src) {
    return a_src[Math.floor(Math.random() * a_src.length)];
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

book_flight.get('/', function(req, res) {
    
    var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
    batch.context = { 
        "data_plan": {
            "plan_id": "dp_example",
            "plan_version": 1
        }
    }
    var user_identities = new mParticle.UserIdentities();
    
    user_identities.customerid = req.query['customerid']
    batch.user_identities = user_identities;
    batch.mp_deviceid = "87d2ebaa-e956-407e-a1e6-f05f871bf4e6"
    
    var outbound_flight = random_flight(req.query['from'], flight_search);
    console.log("Outbound: " + outbound_flight)
    var outbound_flight_distance = flights[outbound_flight]['Distance']
    var outbound_flight_duration = flights[outbound_flight]['Duration']
    var inbound_flight = random_flight(flights[outbound_flight]['T-City'], flight_search, flights[outbound_flight]['F-City']);
    var inbound_flight_distance = flights[inbound_flight]['Distance']
    var inbound_flight_duration = flights[inbound_flight]['Duration']
    var quantity = random_choice([1, 2, 3, 4])
    
    var curr_date_timestamp = (new Date(new Date().toISOString().split("T")[0]+"T00:00:00+00:00")).getTime()
    var days_ahead = Math.floor(Math.random() * 10) + 1;
    var trip_days = random_choice([3, 5, 7, 10, 14])
    var outbound_departure_timestamp = curr_date_timestamp + days_ahead * 86400 * 1000
    var outbound_departure_date = (new Date(outbound_departure_timestamp).toISOString()).split("T")[0]+"T"+flights[outbound_flight]['F-Time']+":00+00:00"
    var outbound_arrival_timestamp = new Date(outbound_departure_date).getTime() + flights[outbound_flight]['Duration'] * 60 * 1000
    var outbound_arrival_date = (new Date(outbound_arrival_timestamp).toISOString()).split(".")[0]+"+00:00"
    var inbound_departure_timestamp = outbound_departure_timestamp + trip_days * 86400 * 1000
    var inbound_departure_date = (new Date(inbound_departure_timestamp).toISOString()).split("T")[0]+"T"+flights[inbound_flight]['F-Time']+":00+00:00"
    var inbound_arrival_timestamp = new Date(inbound_departure_date).getTime() + flights[inbound_flight]['Duration'] * 60 * 1000
    var inbound_arrival_date = (new Date(inbound_arrival_timestamp).toISOString()).split(".")[0]+"+00:00"   
    
    var product_outbound_flight = new mParticle.Product();
    product_outbound_flight.name = 'Outbound Flight';
    product_outbound_flight.id = outbound_flight + '-' + flights[outbound_flight]['F-IATA'] + '-' + flights[outbound_flight]['T-IATA'];
    product_outbound_flight.category = "Flights"
    product_outbound_flight.brand = "easyJet"
    product_outbound_flight.quantity = quantity
    product_outbound_flight.price = flights[outbound_flight]['Distance'] * random_choice(eJ_flight_price['Discount']);
    product_outbound_flight.price = Math.round(product_outbound_flight.price * 100) / 100
    product_outbound_flight.custom_attributes = {}
    product_outbound_flight.custom_attributes['From'] = flights[outbound_flight]['F-City'] + " - " + flights[outbound_flight]['F-IATA']
    product_outbound_flight.custom_attributes['To'] = flights[outbound_flight]['T-City'] + " - " + flights[outbound_flight]['T-IATA']
    product_outbound_flight.custom_attributes['Flight_Distance'] = outbound_flight_distance
    product_outbound_flight.custom_attributes['Flight_Duration'] = outbound_flight_duration
    product_outbound_flight.custom_attributes['Departure_Time'] = outbound_departure_date
    product_outbound_flight.custom_attributes['Arrival_Time'] = outbound_arrival_date
    product_outbound_flight.total_product_amount = Math.round(product_outbound_flight.price * product_outbound_flight.quantity * 100) / 100
    
    var product_outbound_flight_bundle = new mParticle.Product();
    product_outbound_flight_bundle.name = 'Outbound Flight Bundle';
    product_outbound_flight_bundle.id = "Flight Bundle"
    product_outbound_flight_bundle.category = "Bundles"
    product_outbound_flight_bundle.brand = "easyJet"
    product_outbound_flight_bundle.quantity = quantity
    product_outbound_flight_bundle.custom_attributes = {}
    product_outbound_flight_bundle.custom_attributes['Bundle'] = random_choice(["Standard", "Standard Plus", "Essentials"])
    product_outbound_flight_bundle.price = product_outbound_flight.price * random_choice(eJ_flight_price[product_outbound_flight_bundle.custom_attributes['Bundle']])
    product_outbound_flight_bundle.price = Math.round(product_outbound_flight_bundle.price * 100) / 100
    product_outbound_flight_bundle.total_product_amount = Math.round(product_outbound_flight_bundle.price * product_outbound_flight_bundle.quantity * 100) / 100
    
    var product_outbound_flight_seats = new mParticle.Product();
    product_outbound_flight_seats.name = 'Outbound Flight Seats';
    product_outbound_flight_seats.id = "Flight Seats"
    product_outbound_flight_seats.category = "Seats"
    product_outbound_flight_seats.brand = "easyJet"
    product_outbound_flight_seats.quantity = quantity
    product_outbound_flight_seats.custom_attributes = {}
    product_outbound_flight_seats.custom_attributes['Seat_Type'] = random_choice(["Extra Legroom", "Up Front", "Standard"])
    product_outbound_flight_seats.price = product_outbound_flight.price * random_choice(eJ_flight_price[product_outbound_flight_seats.custom_attributes['Seat_Type']])
    product_outbound_flight_seats.price = Math.round(product_outbound_flight_seats.price * 100) / 100
    product_outbound_flight_seats.total_product_amount = Math.round(product_outbound_flight_seats.price * product_outbound_flight_seats.quantity * 100) / 100

    var product_inbound_flight = new mParticle.Product();
    product_inbound_flight.name = 'Inbound Flight';
    product_inbound_flight.id = inbound_flight + '-' + flights[inbound_flight]['F-IATA'] + '-' + flights[inbound_flight]['T-IATA'];
    product_inbound_flight.category = "Flights"
    product_inbound_flight.brand = "easyJet"
    product_inbound_flight.quantity = quantity
    product_inbound_flight.price = flights[inbound_flight]['Distance'] * random_choice(eJ_flight_price['Discount']);
    product_inbound_flight.price = Math.round(product_inbound_flight.price * 100) / 100
    product_inbound_flight.custom_attributes = {}
    product_inbound_flight.custom_attributes['From'] = flights[inbound_flight]['F-City'] + " - " + flights[outbound_flight]['F-IATA']
    product_inbound_flight.custom_attributes['To'] = flights[inbound_flight]['T-City'] + " - " + flights[outbound_flight]['T-IATA']
    product_inbound_flight.custom_attributes['Flight_Distance'] = inbound_flight_distance
    product_inbound_flight.custom_attributes['Flight_Duration'] = inbound_flight_duration
    product_inbound_flight.custom_attributes['Departure_Time'] = inbound_departure_date
    product_inbound_flight.custom_attributes['Arrival_Time'] = inbound_arrival_date
    product_inbound_flight.total_product_amount = Math.round(product_inbound_flight.price * product_inbound_flight.quantity * 100) / 100
    
    var product_inbound_flight_bundle = new mParticle.Product();
    product_inbound_flight_bundle.name = 'Inbound Flight Bundle';
    product_inbound_flight_bundle.id = "Flight Bundle"
    product_inbound_flight_bundle.category = "Bundles"
    product_inbound_flight_bundle.brand = "easyJet"
    product_inbound_flight_bundle.quantity = quantity
    product_inbound_flight_bundle.custom_attributes = {}
    product_inbound_flight_bundle.custom_attributes['Bundle'] = random_choice(["Standard", "Standard Plus", "Essentials"])
    product_inbound_flight_bundle.price = product_inbound_flight.price * random_choice(eJ_flight_price[product_inbound_flight_bundle.custom_attributes['Bundle']])
    product_inbound_flight_bundle.price = Math.round(product_inbound_flight_bundle.price * 100) / 100
    product_inbound_flight_bundle.total_product_amount = Math.round(product_inbound_flight_bundle.price * product_inbound_flight_bundle.quantity * 100) / 100
    
    var product_inbound_flight_seats = new mParticle.Product();
    product_inbound_flight_seats.name = 'Inbound Flight Seats';
    product_inbound_flight_seats.id = "Flight Seats"
    product_inbound_flight_seats.category = "Seats"
    product_inbound_flight_seats.brand = "easyJet"
    product_inbound_flight_seats.quantity = quantity
    product_inbound_flight_seats.custom_attributes = {}
    product_inbound_flight_seats.custom_attributes['Seat_Type'] = random_choice(["Extra Legroom", "Up Front", "Standard"])
    product_inbound_flight_seats.price = product_inbound_flight.price * random_choice(eJ_flight_price[product_inbound_flight_seats.custom_attributes['Seat_Type']])
    product_inbound_flight_seats.price = Math.round(product_inbound_flight_seats.price * 100) / 100
    product_inbound_flight_seats.total_product_amount = Math.round(product_inbound_flight_seats.price * product_inbound_flight_seats.quantity * 100) / 100
    
    var product_action = new mParticle.ProductAction('purchase');
    product_action.products = [product_outbound_flight, product_outbound_flight_bundle, product_outbound_flight_seats, product_inbound_flight, product_inbound_flight_bundle, product_inbound_flight_seats];
    
    product_action.total_amount = product_outbound_flight.total_product_amount + product_outbound_flight_bundle.total_product_amount + product_outbound_flight_seats.total_product_amount + product_inbound_flight.total_product_amount + product_inbound_flight_bundle.total_product_amount +
    product_inbound_flight_seats.total_product_amount;
    product_action.tax_amount = Math.round(product_action.total_amount * 0.2 * 100) / 100;
    
    product_action.transaction_id = "eJ-Mobile-" + uuidv4();

    var commerce_event = new mParticle.CommerceEvent();
    commerce_event.product_action = product_action;
    commerce_event.timestamp_unixtime_ms = Date.now(); //replace with time of transaction

    batch.addEvent(commerce_event);
    
    var body = [batch]
    var callback = function(error, data, response) {
        if (error) {
            res.send('Error: ' + error);
        } else {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify({
                'Outbound_Flight': outbound_flight,
                'Outbound_Flight_Airport': flights[outbound_flight]['F-City'],
                'Outbound_Flight_Arrival_Airport': flights[outbound_flight]['T-City'],
                'Outbound_Flight_Departure_Date': outbound_departure_date
            }, null, 4));
        }
    };

    api.bulkUploadEvents(body, callback);

});

module.exports = book_flight;