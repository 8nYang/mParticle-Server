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
})({"public/mp/profile.js":[function(require,module,exports) {
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
      //client_id: "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE", //us2 mParticle Workshops
      //client_secret: "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA", //us2 mParticle Workshops
      client_id: "irrAuwex0d7calyRaknpCYE89omlKEDU",
      //eu1 mParticle Workshops
      client_secret: "tMZaugEg57IyInCMiySuSU0c4UvB60s4C4ir5FH2tjzYScuUMcWaldjmE1rt9Lnn",
      //eu1 mParticle Workshops
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
  s_token = await request_token(); //var t = "https://api.mparticle.com/userprofile/v1/5000011/167/" + wSID + "/" + mPID + "?fields=user_identities,user_attributes,audience_memberships,attribution"; //us2 mParticle Workshops

  var t = "https://api.mparticle.com/userprofile/v1/4000268/374/" + wSID + "/" + mPID + "?fields=user_identities,user_attributes,audience_memberships,attribution"; // eu1 mParticle Workshops

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
},{}]},{},["public/mp/profile.js"], null)
//# sourceMappingURL=/public/mp/profile.js.map