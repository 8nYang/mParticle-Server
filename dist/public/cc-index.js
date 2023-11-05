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
})({"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51275" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/cc-index.js.maprFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cart = [];
var cur_mpid = "";
var user_profile = {};
document.addEventListener('DOMContentLoaded', function () {
  var webKeyText = document.getElementById('web-key');
  webKeyText.value = WEBKEY; // Web Key Management

  document.getElementById('update-web-key').addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.mpKey = e.target[0].value;
    WEBKEY = e.value;
    location.reload();
  }); // Clear cookies

  document.getElementById('clear-cookies').addEventListener("click", function () {
    for (var _i = 0, _Object$entries = Object.entries(localStorage); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (key.includes("mprtcl-")) {
        localStorage.removeItem(key);
      }
    }
  }); // Clear Test Users

  document.getElementById('clear-test-users').addEventListener("click", function () {
    for (var _i2 = 0, _Object$entries2 = Object.entries(localStorage); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      if (key.includes("mpTestUser_")) {
        localStorage.removeItem(key);
      }
    }
  }); // Login

  document.getElementById('form-1').addEventListener('submit', function (e) {
    e.preventDefault(); //declare user identities

    var identityRequest = {
      userIdentities: {
        //customerid: `${e.target[0].value}-Test${e.target[1].value[2]}`,
        //email: `${e.target[0].value}-Test${e.target[1].value[2]}@mp.com`
        mobile_number: "".concat(e.target[0].flag ? e.target[0].value : ''),
        customerid: "".concat(e.target[1].flag ? e.target[1].value : ''),
        email: "".concat(e.target[2].flag ? e.target[2].value : '')
      }
    };

    var callback = function callback(result) {
      console.log("MPID: ", result.body.mpid, " UserIdenty: ", result.getUser().getUserIdentities().userIdentities);

      if (result.getUser()) {
        //IDSync request succeeded, mutate attributes or query for the MPID as needed
        var currentMParticleUser = result.getUser();
        console.log("Current User: ", currentMParticleUser);
        console.log("Current User GDPR Consent: ", currentMParticleUser.getConsentState());
        var previousMParticleUser = result.getPreviousUser();
        console.log("Previous User: ", previousMParticleUser);
        request_user_profile(currentMParticleUser.getMPID()); //updateUserIdentites(result.getUser())

        return;
      }

      var codes = window.mParticle.Identity.HTTPCodes;

      switch (result.httpCode) {
        case codes.noHttpCoverage: // retry the IDSync request break;

        case codes.activeIdentityRequest:
        case 429:
          //inspect your implementation if this occurs frequency
          //otherwise retry the IDSync request
          break;

        case codes.validationIssue:
        case 400:
          console.log(result.body); // inspect result.body to determine why the request failed
          // this typically means an implementation issue

          break;

        default:
      }
    };

    mParticle.Identity.login(identityRequest, callback);
  }); // Logout

  document.getElementById('logout').addEventListener('click', function () {
    var callback = function callback(result) {
      if (result.getUser()) {
        resetUserIdentities(result.getUser());
        user_profile = {};
      }
    };

    mParticle.Identity.logout({}, callback);
  }); //Add User Attribute

  document.getElementById('ua-add').addEventListener('click', function (e) {
    var keyHTML = document.getElementById('ua-key');
    var valueHTML = document.getElementById('ua-value');
    var currentUser = mParticle.Identity.getCurrentUser();
    currentUser.setUserAttribute(keyHTML.value, valueHTML.value);
    updateUserIdentities(currentUser);
  }); //Product  Action

  document.getElementById('add-to-cart').addEventListener('submit', function (e) {
    e.preventDefault();
    var product = mParticle.eCommerce.createProduct(e.target[0].value, // Name
    "-387000", // SKU
    parseFloat(e.target[1].value, 10).toFixed(2), // Price
    parseInt(e.target[3].value), //Quantity
    null, // Variant
    e.target[2].value, // Category
    "KFC", // Brand
    null, // Position
    e.target[4].value, //Coupon
    {
      "Sub_Category": "For Sharing",
      "Purchasable": "True",
      "Customised": "False"
    } // attributes
    ); //console.log("Coupon: "+e.target[4].value);

    if (["Delivery", "Carhop"].indexOf(e.target[5].value) > -1) {
      var product2 = mParticle.eCommerce.createProduct(e.target[5].value, // Name
      e.target[5].value == "Carhop" ? "900000-2" : "900000-1", // SKU
      9.00, // Price
      1, //Quantity
      null, // Variant
      "Service", // Category
      "KFC", // Brand
      null, // Position
      null, //Coupon
      {
        "Sub_Category": e.target[5].value,
        "Purchasable": "True"
      } // attributes
      );
    }

    if (e.target[12].value == "AddToCart") {
      cart.push(product);

      if (product2) {
        cart.push(product2);
      }

      var productDOM = document.createElement("div");
      productDOM.id = product.Sku;
      console.log(product);
      productDOM.innerHTML = "\n        {</br>\n          &nbsp;&nbsp;&nbsp;&nbsp;Name: ".concat(product.Name, ",</br>\n          &nbsp;&nbsp;&nbsp;&nbsp;Price: ").concat(product.Price, ",</br>\n          &nbsp;&nbsp;&nbsp;&nbsp;Quantity: ").concat(parseInt(product.Quantity, 10), ",</br>\n        }</br>\n      ");

      if (product2) {
        productDOM.innerHTML += "\n          {</br>\n            &nbsp;&nbsp;&nbsp;&nbsp;Name: ".concat(product2.Name, ",</br>\n            &nbsp;&nbsp;&nbsp;&nbsp;Price: ").concat(product2.Price, ",</br>\n            &nbsp;&nbsp;&nbsp;&nbsp;Quantity: ").concat(parseInt(product2.Quantity, 10), ",</br>\n          }</br>\n        ");
      }

      var removeFromCart = document.createElement('button');
      removeFromCart.type = 'button';
      removeFromCart.className = 'remove-from-cart';
      removeFromCart.innerHTML = 'Remove';
      removeFromCart.id = product.Sku;
      removeFromCart.addEventListener('click', function (e) {
        remove(e);
      });
      productDOM.appendChild(removeFromCart);
      document.getElementById('cart').appendChild(productDOM);
    }

    var customFlags = {
      'DoubleClick.Counter': 'standard',
      'Facebook.EventSourceURL': 'https://demo.mp.com/'
    };

    if (e.target[12].value != "Impression") {
      var customAttributes = {
        "Payment_Type": document.getElementById('payment').options[document.getElementById('payment').selectedIndex].value,
        "Serve_Category": document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value,
        "Store_ID": document.getElementById('Store_ID').value,
        "Store_Name": document.getElementById('outlet').options[document.getElementById('outlet').selectedIndex].value
      }; // if not passing any custom attributes, pass null

      if (document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value == "Carhop") {
        customAttributes.Car_Plate_Number = document.getElementById('car_no').value, customAttributes.Car_Colour = document.getElementById('car_colour').value, customAttributes.Car_Maker = document.getElementById('car_maker').value;
      }

      mParticle.eCommerce.logProductAction(mParticle.ProductActionType[e.target[12].value], product2 ? [product, product2] : product, customAttributes, customFlags);
    } else {
      var impression = mParticle.eCommerce.createImpression('Suggested Products List', product);
      mParticle.eCommerce.logImpression(impression);
    }
  }); //removeFromCart

  function remove(e) {
    var id = e.target.id;
    var removeThis = cart.find(function (product) {
      return product.Sku == id;
    });
    document.getElementById(id).remove();
    var customFlags = {
      'DoubleClick.Counter': 'standard',
      'Facebook.EventSourceURL': 'https://demo.mp.com/'
    };
    mParticle.eCommerce.logProductAction(mParticle.ProductActionType.RemoveFromCart, removeThis, {}, customFlags);
    cart = cart.filter(function (product) {
      return product.Sku !== id;
    });
  } //Log Purchase Event


  document.getElementById('purchase-event').addEventListener('click', function (e) {
    var totalPrice = 0;
    var couponCode = null;
    cart.forEach(function (product) {
      totalPrice = totalPrice + parseFloat(product.Price, 10) * parseInt(product.Quantity, 10);
      couponCode = product.CouponCode ? product.CouponCode : couponCode; //console.log("Coupou: " + product.CouponCode)
    });
    var transactionAttributes = {
      Id: "CC-".concat(Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000),
      Revenue: couponCode ? parseFloat(totalPrice, 10).toFixed(2) * 0.8 : parseFloat(totalPrice, 10).toFixed(2),
      Tax: couponCode ? (parseFloat(totalPrice, 10) * 0.05).toFixed(2) * 0.8 : (parseFloat(totalPrice, 10) * 0.05).toFixed(2),
      CouponCode: couponCode //coupon

    };

    if (!(cart.length === 0)) {
      var customAttributes = {
        "Payment_Type": document.getElementById('payment').options[document.getElementById('payment').selectedIndex].value,
        "Serve_Category": document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value,
        "Store_ID": document.getElementById('Store_ID').value,
        "Store_Name": document.getElementById('outlet').options[document.getElementById('outlet').selectedIndex].value,
        "Order_Platform": "Call Centre"
      }; // if not passing any custom attributes, pass null

      if (document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value == "Carhop") {
        customAttributes.Car_Plate_Number = document.getElementById('car_no').value, customAttributes.Car_Colour = document.getElementById('car_colour').value, customAttributes.Car_Maker = document.getElementById('car_maker').value;
      } // ADD CUSTOM FLAGS


      var customFlags = {
        'Facebook.EventSourceURL': "https://demo.mp.com/"
      };
      console.log("Coupon: " + couponCode);
      mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, cart, customAttributes, customFlags, transactionAttributes);
      cart = [];
      document.getElementById('cart').innerHTML = "<h2>Cart:</h2>";
    }

    ;
  }); //Log Generic Event

  /*document.getElementById('search-event').addEventListener('click',(e)=>{
    mParticle.logEvent(
      'search',
      mParticle.EventType.Search,
      {
        "genderGroup": "men",
        "productGroup": "Clothing",
        "productType": "Blazers",
        "brand": "Gant"
      },
      {'Facebook.EventSourceUrl': "https://demo.mp.com/" }
    );
  })
   //Log Page View
  document.getElementById('page-view-event').addEventListener('click',(e)=>{
    mParticle.logEvent('view', mParticle.EventType.Navigation,
      {
        "genderGroup": "women",
        "productGroup": "Face + Body",
        "productType": "Fragrances",
        "brand": "Cantu"
      },
      {'Facebook.EventSourceUrl': "https://demo.mp.com/" }
    )
  })*/
});

