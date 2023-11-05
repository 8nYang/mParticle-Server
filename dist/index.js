// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"public/mp/eJ_app.js":[function(require,module,exports) {
const {
  parse
} = require("csv-parse");

const fs = require('fs');

const path = require('path');

var flights = {};
var flight_search = {};
var airport_code = {};
var eJ_flight_price = {
  "Unit_Price": 0.1,
  "Extra Legroom": [0.3, 0.4],
  "Up Front": [0.2, 0.3, 0.4],
  "Standard": [0.0],
  "Standard Plus": [0.3, 0.4],
  "Essentials": [0.5, 0.6],
  "Large Cabin Bag": [0.12, 0.25],
  "15kg Hold Bag": [0.25, 0.35, 0.55],
  "23kg Hold Bag": [0.45, 0.65],
  "26kg Hold Bag": [0.4, 0.6],
  "Discount": [0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.2, 0.25, 0.3, 0.35],
  "Inspire_Me_Type": "I don't mind|City explorer|Adventure and the great outdoors|Family holiday|Foodies|Going solo|Honeymoons and romance|Inspired by movies and TV|Instagram hotspots|Music and festivals|Off the beaten track|Sand sun and swim|Snow and slopes (and a little apres)",
  "Inspire_Me_Trip": "Anytime|Summer-23|Autumn-23|Winter-23",
  "Inspire_Me_Time": "One-Way|7d-Return|14d-Return|Weekend-Return"
};
fs.createReadStream("/Users/hsyang/Downloads/eCommerce - webApp/mP-Media/src/public/mp/flights-details.txt").pipe(parse({
  delimiter: ",",
  from_line: 2
})).on("data", function (row) {
  flights[row[0]] = {};
  flights[row[0]]['F-IATA'] = row[1];
  flights[row[0]]['F-City'] = row[2];
  flights[row[0]]['F-Country'] = row[3];
  flights[row[0]]['F-Terminal'] = row[4];
  flights[row[0]]['F-Time'] = row[5];
  flights[row[0]]['T-IATA'] = row[6];
  flights[row[0]]['T-City'] = row[7];
  flights[row[0]]['T-Country'] = row[8];
  flights[row[0]]['T-Terminal'] = row[9];
  flights[row[0]]['T-Time'] = row[10];
  flights[row[0]]['Distance'] = row[11];
  flights[row[0]]['Duration'] = row[12];
  airport_code[row[2]] = row[1];

  if (typeof flight_search[row[2]] == "undefined") {
    flight_search[row[2]] = {};

    if (typeof flight_search[row[2]][row[7]] == "undefined") {
      flight_search[row[2]][row[7]] = {};
    }
  } else {
    if (typeof flight_search[row[2]][row[7]] == "undefined") {
      flight_search[row[2]][row[7]] = {};
    }
  }

  flight_search[row[2]][row[7]][row[5]] = row[0];
}).on("error", function (error) {
  console.log(error.message);
}).on("end", function () {
  console.log("Done");
});
module.exports = {
  flights: flights,
  flight_search: flight_search,
  airport_code: airport_code,
  eJ_flight_price: eJ_flight_price
};
},{}],"public/mp/book-flight.js":[function(require,module,exports) {
var express = require('express');

var book_flight = express.Router();

var mParticle = require('mparticle');

const {
  flights,
  flight_search,
  airport_code,
  eJ_flight_price
} = require('./eJ_app.js'); //https://demo.mp.com/mp/book_flight?customerid=98760614&from=London
//mParticle Workshop ---> easyJet ---> Custom Feed ---> eRes System


var config = new mParticle.Configuration('us2-65576bc2bf1ec449bae46934f5e63182', 'lgWE_Irbh7hHA9VWJbX0jZr69W893eLs6I2kOI5gtDtvbsQ3zLuG_AaEOilt62W_'); //'us2-44914446e4bbc344892d3a67603d31b1',
//'TAZJMsciCeApddVJvK-BJq7PfNcOlxVlIEDk_SZQFYwiJVDGRC-Oag9PduYHNdND');

var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

function random_flight(from, flight_search, to = "") {
  var matched = [];
  Object.keys(flight_search).forEach(key => {
    if (key.indexOf(from) >= 0) {
      matched.push(key);
    }
  });
  var from_city = random_choice(matched);

  if (to == "") {
    var to_city = random_choice(Object.keys(flight_search[from_city]));
  } else {
    var to_city = to;
  }

  return flight_search[from_city][to_city][random_choice(Object.keys(flight_search[from_city][to_city]))];
}

function random_choice(a_src) {
  return a_src[Math.floor(Math.random() * a_src.length)];
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

book_flight.get('/', function (req, res) {
  var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
  batch.context = {
    "data_plan": {
      "plan_id": "dp_example",
      "plan_version": 1
    }
  };
  var user_identities = new mParticle.UserIdentities();
  user_identities.customerid = req.query['customerid'];
  batch.user_identities = user_identities;
  batch.mp_deviceid = "87d2ebaa-e956-407e-a1e6-f05f871bf4e6";
  var outbound_flight = random_flight(req.query['from'], flight_search);
  console.log("Outbound: " + outbound_flight);
  var outbound_flight_distance = flights[outbound_flight]['Distance'];
  var outbound_flight_duration = flights[outbound_flight]['Duration'];
  var inbound_flight = random_flight(flights[outbound_flight]['T-City'], flight_search, flights[outbound_flight]['F-City']);
  var inbound_flight_distance = flights[inbound_flight]['Distance'];
  var inbound_flight_duration = flights[inbound_flight]['Duration'];
  var quantity = random_choice([1, 2, 3, 4]);
  var curr_date_timestamp = new Date(new Date().toISOString().split("T")[0] + "T00:00:00+00:00").getTime();
  var days_ahead = Math.floor(Math.random() * 10) + 1;
  var trip_days = random_choice([3, 5, 7, 10, 14]);
  var outbound_departure_timestamp = curr_date_timestamp + days_ahead * 86400 * 1000;
  var outbound_departure_date = new Date(outbound_departure_timestamp).toISOString().split("T")[0] + "T" + flights[outbound_flight]['F-Time'] + ":00+00:00";
  var outbound_arrival_timestamp = new Date(outbound_departure_date).getTime() + flights[outbound_flight]['Duration'] * 60 * 1000;
  var outbound_arrival_date = new Date(outbound_arrival_timestamp).toISOString().split(".")[0] + "+00:00";
  var inbound_departure_timestamp = outbound_departure_timestamp + trip_days * 86400 * 1000;
  var inbound_departure_date = new Date(inbound_departure_timestamp).toISOString().split("T")[0] + "T" + flights[inbound_flight]['F-Time'] + ":00+00:00";
  var inbound_arrival_timestamp = new Date(inbound_departure_date).getTime() + flights[inbound_flight]['Duration'] * 60 * 1000;
  var inbound_arrival_date = new Date(inbound_arrival_timestamp).toISOString().split(".")[0] + "+00:00";
  var product_outbound_flight = new mParticle.Product();
  product_outbound_flight.name = 'Outbound Flight';
  product_outbound_flight.id = outbound_flight + '-' + flights[outbound_flight]['F-IATA'] + '-' + flights[outbound_flight]['T-IATA'];
  product_outbound_flight.category = "Flights";
  product_outbound_flight.brand = "easyJet";
  product_outbound_flight.quantity = quantity;
  product_outbound_flight.price = flights[outbound_flight]['Distance'] * random_choice(eJ_flight_price['Discount']);
  product_outbound_flight.price = Math.round(product_outbound_flight.price * 100) / 100;
  product_outbound_flight.custom_attributes = {};
  product_outbound_flight.custom_attributes['From'] = flights[outbound_flight]['F-City'] + " - " + flights[outbound_flight]['F-IATA'];
  product_outbound_flight.custom_attributes['To'] = flights[outbound_flight]['T-City'] + " - " + flights[outbound_flight]['T-IATA'];
  product_outbound_flight.custom_attributes['Flight_Distance'] = outbound_flight_distance;
  product_outbound_flight.custom_attributes['Flight_Duration'] = outbound_flight_duration;
  product_outbound_flight.custom_attributes['Departure_Time'] = outbound_departure_date;
  product_outbound_flight.custom_attributes['Arrival_Time'] = outbound_arrival_date;
  product_outbound_flight.total_product_amount = Math.round(product_outbound_flight.price * product_outbound_flight.quantity * 100) / 100;
  var product_outbound_flight_bundle = new mParticle.Product();
  product_outbound_flight_bundle.name = 'Outbound Flight Bundle';
  product_outbound_flight_bundle.id = "Flight Bundle";
  product_outbound_flight_bundle.category = "Bundles";
  product_outbound_flight_bundle.brand = "easyJet";
  product_outbound_flight_bundle.quantity = quantity;
  product_outbound_flight_bundle.custom_attributes = {};
  product_outbound_flight_bundle.custom_attributes['Bundle'] = random_choice(["Standard", "Standard Plus", "Essentials"]);
  product_outbound_flight_bundle.price = product_outbound_flight.price * random_choice(eJ_flight_price[product_outbound_flight_bundle.custom_attributes['Bundle']]);
  product_outbound_flight_bundle.price = Math.round(product_outbound_flight_bundle.price * 100) / 100;
  product_outbound_flight_bundle.total_product_amount = Math.round(product_outbound_flight_bundle.price * product_outbound_flight_bundle.quantity * 100) / 100;
  var product_outbound_flight_seats = new mParticle.Product();
  product_outbound_flight_seats.name = 'Outbound Flight Seats';
  product_outbound_flight_seats.id = "Flight Seats";
  product_outbound_flight_seats.category = "Seats";
  product_outbound_flight_seats.brand = "easyJet";
  product_outbound_flight_seats.quantity = quantity;
  product_outbound_flight_seats.custom_attributes = {};
  product_outbound_flight_seats.custom_attributes['Seat_Type'] = random_choice(["Extra Legroom", "Up Front", "Standard"]);
  product_outbound_flight_seats.price = product_outbound_flight.price * random_choice(eJ_flight_price[product_outbound_flight_seats.custom_attributes['Seat_Type']]);
  product_outbound_flight_seats.price = Math.round(product_outbound_flight_seats.price * 100) / 100;
  product_outbound_flight_seats.total_product_amount = Math.round(product_outbound_flight_seats.price * product_outbound_flight_seats.quantity * 100) / 100;
  var product_inbound_flight = new mParticle.Product();
  product_inbound_flight.name = 'Inbound Flight';
  product_inbound_flight.id = inbound_flight + '-' + flights[inbound_flight]['F-IATA'] + '-' + flights[inbound_flight]['T-IATA'];
  product_inbound_flight.category = "Flights";
  product_inbound_flight.brand = "easyJet";
  product_inbound_flight.quantity = quantity;
  product_inbound_flight.price = flights[inbound_flight]['Distance'] * random_choice(eJ_flight_price['Discount']);
  product_inbound_flight.price = Math.round(product_inbound_flight.price * 100) / 100;
  product_inbound_flight.custom_attributes = {};
  product_inbound_flight.custom_attributes['From'] = flights[inbound_flight]['F-City'] + " - " + flights[outbound_flight]['F-IATA'];
  product_inbound_flight.custom_attributes['To'] = flights[inbound_flight]['T-City'] + " - " + flights[outbound_flight]['T-IATA'];
  product_inbound_flight.custom_attributes['Flight_Distance'] = inbound_flight_distance;
  product_inbound_flight.custom_attributes['Flight_Duration'] = inbound_flight_duration;
  product_inbound_flight.custom_attributes['Departure_Time'] = inbound_departure_date;
  product_inbound_flight.custom_attributes['Arrival_Time'] = inbound_arrival_date;
  product_inbound_flight.total_product_amount = Math.round(product_inbound_flight.price * product_inbound_flight.quantity * 100) / 100;
  var product_inbound_flight_bundle = new mParticle.Product();
  product_inbound_flight_bundle.name = 'Inbound Flight Bundle';
  product_inbound_flight_bundle.id = "Flight Bundle";
  product_inbound_flight_bundle.category = "Bundles";
  product_inbound_flight_bundle.brand = "easyJet";
  product_inbound_flight_bundle.quantity = quantity;
  product_inbound_flight_bundle.custom_attributes = {};
  product_inbound_flight_bundle.custom_attributes['Bundle'] = random_choice(["Standard", "Standard Plus", "Essentials"]);
  product_inbound_flight_bundle.price = product_inbound_flight.price * random_choice(eJ_flight_price[product_inbound_flight_bundle.custom_attributes['Bundle']]);
  product_inbound_flight_bundle.price = Math.round(product_inbound_flight_bundle.price * 100) / 100;
  product_inbound_flight_bundle.total_product_amount = Math.round(product_inbound_flight_bundle.price * product_inbound_flight_bundle.quantity * 100) / 100;
  var product_inbound_flight_seats = new mParticle.Product();
  product_inbound_flight_seats.name = 'Inbound Flight Seats';
  product_inbound_flight_seats.id = "Flight Seats";
  product_inbound_flight_seats.category = "Seats";
  product_inbound_flight_seats.brand = "easyJet";
  product_inbound_flight_seats.quantity = quantity;
  product_inbound_flight_seats.custom_attributes = {};
  product_inbound_flight_seats.custom_attributes['Seat_Type'] = random_choice(["Extra Legroom", "Up Front", "Standard"]);
  product_inbound_flight_seats.price = product_inbound_flight.price * random_choice(eJ_flight_price[product_inbound_flight_seats.custom_attributes['Seat_Type']]);
  product_inbound_flight_seats.price = Math.round(product_inbound_flight_seats.price * 100) / 100;
  product_inbound_flight_seats.total_product_amount = Math.round(product_inbound_flight_seats.price * product_inbound_flight_seats.quantity * 100) / 100;
  var product_action = new mParticle.ProductAction('purchase');
  product_action.products = [product_outbound_flight, product_outbound_flight_bundle, product_outbound_flight_seats, product_inbound_flight, product_inbound_flight_bundle, product_inbound_flight_seats];
  product_action.total_amount = product_outbound_flight.total_product_amount + product_outbound_flight_bundle.total_product_amount + product_outbound_flight_seats.total_product_amount + product_inbound_flight.total_product_amount + product_inbound_flight_bundle.total_product_amount + product_inbound_flight_seats.total_product_amount;
  product_action.tax_amount = Math.round(product_action.total_amount * 0.2 * 100) / 100;
  product_action.transaction_id = "eJ-Mobile-" + uuidv4();
  var commerce_event = new mParticle.CommerceEvent();
  commerce_event.product_action = product_action;
  commerce_event.timestamp_unixtime_ms = Date.now(); //replace with time of transaction

  batch.addEvent(commerce_event);
  var body = [batch];

  var callback = function (error, data, response) {
    if (error) {
      res.send('Error: ' + error);
    } else {
      res.header("Content-Type", 'application/json');
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
},{"./eJ_app.js":"public/mp/eJ_app.js"}],"public/mp/check-in.js":[function(require,module,exports) {
'use strict';

var express = require('express');

var check_in = express.Router();

var mParticle = require('mparticle');

const {
  flights,
  flight_search,
  airport_code,
  eJ_flight_price
} = require('./eJ_app.js'); //https://demo.mp.com/mp/check_in?customerid=98760603&flight=EZY8105&departure_date=2023-06-21T06:30:00+00:00
//mParticle Workshop ---> easyJet ---> Custom Feed ---> Levarti (Disruption)


var config = new mParticle.Configuration('us2-0de9a21b32cca340b649e7886c134428', 'hsVsm8K6ZEvD7J0XPrIrURMxpafHXf9niCIhz21q3-dsZrtUXSk5nmdSd2P_ME7m');
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);
check_in.get('/', function (req, res) {
  var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
  batch.context = {
    "data_plan": {
      "plan_id": "dp_example",
      "plan_version": 1
    }
  };
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
    "Checkin_Time": new Date().toISOString().split(".")[0] + "+00:00"
  };
  batch.addEvent(event);
  var body = [batch];

  var callback = function (error, data, response) {
    if (error) {
      res.send('Error: ' + error);
    } else {
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify({
        'Checked-In': req.query['flight'],
        'Distance': flights[req.query['flight']]['Distance'],
        'Duration': flights[req.query['flight']]['Duration']
      }, null, 4));
    }
  };

  api.bulkUploadEvents(body, callback);
});
module.exports = check_in;
},{"./eJ_app.js":"public/mp/eJ_app.js"}],"public/mp/flight-update.js":[function(require,module,exports) {
var express = require('express');

var flight_update = express.Router();

var mParticle = require('mparticle');

var logger = require('morgan');

const {
  flights,
  flight_search,
  airport_code,
  eJ_flight_price
} = require('./eJ_app.js');

const {
  BigQuery
} = require('@google-cloud/bigquery');

const bigquery = new BigQuery(); //https://demo.mp.com/mp/flight_update?flight=EZY7512&departure_date=2023-07-23&delay=180
//mParticle Workshop ---> easyJet ---> Custom Feed ---> Levarti (Disruption)

var config = new mParticle.Configuration('us2-0de9a21b32cca340b649e7886c134428', 'hsVsm8K6ZEvD7J0XPrIrURMxpafHXf9niCIhz21q3-dsZrtUXSk5nmdSd2P_ME7m');
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);
var affected_passengers = [];

async function audience_query(flight_no, departure_date) {
  const query = 'SELECT customerid, mpid, firstname, lastname, gender, outbound_flight, outbound_departure_date, inbound_flight, inbound_departure_date FROM ops-8075.Views.view_departure WHERE (outbound_flight LIKE \'' + flight_no + '%\' AND outbound_departure_date LIKE \'' + departure_date + '%\') OR (inbound_flight LIKE ' + '\'' + flight_no + '%\' AND inbound_departure_date LIKE \'' + departure_date + '%\')'; // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query

  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US'
  }; // Run the query as a job

  const [job] = await bigquery.createQueryJob(options); // Wait for the query to finish

  const [rows] = await job.getQueryResults(); // Print the results

  rows.forEach(row => affected_passengers.push(row));
}

flight_update.get('/', async function (req, res) {
  await audience_query(req.query['flight'], req.query['departure_date']);
  console.log('affected passgeners: ' + affected_passengers.length);
  var batches = [];

  for (var i = 0; i < affected_passengers.length; i++) {
    var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
    batch.context = {
      "data_plan": {
        "plan_id": "dp_example",
        "plan_version": 1
      }
    };
    var user_identities = new mParticle.UserIdentities();
    user_identities.customerid = affected_passengers[i]['customerid'];
    batch.user_identities = user_identities;
    batch.mp_deviceid = '48ad4e3b-4137-4ed0-93db-69c896116767';
    var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.other, 'flight_update');
    event.custom_attributes = {
      "Flight_No.": affected_passengers[i]['outbound_flight'].indexOf(req.query['flight']) > -1 ? affected_passengers[i]['outbound_flight'] : affected_passengers[i]['inbound_flight'],
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
    var callback = function (error, data, response) {
      if (error) {
        res.send('Error: ' + error);
      } else {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
          "Flight_No.": req.query['flight'],
          "Departure_Airport": flights[req.query['flight']]['F-City'],
          "Arrival_Airport": flights[req.query['flight']]['T-City'],
          "Departure_Time": req.query['departure_date'] + "T" + flights[req.query['flight']]['F-Time'] + ":00+00:00",
          "Delay_Time": req.query['delay']
        }, null, 4));
      }
    };

    api.bulkUploadEvents(batches, callback);
  }
});
module.exports = flight_update;
},{"./eJ_app.js":"public/mp/eJ_app.js"}],"public/mp/buy-coin.js":[function(require,module,exports) {
var express = require('express');

var buy_coin = express.Router();

var mParticle = require('mparticle'); //https://demo.mp.com/mp/buy_coin?customerid=98760603&token=220672716078290600703
//mParticle Workshop ---> easyJet ---> Custom Feed ---> eRes System


var config = new mParticle.Configuration('us2-df5e5532f3db7f4b8365fb6fa1e3ad6a', 'h0KGtAfdvVB-OFaeyV9zAnQNXXUjybgOTEQetk_lmbqOWgFetL4jfSpDJvWSz_mq');
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

function random_choice(a_src) {
  var sel = Math.floor(Math.random() * a_src.length);
  return [a_src[sel], sel];
}

function weighted_random_choice(data) {
  let total = 0;

  for (let i = 0; i < data.length; ++i) {
    total += data[i][1];
  } // Total in hand, we can now pick a random value akin to our
  // random index from before.


  const threshold = Math.random() * total;
  total = 0;

  for (let i = 0; i < data.length - 1; ++i) {
    // Add the weight to our running total.
    total += data[i][1]; // If this value falls within the threshold, we're done!

    if (total >= threshold) {
      return [data[i][0], i];
    }
  } // Wouldn't you know it, we needed the very last entry!


  return [data[data.length - 1][0], data.length - 1];
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

buy_coin.get('/', function (req, res) {
  var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
  batch.context = {
    "data_plan": {
      "plan_id": "dp_example",
      "plan_version": 1
    }
  };
  var user_identities = new mParticle.UserIdentities();

  if ('customerid' in req.query) {
    user_identities.customerid = req.query['customerid'];
  }

  batch.user_identities = user_identities;
  batch.mp_deviceid = "87d2ebaa-e956-407e-a1e6-f05f871bf4e6";
  let d_games = {
    "LL": "Lightning Link",
    "MF": "Mighty Fu",
    "CM": "Cashman",
    "HV": "Heart of Vegas"
  };
  let a_lw_coins = [[["4.75M", 4750000], 0.375], [["4.25M", 4250000], 0.33], [["5.25M", 5250000], 0.12], [["6.75M", 6750000], 0.07], [["8M", 8000000], 0.03], [["6M", 6000000], 0.044]];
  let a_lw_extra = [[["Orbs", "RARE"], 0.32], [["Stellar", 15000], 0.30], [["Orbs", "UNCOMMON"], 0.30], [["Ligtning Boost", "10Mins"], 0.02], [["Stellar", 20000], 0.03], [["Orbs", "EPIC"], 0.01]];
  let a_coins = [["600% MORE", 110000000, 99.99], ["GOOD VALUE", 320000, 1.99], ["400% MORE", 38000000, 49.99], ["300% MORE", 13000000, 19.99], ["65% MORE", 1300000, 4.99], ["150% MORE", 4000000, 9.99], ["GREAT VALUE", 1000000, 2.99]];
  let a_stellars = [["700% MORE", 1000000, 99.99], ["GOOD VALUE", 2500, 1.99], ["460% MORE", 350000, 49.99], ["300% MORe", 100000, 19.99], ["60% MORE", 10000, 4.99], ["140% MORE", 30000, 9.99], ["GREAT VALUE", 4000, 2.99]];
  var type = 'type' in req.query ? req.query['type'] : random_choice(["Coin", "Stellar", "Wheel"])[0];
  var game = 'game' in req.query ? req.query['game'] : random_choice(Object.keys(d_games))[0];
  var pm_product = new mParticle.Product();

  if (type == "Coin") {
    var [product_set, sel] = random_choice(a_coins); //console.log("Product Set: " + product_set)

    pm_product.name = "Coins - " + product_set[0];
    pm_product.id = game + "-COIN-00" + (sel + 1);
    pm_product.brand = "Product Madness";
    pm_product.category = d_games[game];
    pm_product.quantity = 1;
    pm_product.price = product_set[2];
    pm_product.custom_attributes = {};
    pm_product.custom_attributes['Coins_Amount'] = product_set[1];
    pm_product.total_product_amount = pm_product.quantity * pm_product.price;
  } else if (type == "Stellar") {
    var [product_set, sel] = random_choice(a_stellars);
    pm_product.name = "Stellars - " + product_set[0];
    pm_product.id = game + "-STELLAR-00" + (sel + 1);
    pm_product.brand = "Product Madness";
    pm_product.category = d_games[game];
    pm_product.quantity = 1;
    pm_product.price = product_set[2];
    pm_product.custom_attributes = {};
    pm_product.custom_attributes['Stellars_Amount'] = product_set[1];
    pm_product.total_product_amount = pm_product.quantity * pm_product.price;
  } else if (type == "Wheel") {
    var [randomCoins, c_sel] = weighted_random_choice(a_lw_coins);
    var [randomExtra, e_sel] = weighted_random_choice(a_lw_extra);
    pm_product.name = "DRAW - " + randomCoins[0] + " + " + randomExtra[0];
    pm_product.id = game + "-DRAW-00" + (c_sel + 1);
    pm_product.brand = "Product Madness";
    pm_product.category = d_games[game];
    pm_product.quantity = 1;
    pm_product.price = 9.99;
    pm_product.custom_attributes = {};
    pm_product.custom_attributes['Coins_Amount'] = randomCoins[1];
    pm_product.custom_attributes['Extra_Type'] = randomExtra[0];
    pm_product.custom_attributes['Extra_Unit'] = randomExtra[1];
    pm_product.total_product_amount = pm_product.quantity * pm_product.price;
  }

  var product_action = new mParticle.ProductAction('purchase');
  product_action.products = [pm_product];
  product_action.total_amount = 0;

  for (var i = 0; i < product_action.products.length; i++) {
    product_action.total_amount += product_action.products[i].total_product_amount;
  }

  product_action.tax_amount = Math.round(product_action.total_amount * 0.2 * 100) / 100;
  product_action.transaction_id = "PM-" + game + "-" + uuidv4();
  var commerce_event = new mParticle.CommerceEvent();
  commerce_event.product_action = product_action;
  commerce_event.currency_code = "GBP";
  commerce_event.custom_attributes = {};
  commerce_event.custom_attributes['Payment_Type'] = "In App Purchase";
  commerce_event.custom_attributes['Game'] = d_games[game];

  if ('token' in req.query) {
    commerce_event.custom_attributes['Token'] = req.query['token'];
  }

  commerce_event.timestamp_unixtime_ms = Date.now(); //replace with time of transaction

  batch.addEvent(commerce_event);
  var body = [batch];

  var callback = function (error, data, response) {
    if (error) {
      res.send('Error: ' + error);
    } else {
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify({
        'Game': d_games[game],
        'Payment_Amount': product_action.total_amount,
        'Purchase_Item': type == "Stellar" ? "Stellars" : "Coins",
        'Purchase_Amount': type == "Stellar" ? pm_product.custom_attributes['Stellars_Amount'] : pm_product.custom_attributes['Coins_Amount']
      }, null, 4));
    }
  };

  api.bulkUploadEvents(body, callback);
});
module.exports = buy_coin;
},{}],"public/mp/buy-matas.js":[function(require,module,exports) {
var express = require('express');

var buy_matas = express.Router();

var mParticle = require('mparticle'); //https://demo.mp.com/mp/buy_matas?customerid=31160825
//mParticle Workshop ---> easyJet ---> Custom Feed ---> eRes System


var config = new mParticle.Configuration('us2-0c40b6fcec02354f9179838bc68c8edf', '_FME4g_b9pFY8iAglexCpx9Qt7IA7uhAzvzfgUzI_xo1rCeRntktI7gStxUPuLy3');
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

function random_choice(a_src) {
  var sel = Math.floor(Math.random() * a_src.length);
  return [a_src[sel], sel];
}

function weighted_random_choice(data) {
  let total = 0;

  for (let i = 0; i < data.length; ++i) {
    total += data[i][1];
  } // Total in hand, we can now pick a random value akin to our
  // random index from before.


  const threshold = Math.random() * total;
  total = 0;

  for (let i = 0; i < data.length - 1; ++i) {
    // Add the weight to our running total.
    total += data[i][1]; // If this value falls within the threshold, we're done!

    if (total >= threshold) {
      return [data[i][0], i];
    }
  } // Wouldn't you know it, we needed the very last entry!


  return [data[data.length - 1][0], data.length - 1];
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

buy_matas.get('/', function (req, res) {
  var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
  batch.context = {
    "data_plan": {
      "plan_id": "dp_example",
      "plan_version": 1
    }
  };
  var user_identities = new mParticle.UserIdentities();

  if ('customerid' in req.query) {
    user_identities.customerid = req.query['customerid'];
  }

  batch.user_identities = user_identities;
  batch.mp_deviceid = "a8d2ebab-e956-407e-a1e6-f05f871bb9f3";
  let a_categories = {
    "Skin Care": ["Facial Care", "Body Care", "Dermatological and Special Skin Care", "For Mother & Child", "Hair Removal", "Sun Care"],
    "Perfumes & Fragrances": ["To her", "For him", "Perfumes", "Deodorants", "Fragrance for the Home", "Shop by Fragrance Family"],
    "Makeup": ["Face", "Eyes", "Lips", "Nails", "Accessories"],
    "Hair": ["Shampoo & Hair Care", "Hair Colour", "Hair Styling", "Styling Tools", "Hair Cutting", "Beard Care", "Food Supplements for Hair", "Professional Hair Care", "Accessories for Hair"],
    "Health & Wellness": ["Dietary supplements", "Training & Nutrition", "Food and Drinks", "Sex & Cohabitation", "Natural Remedies", "Massage & Wellness", "Homeopathy", "Miscellaneous"],
    "Medicine & Care": ["Over the counter medicine", "Allergy", "Support bandage", "Blood Pressure Monitors", "Eczema & Dry Skin", "Ticks & Fleas", "Cold", "Hands & Feet", "Home Tests", "Assistive devices", "Hygiene", "Nose", "Patches", "Lice", "Light Therapy Lamps", "Stomach problems", "Mosquito", "Sore Throat", "Stop Smoking", "Pain", "The Snore", "Mushroom", "Wound Care", "Thermometers", "Motion Sickness", "Eyes", "Ears"],
    "Clothes & Housing": ["Clothes & Housing", "Children & Parents", "Men", "Gifts", "News", "Talk to an expert", "Clothes, Shoes & Accessories", "Home interior", "Electronics", "Household", "Accessories for Pets", "Travel Accessories"],
    "Children & Parents": ["Breastfeeding and Bottle", "The Child's Health", "Nappy Time, Bath and Care", "Pregnancy and Postpartum", "Sleeping Time", "Dinner Time", "Toy", "Baby Equipment", "Children's Clothing"],
    "Men": ["Fragrance", "Shaving", "Beard Care", "Skin Care", "Hair", "Body & Health", "Makeup for Men", "Men's Clothing", "Accessories"],
    "Gifts": ["Gifts for Her", "Gifts for Him", "Gift Boxes", "Gift Card", "Host Gifts", "Brand Days"]
  };
  var a_prod_items = [["Balancing Force Oil Control Toner 198 ml", "714858", 239.95, "20%", "OLE HENRIKSEN", "Skin Care", "Facial Care - Cleaning Products - Skin Tonic", {
    "Volume": "198ml"
  }, "https://images.matas.dk/trs/w730//Assets_v3/500001-600000/504001-505000/504101-504200/504173/product_v1_x2.jpg"], ["Expert Sun Protector SPF 50 + Face and Body 150 ml", "753709", 364.95, "0%", "SHISEIDO", "Skin Care", "Sun Care - Sun Cream - Sunscreen for the Body", {
    "Volume": "150ml"
  }, "https://images.matas.dk/trs/w730//Assets_v3/600001-700000/652001-653000/652601-652700/652686/product_v1_x2.jpg"], ["Bedroom.Hair Hairspray 250 ml", "720815", "227.95", "0%", "KEVIN MURPHY", "Hair", "Hair Styling - Hair Spray", {
    "Volume": "250ml"
  }, "https://images.matas.dk/trs/w730//Assets_v3/700001-800000/718001-719000/718001-718100/718081/product_v1_x2.jpg"], ["Sauvage Eau de Toilette 60 ml", "672698", 659.95, "0%", "DIOR", "Perfumes & Fragrances", "For Him - Eau de Toilette", {
    "Volume": "60ml"
  }, "https://images.matas.dk/trs/w730//Assets_v3/600001-700000/661001-662000/661601-661700/661648/product_v1_x2.jpg"], ["Wake-Up Light HF3531/01", "749870", 1599.0, "0%", "PHILIPS", "Clothes & Housing", "Electronics - Lights & Lamps - Light Therapy Lamps", {
    "Colour": "Amber"
  }, "https://images.matas.dk/trs/w730//Assets_v3/700001-800000/765001-766000/765601-765700/765623/product_v1_x2.jpg"]];
  var matas_product = new mParticle.Product();
  var [product_set, sel] = random_choice(a_prod_items); //console.log("Product Set: " + product_set)

  matas_product.name = product_set[0];
  matas_product.id = product_set[1];
  matas_product.brand = product_set[4];
  matas_product.category = product_set[5];
  matas_product.quantity = 1;
  matas_product.price = product_set[2];
  matas_product.coupon_code = product_set[3];
  matas_product.custom_attributes = {};

  for (const [key, value] of Object.entries(product_set[7])) {
    //console.log(`${key}: ${value}`);
    matas_product.custom_attributes[key] = value;
  }

  matas_product.custom_attributes["Sub Category"] = product_set[6];
  matas_product.total_product_amount = matas_product.quantity * matas_product.price * (100 - matas_product.coupon_code.substring(0, matas_product.coupon_code.length - 1)) / 100;
  var product_action = new mParticle.ProductAction('purchase');
  product_action.products = [matas_product];
  product_action.total_amount = 0;

  for (var i = 0; i < product_action.products.length; i++) {
    product_action.total_amount += product_action.products[i].total_product_amount;
  }

  product_action.tax_amount = Math.round(product_action.total_amount * 0.25 * 100) / 100;
  product_action.transaction_id = "Matas-" + uuidv4();
  var commerce_event = new mParticle.CommerceEvent();
  commerce_event.product_action = product_action;
  commerce_event.currency_code = "DKK";
  commerce_event.custom_attributes = {};
  commerce_event.custom_attributes['Payment_Type'] = random_choice(["Dankort", "Mobile Pay", "Master Card", "Visa", "Anyday"])[0];
  commerce_event.custom_attributes['Delivery_Option'] = random_choice(["In Store", "Matas", "GLS", "dao", "postnord", "instaBox", "Burd"])[0];
  commerce_event.custom_attributes['Club_Points'] = Math.ceil(product_action.total_amount / 10);

  if ('token' in req.query) {
    commerce_event.custom_attributes['Token'] = req.query['token'];
  }

  commerce_event.timestamp_unixtime_ms = Date.now(); //replace with time of transaction

  batch.addEvent(commerce_event);
  var body = [batch];

  var callback = function (error, data, response) {
    if (error) {
      res.send('Error: ' + error);
    } else {
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify({
        'Product_Item': a_prod_items[sel][0],
        'Payment_Amount': matas_product.total_product_amount.toString(),
        "Matas_Points": Math.ceil(product_action.total_amount / 10).toString(),
        'Product_Image': a_prod_items[sel][8]
      }, null, 4));
    }
  };

  api.bulkUploadEvents(body, callback);
});
module.exports = buy_matas;
},{}],"public/mp/buy-puc.js":[function(require,module,exports) {
var express = require('express');

var buy_puc = express.Router();

var mParticle = require('mparticle'); //https://demo.mp.com/mp/buy_puc?customerid=31160825


var config = new mParticle.Configuration('us2-0c40b6fcec02354f9179838bc68c8edf', '_FME4g_b9pFY8iAglexCpx9Qt7IA7uhAzvzfgUzI_xo1rCeRntktI7gStxUPuLy3');
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

function random_choice(a_src) {
  var sel = Math.floor(Math.random() * a_src.length);
  return [a_src[sel], sel];
}

function weighted_random_choice(data) {
  let total = 0;

  for (let i = 0; i < data.length; ++i) {
    total += data[i][1];
  } // Total in hand, we can now pick a random value akin to our
  // random index from before.


  const threshold = Math.random() * total;
  total = 0;

  for (let i = 0; i < data.length - 1; ++i) {
    // Add the weight to our running total.
    total += data[i][1]; // If this value falls within the threshold, we're done!

    if (total >= threshold) {
      return [data[i][0], i];
    }
  } // Wouldn't you know it, we needed the very last entry!


  return [data[data.length - 1][0], data.length - 1];
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

buy_puc.get('/', function (req, res) {
  var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
  batch.context = {
    "data_plan": {
      "plan_id": "dp_example",
      "plan_version": 1
    }
  };
  var user_identities = new mParticle.UserIdentities();

  if ('customerid' in req.query) {
    user_identities.customerid = req.query['customerid'];
  }

  batch.user_identities = user_identities;
  batch.mp_deviceid = "b9d2ebab-a768-048f-b2f8-eeb1042ac6d8";
  let a_prod_items = [["Marie Lund - Women's evening dress", "659162-0001", 169.99, "0%", "MARIE LUND", "Ladies", "Ladies - Clothing - Dresses", {
    "Size": "36"
  }, "https://static.vangraaf.com/img/Damen-Abendkleid_pdstandard_659162-0001_modelfront_1.jpg"], ["Hugo - Men's Coat - H-Hyde-J-Bib-234", "650707-0001", 549.99, "0%", "HUGO", "Men's", "Men's - Clothing - Coats", {
    "Size": "52"
  }, "https://static.vangraaf.com/img/Herren-Mantel-H-Hyde-J-Bib-234_pdstandard_650707-0001_modelfront_1.jpg"], ["Lloyd - Women's pumps", "679284-0002", 119.99, "0%", "LLOYD", "Ladies", "Ladies - Shoes - Pumps", {
    "size": "36"
  }, "https://static.vangraaf.com/img/Damen-Pumps_pdstandard_679284-0002_stillfront_1.jpg"], ["Lego - Boys winter hat", "685310-0003", 22.99, "0%", "LEGO", "Kids & Teens", "Kids & Teens - Accessories - Hats & Caps", {
    "Size": "54 - 56"
  }, "https://static.vangraaf.com/img/Jungen-Winterm-tze_pdstandard-bust_685310-0003_bustfront_1.jpg"], ["Izia - Girls summer dress", "660754-0001", 149.99, "21.4%", "IZIA", "Kids & Teens", "Kids & Teens - Clothing - Dresses & Skirts", {
    "Size": "122"
  }, "https://static.vangraaf.com/img/M-dchen-Sommerkleid_pdstandard_660754-0001_modelfront_1.jpg"]];
  let a_Stores = [["Bielefeld", "33602"], ["Braunschweig", "38100"], ["Bremen, Obernstrasse", "28195"], ["Bremen, Weserpark", "28307"], ["Chemnitz", "09111"], ["Dresden", "01067"], ["Flensburg", "24937"], ["Hamburg, Bergedorf", "21029"], ["Hamburg, Mönckebergstraße", "20095"], ["Hanover", "30159"], ["Kiel", "24103"], ["Hamburg, Elbe", "22609"], ["Lüneburg", "21335"], ["Norderstedt", "22850"], ["Stralsund", "18439"], ["Rostock", "18055"]];
  var puc_product = new mParticle.Product();
  var [product_set, sel] = random_choice(a_prod_items); //console.log("Product Set: " + product_set)

  puc_product.name = product_set[0];
  puc_product.id = product_set[1];
  puc_product.brand = product_set[4];
  puc_product.category = product_set[5];
  puc_product.quantity = 1;
  puc_product.price = product_set[2];
  puc_product.coupon_code = product_set[3];
  puc_product.custom_attributes = {};

  for (const [key, value] of Object.entries(product_set[7])) {
    //console.log(`${key}: ${value}`);
    puc_product.custom_attributes[key] = value;
  }

  puc_product.custom_attributes["Sub Category"] = product_set[6];
  puc_product.total_product_amount = puc_product.quantity * puc_product.price * (100 - puc_product.coupon_code.substring(0, puc_product.coupon_code.length - 1)) / 100;
  var product_action = new mParticle.ProductAction('purchase');
  product_action.products = [puc_product];
  product_action.total_amount = 0;

  for (var i = 0; i < product_action.products.length; i++) {
    product_action.total_amount += product_action.products[i].total_product_amount;
  }

  product_action.tax_amount = Math.round(product_action.total_amount * 0.19 * 100) / 100;
  product_action.total_amount = Math.round(product_action.total_amount * 1.19 * 100) / 100;
  product_action.transaction_id = "P&C-" + uuidv4();
  var commerce_event = new mParticle.CommerceEvent();
  commerce_event.product_action = product_action;
  commerce_event.currency_code = "EUR";
  commerce_event.custom_attributes = {};
  commerce_event.custom_attributes['Payment Type'] = random_choice(["PayPal", "Klarna", "Master Card", "Visa", "American Express"])[0];
  commerce_event.custom_attributes['Delivery Option'] = random_choice(["Click & Collect", "DHL", "Hermes", "In Store"])[0];

  if (commerce_event.custom_attributes['Delivery Option'] == "Click & Collect" || commerce_event.custom_attributes['Delivery Option'] == "In Store") {
    commerce_event.custom_attributes['Store Name'] = random_choice(a_Stores)[0][0];
    commerce_event.custom_attributes['Store Code'] = random_choice(a_Stores)[0][1];
  }

  commerce_event.custom_attributes['P&C* Points'] = Math.ceil(product_action.total_amount / 10);

  if ('token' in req.query) {
    commerce_event.custom_attributes['Token'] = req.query['token'];
  }

  commerce_event.timestamp_unixtime_ms = Date.now(); //replace with time of transaction

  batch.addEvent(commerce_event);
  var body = [batch];

  var callback = function (error, data, response) {
    if (error) {
      res.send('Error: ' + error);
    } else {
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify({
        'Product_Item': a_prod_items[sel][0],
        'Payment_Amount': puc_product.total_product_amount.toString(),
        "P&C*_Points": Math.ceil(product_action.total_amount / 10).toString(),
        'Product_Image': a_prod_items[sel][8]
      }, null, 4));
    }
  };

  api.bulkUploadEvents(body, callback);
});
module.exports = buy_puc;
},{}],"public/mp/push-notification.js":[function(require,module,exports) {
var express = require('express');

var push_notification = express.Router();

var mParticle = require('mparticle');

var logger = require('morgan');

const {
  exec
} = require("child_process"); //https://demo.mp.com/mp/push_notification?customerid=31160825&title=Great%20Offer%21&body=You%20Cannot%20Miss%20This%21&app=Matas


var config = new mParticle.Configuration('us2-4a4f4fa3a0464a4492a543888119fe3e', 'xfgWFOlV_CO2ha65v5QK4Md8WXey1wIlm2N_qVJo6A-1fy0y1XMwFiWQRqCon0us');
var apiClient = new mParticle.ApiClient();
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2';
var api = new mParticle.EventsApi(config, apiClient);

function random_choice(a_src) {
  var sel = Math.floor(Math.random() * a_src.length);
  return [a_src[sel], sel];
}

function weighted_random_choice(data) {
  let total = 0;

  for (let i = 0; i < data.length; ++i) {
    total += data[i][1];
  } // Total in hand, we can now pick a random value akin to our
  // random index from before.


  const threshold = Math.random() * total;
  total = 0;

  for (let i = 0; i < data.length - 1; ++i) {
    // Add the weight to our running total.
    total += data[i][1]; // If this value falls within the threshold, we're done!

    if (total >= threshold) {
      return [data[i][0], i];
    }
  } // Wouldn't you know it, we needed the very last entry!


  return [data[data.length - 1][0], data.length - 1];
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

push_notification.get('/', function (req, res) {
  var s_cmd = "sleep 3;sed -i \"\" -e 's/^.*title.*$/            \"title\": \"" + req.query['title'] + "\"/' -e 's/^.*body.*$/            \"body\": \"" + req.query['body'] + "\",/' \"/Users/hsyang/Downloads/Prospects/Demo iOS App - " + req.query['app'] + "/push.json\";xcrun simctl push booted mParticle.demo-org \"/Users/hsyang/Downloads/Prospects/Demo iOS App - " + req.query['app'] + "/push.json\""; //console.log(s_cmd)

  exec(s_cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
    batch.context = {
      "data_plan": {
        "plan_id": "dp_example",
        "plan_version": 1
      }
    };
    var user_identities = new mParticle.UserIdentities();

    if ('customerid' in req.query) {
      user_identities.customerid = req.query['customerid'];
    }

    batch.user_identities = user_identities;
    batch.mp_deviceid = "87d2ebaa-e956-407e-a1e6-f05f871bf4e6";
    var s_campaign_id = "2023-" + uuidv4();
    var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.other, 'Push Notification Deliveries');
    event.custom_attributes = {
      "Campaign_Subject": req.query['title'],
      "Campaign_ID": s_campaign_id,
      "Mobile_ID": req.query['customerid'],
      "Notfication_Time": new Date().toISOString().split(".")[0] + "+00:00"
    };
    batch.addEvent(event);
    var body = [batch];

    var callback = function (error, data, response) {
      if (error) {
        res.send('Error: ' + error);
      } else {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify({
          'Notification_Result': stdout.trim(),
          'Mobile_ID': req.query['customerid'],
          'Campaign_Subject': req.query['title'],
          'Campaign_ID': s_campaign_id
        }, null, 4));
      }
    };

    api.bulkUploadEvents(body, callback);
  });
});
module.exports = push_notification;
},{}],"public/mp/profile.js":[function(require,module,exports) {
'use strict';

var express = require('express');

var profile = express.Router();

var fetch = require('node-fetch');

var s_token = '';

async function request_token() {
  var e = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE",
      client_secret: "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA",
      audience: "https://api.mparticle.com",
      grant_type: "client_credentials"
    }),
    mode: "no-cors",
    method: "POST"
  };
  var t = await (await fetch("https://sso.auth.mparticle.com/oauth/token", e)).json();
  s_token = t.access_token;
  return s_token;
}

