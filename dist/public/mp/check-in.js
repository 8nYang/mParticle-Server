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
},{}],"public/mp/check-in.js":[function(require,module,exports) {
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
},{"./eJ_app.js":"public/mp/eJ_app.js"}]},{},["public/mp/check-in.js"], null)
//# sourceMappingURL=/public/mp/check-in.js.map