function updateUserIdentities(user) {
  var identities = user.getUserIdentities().userIdentities;
  var consentState = user.getConsentState();
  var table = document.getElementById('current-user');
  var table2 = document.getElementById('user-profile');
  var mPcookies = Object.keys(localStorage).filter(function (propertyName) {
    return propertyName.indexOf("mprtcl") === 0;
  });
  var mpid = user.getMPID();
  cur_mpid = mpid;
  var das = "";
  mPcookies.forEach(function (cookie) {
    if (localStorage[cookie] && localStorage[cookie].includes("|")) {
      if (localStorage[cookie].split("|").find(function (e) {
        return e.includes("dt");
      }).split(":")[1] == "'".concat(WEBKEY, "'")) {
        das = localStorage[cookie].split("|").find(function (e) {
          return e.includes("das");
        }).split(":")[1].replace(/'/g, "");
        return;
      }
    }
  });

  if (Object.keys(user_profile).length === 0) {
    table.children[0].children[0].children[1].innerText = mpid;
    table.children[0].children[1].children[1].innerText = identities.customerid ? identities.customerid : ""; //Customer ID

    table.children[0].children[2].children[1].innerText = identities.email ? identities.email : ""; //Email

    table.children[0].children[3].children[1].innerText = identities.mobile_number ? identities.mobile_number : ""; //Mobile
  } else {
    console.log("+++++Reading from Profile API+++++");
    var ui = Object.fromEntries(new Map(user_profile.user_identities.map(function (object) {
      return [object.type, object.value];
    })));
    table.children[0].children[0].children[1].innerText = user_profile.mpid;
    table.children[0].children[1].children[1].innerText = ui.customer_id ? ui.customer_id : ""; //Customer ID

    table.children[0].children[2].children[1].innerText = ui.email ? ui.email : ""; //Email

    table.children[0].children[3].children[1].innerText = ui.mobile_number ? ui.mobile_number : ""; //Mobile

    table2.children[0].children[1].children[0].innerText = user_profile.user_attributes["$FirstName"] ? user_profile.user_attributes["$FirstName"] : "";
    table2.children[0].children[1].children[1].innerText = user_profile.user_attributes["$LastName"] ? user_profile.user_attributes["$LastName"] : "";
    table2.children[0].children[1].children[2].innerText = user_profile.user_attributes["no."] ? user_profile.user_attributes["no."] : "";
    table2.children[0].children[1].children[3].innerText = user_profile.user_attributes["building"] ? user_profile.user_attributes["building"] : "";
    table2.children[0].children[1].children[4].innerText = user_profile.user_attributes["region"] ? user_profile.user_attributes["region"] : "";
    table2.children[0].children[1].children[5].innerText = user_profile.user_attributes["$Mobile"] ? user_profile.user_attributes["$Mobile"] : "";
    table2.children[0].children[3].children[0].innerText = user_profile.user_attributes["cltv"] ? user_profile.user_attributes["cltv"] : "";
    table2.children[0].children[3].children[1].innerText = user_profile.user_attributes["average Order Value"] ? parseFloat(user_profile.user_attributes["average Order Value"], 10).toFixed(2) : "0";
    table2.children[0].children[3].children[2].innerText = user_profile.user_attributes["# Orders"] ? user_profile.user_attributes["# Orders"] : "0";
    table2.children[0].children[3].children[3].innerText = user_profile.user_attributes["# Orders via Call Centre"] ? user_profile.user_attributes["# Orders via Call Centre"] : "0";
    table2.children[0].children[3].children[4].innerText = user_profile.user_attributes["# Delivery"] ? user_profile.user_attributes["# Delivery"] : "0";
    table2.children[0].children[3].children[5].innerText = user_profile.user_attributes["# Carhop"] ? user_profile.user_attributes["# Carhop"] : "0";
    table2.children[0].children[5].children[0].innerText = user_profile.user_attributes["last Order Time"] ? user_profile.user_attributes["last Order Time"].split(".")[0] : "";
    table2.children[0].children[5].children[1].innerText = user_profile.user_attributes["last Order Meal"] ? user_profile.user_attributes["last Order Meal"] : "";
    table2.children[0].children[5].children[2].innerText = user_profile.user_attributes["last Order Store"] ? user_profile.user_attributes["last Order Store"] : "";
    table2.children[0].children[5].children[3].innerText = user_profile.user_attributes["last Order Serving Method"] ? user_profile.user_attributes["last Order Serving Method"] : "";
    table2.children[0].children[5].children[4].innerText = user_profile.user_attributes["last Order Value"] ? user_profile.user_attributes["last Order Value"] : "0";
    table2.children[0].children[5].children[5].innerText = user_profile.user_attributes["last Payment Method"] ? user_profile.user_attributes["last Payment Method"] : "";
    table2.children[0].children[7].children[0].innerText = user_profile.user_attributes["preferred Meal"] ? user_profile.user_attributes["preferred Meal"] : "";
    table2.children[0].children[7].children[1].innerText = user_profile.user_attributes["preferred Store"] ? user_profile.user_attributes["preferred Store"] : "";
    table2.children[0].children[7].children[2].innerText = user_profile.user_attributes["preferred Order Serving Method"] ? user_profile.user_attributes["preferred Order Serving Method"] : "";
    table2.children[0].children[7].children[3].innerText = user_profile.user_attributes["preferred Payment Method"] ? user_profile.user_attributes["preferred Payment Method"] : "";
    table2.children[0].children[7].children[4].innerText = user_profile.user_attributes["next_Best_Offer"] ? user_profile.user_attributes["next_Best_Offer"] : "";
    table2.children[0].children[7].children[5].innerText = user_profile.user_attributes["# Coupon Claims"] ? user_profile.user_attributes["# Coupon Claims"] : "";
  } //table.children[0].children[5].children[1].innerText = consentState ? consentState.getCCPAConsentState().Consented : "None Yet"
  //localStorage[`mpTestUser_${mpid}`] = `cid:${identities.customerid ? identities.customerid : ""}|email:${identities.email ? identities.email : ""}|das:${das}|consented:${consentState ? consentState.getCCPAConsentState().Consented : ""}`


  localStorage["mpTestUser_".concat(mpid)] = "cid:".concat(identities.customerid ? identities.customerid : "", "|email:").concat(identities.email ? identities.email : "", "|das:").concat(das);
  var userAttributes = document.getElementById('user-attributes');
  userAttributes.innerText = "";
  var mpUA = user.getAllUserAttributes();

  var _loop = function _loop() {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
        key = _Object$entries3$_i[0],
        value = _Object$entries3$_i[1];

    var row = document.createElement('tr');
    row.innerHTML = "<tr>\n      <td>".concat(key, " :<td>\n      <td>").concat(value, "<td>\n    <tr>");
    var removeUA = document.createElement('input');
    removeUA.type = 'button';
    removeUA.className = 'remove-attribute';
    removeUA.value = 'Remove';
    removeUA.id = key;
    removeUA.addEventListener('click', function (e) {
      user.removeUserAttribute(key);
      location.reload();
    });
    row.appendChild(removeUA);
    userAttributes.appendChild(row);
  };

  for (var _i3 = 0, _Object$entries3 = Object.entries(mpUA); _i3 < _Object$entries3.length; _i3++) {
    _loop();
  }

  updatePreviousUsersTable(); //updateUserAudienceMembershipTable(user_profile)
} //Show previous users


var updatePreviousUsersTable = function updatePreviousUsersTable() {
  var table = document.getElementById('previous-users');
  table.innerHTML = "";
  var objArr = [];

  for (var _i4 = 0, _Object$entries4 = Object.entries(localStorage); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        key = _Object$entries4$_i[0],
        value = _Object$entries4$_i[1];

    if (key.includes("mpTestUser_")) {
      var customerInfo = value.split("|");
      var obj = {
        mpid: key.split("mpTestUser_")[1],
        cid: customerInfo[0].split(':')[1] == "" ? "n/a" : customerInfo[0].split(':')[1],
        email: customerInfo[1].split(':')[1] == "" ? "n/a" : customerInfo[1].split(':')[1],
        das: customerInfo[2].split(':')[1] == "" ? "n/a" : customerInfo[2].split(':')[1]
      };
      objArr.push(obj);
    }
  }

  objArr.sort(function (a, b) {
    return a.cid < b.cid ? -1 : a.cid > b.cid ? 1 : 0;
  }).forEach(function (obj) {
    var row = document.createElement('tr');
    var mpid = document.createElement('td');
    mpid.innerText = obj.mpid;
    var cid = document.createElement('td');
    cid.innerText = obj.cid;
    var email = document.createElement('td');
    email.innerText = obj.email;
    var das = document.createElement('td');
    das.innerText = obj.das;
    row.appendChild(mpid);
    row.appendChild(cid);
    row.appendChild(email);
    row.appendChild(das);
    table.appendChild(row);
  });
};

function updateUserAudienceMembershipTable(user_profile) {
  var table = document.getElementById('user-audiences-body');
  table.innerHTML = "";
  var objArr = [];

  for (var i = 0; i < user_profile.audience_memberships.length; i++) {
    var row = document.createElement('tr');
    var audience_id = document.createElement('td');
    audience_id.innerText = user_profile.audience_memberships[i].audience_id;
    var audience_name = document.createElement('td');
    audience_name.innerText = user_profile.audience_memberships[i].audience_name;
    row.appendChild(audience_id);
    row.appendChild(audience_name);
    table.appendChild(row);
  }
}

var request_token = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var cache, url, data, options, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cache = {};
            url = 'https://demo.mp.com/oauth/token';
            data = {
              //'client_id': "ek5YNb8bmI4XnLz4wpnkVMEQyrfxAxlc",
              'client_id': "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE",
              //'client_secret': "9-LG8fYG9NwtzS58MGDbLZuhT4MkSx1Zf5V_l7C9qpz29GyJnfrLYfXT37GlFC1i",
              'client_secret': "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA",
              'audience': 'https://api.mparticle.com',
              'grant_type': 'client_credentials'
            };
            options = {
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data),
              mode: 'cors',
              method: "POST"
            };
            _context.next = 6;
            return fetch(url, options);

          case 6:
            response = _context.sent;
            _context.next = 9;
            return response.json();

          case 9:
            cache = _context.sent;
            localStorage.access_token = cache.access_token;
            localStorage.token_expiration = Date.now() + (cache.expires_in - 60) * 1000;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function request_token() {
    return _ref.apply(this, arguments);
  };
}();