async function request_user_profile(wSID, mPID) {
  s_token = await request_token();
  var t = "https://api.mparticle.com/userprofile/v1/5000011/167/" + wSID + "/" + mPID + "?fields=user_identities,user_attributes,audience_memberships,attribution";
  var e = {
    headers: {
      Authorization: "Bearer " + s_token
    },
    method: "GET"
  };
  var user_profile = await (await fetch(t, e)).json();
  return user_profile;
}

profile.get('/', async function (req, res) {
  if (req.query['mPID']) {
    var user_profile = await request_user_profile(req.query['wSID'], req.query['mPID']);
    res.send({
      user_profile
    });
  } else {
    res.send({});
  }
});
module.exports = profile;
},{}],"app.js":[function(require,module,exports) {
const https = require('https');

const http = require('http');

const fs = require('fs');

const path = require('path');

const cors = require('cors');

var express = require('express');

var logger = require('morgan');

var app = express();

var mparticle = require('mparticle');
/*const options = {
  key: fs.readFileSync('/usr/local/etc/nginx/key.pem'),
  cert: fs.readFileSync('/usr/local/etc/nginx/cert.pem')
};

const app = https.createServer(options, function (request, response) {
  let filePath = path.join(__dirname, 'public', request.url);
  if (filePath === path.join(__dirname, 'public', '/')) filePath = path.join(__dirname, 'public', 'index.html');

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500);
      response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}).listen(443);*/


https.createServer({
  key: fs.readFileSync("/usr/local/etc/nginx/key.pem"),
  cert: fs.readFileSync("/usr/local/etc/nginx/cert.pem")
}, app).listen(443, () => {
  console.log('server is runing at port 443');
});
http.createServer(app).listen(80, () => {
  console.log('server is runing at port 80');
}); // log requests

app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public', 'index.html')));
app.use('/mp/book_flight', require('./public/mp/book-flight.js'));
app.use('/mp/check_in', require('./public/mp/check-in.js'));
app.use('/mp/flight_update', require('./public/mp/flight-update.js'));
app.use('/mp/buy_coin', require('./public/mp/buy-coin.js'));
app.use('/mp/buy_matas', require('./public/mp/buy-matas.js'));
app.use('/mp/buy_puc', require('./public/mp/buy-puc.js'));
app.use('/mp/push_notification', require('./public/mp/push-notification.js'));
app.use('/mp/profile', require('./public/mp/profile.js'));
module.exports = app;
},{"./public/mp/book-flight.js":"public/mp/book-flight.js","./public/mp/check-in.js":"public/mp/check-in.js","./public/mp/flight-update.js":"public/mp/flight-update.js","./public/mp/buy-coin.js":"public/mp/buy-coin.js","./public/mp/buy-matas.js":"public/mp/buy-matas.js","./public/mp/buy-puc.js":"public/mp/buy-puc.js","./public/mp/push-notification.js":"public/mp/push-notification.js","./public/mp/profile.js":"public/mp/profile.js"}],"index.js":[function(require,module,exports) {
const app = require('./app').app; //const flights = require('./app').flights;
//console.log("index.js: " + flights)

/*const port = '443';

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});*/
},{"./app":"app.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map