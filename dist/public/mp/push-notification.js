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
})({"public/mp/push-notification.js":[function(require,module,exports) {
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
},{}]},{},["public/mp/push-notification.js"], null)
//# sourceMappingURL=/public/mp/push-notification.js.map