var request_user_profile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(mpid) {
    var orgId, accountId, workspaceId, cache, url, options, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!localStorage.access_token || localStorage.access_token == "" || !localStorage.token_expiration || localStorage.token_expiration == "" || localStorage.token_expiration < Date.now())) {
              _context2.next = 3;
              break;
            }

            _context2.next = 3;
            return request_token();

          case 3:
            //console.log("Token: " + localStorage.access_token)
            orgId = "5000011";
            accountId = "167";
            workspaceId = "205";
            cache = {};
            url = "https://demo.mp.com/userprofile/v1/".concat(orgId, "/").concat(accountId, "/").concat(workspaceId, "/").concat(mpid, "?fields=user_identities,user_attributes,audience_memberships");
            options = {
              headers: new Headers({
                "Authorization": "Bearer ".concat(localStorage.access_token)
              }),
              method: "GET"
            };
            _context2.next = 11;
            return fetch(url, options);

          case 11:
            response = _context2.sent;
            _context2.next = 14;
            return response.json();

          case 14:
            cache = _context2.sent;
            _context2.next = 17;
            return cache;

          case 17:
            user_profile = _context2.sent;
            console.log("User Profile: " + JSON.stringify(user_profile));

            if (!user_profile.errors) {
              updateUserAudienceMembershipTable(user_profile);
              updateUserIdentities(mParticle.Identity.getCurrentUser());
            } else {
              resetUserIdentities(mParticle.Identity.getCurrentUser());
            }

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function request_user_profile(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function resetUserIdentities(user) {
  var table = document.getElementById('current-user');
  var table2 = document.getElementById('user-profile');
  table.children[0].children[0].children[1].innerText = user.getMPID();
  table.children[0].children[1].children[1].innerText = "";
  table.children[0].children[2].children[1].innerText = "";
  table.children[0].children[3].children[1].innerText = "";
  table2.children[0].children[1].children[0].innerText = "";
  table2.children[0].children[1].children[1].innerText = "";
  table2.children[0].children[1].children[2].innerText = "";
  table2.children[0].children[1].children[3].innerText = "";
  table2.children[0].children[1].children[4].innerText = "";
  table2.children[0].children[1].children[5].innerText = "";
  table2.children[0].children[3].children[0].innerText = "";
  table2.children[0].children[3].children[1].innerText = "";
  table2.children[0].children[3].children[2].innerText = "";
  table2.children[0].children[3].children[3].innerText = "";
  table2.children[0].children[3].children[4].innerText = "";
  table2.children[0].children[3].children[5].innerText = "";
  table2.children[0].children[5].children[0].innerText = "";
  table2.children[0].children[5].children[1].innerText = "";
  table2.children[0].children[5].children[2].innerText = "";
  table2.children[0].children[5].children[3].innerText = "";
  table2.children[0].children[5].children[4].innerText = "";
  table2.children[0].children[5].children[5].innerText = "";
  table2.children[0].children[7].children[0].innerText = "";
  table2.children[0].children[7].children[1].innerText = "";
  table2.children[0].children[7].children[2].innerText = "";
  table2.children[0].children[7].children[3].innerText = "";
  table2.children[0].children[7].children[4].innerText = "";
  table2.children[0].children[7].children[5].innerText = "";
}
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51275" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","cc-index.js"], null)
//# sourceMappingURL=/cc-index.js.map