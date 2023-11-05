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
},{"./eJ_app.js":"public/mp/eJ_app.js"}]},{},["public/mp/book-flight.js"], null)
//# sourceMappingURL=/public/mp/book-flight.js.map