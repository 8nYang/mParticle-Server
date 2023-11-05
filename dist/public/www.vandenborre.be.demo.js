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
})({"../../node_modules/@mparticle/web-sdk/dist/mparticle.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

if (typeof globalThis !== 'undefined') {
  globalThis.regeneratorRuntime = undefined;
} // Base64 encoder/decoder - http://www.webtoolkit.info/javascript_base64.html


var Base64$1 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  // Input must be a string
  encode: function (a) {
    try {
      if (window.btoa && window.atob) return window.btoa(unescape(encodeURIComponent(a)));
    } catch (a) {
      console.error("Error encoding cookie values into Base64:" + a);
    }

    return this._encode(a);
  },
  _encode: function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        j = "",
        k = 0;

    for (a = UTF8.encode(a); k < a.length;) b = a.charCodeAt(k++), c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = b >> 2, f = (3 & b) << 4 | c >> 4, g = (15 & c) << 2 | d >> 6, h = 63 & d, isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64), j = j + Base64$1._keyStr.charAt(e) + Base64$1._keyStr.charAt(f) + Base64$1._keyStr.charAt(g) + Base64$1._keyStr.charAt(h);

    return j;
  },
  decode: function (a) {
    try {
      if (window.btoa && window.atob) return decodeURIComponent(escape(window.atob(a)));
    } catch (a) {//log(e);
    }

    return Base64$1._decode(a);
  },
  _decode: function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        j = "",
        k = 0;

    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); k < a.length;) e = Base64$1._keyStr.indexOf(a.charAt(k++)), f = Base64$1._keyStr.indexOf(a.charAt(k++)), g = Base64$1._keyStr.indexOf(a.charAt(k++)), h = Base64$1._keyStr.indexOf(a.charAt(k++)), b = e << 2 | f >> 4, c = (15 & f) << 4 | g >> 2, d = (3 & g) << 6 | h, j += String.fromCharCode(b), 64 !== g && (j += String.fromCharCode(c)), 64 !== h && (j += String.fromCharCode(d));

    return j = UTF8.decode(j), j;
  }
},
    UTF8 = {
  encode: function (a) {
    for (var b, d = "", e = 0; e < a.length; e++) b = a.charCodeAt(e), 128 > b ? d += String.fromCharCode(b) : 127 < b && 2048 > b ? (d += String.fromCharCode(192 | b >> 6), d += String.fromCharCode(128 | 63 & b)) : (d += String.fromCharCode(224 | b >> 12), d += String.fromCharCode(128 | 63 & b >> 6), d += String.fromCharCode(128 | 63 & b));

    return d;
  },
  decode: function (a) {
    for (var b = "", d = 0, e = 0, f = 0, g = 0; d < a.length;) e = a.charCodeAt(d), 128 > e ? (b += String.fromCharCode(e), d++) : 191 < e && 224 > e ? (f = a.charCodeAt(d + 1), b += String.fromCharCode((31 & e) << 6 | 63 & f), d += 2) : (f = a.charCodeAt(d + 1), g = a.charCodeAt(d + 2), b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | 63 & g), d += 3);

    return b;
  }
};
var Polyfill = {
  // forEach polyfill
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.io/#x15.4.4.18
  forEach: function forEach(a, b) {
    var c, d;
    if (null == this) throw new TypeError(" this is null or not defined");
    var e = Object(this),
        f = e.length >>> 0;
    if ("function" != typeof a) throw new TypeError(a + " is not a function");

    for (1 < arguments.length && (c = b), d = 0; d < f;) {
      var g;
      d in e && (g = e[d], a.call(c, g, d, e)), d++;
    }
  },
  // map polyfill
  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  // Reference: http://es5.github.io/#x15.4.4.19
  map: function map(a, b) {
    var c, d, e;
    if (null === this) throw new TypeError(" this is null or not defined");
    var f = Object(this),
        g = f.length >>> 0;
    if ("function" != typeof a) throw new TypeError(a + " is not a function");

    for (1 < arguments.length && (c = b), d = Array(g), e = 0; e < g;) {
      var h, i;
      e in f && (h = f[e], i = a.call(c, h, e, f), d[e] = i), e++;
    }

    return d;
  },
  // filter polyfill
  // Prodcution steps of ECMA-262, Edition 5
  // Reference: http://es5.github.io/#x15.4.4.20
  filter: function filter(a
  /*, thisArg*/
  ) {
    if (void 0 === this || null === this) throw new TypeError();
    var b = Object(this),
        c = b.length >>> 0;
    if ("function" != typeof a) throw new TypeError();

    for (var d = [], e = 2 <= arguments.length ? arguments[1] : void 0, f = 0; f < c; f++) if (f in b) {
      var g = b[f];
      a.call(e, g, f, b) && d.push(g);
    }

    return d;
  },
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
  isArray: function isArray(a) {
    return "[object Array]" === Object.prototype.toString.call(a);
  },
  Base64: Base64$1
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);

  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _TriggerUploadType,
    MessageType$2 = {
  SessionStart: 1,
  SessionEnd: 2,
  PageView: 3,
  PageEvent: 4,
  CrashReport: 5,
  OptOut: 6,
  AppStateTransition: 10,
  Profile: 14,
  Commerce: 16,
  Media: 20,
  UserAttributeChange: 17,
  UserIdentityChange: 18
},
    TriggerUploadType = (_TriggerUploadType = {}, _defineProperty(_TriggerUploadType, MessageType$2.Commerce, 1), _defineProperty(_TriggerUploadType, MessageType$2.UserAttributeChange, 1), _defineProperty(_TriggerUploadType, MessageType$2.UserIdentityChange, 1), _TriggerUploadType),
    EventType = {
  Unknown: 0,
  Navigation: 1,
  Location: 2,
  Search: 3,
  Transaction: 4,
  UserContent: 5,
  UserPreference: 6,
  Social: 7,
  Other: 8,
  Media: 9,
  getName: function getName(a) {
    return a === EventType.Unknown ? "Unknown" : a === EventType.Navigation ? "Navigation" : a === EventType.Location ? "Location" : a === EventType.Search ? "Search" : a === EventType.Transaction ? "Transaction" : a === EventType.UserContent ? "User Content" : a === EventType.UserPreference ? "User Preference" : a === EventType.Social ? "Social" : a === CommerceEventType.ProductAddToCart ? "Product Added to Cart" : a === CommerceEventType.ProductAddToWishlist ? "Product Added to Wishlist" : a === CommerceEventType.ProductCheckout ? "Product Checkout" : a === CommerceEventType.ProductCheckoutOption ? "Product Checkout Options" : a === CommerceEventType.ProductClick ? "Product Click" : a === CommerceEventType.ProductImpression ? "Product Impression" : a === CommerceEventType.ProductPurchase ? "Product Purchased" : a === CommerceEventType.ProductRefund ? "Product Refunded" : a === CommerceEventType.ProductRemoveFromCart ? "Product Removed From Cart" : a === CommerceEventType.ProductRemoveFromWishlist ? "Product Removed from Wishlist" : a === CommerceEventType.ProductViewDetail ? "Product View Details" : a === CommerceEventType.PromotionClick ? "Promotion Click" : a === CommerceEventType.PromotionView ? "Promotion View" : "Other";
  }
},
    CommerceEventType = {
  ProductAddToCart: 10,
  ProductRemoveFromCart: 11,
  ProductCheckout: 12,
  ProductCheckoutOption: 13,
  ProductClick: 14,
  ProductViewDetail: 15,
  ProductPurchase: 16,
  ProductRefund: 17,
  PromotionView: 18,
  PromotionClick: 19,
  ProductAddToWishlist: 20,
  ProductRemoveFromWishlist: 21,
  ProductImpression: 22
},
    IdentityType$1 = {
  Other: 0,
  CustomerId: 1,
  Facebook: 2,
  Twitter: 3,
  Google: 4,
  Microsoft: 5,
  Yahoo: 6,
  Email: 7,
  FacebookCustomAudienceId: 9,
  Other2: 10,
  Other3: 11,
  Other4: 12,
  Other5: 13,
  Other6: 14,
  Other7: 15,
  Other8: 16,
  Other9: 17,
  Other10: 18,
  MobileNumber: 19,
  PhoneNumber2: 20,
  PhoneNumber3: 21
}; // Dictionary that contains MessageTypes that will
// trigger an immediate upload.
// Continuation of enum above, but in seperate object since we don't expose these to end user


IdentityType$1.isValid = function (a) {
  if ("number" == typeof a) for (var b in IdentityType$1) if (IdentityType$1.hasOwnProperty(b) && IdentityType$1[b] === a) return !0;
  return !1;
}, IdentityType$1.getName = function (a) {
  return a === window.mParticle.IdentityType.CustomerId ? "Customer ID" : a === window.mParticle.IdentityType.Facebook ? "Facebook ID" : a === window.mParticle.IdentityType.Twitter ? "Twitter ID" : a === window.mParticle.IdentityType.Google ? "Google ID" : a === window.mParticle.IdentityType.Microsoft ? "Microsoft ID" : a === window.mParticle.IdentityType.Yahoo ? "Yahoo ID" : a === window.mParticle.IdentityType.Email ? "Email" : a === window.mParticle.IdentityType.FacebookCustomAudienceId ? "Facebook App User ID" : "Other ID";
}, IdentityType$1.getIdentityType = function (a) {
  return "other" === a ? IdentityType$1.Other : "customerid" === a ? IdentityType$1.CustomerId : "facebook" === a ? IdentityType$1.Facebook : "twitter" === a ? IdentityType$1.Twitter : "google" === a ? IdentityType$1.Google : "microsoft" === a ? IdentityType$1.Microsoft : "yahoo" === a ? IdentityType$1.Yahoo : "email" === a ? IdentityType$1.Email : "facebookcustomaudienceid" === a ? IdentityType$1.FacebookCustomAudienceId : "other2" === a ? IdentityType$1.Other2 : "other3" === a ? IdentityType$1.Other3 : "other4" === a ? IdentityType$1.Other4 : "other5" === a ? IdentityType$1.Other5 : "other6" === a ? IdentityType$1.Other6 : "other7" === a ? IdentityType$1.Other7 : "other8" === a ? IdentityType$1.Other8 : "other9" === a ? IdentityType$1.Other9 : "other10" === a ? IdentityType$1.Other10 : "mobile_number" === a ? IdentityType$1.MobileNumber : "phone_number_2" === a ? IdentityType$1.PhoneNumber2 : !("phone_number_3" != a) && IdentityType$1.PhoneNumber3;
}, IdentityType$1.getIdentityName = function (a) {
  return a === IdentityType$1.Other ? "other" : a === IdentityType$1.CustomerId ? "customerid" : a === IdentityType$1.Facebook ? "facebook" : a === IdentityType$1.Twitter ? "twitter" : a === IdentityType$1.Google ? "google" : a === IdentityType$1.Microsoft ? "microsoft" : a === IdentityType$1.Yahoo ? "yahoo" : a === IdentityType$1.Email ? "email" : a === IdentityType$1.FacebookCustomAudienceId ? "facebookcustomaudienceid" : a === IdentityType$1.Other2 ? "other2" : a === IdentityType$1.Other3 ? "other3" : a === IdentityType$1.Other4 ? "other4" : a === IdentityType$1.Other5 ? "other5" : a === IdentityType$1.Other6 ? "other6" : a === IdentityType$1.Other7 ? "other7" : a === IdentityType$1.Other8 ? "other8" : a === IdentityType$1.Other9 ? "other9" : a === IdentityType$1.Other10 ? "other10" : a === IdentityType$1.MobileNumber ? "mobile_number" : a === IdentityType$1.PhoneNumber2 ? "phone_number_2" : a === IdentityType$1.PhoneNumber3 ? "phone_number_3" : void 0;
};
var ProductActionType = {
  Unknown: 0,
  AddToCart: 1,
  RemoveFromCart: 2,
  Checkout: 3,
  CheckoutOption: 4,
  Click: 5,
  ViewDetail: 6,
  Purchase: 7,
  Refund: 8,
  AddToWishlist: 9,
  RemoveFromWishlist: 10
};
ProductActionType.getName = function (a) {
  return a === ProductActionType.AddToCart ? "Add to Cart" : a === ProductActionType.RemoveFromCart ? "Remove from Cart" : a === ProductActionType.Checkout ? "Checkout" : a === ProductActionType.CheckoutOption ? "Checkout Option" : a === ProductActionType.Click ? "Click" : a === ProductActionType.ViewDetail ? "View Detail" : a === ProductActionType.Purchase ? "Purchase" : a === ProductActionType.Refund ? "Refund" : a === ProductActionType.AddToWishlist ? "Add to Wishlist" : a === ProductActionType.RemoveFromWishlist ? "Remove from Wishlist" : "Unknown";
}, ProductActionType.getExpansionName = function (a) {
  return a === ProductActionType.AddToCart ? "add_to_cart" : a === ProductActionType.RemoveFromCart ? "remove_from_cart" : a === ProductActionType.Checkout ? "checkout" : a === ProductActionType.CheckoutOption ? "checkout_option" : a === ProductActionType.Click ? "click" : a === ProductActionType.ViewDetail ? "view_detail" : a === ProductActionType.Purchase ? "purchase" : a === ProductActionType.Refund ? "refund" : a === ProductActionType.AddToWishlist ? "add_to_wishlist" : a === ProductActionType.RemoveFromWishlist ? "remove_from_wishlist" : "unknown";
};
var PromotionActionType = {
  Unknown: 0,
  PromotionView: 1,
  PromotionClick: 2
};
PromotionActionType.getName = function (a) {
  return a === PromotionActionType.PromotionView ? "view" : a === PromotionActionType.PromotionClick ? "click" : "unknown";
}, PromotionActionType.getExpansionName = function (a) {
  return a === PromotionActionType.PromotionView ? "view" : a === PromotionActionType.PromotionClick ? "click" : "unknown";
};
var ProfileMessageType = {
  Logout: 3
},
    ApplicationTransitionType$1 = {
  AppInit: 1
},
    Environment = {
  Production: "production",
  Development: "development"
};
var Types = {
  MessageType: MessageType$2,
  EventType: EventType,
  CommerceEventType: CommerceEventType,
  IdentityType: IdentityType$1,
  ProfileMessageType: ProfileMessageType,
  ApplicationTransitionType: ApplicationTransitionType$1,
  ProductActionType: ProductActionType,
  PromotionActionType: PromotionActionType,
  TriggerUploadType: TriggerUploadType,
  Environment: Environment
};
var version = "2.23.2";
var Constants = {
  sdkVersion: version,
  sdkVendor: "mparticle",
  platform: "web",
  Messages: {
    ErrorMessages: {
      NoToken: "A token must be specified.",
      EventNameInvalidType: "Event name must be a valid string value.",
      EventDataInvalidType: "Event data must be a valid object hash.",
      LoggingDisabled: "Event logging is currently disabled.",
      CookieParseError: "Could not parse cookie",
      EventEmpty: "Event object is null or undefined, cancelling send",
      APIRequestEmpty: "APIRequest is null or undefined, cancelling send",
      NoEventType: "Event type must be specified.",
      TransactionIdRequired: "Transaction ID is required",
      TransactionRequired: "A transaction attributes object is required",
      PromotionIdRequired: "Promotion ID is required",
      BadAttribute: "Attribute value cannot be object or array",
      BadKey: "Key value cannot be object or array",
      BadLogPurchase: "Transaction attributes and a product are both required to log a purchase, https://docs.mparticle.com/?javascript#measuring-transactions"
    },
    InformationMessages: {
      CookieSearch: "Searching for cookie",
      CookieFound: "Cookie found, parsing values",
      CookieNotFound: "Cookies not found",
      CookieSet: "Setting cookie",
      CookieSync: "Performing cookie sync",
      SendBegin: "Starting to send event",
      SendIdentityBegin: "Starting to send event to identity server",
      SendWindowsPhone: "Sending event to Windows Phone container",
      SendIOS: "Calling iOS path: ",
      SendAndroid: "Calling Android JS interface method: ",
      SendHttp: "Sending event to mParticle HTTP service",
      SendAliasHttp: "Sending alias request to mParticle HTTP service",
      SendIdentityHttp: "Sending event to mParticle HTTP service",
      StartingNewSession: "Starting new Session",
      StartingLogEvent: "Starting to log event",
      StartingLogOptOut: "Starting to log user opt in/out",
      StartingEndSession: "Starting to end session",
      StartingInitialization: "Starting to initialize",
      StartingLogCommerceEvent: "Starting to log commerce event",
      StartingAliasRequest: "Starting to Alias MPIDs",
      LoadingConfig: "Loading configuration options",
      AbandonLogEvent: "Cannot log event, logging disabled or developer token not set",
      AbandonAliasUsers: "Cannot Alias Users, logging disabled or developer token not set",
      AbandonStartSession: "Cannot start session, logging disabled or developer token not set",
      AbandonEndSession: "Cannot end session, logging disabled or developer token not set",
      NoSessionToEnd: "Cannot end session, no active session found"
    },
    ValidationMessages: {
      ModifyIdentityRequestUserIdentitiesPresent: "identityRequests to modify require userIdentities to be present. Request not sent to server. Please fix and try again",
      IdentityRequesetInvalidKey: "There is an invalid key on your identityRequest object. It can only contain a `userIdentities` object and a `onUserAlias` function. Request not sent to server. Please fix and try again.",
      OnUserAliasType: "The onUserAlias value must be a function.",
      UserIdentities: "The userIdentities key must be an object with keys of identityTypes and values of strings. Request not sent to server. Please fix and try again.",
      UserIdentitiesInvalidKey: "There is an invalid identity key on your `userIdentities` object within the identityRequest. Request not sent to server. Please fix and try again.",
      UserIdentitiesInvalidValues: "All user identity values must be strings or null. Request not sent to server. Please fix and try again.",
      AliasMissingMpid: "Alias Request must contain both a destinationMpid and a sourceMpid",
      AliasNonUniqueMpid: "Alias Request's destinationMpid and sourceMpid must be unique",
      AliasMissingTime: "Alias Request must have both a startTime and an endTime",
      AliasStartBeforeEndTime: "Alias Request's endTime must be later than its startTime"
    }
  },
  NativeSdkPaths: {
    LogEvent: "logEvent",
    SetUserTag: "setUserTag",
    RemoveUserTag: "removeUserTag",
    SetUserAttribute: "setUserAttribute",
    RemoveUserAttribute: "removeUserAttribute",
    SetSessionAttribute: "setSessionAttribute",
    AddToCart: "addToCart",
    RemoveFromCart: "removeFromCart",
    ClearCart: "clearCart",
    LogOut: "logOut",
    SetUserAttributeList: "setUserAttributeList",
    RemoveAllUserAttributes: "removeAllUserAttributes",
    GetUserAttributesLists: "getUserAttributesLists",
    GetAllUserAttributes: "getAllUserAttributes",
    Identify: "identify",
    Logout: "logout",
    Login: "login",
    Modify: "modify",
    Alias: "aliasUsers",
    Upload: "upload"
  },
  StorageNames: {
    localStorageName: "mprtcl-api",
    localStorageNameV3: "mprtcl-v3",
    cookieName: "mprtcl-api",
    cookieNameV2: "mprtcl-v2",
    cookieNameV3: "mprtcl-v3",
    localStorageNameV4: "mprtcl-v4",
    localStorageProductsV4: "mprtcl-prodv4",
    cookieNameV4: "mprtcl-v4",
    currentStorageName: "mprtcl-v4",
    currentStorageProductsName: "mprtcl-prodv4"
  },
  DefaultConfig: {
    cookieDomain: null,
    cookieExpiration: 365,
    logLevel: null,
    timeout: 300,
    sessionTimeout: 30,
    maxProducts: 20,
    forwarderStatsTimeout: 5e3,
    integrationDelayTimeout: 5e3,
    maxCookieSize: 3e3,
    aliasMaxWindow: 90,
    uploadInterval: 0 // Maximum milliseconds in between batch uploads, below 500 will mean immediate upload

  },
  DefaultUrls: {
    v1SecureServiceUrl: "jssdks.mparticle.com/v1/JS/",
    v2SecureServiceUrl: "jssdks.mparticle.com/v2/JS/",
    v3SecureServiceUrl: "jssdks.mparticle.com/v3/JS/",
    configUrl: "jssdkcdns.mparticle.com/JS/v2/",
    identityUrl: "identity.mparticle.com/v1/",
    aliasUrl: "jssdks.mparticle.com/v1/identity/"
  },
  Base64CookieKeys: {
    csm: 1,
    sa: 1,
    ss: 1,
    ua: 1,
    ui: 1,
    csd: 1,
    ia: 1,
    con: 1
  },
  SDKv2NonMPIDCookieKeys: {
    gs: 1,
    cu: 1,
    l: 1,
    globalSettings: 1,
    currentUserMPID: 1
  },
  HTTPCodes: {
    noHttpCoverage: -1,
    activeIdentityRequest: -2,
    activeSession: -3,
    validationIssue: -4,
    nativeIdentityRequest: -5,
    loggingDisabledOrMissingAPIKey: -6,
    tooManyRequests: 429
  },
  FeatureFlags: {
    ReportBatching: "reportBatching",
    EventBatchingIntervalMillis: "eventBatchingIntervalMillis",
    OfflineStorage: "offlineStorage"
  },
  DefaultInstance: "default_instance",
  CCPAPurpose: "data_sale_opt_out"
};
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var SDKProductActionType;

(function (a) {
  a[a.Unknown = 0] = "Unknown", a[a.AddToCart = 1] = "AddToCart", a[a.RemoveFromCart = 2] = "RemoveFromCart", a[a.Checkout = 3] = "Checkout", a[a.CheckoutOption = 4] = "CheckoutOption", a[a.Click = 5] = "Click", a[a.ViewDetail = 6] = "ViewDetail", a[a.Purchase = 7] = "Purchase", a[a.Refund = 8] = "Refund", a[a.AddToWishlist = 9] = "AddToWishlist", a[a.RemoveFromWishlist = 10] = "RemoveFromWishlist";
})(SDKProductActionType || (SDKProductActionType = {}));

var SDKIdentityTypeEnum;

(function (a) {
  a.other = "other", a.customerId = "customerid", a.facebook = "facebook", a.twitter = "twitter", a.google = "google", a.microsoft = "microsoft", a.yahoo = "yahoo", a.email = "email", a.alias = "alias", a.facebookCustomAudienceId = "facebookcustomaudienceid", a.otherId2 = "other2", a.otherId3 = "other3", a.otherId4 = "other4", a.otherId5 = "other5", a.otherId6 = "other6", a.otherId7 = "other7", a.otherId8 = "other8", a.otherId9 = "other9", a.otherId10 = "other10", a.mobileNumber = "mobile_number", a.phoneNumber2 = "phone_number_2", a.phoneNumber3 = "phone_number_3";
})(SDKIdentityTypeEnum || (SDKIdentityTypeEnum = {}));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dist = {};

(function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  (function (ApplicationInformationOsEnum) {
    ApplicationInformationOsEnum["unknown"] = "Unknown";
    ApplicationInformationOsEnum["iOS"] = "IOS";
    ApplicationInformationOsEnum["android"] = "Android";
    ApplicationInformationOsEnum["windowsPhone"] = "WindowsPhone";
    ApplicationInformationOsEnum["mobileWeb"] = "MobileWeb";
    ApplicationInformationOsEnum["unityIOS"] = "UnityIOS";
    ApplicationInformationOsEnum["unityAndroid"] = "UnityAndroid";
    ApplicationInformationOsEnum["desktop"] = "Desktop";
    ApplicationInformationOsEnum["tvOS"] = "TVOS";
    ApplicationInformationOsEnum["roku"] = "Roku";
    ApplicationInformationOsEnum["outOfBand"] = "OutOfBand";
    ApplicationInformationOsEnum["alexa"] = "Alexa";
    ApplicationInformationOsEnum["smartTV"] = "SmartTV";
    ApplicationInformationOsEnum["fireTV"] = "FireTV";
    ApplicationInformationOsEnum["xbox"] = "Xbox";
  })(exports.ApplicationInformationOsEnum || (exports.ApplicationInformationOsEnum = {}));

  (function (ApplicationStateTransitionEventEventTypeEnum) {
    ApplicationStateTransitionEventEventTypeEnum["applicationStateTransition"] = "application_state_transition";
  })(exports.ApplicationStateTransitionEventEventTypeEnum || (exports.ApplicationStateTransitionEventEventTypeEnum = {}));

  (function (ApplicationStateTransitionEventDataApplicationTransitionTypeEnum) {
    ApplicationStateTransitionEventDataApplicationTransitionTypeEnum["applicationInitialized"] = "application_initialized";
    ApplicationStateTransitionEventDataApplicationTransitionTypeEnum["applicationExit"] = "application_exit";
    ApplicationStateTransitionEventDataApplicationTransitionTypeEnum["applicationBackground"] = "application_background";
    ApplicationStateTransitionEventDataApplicationTransitionTypeEnum["applicationForeground"] = "application_foreground";
  })(exports.ApplicationStateTransitionEventDataApplicationTransitionTypeEnum || (exports.ApplicationStateTransitionEventDataApplicationTransitionTypeEnum = {}));

  (function (BatchEnvironmentEnum) {
    BatchEnvironmentEnum["unknown"] = "unknown";
    BatchEnvironmentEnum["development"] = "development";
    BatchEnvironmentEnum["production"] = "production";
  })(exports.BatchEnvironmentEnum || (exports.BatchEnvironmentEnum = {}));

  (function (BreadcrumbEventEventTypeEnum) {
    BreadcrumbEventEventTypeEnum["breadcrumb"] = "breadcrumb";
  })(exports.BreadcrumbEventEventTypeEnum || (exports.BreadcrumbEventEventTypeEnum = {}));

  (function (CommerceEventEventTypeEnum) {
    CommerceEventEventTypeEnum["commerceEvent"] = "commerce_event";
  })(exports.CommerceEventEventTypeEnum || (exports.CommerceEventEventTypeEnum = {}));

  (function (CommerceEventDataCustomEventTypeEnum) {
    CommerceEventDataCustomEventTypeEnum["addToCart"] = "add_to_cart";
    CommerceEventDataCustomEventTypeEnum["removeFromCart"] = "remove_from_cart";
    CommerceEventDataCustomEventTypeEnum["checkout"] = "checkout";
    CommerceEventDataCustomEventTypeEnum["checkoutOption"] = "checkout_option";
    CommerceEventDataCustomEventTypeEnum["click"] = "click";
    CommerceEventDataCustomEventTypeEnum["viewDetail"] = "view_detail";
    CommerceEventDataCustomEventTypeEnum["purchase"] = "purchase";
    CommerceEventDataCustomEventTypeEnum["refund"] = "refund";
    CommerceEventDataCustomEventTypeEnum["promotionView"] = "promotion_view";
    CommerceEventDataCustomEventTypeEnum["promotionClick"] = "promotion_click";
    CommerceEventDataCustomEventTypeEnum["addToWishlist"] = "add_to_wishlist";
    CommerceEventDataCustomEventTypeEnum["removeFromWishlist"] = "remove_from_wishlist";
    CommerceEventDataCustomEventTypeEnum["impression"] = "impression";
  })(exports.CommerceEventDataCustomEventTypeEnum || (exports.CommerceEventDataCustomEventTypeEnum = {}));

  (function (CrashReportEventEventTypeEnum) {
    CrashReportEventEventTypeEnum["crashReport"] = "crash_report";
  })(exports.CrashReportEventEventTypeEnum || (exports.CrashReportEventEventTypeEnum = {}));

  (function (CustomEventEventTypeEnum) {
    CustomEventEventTypeEnum["customEvent"] = "custom_event";
  })(exports.CustomEventEventTypeEnum || (exports.CustomEventEventTypeEnum = {}));

  (function (CustomEventDataCustomEventTypeEnum) {
    CustomEventDataCustomEventTypeEnum["navigation"] = "navigation";
    CustomEventDataCustomEventTypeEnum["location"] = "location";
    CustomEventDataCustomEventTypeEnum["search"] = "search";
    CustomEventDataCustomEventTypeEnum["transaction"] = "transaction";
    CustomEventDataCustomEventTypeEnum["userContent"] = "user_content";
    CustomEventDataCustomEventTypeEnum["userPreference"] = "user_preference";
    CustomEventDataCustomEventTypeEnum["social"] = "social";
    CustomEventDataCustomEventTypeEnum["media"] = "media";
    CustomEventDataCustomEventTypeEnum["other"] = "other";
    CustomEventDataCustomEventTypeEnum["unknown"] = "unknown";
  })(exports.CustomEventDataCustomEventTypeEnum || (exports.CustomEventDataCustomEventTypeEnum = {}));

  (function (DeviceCurrentStateDeviceOrientationEnum) {
    DeviceCurrentStateDeviceOrientationEnum["portrait"] = "portrait";
    DeviceCurrentStateDeviceOrientationEnum["portraitUpsideDown"] = "portrait_upside_down";
    DeviceCurrentStateDeviceOrientationEnum["landscape"] = "landscape";
    DeviceCurrentStateDeviceOrientationEnum["landscapeLeft"] = "LandscapeLeft";
    DeviceCurrentStateDeviceOrientationEnum["landscapeRight"] = "LandscapeRight";
    DeviceCurrentStateDeviceOrientationEnum["faceUp"] = "FaceUp";
    DeviceCurrentStateDeviceOrientationEnum["faceDown"] = "FaceDown";
    DeviceCurrentStateDeviceOrientationEnum["square"] = "Square";
  })(exports.DeviceCurrentStateDeviceOrientationEnum || (exports.DeviceCurrentStateDeviceOrientationEnum = {}));

  (function (DeviceCurrentStateStatusBarOrientationEnum) {
    DeviceCurrentStateStatusBarOrientationEnum["portrait"] = "portrait";
    DeviceCurrentStateStatusBarOrientationEnum["portraitUpsideDown"] = "portrait_upside_down";
    DeviceCurrentStateStatusBarOrientationEnum["landscape"] = "landscape";
    DeviceCurrentStateStatusBarOrientationEnum["landscapeLeft"] = "LandscapeLeft";
    DeviceCurrentStateStatusBarOrientationEnum["landscapeRight"] = "LandscapeRight";
    DeviceCurrentStateStatusBarOrientationEnum["faceUp"] = "FaceUp";
    DeviceCurrentStateStatusBarOrientationEnum["faceDown"] = "FaceDown";
    DeviceCurrentStateStatusBarOrientationEnum["square"] = "Square";
  })(exports.DeviceCurrentStateStatusBarOrientationEnum || (exports.DeviceCurrentStateStatusBarOrientationEnum = {}));

  (function (DeviceInformationPlatformEnum) {
    DeviceInformationPlatformEnum["iOS"] = "iOS";
    DeviceInformationPlatformEnum["android"] = "Android";
    DeviceInformationPlatformEnum["web"] = "web";
    DeviceInformationPlatformEnum["desktop"] = "desktop";
    DeviceInformationPlatformEnum["tvOS"] = "tvOS";
    DeviceInformationPlatformEnum["roku"] = "roku";
    DeviceInformationPlatformEnum["outOfBand"] = "out_of_band";
    DeviceInformationPlatformEnum["smartTV"] = "smart_tv";
    DeviceInformationPlatformEnum["xbox"] = "xbox";
  })(exports.DeviceInformationPlatformEnum || (exports.DeviceInformationPlatformEnum = {}));

  (function (EventTypeEnum) {
    EventTypeEnum["unknown"] = "unknown";
    EventTypeEnum["sessionStart"] = "session_start";
    EventTypeEnum["sessionEnd"] = "session_end";
    EventTypeEnum["screenView"] = "screen_view";
    EventTypeEnum["customEvent"] = "custom_event";
    EventTypeEnum["crashReport"] = "crash_report";
    EventTypeEnum["optOut"] = "opt_out";
    EventTypeEnum["firstRun"] = "first_run";
    EventTypeEnum["preAttribution"] = "pre_attribution";
    EventTypeEnum["pushRegistration"] = "push_registration";
    EventTypeEnum["applicationStateTransition"] = "application_state_transition";
    EventTypeEnum["pushMessage"] = "push_message";
    EventTypeEnum["networkPerformance"] = "network_performance";
    EventTypeEnum["breadcrumb"] = "breadcrumb";
    EventTypeEnum["profile"] = "profile";
    EventTypeEnum["pushReaction"] = "push_reaction";
    EventTypeEnum["commerceEvent"] = "commerce_event";
    EventTypeEnum["userAttributeChange"] = "user_attribute_change";
    EventTypeEnum["userIdentityChange"] = "user_identity_change";
    EventTypeEnum["uninstall"] = "uninstall";
    EventTypeEnum["validationResult"] = "validation_result";
  })(exports.EventTypeEnum || (exports.EventTypeEnum = {}));

  (function (IdentityTypeEnum) {
    IdentityTypeEnum["other"] = "other";
    IdentityTypeEnum["customerId"] = "customer_id";
    IdentityTypeEnum["facebook"] = "facebook";
    IdentityTypeEnum["twitter"] = "twitter";
    IdentityTypeEnum["google"] = "google";
    IdentityTypeEnum["microsoft"] = "microsoft";
    IdentityTypeEnum["yahoo"] = "yahoo";
    IdentityTypeEnum["email"] = "email";
    IdentityTypeEnum["alias"] = "alias";
    IdentityTypeEnum["facebookCustomAudienceId"] = "facebook_custom_audience_id";
    IdentityTypeEnum["otherId2"] = "other_id_2";
    IdentityTypeEnum["otherId3"] = "other_id_3";
    IdentityTypeEnum["otherId4"] = "other_id_4";
    IdentityTypeEnum["otherId5"] = "other_id_5";
    IdentityTypeEnum["otherId6"] = "other_id_6";
    IdentityTypeEnum["otherId7"] = "other_id_7";
    IdentityTypeEnum["otherId8"] = "other_id_8";
    IdentityTypeEnum["otherId9"] = "other_id_9";
    IdentityTypeEnum["otherId10"] = "other_id_10";
    IdentityTypeEnum["mobileNumber"] = "mobile_number";
    IdentityTypeEnum["phoneNumber2"] = "phone_number_2";
    IdentityTypeEnum["phoneNumber3"] = "phone_number_3";
  })(exports.IdentityTypeEnum || (exports.IdentityTypeEnum = {}));

  (function (NetworkPerformanceEventEventTypeEnum) {
    NetworkPerformanceEventEventTypeEnum["networkPerformance"] = "network_performance";
  })(exports.NetworkPerformanceEventEventTypeEnum || (exports.NetworkPerformanceEventEventTypeEnum = {}));

  (function (OptOutEventEnum) {
    OptOutEventEnum["optOut"] = "opt_out";
  })(exports.OptOutEventEnum || (exports.OptOutEventEnum = {}));

  (function (ProductActionActionEnum) {
    ProductActionActionEnum["unknown"] = "unknown";
    ProductActionActionEnum["addToCart"] = "add_to_cart";
    ProductActionActionEnum["removeFromCart"] = "remove_from_cart";
    ProductActionActionEnum["checkout"] = "checkout";
    ProductActionActionEnum["checkoutOption"] = "checkout_option";
    ProductActionActionEnum["click"] = "click";
    ProductActionActionEnum["viewDetail"] = "view_detail";
    ProductActionActionEnum["purchase"] = "purchase";
    ProductActionActionEnum["refund"] = "refund";
    ProductActionActionEnum["addToWishlist"] = "add_to_wishlist";
    ProductActionActionEnum["removeFromWishlist"] = "remove_from_wish_list";
  })(exports.ProductActionActionEnum || (exports.ProductActionActionEnum = {}));

  (function (ProfileEventEventTypeEnum) {
    ProfileEventEventTypeEnum["profile"] = "profile";
  })(exports.ProfileEventEventTypeEnum || (exports.ProfileEventEventTypeEnum = {}));

  (function (ProfileEventDataProfileEventTypeEnum) {
    ProfileEventDataProfileEventTypeEnum["signup"] = "signup";
    ProfileEventDataProfileEventTypeEnum["login"] = "login";
    ProfileEventDataProfileEventTypeEnum["logout"] = "logout";
    ProfileEventDataProfileEventTypeEnum["update"] = "update";
    ProfileEventDataProfileEventTypeEnum["delete"] = "delete";
  })(exports.ProfileEventDataProfileEventTypeEnum || (exports.ProfileEventDataProfileEventTypeEnum = {}));

  (function (PromotionActionActionEnum) {
    PromotionActionActionEnum["view"] = "view";
    PromotionActionActionEnum["click"] = "click";
  })(exports.PromotionActionActionEnum || (exports.PromotionActionActionEnum = {}));

  (function (PushMessageEventEventTypeEnum) {
    PushMessageEventEventTypeEnum["pushMessage"] = "push_message";
  })(exports.PushMessageEventEventTypeEnum || (exports.PushMessageEventEventTypeEnum = {}));

  (function (PushMessageEventDataPushMessageTypeEnum) {
    PushMessageEventDataPushMessageTypeEnum["sent"] = "sent";
    PushMessageEventDataPushMessageTypeEnum["received"] = "received";
    PushMessageEventDataPushMessageTypeEnum["action"] = "action";
  })(exports.PushMessageEventDataPushMessageTypeEnum || (exports.PushMessageEventDataPushMessageTypeEnum = {}));

  (function (PushMessageEventDataApplicationStateEnum) {
    PushMessageEventDataApplicationStateEnum["notRunning"] = "not_running";
    PushMessageEventDataApplicationStateEnum["background"] = "background";
    PushMessageEventDataApplicationStateEnum["foreground"] = "foreground";
  })(exports.PushMessageEventDataApplicationStateEnum || (exports.PushMessageEventDataApplicationStateEnum = {}));

  (function (PushMessageEventDataPushMessageBehaviorEnum) {
    PushMessageEventDataPushMessageBehaviorEnum["received"] = "Received";
    PushMessageEventDataPushMessageBehaviorEnum["directOpen"] = "DirectOpen";
    PushMessageEventDataPushMessageBehaviorEnum["read"] = "Read";
    PushMessageEventDataPushMessageBehaviorEnum["influencedOpen"] = "InfluencedOpen";
    PushMessageEventDataPushMessageBehaviorEnum["displayed"] = "Displayed";
  })(exports.PushMessageEventDataPushMessageBehaviorEnum || (exports.PushMessageEventDataPushMessageBehaviorEnum = {}));

  (function (PushRegistrationEventEventTypeEnum) {
    PushRegistrationEventEventTypeEnum["pushRegistration"] = "push_registration";
  })(exports.PushRegistrationEventEventTypeEnum || (exports.PushRegistrationEventEventTypeEnum = {}));

  (function (SessionEndEventEventTypeEnum) {
    SessionEndEventEventTypeEnum["sessionEnd"] = "session_end";
  })(exports.SessionEndEventEventTypeEnum || (exports.SessionEndEventEventTypeEnum = {}));

  (function (SessionStartEventEventTypeEnum) {
    SessionStartEventEventTypeEnum["sessionStart"] = "session_start";
  })(exports.SessionStartEventEventTypeEnum || (exports.SessionStartEventEventTypeEnum = {}));

  (function (SourceInformationChannelEnum) {
    SourceInformationChannelEnum["native"] = "native";
    SourceInformationChannelEnum["javascript"] = "javascript";
    SourceInformationChannelEnum["pixel"] = "pixel";
    SourceInformationChannelEnum["desktop"] = "desktop";
    SourceInformationChannelEnum["partner"] = "partner";
    SourceInformationChannelEnum["serverToServer"] = "server_to_server";
  })(exports.SourceInformationChannelEnum || (exports.SourceInformationChannelEnum = {}));

  (function (UserAttributeChangeEventEventTypeEnum) {
    UserAttributeChangeEventEventTypeEnum["userAttributeChange"] = "user_attribute_change";
  })(exports.UserAttributeChangeEventEventTypeEnum || (exports.UserAttributeChangeEventEventTypeEnum = {}));

  (function (UserIdentityChangeEventEventTypeEnum) {
    UserIdentityChangeEventEventTypeEnum["userIdentityChange"] = "user_identity_change";
  })(exports.UserIdentityChangeEventEventTypeEnum || (exports.UserIdentityChangeEventEventTypeEnum = {}));
})(dist);

var slugify$1 = {
  exports: {}
};
slugify$1.exports;

(function (module, exports) {
  (function (name, root, factory) {
    {
      module.exports = factory();
      module.exports['default'] = factory();
    }
  })('slugify', commonjsGlobal, function () {
    var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\\"","”":"\\\"","„":"\\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}');
    var locales = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');

    function replace(string, options) {
      if (typeof string !== 'string') {
        throw new Error('slugify: string argument expected');
      }

      options = typeof options === 'string' ? {
        replacement: options
      } : options || {};
      var locale = locales[options.locale] || {};
      var replacement = options.replacement === undefined ? '-' : options.replacement;
      var trim = options.trim === undefined ? true : options.trim;
      var slug = string.normalize().split('') // replace characters based on charMap
      .reduce(function (result, ch) {
        var appendChar = locale[ch];
        if (appendChar === undefined) appendChar = charMap[ch];
        if (appendChar === undefined) appendChar = ch;
        if (appendChar === replacement) appendChar = ' ';
        return result + appendChar // remove not allowed characters
        .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '');
      }, '');

      if (options.strict) {
        slug = slug.replace(/[^A-Za-z0-9\s]/g, '');
      }

      if (trim) {
        slug = slug.trim();
      } // Replace spaces with replacement character, treating multiple consecutive
      // spaces as a single space.


      slug = slug.replace(/\s+/g, replacement);

      if (options.lower) {
        slug = slug.toLowerCase();
      }

      return slug;
    }

    replace.extend = function (customMap) {
      Object.assign(charMap, customMap);
    };

    return replace;
  });
})(slugify$1, slugify$1.exports);

var slugifyExports = slugify$1.exports;
var slugify = /*@__PURE__*/getDefaultExportFromCjs(slugifyExports);

var createCookieString = function (a) {
  return replaceCommasWithPipes(replaceQuotesWithApostrophes(a));
},
    revertCookieString = function (a) {
  return replacePipesWithCommas(replaceApostrophesWithQuotes(a));
},
    inArray = function (a, b) {
  var c = 0;
  if (Array.prototype.indexOf) return 0 <= a.indexOf(b, 0);

  for (var d = a.length; c < d; c++) if (c in a && a[c] === b) return !0;

  return !1;
},
    findKeyInObject = function (a, b) {
  if (b && a) for (var c in a) if (a.hasOwnProperty(c) && c.toLowerCase() === b.toLowerCase()) return c;
  return null;
};

function generateHash(a) {
  var b,
      c = 0;
  if (void 0 === a || null === a) return 0;
  if (a = a.toString().toLowerCase(), Array.prototype.reduce) return a.split("").reduce(function (c, d) {
    return c = (c << 5) - c + d.charCodeAt(0), c & c;
  }, 0);
  if (0 === a.length) return c;

  for (var d = 0; d < a.length; d++) b = a.charCodeAt(d), c = (c << 5) - c + b, c &= c;

  return c;
}

var generateRandomValue = function () {
  var b, c;
  return window.crypto && window.crypto.getRandomValues && (b = window.crypto.getRandomValues(new Uint8Array(1))), b ? (c ^ b[0] % 16 >> c / 4).toString(16) : (c ^ 16 * Math.random() >> c / 4).toString(16);
},
    generateUniqueId = function (b) {
  return void 0 === b && (b = ""), b // if the placeholder was passed, return
  ? generateRandomValue() // if the placeholder was passed, return
  : // [1e7] -> // 10000000 +
  // -1e3  -> // -1000 +
  // -4e3  -> // -4000 +
  // -8e3  -> // -80000000 +
  // -1e11 -> //-100000000000,
  "".concat(1e7, "-").concat(1e3, "-").concat(4e3, "-").concat(8e3, "-").concat(1e11).replace(/[018]/g, // zeroes, ones, and eights with
  generateUniqueId // random hex digits
  );
},
    getRampNumber = function (a) {
  if (!a) return 100;
  var b = generateHash(a);
  return Math.abs(b % 100) + 1;
},
    isObject = function (a) {
  var b = Object.prototype.toString.call(a);
  return "[object Object]" === b || "[object Error]" === b;
},
    parseNumber = function (a) {
  if (isNaN(a) || !isFinite(a)) return 0;
  var b = parseFloat(a);
  return isNaN(b) ? 0 : b;
},
    parseStringOrNumber = function (a) {
  return isStringOrNumber(a) ? a : null;
},
    replaceCommasWithPipes = function (a) {
  return a.replace(/,/g, "|");
},
    replacePipesWithCommas = function (a) {
  return a.replace(/\|/g, ",");
},
    replaceApostrophesWithQuotes = function (a) {
  return a.replace(/\'/g, "\"");
},
    replaceQuotesWithApostrophes = function (a) {
  return a.replace(/\"/g, "'");
},
    returnConvertedBoolean = function (a) {
  return "false" !== a && "0" !== a && !!a;
},
    decoded = function (a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
},
    converted = function (a) {
  return 0 === a.indexOf("\"") && (a = a.slice(1, -1).replace(/\\"/g, "\"").replace(/\\\\/g, "\\")), a;
},
    isString = function (a) {
  return "string" == typeof a;
},
    isNumber = function (a) {
  return "number" == typeof a;
},
    isFunction = function (a) {
  return "function" == typeof a;
},
    isDataPlanSlug = function (a) {
  return isString(a) && a === slugify(a);
},
    isStringOrNumber = function (a) {
  return isString(a) || isNumber(a);
},
    isEmpty = function (a) {
  return null == a || !(Object.keys(a) || a).length;
};
/**
* Returns a value between 1-100 inclusive.
*/
// FIXME: REFACTOR for V3


function convertEvents(a, b, c) {
  if (!a) return null;
  if (!b || 1 > b.length) return null;

  for (var d, e = c.Identity.getCurrentUser(), f = [], g = null, h = 0, i = b; h < i.length; h++) if (d = i[h], d) {
    g = d;
    var j = convertEvent(d);
    j && f.push(j);
  }

  if (!g) return null;
  var k = null; // Add the consent state from either the Last Event or the user

  isEmpty(g.ConsentState) ? !isEmpty(e) && (k = e.getConsentState()) : k = g.ConsentState;
  var l = {
    source_request_id: c._Helpers.generateUniqueId(),
    mpid: a,
    timestamp_unixtime_ms: new Date().getTime(),
    environment: g.Debug ? dist.BatchEnvironmentEnum.development : dist.BatchEnvironmentEnum.production,
    events: f,
    mp_deviceid: g.DeviceId,
    sdk_version: g.SDKVersion,
    // TODO: Refactor this to read from _Store or a global config
    application_info: {
      application_version: g.AppVersion,
      application_name: g.AppName,
      package: g.Package,
      sideloaded_kits_count: c._Store.sideloadedKitsCount
    },
    device_info: {
      platform: dist.DeviceInformationPlatformEnum.web,
      screen_width: window.screen.width,
      screen_height: window.screen.height
    },
    user_attributes: g.UserAttributes,
    user_identities: convertUserIdentities(g.UserIdentities),
    consent_state: convertConsentState(k),
    integration_attributes: g.IntegrationAttributes
  };
  return g.DataPlan && g.DataPlan.PlanId && (l.context = {
    data_plan: {
      plan_id: g.DataPlan.PlanId,
      plan_version: g.DataPlan.PlanVersion || void 0
    }
  }), l;
}

function convertConsentState(a) {
  if (isEmpty(a)) return null;
  var b = {
    gdpr: convertGdprConsentState(a.getGDPRConsentState()),
    ccpa: convertCcpaConsentState(a.getCCPAConsentState())
  };
  return b;
}

function convertGdprConsentState(a) {
  if (!a) return null;
  var b = {};

  for (var c in a) a.hasOwnProperty(c) && (b[c] = {
    consented: a[c].Consented,
    hardware_id: a[c].HardwareId,
    document: a[c].ConsentDocument,
    timestamp_unixtime_ms: a[c].Timestamp,
    location: a[c].Location
  });

  return b;
}

function convertCcpaConsentState(a) {
  if (!a) return null;
  var b = {
    data_sale_opt_out: {
      consented: a.Consented,
      hardware_id: a.HardwareId,
      document: a.ConsentDocument,
      timestamp_unixtime_ms: a.Timestamp,
      location: a.Location
    }
  };
  return b;
}

function convertUserIdentities(a) {
  if (!a || !a.length) return null;

  for (var b, c = {}, d = 0, e = a; d < e.length; d++) switch (b = e[d], b.Type) {
    case Types.IdentityType.CustomerId:
      c.customer_id = b.Identity;
      break;

    case Types.IdentityType.Email:
      c.email = b.Identity;
      break;

    case Types.IdentityType.Facebook:
      c.facebook = b.Identity;
      break;

    case Types.IdentityType.FacebookCustomAudienceId:
      c.facebook_custom_audience_id = b.Identity;
      break;

    case Types.IdentityType.Google:
      c.google = b.Identity;
      break;

    case Types.IdentityType.Microsoft:
      c.microsoft = b.Identity;
      break;

    case Types.IdentityType.Other:
      c.other = b.Identity;
      break;

    case Types.IdentityType.Other2:
      c.other_id_2 = b.Identity;
      break;

    case Types.IdentityType.Other3:
      c.other_id_3 = b.Identity;
      break;

    case Types.IdentityType.Other4:
      c.other_id_4 = b.Identity;
      break;

    case Types.IdentityType.Other5:
      c.other_id_5 = b.Identity;
      break;

    case Types.IdentityType.Other6:
      c.other_id_6 = b.Identity;
      break;

    case Types.IdentityType.Other7:
      c.other_id_7 = b.Identity;
      break;

    case Types.IdentityType.Other8:
      c.other_id_8 = b.Identity;
      break;

    case Types.IdentityType.Other9:
      c.other_id_9 = b.Identity;
      break;

    case Types.IdentityType.Other10:
      c.other_id_10 = b.Identity;
      break;

    case Types.IdentityType.MobileNumber:
      c.mobile_number = b.Identity;
      break;

    case Types.IdentityType.PhoneNumber2:
      c.phone_number_2 = b.Identity;
      break;

    case Types.IdentityType.PhoneNumber3:
      c.phone_number_3 = b.Identity;
      break;
  }

  return c;
}

function convertEvent(a) {
  if (!a) return null;

  switch (a.EventDataType) {
    case Types.MessageType.AppStateTransition:
      return convertAST(a);

    case Types.MessageType.Commerce:
      return convertCommerceEvent(a);

    case Types.MessageType.CrashReport:
      return convertCrashReportEvent(a);

    case Types.MessageType.OptOut:
      return convertOptOutEvent(a);

    case Types.MessageType.PageEvent:
      // Note: Media Events are also sent as PageEvents/CustomEvents
      return convertCustomEvent(a);

    case Types.MessageType.PageView:
      return convertPageViewEvent(a);

    case Types.MessageType.Profile:
      //deprecated and not supported by the web SDK
      return null;

    case Types.MessageType.SessionEnd:
      return convertSessionEndEvent(a);

    case Types.MessageType.SessionStart:
      return convertSessionStartEvent(a);

    case Types.MessageType.UserAttributeChange:
      return convertUserAttributeChangeEvent(a);

    case Types.MessageType.UserIdentityChange:
      return convertUserIdentityChangeEvent(a);
  }

  return null;
}

function convertProductActionType(a) {
  if (!a) return dist.ProductActionActionEnum.unknown;
  return a === SDKProductActionType.AddToCart ? dist.ProductActionActionEnum.addToCart : a === SDKProductActionType.AddToWishlist ? dist.ProductActionActionEnum.addToWishlist : a === SDKProductActionType.Checkout ? dist.ProductActionActionEnum.checkout : a === SDKProductActionType.CheckoutOption ? dist.ProductActionActionEnum.checkoutOption : a === SDKProductActionType.Click ? dist.ProductActionActionEnum.click : a === SDKProductActionType.Purchase ? dist.ProductActionActionEnum.purchase : a === SDKProductActionType.Refund ? dist.ProductActionActionEnum.refund : a === SDKProductActionType.RemoveFromCart ? dist.ProductActionActionEnum.removeFromCart : a === SDKProductActionType.RemoveFromWishlist ? dist.ProductActionActionEnum.removeFromWishlist : a === SDKProductActionType.ViewDetail ? dist.ProductActionActionEnum.viewDetail : dist.ProductActionActionEnum.unknown;
}

function convertProductAction(a) {
  if (!a.ProductAction) return null;
  var b = {
    action: convertProductActionType(a.ProductAction.ProductActionType),
    checkout_step: a.ProductAction.CheckoutStep,
    checkout_options: a.ProductAction.CheckoutOptions,
    transaction_id: a.ProductAction.TransactionId,
    affiliation: a.ProductAction.Affiliation,
    total_amount: a.ProductAction.TotalAmount,
    tax_amount: a.ProductAction.TaxAmount,
    shipping_amount: a.ProductAction.ShippingAmount,
    coupon_code: a.ProductAction.CouponCode,
    products: convertProducts(a.ProductAction.ProductList)
  };
  return b;
}

function convertProducts(a) {
  if (!a || !a.length) return null;

  for (var b = [], c = 0, d = a; c < d.length; c++) {
    var e = d[c],
        f = {
      id: e.Sku,
      name: e.Name,
      brand: e.Brand,
      category: e.Category,
      variant: e.Variant,
      total_product_amount: e.TotalAmount,
      position: e.Position,
      price: e.Price,
      quantity: e.Quantity,
      coupon_code: e.CouponCode,
      custom_attributes: e.Attributes
    };
    b.push(f);
  }

  return b;
}

function convertPromotionAction(a) {
  if (!a.PromotionAction) return null;
  var b = {
    action: a.PromotionAction.PromotionActionType,
    promotions: convertPromotions(a.PromotionAction.PromotionList)
  };
  return b;
}

function convertPromotions(a) {
  if (!a || !a.length) return null;

  for (var b = [], c = 0, d = a; c < d.length; c++) {
    var e = d[c],
        f = {
      id: e.Id,
      name: e.Name,
      creative: e.Creative,
      position: e.Position
    };
    b.push(f);
  }

  return b;
}

function convertImpressions(a) {
  if (!a.ProductImpressions) return null;

  for (var b = [], c = 0, d = a.ProductImpressions; c < d.length; c++) {
    var e = d[c],
        f = {
      product_impression_list: e.ProductImpressionList,
      products: convertProducts(e.ProductList)
    };
    b.push(f);
  }

  return b;
}

function convertShoppingCart(a) {
  if (!a.ShoppingCart || !a.ShoppingCart.ProductList || !a.ShoppingCart.ProductList.length) return null;
  var b = {
    products: convertProducts(a.ShoppingCart.ProductList)
  };
  return b;
}

function convertCommerceEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    custom_flags: a.CustomFlags,
    product_action: convertProductAction(a),
    promotion_action: convertPromotionAction(a),
    product_impressions: convertImpressions(a),
    shopping_cart: convertShoppingCart(a),
    currency_code: a.CurrencyCode
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.commerceEvent,
    data: c
  };
}

function convertCrashReportEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    message: a.EventName
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.crashReport,
    data: c
  };
}

function convertAST(a) {
  var b = convertBaseEventData(a),
      c = {
    application_transition_type: dist.ApplicationStateTransitionEventDataApplicationTransitionTypeEnum.applicationInitialized,
    is_first_run: a.IsFirstRun,
    is_upgrade: !1,
    launch_referral: a.LaunchReferral
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.applicationStateTransition,
    data: c
  };
}

function convertSessionEndEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    session_duration_ms: a.SessionLength //note: External Events DTO does not support the session mpids array as of this time.
    //spanning_mpids: sdkEvent.SessionMpids

  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.sessionEnd,
    data: c
  };
}

function convertSessionStartEvent(a) {
  var b = convertBaseEventData(a),
      c = {};
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.sessionStart,
    data: c
  };
}

function convertPageViewEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    custom_flags: a.CustomFlags,
    screen_name: a.EventName
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.screenView,
    data: c
  };
}

function convertOptOutEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    is_opted_out: a.OptOut
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.optOut,
    data: c
  };
}

function convertCustomEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    custom_event_type: convertSdkEventType(a.EventCategory),
    custom_flags: a.CustomFlags,
    event_name: a.EventName
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.customEvent,
    data: c
  };
}

function convertSdkEventType(a) {
  return a === Types.EventType.Other ? dist.CustomEventDataCustomEventTypeEnum.other : a === Types.EventType.Location ? dist.CustomEventDataCustomEventTypeEnum.location : a === Types.EventType.Navigation ? dist.CustomEventDataCustomEventTypeEnum.navigation : a === Types.EventType.Search ? dist.CustomEventDataCustomEventTypeEnum.search : a === Types.EventType.Social ? dist.CustomEventDataCustomEventTypeEnum.social : a === Types.EventType.Transaction ? dist.CustomEventDataCustomEventTypeEnum.transaction : a === Types.EventType.UserContent ? dist.CustomEventDataCustomEventTypeEnum.userContent : a === Types.EventType.UserPreference ? dist.CustomEventDataCustomEventTypeEnum.userPreference : a === Types.EventType.Media ? dist.CustomEventDataCustomEventTypeEnum.media : a === Types.CommerceEventType.ProductAddToCart ? dist.CommerceEventDataCustomEventTypeEnum.addToCart : a === Types.CommerceEventType.ProductAddToWishlist ? dist.CommerceEventDataCustomEventTypeEnum.addToWishlist : a === Types.CommerceEventType.ProductCheckout ? dist.CommerceEventDataCustomEventTypeEnum.checkout : a === Types.CommerceEventType.ProductCheckoutOption ? dist.CommerceEventDataCustomEventTypeEnum.checkoutOption : a === Types.CommerceEventType.ProductClick ? dist.CommerceEventDataCustomEventTypeEnum.click : a === Types.CommerceEventType.ProductImpression ? dist.CommerceEventDataCustomEventTypeEnum.impression : a === Types.CommerceEventType.ProductPurchase ? dist.CommerceEventDataCustomEventTypeEnum.purchase : a === Types.CommerceEventType.ProductRefund ? dist.CommerceEventDataCustomEventTypeEnum.refund : a === Types.CommerceEventType.ProductRemoveFromCart ? dist.CommerceEventDataCustomEventTypeEnum.removeFromCart : a === Types.CommerceEventType.ProductRemoveFromWishlist ? dist.CommerceEventDataCustomEventTypeEnum.removeFromWishlist : a === Types.CommerceEventType.ProductViewDetail ? dist.CommerceEventDataCustomEventTypeEnum.viewDetail : a === Types.CommerceEventType.PromotionClick ? dist.CommerceEventDataCustomEventTypeEnum.promotionClick : a === Types.CommerceEventType.PromotionView ? dist.CommerceEventDataCustomEventTypeEnum.promotionView : dist.CustomEventDataCustomEventTypeEnum.unknown;
}

function convertBaseEventData(a) {
  var b = {
    timestamp_unixtime_ms: a.Timestamp,
    session_uuid: a.SessionId,
    session_start_unixtime_ms: a.SessionStartDate,
    custom_attributes: a.EventAttributes,
    location: convertSDKLocation(a.Location),
    source_message_id: a.SourceMessageId
  };
  return b;
}

function convertSDKLocation(a) {
  return a && Object.keys(a).length ? {
    latitude: a.lat,
    longitude: a.lng
  } : null;
}

function convertUserAttributeChangeEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    user_attribute_name: a.UserAttributeChanges.UserAttributeName,
    new: a.UserAttributeChanges.New,
    old: a.UserAttributeChanges.Old,
    deleted: a.UserAttributeChanges.Deleted,
    is_new_attribute: a.UserAttributeChanges.IsNewAttribute
  };
  return c = __assign(__assign({}, c), b), {
    event_type: dist.EventTypeEnum.userAttributeChange,
    data: c
  };
}

function convertUserIdentityChangeEvent(a) {
  var b = convertBaseEventData(a),
      c = {
    new: {
      identity_type: convertUserIdentityTypeToServerIdentityType(a.UserIdentityChanges.New.IdentityType),
      identity: a.UserIdentityChanges.New.Identity || null,
      timestamp_unixtime_ms: a.Timestamp,
      created_this_batch: a.UserIdentityChanges.New.CreatedThisBatch
    },
    old: {
      identity_type: convertUserIdentityTypeToServerIdentityType(a.UserIdentityChanges.Old.IdentityType),
      identity: a.UserIdentityChanges.Old.Identity || null,
      timestamp_unixtime_ms: a.Timestamp,
      created_this_batch: a.UserIdentityChanges.Old.CreatedThisBatch
    }
  };
  return c = Object.assign(c, b), {
    event_type: dist.EventTypeEnum.userIdentityChange,
    data: c
  };
}

function convertUserIdentityTypeToServerIdentityType(a) {
  return a === SDKIdentityTypeEnum.other ? dist.IdentityTypeEnum.other : a === SDKIdentityTypeEnum.customerId ? dist.IdentityTypeEnum.customerId : a === SDKIdentityTypeEnum.facebook ? dist.IdentityTypeEnum.facebook : a === SDKIdentityTypeEnum.twitter ? dist.IdentityTypeEnum.twitter : a === SDKIdentityTypeEnum.google ? dist.IdentityTypeEnum.google : a === SDKIdentityTypeEnum.microsoft ? dist.IdentityTypeEnum.microsoft : a === SDKIdentityTypeEnum.yahoo ? dist.IdentityTypeEnum.yahoo : a === SDKIdentityTypeEnum.email ? dist.IdentityTypeEnum.email : a === SDKIdentityTypeEnum.alias ? dist.IdentityTypeEnum.alias : a === SDKIdentityTypeEnum.facebookCustomAudienceId ? dist.IdentityTypeEnum.facebookCustomAudienceId : a === SDKIdentityTypeEnum.otherId2 ? dist.IdentityTypeEnum.otherId2 : a === SDKIdentityTypeEnum.otherId3 ? dist.IdentityTypeEnum.otherId3 : a === SDKIdentityTypeEnum.otherId4 ? dist.IdentityTypeEnum.otherId4 : a === SDKIdentityTypeEnum.otherId5 ? dist.IdentityTypeEnum.otherId5 : a === SDKIdentityTypeEnum.otherId6 ? dist.IdentityTypeEnum.otherId6 : a === SDKIdentityTypeEnum.otherId7 ? dist.IdentityTypeEnum.otherId7 : a === SDKIdentityTypeEnum.otherId8 ? dist.IdentityTypeEnum.otherId8 : a === SDKIdentityTypeEnum.otherId9 ? dist.IdentityTypeEnum.otherId9 : a === SDKIdentityTypeEnum.otherId10 ? dist.IdentityTypeEnum.otherId10 : a === SDKIdentityTypeEnum.mobileNumber ? dist.IdentityTypeEnum.mobileNumber : a === SDKIdentityTypeEnum.phoneNumber2 ? dist.IdentityTypeEnum.phoneNumber2 : a === SDKIdentityTypeEnum.phoneNumber3 ? dist.IdentityTypeEnum.phoneNumber3 : void 0;
}

var BaseVault =
/** @class */
function () {
  /**
  *
  * @param {string} storageKey the local storage key string
  * @param {Storage} Web API Storage object that is being used
  * @param {IVaultOptions} options A Dictionary of IVaultOptions
  */
  function a(a, b, c) {
    this._storageKey = a, this.storageObject = b, this.logger = (null === c || void 0 === c ? void 0 : c.logger) || {
      verbose: function verbose() {},
      warning: function warning() {},
      error: function error() {}
    }, this.contents = this.retrieve();
  }
  /**
  * Stores a StorableItem to Storage
  * @method store
  * @param item {StorableItem}
  */


  return a.prototype.store = function (a) {
    this.contents = a;
    var b = isEmpty(a) ? "" : JSON.stringify(a);

    try {
      this.storageObject.setItem(this._storageKey, b), this.logger.verbose("Saving item to Storage: ".concat(b));
    } catch (a) {
      this.logger.error("Cannot Save items to Storage: ".concat(b)), this.logger.error(a);
    }
  }, a.prototype.retrieve = function () {
    // TODO: Handle cases where Local Storage is unavailable
    // https://go.mparticle.com/work/SQDSDKS-5022
    var a = this.storageObject.getItem(this._storageKey);
    return this.contents = a ? JSON.parse(a) : null, this.logger.verbose("Retrieving item from Storage: ".concat(a)), this.contents;
  }, a.prototype.purge = function () {
    this.logger.verbose("Purging Storage"), this.contents = null, this.storageObject.removeItem(this._storageKey);
  }, a;
}();

var LocalStorageVault =
/** @class */
function (a) {
  function b(b, c) {
    return a.call(this, b, window.localStorage, c) || this;
  }

  return __extends(b, a), b;
}(BaseVault);

var SessionStorageVault =
/** @class */
function (a) {
  function b(b, c) {
    return a.call(this, b, window.sessionStorage, c) || this;
  }

  return __extends(b, a), b;
}(BaseVault);
/**
 * BatchUploader contains all the logic to store/retrieve events and batches
 * to/from persistence, and upload batches to mParticle.
 * It queues events as they come in, storing them in persistence, then at set
 * intervals turns them into batches and transfers between event and batch
 * persistence.
 * It then attempts to upload them to mParticle, purging batch persistence if
 * the upload is successful
 *
 * These uploads happen on an interval basis using window.fetch or XHR
 * requests, depending on what is available in the browser.
 *
 * Uploads can also be triggered on browser visibility/focus changes via an
 * event listener, which then uploads to mPartice via the browser's Beacon API.
 */


var BatchUploader =
/** @class */
function () {
  /**
  * Creates an instance of a BatchUploader
  * @param {MParticleWebSDK} mpInstance - the mParticle SDK instance
  * @param {number} uploadInterval - the desired upload interval in milliseconds
  */
  function a(b, c) {
    var d, e;
    this.offlineStorageEnabled = !1, this.mpInstance = b, this.uploadIntervalMillis = c, this.batchingEnabled = c >= a.MINIMUM_INTERVAL_MILLIS, this.uploadIntervalMillis < a.MINIMUM_INTERVAL_MILLIS && (this.uploadIntervalMillis = a.MINIMUM_INTERVAL_MILLIS), this.eventsQueuedForProcessing = [], this.batchesQueuedForProcessing = [], this.offlineStorageEnabled = this.isOfflineStorageAvailable(), this.offlineStorageEnabled && (this.eventVault = new SessionStorageVault("".concat(b._Store.storageName, "-events"), {
      logger: b.Logger
    }), this.batchVault = new LocalStorageVault("".concat(b._Store.storageName, "-batches"), {
      logger: b.Logger
    }), (d = this.eventsQueuedForProcessing).push.apply(d, this.eventVault.retrieve()));

    var f = (e = this.mpInstance._Store, e.SDKConfig),
        g = e.devToken,
        h = this.mpInstance._Helpers.createServiceUrl(f.v3SecureServiceUrl, g);

    this.uploadUrl = "".concat(h, "/events"), this.uploader = window.fetch ? new FetchUploader(this.uploadUrl) : new XHRUploader(this.uploadUrl), this.triggerUploadInterval(!0, !1), this.addEventListeners();
  }

  return a.prototype.isOfflineStorageAvailable = function () {
    var a,
        b = (a = this.mpInstance, a._Helpers.getFeatureFlag),
        c = a._Store.deviceId,
        d = b(Constants.FeatureFlags.OfflineStorage),
        e = parseInt(d, 10),
        f = getRampNumber(c); // TODO: Handle cases where Local Storage is unavailable
    //       Potentially shared between Vault and Persistence as well
    //       https://go.mparticle.com/work/SQDSDKS-5022

    return e >= f;
  }, a.prototype.addEventListeners = function () {
    var a = this; // visibility change is a document property, not window

    document.addEventListener("visibilitychange", function () {
      a.prepareAndUpload(!1, a.isBeaconAvailable());
    }), window.addEventListener("beforeunload", function () {
      a.prepareAndUpload(!1, a.isBeaconAvailable());
    }), window.addEventListener("pagehide", function () {
      a.prepareAndUpload(!1, a.isBeaconAvailable());
    });
  }, a.prototype.isBeaconAvailable = function () {
    return !!navigator.sendBeacon;
  }, a.prototype.triggerUploadInterval = function (a, b) {
    var c = this;
    void 0 === a && (a = !1), void 0 === b && (b = !1), setTimeout(function () {
      c.prepareAndUpload(a, b);
    }, this.uploadIntervalMillis);
  }, a.prototype.queueEvent = function (a) {
    isEmpty(a) || (this.eventsQueuedForProcessing.push(a), this.offlineStorageEnabled && this.eventVault && this.eventVault.store(this.eventsQueuedForProcessing), this.mpInstance.Logger.verbose("Queuing event: ".concat(JSON.stringify(a))), this.mpInstance.Logger.verbose("Queued event count: ".concat(this.eventsQueuedForProcessing.length)), (!this.batchingEnabled || Types.TriggerUploadType[a.EventDataType]) && this.prepareAndUpload(!1, !1));
  }, a.createNewBatches = function (a, b, c) {
    if (!b || !a || !a.length) return null; //bucket by MPID, and then by session, ordered by timestamp

    for (var d, e = [], f = new Map(), g = 0, h = a; g < h.length; g++) {
      //on initial startup, there may be events logged without an mpid.
      if (d = h[g], !d.MPID) {
        var i = b.getMPID();
        d.MPID = i;
      }

      var j = f.get(d.MPID);
      j || (j = []), j.push(d), f.set(d.MPID, j);
    }

    for (var k = 0, l = Array.from(f.entries()); k < l.length; k++) {
      for (var m = l[k], i = m[0], n = m[1], o = new Map(), p = 0, q = n; p < q.length; p++) {
        var d = q[p],
            j = o.get(d.SessionId);
        j || (j = []), j.push(d), o.set(d.SessionId, j);
      }

      for (var r = 0, s = Array.from(o.entries()); r < s.length; r++) {
        var t = s[r],
            u = convertEvents(i, t[1], c),
            v = c._Store.SDKConfig.onCreateBatch;
        v && (u = v(u), u ? u.modified = !0 : c.Logger.warning("Skiping batch upload because no batch was returned from onCreateBatch callback")), u && e.push(u);
      }
    }

    return e;
  }, a.prototype.prepareAndUpload = function (b, c) {
    return __awaiter(this, void 0, void 0, function () {
      var d, e, f, g, h, i, j, k;
      return __generator(this, function (l) {
        switch (l.label) {
          case 0:
            return d = this.mpInstance.Identity.getCurrentUser(), e = this.eventsQueuedForProcessing, this.eventsQueuedForProcessing = [], this.offlineStorageEnabled && this.eventVault && this.eventVault.store([]), f = [], isEmpty(e) || (f = a.createNewBatches(e, d, this.mpInstance)), this.offlineStorageEnabled && this.batchVault && ((i = this.batchesQueuedForProcessing).unshift.apply(i, this.batchVault.retrieve()), this.batchVault.purge()), isEmpty(f) || (j = this.batchesQueuedForProcessing).push.apply(j, f), g = this.batchesQueuedForProcessing, this.batchesQueuedForProcessing = [], c && this.offlineStorageEnabled && this.batchVault && this.batchVault.store(g), [4
            /*yield*/
            , this.uploadBatches(this.mpInstance.Logger, g, c)];

          case 1:
            return h = l.sent(), isEmpty(h) || (k = this.batchesQueuedForProcessing).unshift.apply(k, h), !c && this.offlineStorageEnabled && this.batchVault && (this.batchVault.store(this.batchesQueuedForProcessing), this.batchesQueuedForProcessing = []), b && this.triggerUploadInterval(b, !1), [2
            /*return*/
            ];
        }
      });
    });
  }, a.prototype.uploadBatches = function (b, c, d) {
    return __awaiter(this, void 0, void 0, function () {
      var e, f, g, h, j, k;
      return __generator(this, function (i) {
        switch (i.label) {
          case 0:
            if (e = c.filter(function (a) {
              return !isEmpty(a.events);
            }), isEmpty(e)) return [2
            /*return*/
            , null];
            b.verbose("Uploading batches: ".concat(JSON.stringify(e))), b.verbose("Batch count: ".concat(e.length)), f = 0, i.label = 1;

          case 1:
            return f < e.length ? (g = {
              method: "POST",
              headers: {
                Accept: a.CONTENT_TYPE,
                "Content-Type": "text/plain;charset=UTF-8"
              },
              body: JSON.stringify(e[f])
            }, !(d && this.isBeaconAvailable())) ? [3
            /*break*/
            , 2] : (h = new Blob([g.body], {
              type: "text/plain;charset=UTF-8"
            }), navigator.sendBeacon(this.uploadUrl, h), [3
            /*break*/
            , 5]) : [3
            /*break*/
            , 6];

          case 2:
            return i.trys.push([2, 4,, 5]), [4
            /*yield*/
            , this.uploader.upload(g)];

          case 3:
            if (j = i.sent(), 200 <= j.status && 300 > j.status) b.verbose("Upload success for request ID: ".concat(e[f].source_request_id));else {
              if (500 <= j.status || 429 === j.status) // Server error, add back current batches and try again later
                return b.error("HTTP error status ".concat(j.status, " received")), [2
                /*return*/
                , e.slice(f, e.length)];
              if (401 <= j.status) //if we're getting a 401, assume we'll keep getting a 401 and clear the uploads.
                return b.error("HTTP error status ".concat(j.status, " while uploading - please verify your API key.")), [2
                /*return*/
                , null];
              throw console.error("HTTP error status ".concat(j.status, " while uploading events."), j), new Error("Uncaught HTTP Error ".concat(j.status, ".  Batch upload will be re-attempted."));
            }
            return [3
            /*break*/
            , 5];

          case 4:
            return k = i.sent(), b.error("Error sending event to mParticle servers. ".concat(k)), [2
            /*return*/
            , e.slice(f, e.length)];

          case 5:
            return f++, [3
            /*break*/
            , 1];

          case 6:
            return [2
            /*return*/
            , null];
        }
      });
    });
  }, a.CONTENT_TYPE = "text/plain;charset=UTF-8", a.MINIMUM_INTERVAL_MILLIS = 500, a;
}();

var AsyncUploader =
/** @class */
function () {
  function a(a) {
    this.url = a;
  }

  return a;
}(),
    FetchUploader =
/** @class */
function (a) {
  function b() {
    return null !== a && a.apply(this, arguments) || this;
  }

  return __extends(b, a), b.prototype.upload = function (a) {
    return __awaiter(this, void 0, void 0, function () {
      var b;
      return __generator(this, function (c) {
        switch (c.label) {
          case 0:
            return [4
            /*yield*/
            , fetch(this.url, a)];

          case 1:
            return b = c.sent(), [2
            /*return*/
            , b];
        }
      });
    });
  }, b;
}(AsyncUploader),
    XHRUploader =
/** @class */
function (a) {
  function b() {
    return null !== a && a.apply(this, arguments) || this;
  }

  return __extends(b, a), b.prototype.upload = function (a) {
    return __awaiter(this, void 0, void 0, function () {
      var b;
      return __generator(this, function (c) {
        switch (c.label) {
          case 0:
            return [4
            /*yield*/
            , this.makeRequest(this.url, a.body)];

          case 1:
            return b = c.sent(), [2
            /*return*/
            , b];
        }
      });
    });
  }, b.prototype.makeRequest = function (a, b) {
    return __awaiter(this, void 0, void 0, function () {
      var c;
      return __generator(this, function () {
        return c = new XMLHttpRequest(), [2
        /*return*/
        , new Promise(function (d, e) {
          c.onreadystatechange = function () {
            4 !== c.readyState || (200 <= c.status && 300 > c.status ? d(c) : e(c));
          }, c.open("post", a), c.send(b);
        })];
      });
    });
  }, b;
}(AsyncUploader);

function APIClient(a, b) {
  this.uploader = null;
  var c = this;
  this.queueEventForBatchUpload = function (b) {
    if (!this.uploader) {
      var c = a._Helpers.getFeatureFlag(Constants.FeatureFlags.EventBatchingIntervalMillis);

      this.uploader = new BatchUploader(a, c);
    }

    this.uploader.queueEvent(b), a._Persistence.update();
  }, this.processQueuedEvents = function () {
    var b,
        d = a.Identity.getCurrentUser();

    if (d && (b = d.getMPID()), a._Store.eventQueue.length && b) {
      var e = a._Store.eventQueue;
      a._Store.eventQueue = [], this.appendUserInfoToEvents(d, e), e.forEach(function (a) {
        c.sendEventToServer(a);
      });
    }
  }, this.appendUserInfoToEvents = function (b, c) {
    c.forEach(function (c) {
      c.MPID || a._ServerModel.appendUserInfo(b, c);
    });
  }, this.sendEventToServer = function (c, d) {
    var e = a._Helpers.extend({
      shouldUploadEvent: !0
    }, d);

    if (a._Store.webviewBridgeEnabled) return void a._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.LogEvent, JSON.stringify(c));
    var f,
        g = a.Identity.getCurrentUser(); // We queue events if there is no MPID (MPID is null, or === 0), or there are integrations that that require this to stall because integration attributes
    // need to be set, or if we are still fetching the config (self hosted only), and so require delaying events

    return (g && (f = g.getMPID()), a._Store.requireDelay = a._Helpers.isDelayedByIntegration(a._preInit.integrationDelays, a._Store.integrationDelayTimeoutStart, Date.now()), !f || a._Store.requireDelay || !a._Store.configurationLoaded) ? (a.Logger.verbose("Event was added to eventQueue. eventQueue will be processed once a valid MPID is returned or there is no more integration imposed delay."), void a._Store.eventQueue.push(c)) : void (this.processQueuedEvents(), isEmpty(c) || (e.shouldUploadEvent && this.queueEventForBatchUpload(c), c.EventName !== Types.MessageType.AppStateTransition && (b && b.kitBlockingEnabled && (c = b.createBlockedEvent(c)), c && a._Forwarders.sendEventToForwarders(c))));
  }, this.sendBatchForwardingStatsToServer = function (b, c) {
    var d, e;

    try {
      d = a._Helpers.createServiceUrl(a._Store.SDKConfig.v2SecureServiceUrl, a._Store.devToken), e = {
        uuid: a._Helpers.generateUniqueId(),
        data: b
      }, c && (c.open("post", d + "/Forwarding"), c.send(JSON.stringify(e)));
    } catch (b) {
      a.Logger.error("Error sending forwarding stats to mParticle servers.");
    }
  }, this.sendSingleForwardingStatsToServer = function (b) {
    var c, d;

    try {
      var e = function () {
        4 === f.readyState && 202 === f.status && a.Logger.verbose("Successfully sent  " + f.statusText + " from server");
      },
          f = a._Helpers.createXHR(e);

      c = a._Helpers.createServiceUrl(a._Store.SDKConfig.v1SecureServiceUrl, a._Store.devToken), d = b, f && (f.open("post", c + "/Forwarding"), f.send(JSON.stringify(d)));
    } catch (b) {
      a.Logger.error("Error sending forwarding stats to mParticle servers.");
    }
  }, this.prepareForwardingStats = function (b, d) {
    var e,
        f = a._Forwarders.getForwarderStatsQueue();

    b && b.isVisible && (e = {
      mid: b.id,
      esid: b.eventSubscriptionId,
      n: d.EventName,
      attrs: d.EventAttributes,
      sdk: d.SDKVersion,
      dt: d.EventDataType,
      et: d.EventCategory,
      dbg: d.Debug,
      ct: d.Timestamp,
      eec: d.ExpandedEventCount,
      dp: d.DataPlan
    }, a._Helpers.getFeatureFlag(Constants.FeatureFlags.ReportBatching) ? (f.push(e), a._Forwarders.setForwarderStatsQueue(f)) : c.sendSingleForwardingStatsToServer(e));
  };
}

var Validators = {
  // From ./utils
  // Utility Functions for backwards compatability
  isNumber: isNumber,
  isFunction: isFunction,
  isStringOrNumber: isStringOrNumber,
  // Validator Functions
  isValidAttributeValue: function isValidAttributeValue(a) {
    return a !== void 0 && !isObject(a) && !Array.isArray(a);
  },
  // Validator Functions
  // Neither null nor undefined can be a valid Key
  isValidKeyValue: function isValidKeyValue(a) {
    return !(!a || isObject(a) || Array.isArray(a) || this.isFunction(a));
  },
  validateIdentities: function validateIdentities(a, b) {
    var c = {
      userIdentities: 1,
      onUserAlias: 1,
      copyUserAttributes: 1
    };

    if (a) {
      if ("modify" === b && (isObject(a.userIdentities) && !Object.keys(a.userIdentities).length || !isObject(a.userIdentities))) return {
        valid: !1,
        error: Constants.Messages.ValidationMessages.ModifyIdentityRequestUserIdentitiesPresent
      };

      for (var d in a) if (a.hasOwnProperty(d)) {
        if (!c[d]) return {
          valid: !1,
          error: Constants.Messages.ValidationMessages.IdentityRequesetInvalidKey
        };
        if ("onUserAlias" === d && !Validators.isFunction(a[d])) return {
          valid: !1,
          error: Constants.Messages.ValidationMessages.OnUserAliasType
        };
      }

      if (0 === Object.keys(a).length) return {
        valid: !0
      }; // identityApiData.userIdentities can't be undefined

      if (void 0 === a.userIdentities) return {
        valid: !1,
        error: Constants.Messages.ValidationMessages.UserIdentities
      }; // identityApiData.userIdentities can be null, but if it isn't null or undefined (above conditional), it must be an object

      if (null !== a.userIdentities && !isObject(a.userIdentities)) return {
        valid: !1,
        error: Constants.Messages.ValidationMessages.UserIdentities
      };
      if (isObject(a.userIdentities) && Object.keys(a.userIdentities).length) for (var e in a.userIdentities) if (a.userIdentities.hasOwnProperty(e)) {
        if (!1 === Types.IdentityType.getIdentityType(e)) return {
          valid: !1,
          error: Constants.Messages.ValidationMessages.UserIdentitiesInvalidKey
        };
        if ("string" != typeof a.userIdentities[e] && null !== a.userIdentities[e]) return {
          valid: !1,
          error: Constants.Messages.ValidationMessages.UserIdentitiesInvalidValues
        };
      }
    }

    return {
      valid: !0
    };
  }
};

var KitFilterHelper =
/** @class */
function () {
  function a() {}

  return a.hashEventType = function (a) {
    return generateHash(a);
  }, a.hashEventName = function (a, b) {
    return generateHash(b + a);
  }, (a.hashEventAttributeKey = function (a, b, c) {
    return generateHash(a + b + c);
  }, a.hashUserAttribute = function (a) {
    return generateHash(a);
  }, a.hashUserIdentity = function (a) {
    return a;
  }, a.hashConsentPurpose = function (a, b) {
    return generateHash(a + b);
  }, a.hashAttributeConditionalForwarding = function (a) {
    return generateHash(a).toString();
  }, a.hashConsentPurposeConditionalForwarding = function (a, b) {
    return this.hashConsentPurpose(a, b).toString();
  }, a);
}();

var StorageNames$1 = Constants.StorageNames;

function Helpers(a) {
  var b = this; // Standalone version of jQuery.extend, from https://github.com/dansdom/extend
  // TODO: Refactor SDK to directly use these methods
  // https://go.mparticle.com/work/SQDSDKS-5239
  // Utility Functions
  // Imported Validators

  this.canLog = function () {
    return !!(a._Store.isEnabled && (a._Store.devToken || a._Store.webviewBridgeEnabled));
  }, this.getFeatureFlag = function (b) {
    return a._Store.SDKConfig.flags.hasOwnProperty(b) ? a._Store.SDKConfig.flags[b] : null;
  }, this.invokeCallback = function (c, d, e, f, g) {
    c || a.Logger.warning("There is no callback provided");

    try {
      b.Validators.isFunction(c) && c({
        httpCode: d,
        body: e,
        getUser: function getUser() {
          return f ? f : a.Identity.getCurrentUser();
        },
        getPreviousUser: function getPreviousUser() {
          if (!g) {
            var b = a.Identity.getUsers(),
                c = b.shift(),
                d = f || a.Identity.getCurrentUser();
            return c && d && c.getMPID() === d.getMPID() && (c = b.shift()), c || null;
          }

          return a.Identity.getUser(g);
        }
      });
    } catch (b) {
      a.Logger.error("There was an error with your callback: " + b);
    }
  }, this.invokeAliasCallback = function (c, d, e) {
    c || a.Logger.warning("There is no callback provided");

    try {
      if (b.Validators.isFunction(c)) {
        var f = {
          httpCode: d
        };
        e && (f.message = e), c(f);
      }
    } catch (b) {
      a.Logger.error("There was an error with your callback: " + b);
    }
  }, this.extend = function () {
    var a,
        c,
        d,
        e,
        f,
        g,
        h = arguments[0] || {},
        j = 1,
        k = arguments.length,
        l = !1,
        // helper which replicates the jquery internal functions
    m = {
      hasOwn: Object.prototype.hasOwnProperty,
      class2type: {},
      type: function type(a) {
        return null == a ? a + "" : m.class2type[Object.prototype.toString.call(a)] || "object";
      },
      isPlainObject: function isPlainObject(a) {
        if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;

        try {
          if (a.constructor && !m.hasOwn.call(a, "constructor") && !m.hasOwn.call(a.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (a) {
          return !1;
        }

        for (var b in a); // eslint-disable-line no-empty


        return b === void 0 || m.hasOwn.call(a, b);
      },
      isArray: Array.isArray || function (a) {
        return "array" === m.type(a);
      },
      isFunction: function isFunction(a) {
        return "function" === m.type(a);
      },
      isWindow: function isWindow(a) {
        return null != a && a == a.window;
      }
    }; // end of objectHelper
    // Handle a deep copy situation

    for ("boolean" == typeof h && (l = h, h = arguments[1] || {}, j = 2), "object" === _typeof(h) || m.isFunction(h) || (h = {}), k === j && (h = this, --j); j < k; j++) // Only deal with non-null/undefined values
    if (null != (a = arguments[j])) // Extend the base object
      for (c in a) // Prevent never-ending loop
      (d = h[c], e = a[c], h !== e) && (l && e && (m.isPlainObject(e) || (f = m.isArray(e))) ? (f ? (f = !1, g = d && m.isArray(d) ? d : []) : g = d && m.isPlainObject(d) ? d : {}, h[c] = b.extend(l, g, e)) : void 0 !== e && (h[c] = e)); // Recurse if we're merging plain objects or arrays
    // Return the modified object


    return h;
  }, this.createServiceUrl = function (b, c) {
    var d,
        e = window.mParticle && a._Store.SDKConfig.forceHttps ? "https://" : window.location.protocol + "//";
    return d = a._Store.SDKConfig.forceHttps ? "https://" + b : e + b, c && (d += c), d;
  }, this.createXHR = function (b) {
    var c;

    try {
      c = new window.XMLHttpRequest();
    } catch (b) {
      a.Logger.error("Error creating XMLHttpRequest object.");
    }

    if (c && b && "withCredentials" in c) c.onreadystatechange = b;else if ("undefined" != typeof window.XDomainRequest) {
      a.Logger.verbose("Creating XDomainRequest object");

      try {
        c = new window.XDomainRequest(), c.onload = b;
      } catch (b) {
        a.Logger.error("Error creating XDomainRequest object");
      }
    }
    return c;
  }, this.filterUserIdentities = function (a, c) {
    var d = [];
    if (a && Object.keys(a).length) for (var e in a) if (a.hasOwnProperty(e)) {
      var f = Types.IdentityType.getIdentityType(e);

      if (!b.inArray(c, f)) {
        var g = {
          Type: f,
          Identity: a[e]
        };
        f === Types.IdentityType.CustomerId ? d.unshift(g) : d.push(g);
      }
    }
    return d;
  }, this.filterUserIdentitiesForForwarders = function (a, c) {
    var d = {};
    if (a && Object.keys(a).length) for (var e in a) if (a.hasOwnProperty(e)) {
      var f = KitFilterHelper.hashUserIdentity(Types.IdentityType.getIdentityType(e));
      b.inArray(c, f) || (d[e] = a[e]);
    }
    return d;
  }, this.filterUserAttributes = function (a, c) {
    var d = {};
    if (a && Object.keys(a).length) for (var e in a) if (a.hasOwnProperty(e)) {
      var f = KitFilterHelper.hashUserAttribute(e);
      b.inArray(c, f) || (d[e] = a[e]);
    }
    return d;
  }, this.isFilteredUserAttribute = function (a, c) {
    var d = KitFilterHelper.hashUserAttribute(a);
    return c && b.inArray(c, d);
  }, this.isEventType = function (a) {
    for (var b in Types.EventType) if (Types.EventType.hasOwnProperty(b) && Types.EventType[b] === a) return !0;

    return !1;
  }, this.sanitizeAttributes = function (c, d) {
    if (!c || !b.isObject(c)) return null;
    var e = {};

    for (var f in c) // Make sure that attribute values are not objects or arrays, which are not valid
    c.hasOwnProperty(f) && b.Validators.isValidAttributeValue(c[f]) ? e[f] = c[f] : a.Logger.warning("For '" + d + "', the corresponding attribute value of '" + f + "' must be a string, number, boolean, or null.");

    return e;
  }, this.isDelayedByIntegration = function (b, c, d) {
    if (d - c > a._Store.SDKConfig.integrationDelayTimeout) return !1;

    for (var e in b) {
      if (!0 === b[e]) return !0;
      continue;
    }

    return !1;
  }, this.createMainStorageName = function (a) {
    return a ? StorageNames$1.currentStorageName + "_" + a : StorageNames$1.currentStorageName;
  }, this.createProductStorageName = function (a) {
    return a ? StorageNames$1.currentStorageProductsName + "_" + a : StorageNames$1.currentStorageProductsName;
  }, this.converted = converted, this.findKeyInObject = findKeyInObject, this.parseNumber = parseNumber, this.inArray = inArray, this.isObject = isObject, this.decoded = decoded, this.returnConvertedBoolean = returnConvertedBoolean, this.parseStringOrNumber = parseStringOrNumber, this.generateHash = generateHash, this.generateUniqueId = generateUniqueId, this.Validators = Validators;
}

var Messages$8 = Constants.Messages,
    androidBridgeNameBase = "mParticleAndroid",
    iosBridgeNameBase = "mParticle";

function NativeSdkHelpers(a) {
  var b = this;
  this.isBridgeV2Available = function (a) {
    if (!a) return !1;
    var b = iosBridgeNameBase + "_" + a + "_v2"; // iOS v2 bridge

    return !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.hasOwnProperty(b)) || !!(window.mParticle && window.mParticle.uiwebviewBridgeName && window.mParticle.uiwebviewBridgeName === b) || !!window.hasOwnProperty(androidBridgeNameBase + "_" + a + "_v2"); // other iOS v2 bridge
    // TODO: what to do about people setting things on mParticle itself?
    // android
  }, this.isWebviewEnabled = function (c, d) {
    return a._Store.bridgeV2Available = b.isBridgeV2Available(c), a._Store.bridgeV1Available = b.isBridgeV1Available(), 2 === d ? a._Store.bridgeV2Available : !(window.mParticle && window.mParticle.uiwebviewBridgeName && window.mParticle.uiwebviewBridgeName !== iosBridgeNameBase + "_" + c + "_v2") && !!(2 > d) && (a._Store.bridgeV2Available || a._Store.bridgeV1Available); // iOS BridgeV1 can be available via mParticle.isIOS, but return false if uiwebviewBridgeName doesn't match requiredWebviewBridgeName
  }, this.isBridgeV1Available = function () {
    return !!(a._Store.SDKConfig.useNativeSdk || window.mParticleAndroid || a._Store.SDKConfig.isIOS);
  }, this.sendToNative = function (c, d) {
    return a._Store.bridgeV2Available && 2 === a._Store.SDKConfig.minWebviewBridgeVersion ? void b.sendViaBridgeV2(c, d, a._Store.SDKConfig.requiredWebviewBridgeName) : a._Store.bridgeV2Available && 2 > a._Store.SDKConfig.minWebviewBridgeVersion ? void b.sendViaBridgeV2(c, d, a._Store.SDKConfig.requiredWebviewBridgeName) : a._Store.bridgeV1Available && 2 > a._Store.SDKConfig.minWebviewBridgeVersion ? void b.sendViaBridgeV1(c, d) : void 0;
  }, this.sendViaBridgeV1 = function (c, d) {
    window.mParticleAndroid && window.mParticleAndroid.hasOwnProperty(c) ? (a.Logger.verbose(Messages$8.InformationMessages.SendAndroid + c), window.mParticleAndroid[c](d)) : a._Store.SDKConfig.isIOS && (a.Logger.verbose(Messages$8.InformationMessages.SendIOS + c), b.sendViaIframeToIOS(c, d));
  }, this.sendViaIframeToIOS = function (a, b) {
    var c = document.createElement("IFRAME");
    c.setAttribute("src", "mp-sdk://" + a + "/" + encodeURIComponent(b)), document.documentElement.appendChild(c), c.parentNode.removeChild(c);
  }, this.sendViaBridgeV2 = function (c, d, e) {
    if (e) {
      var f,
          g,
          h = window[androidBridgeNameBase + "_" + e + "_v2"],
          i = iosBridgeNameBase + "_" + e + "_v2";
      return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[i] && (f = window.webkit.messageHandlers[i]), a.uiwebviewBridgeName === i && (g = a[i]), h && h.hasOwnProperty(c) ? (a.Logger.verbose(Messages$8.InformationMessages.SendAndroid + c), void h[c](d)) : void (f ? (a.Logger.verbose(Messages$8.InformationMessages.SendIOS + c), f.postMessage(JSON.stringify({
        path: c,
        value: d ? JSON.parse(d) : null
      }))) : g && (a.Logger.verbose(Messages$8.InformationMessages.SendIOS + c), b.sendViaIframeToIOS(c, d)));
    }
  };
}

var Messages$7 = Constants.Messages;

function cookieSyncManager(a) {
  var b = this; // Public
  // Private
  // Private
  // TODO: Rename function to replaceAmpWithAmpersand
  // Private

  this.attemptCookieSync = function (c, d, e) {
    // TODO: These should move inside the for loop
    var f, g, h, i, j, k; // TODO: Make this exit quicker instead of nested

    d && !a._Store.webviewBridgeEnabled && a._Store.pixelConfigurations.forEach(function (l) {
      k = !1, l.filteringConsentRuleValues && l.filteringConsentRuleValues.values && l.filteringConsentRuleValues.values.length && (k = !0), f = {
        // Kit Module ID
        moduleId: l.moduleId,
        // Tells you how often we should do a cookie sync (in days)
        frequencyCap: l.frequencyCap,
        // Url for cookie sync pixel
        pixelUrl: b.replaceAmp(l.pixelUrl),
        // TODO: Document requirements for redirectUrl
        redirectUrl: l.redirectUrl ? b.replaceAmp(l.redirectUrl) : null,
        // Filtering rules as defined in UI
        filteringConsentRuleValues: l.filteringConsentRuleValues
      }, h = b.replaceMPID(f.pixelUrl, d), i = f.redirectUrl ? b.replaceMPID(f.redirectUrl, d) : "", j = h + encodeURIComponent(i); // TODO: Refactor so that Persistence is only called once
      //       outside of the loop

      var m = a._Persistence.getPersistence(); // TODO: Is there a historic reason for checking for previousMPID?
      //       it does not appear to be passed in anywhere


      return c && c !== d ? void (m && m[d] && (!m[d].csd && (m[d].csd = {}), b.performCookieSync(j, f.moduleId, d, m[d].csd, f.filteringConsentRuleValues, e, k))) : void (m[d] && (!m[d].csd && (m[d].csd = {}), g = m[d].csd[f.moduleId.toString()] ? m[d].csd[f.moduleId.toString()] : null, g ? // TODO: Turn this into a convenience method for readability?
      //       We use similar comparisons elsewhere in the SDK,
      //       so perhaps we can make a time comparison convenience method
      new Date().getTime() > new Date(g).getTime() + 24 * (60 * (1e3 * ( // TODO: Turn these numbers into a constant so
      //       we can remember what this number is for
      60 * f.frequencyCap))) && b.performCookieSync(j, f.moduleId, d, m[d].csd, f.filteringConsentRuleValues, e, k) : b.performCookieSync(j, f.moduleId, d, m[d].csd, f.filteringConsentRuleValues, e, k)));
    });
  }, this.replaceMPID = function (a, b) {
    return a.replace("%%mpid%%", b);
  }, this.replaceAmp = function (a) {
    return a.replace(/&amp;/g, "&");
  }, this.performCookieSync = function (b, c, d, e, f, g, h) {
    // if MPID is new to cookies, we should not try to perform the cookie sync
    // because a cookie sync can only occur once a user either consents or doesn't
    // we should not check if its enabled if the user has a blank consent
    // TODO: We should do this check outside of this function
    if (!(h && g) && a._Consent.isEnabledForUserConsent(f, a.Identity.getCurrentUser())) // TODO: Refactor so that check is made outside of the function.
      //       Cache or store the boolean so that it only gets called once per
      //       cookie sync attempt per module.
      //       Currently, attemptCookieSync is called as a loop and therefore this
      //       function polls the user object and consent multiple times.
      {
        var i = document.createElement("img");
        a.Logger.verbose(Messages$7.InformationMessages.CookieSync), i.onload = function () {
          e[c.toString()] = new Date().getTime(), a._Persistence.saveUserCookieSyncDatesToPersistence(d, e);
        }, i.src = b;
      }
  };
}

var Messages$6 = Constants.Messages;

function SessionManager(a) {
  var b = this;
  this.initialize = function () {
    if (a._Store.sessionId) {
      var c = 6e4 * a._Store.SDKConfig.sessionTimeout;
      if (new Date() > new Date(a._Store.dateLastEventSent.getTime() + c)) b.endSession(), b.startNewSession();else {
        var d = a._Persistence.getPersistence();

        d && !d.cu && (a.Identity.identify(a._Store.SDKConfig.identifyRequest, a._Store.SDKConfig.identityCallback), a._Store.identifyCalled = !0, a._Store.SDKConfig.identityCallback = null);
      }
    } else b.startNewSession();
  }, this.getSession = function () {
    return a._Store.sessionId;
  }, this.startNewSession = function () {
    if (a.Logger.verbose(Messages$6.InformationMessages.StartingNewSession), a._Helpers.canLog()) {
      a._Store.sessionId = a._Helpers.generateUniqueId().toUpperCase();
      var c = a.Identity.getCurrentUser(),
          d = c ? c.getMPID() : null;

      if (d && (a._Store.currentSessionMPIDs = [d]), !a._Store.sessionStartDate) {
        var e = new Date();
        a._Store.sessionStartDate = e, a._Store.dateLastEventSent = e;
      }

      b.setSessionTimer(), a._Store.identifyCalled || (a.Identity.identify(a._Store.SDKConfig.identifyRequest, a._Store.SDKConfig.identityCallback), a._Store.identifyCalled = !0, a._Store.SDKConfig.identityCallback = null), a._Events.logEvent({
        messageType: Types.MessageType.SessionStart
      });
    } else a.Logger.verbose(Messages$6.InformationMessages.AbandonStartSession);
  }, this.endSession = function (c) {
    if (a.Logger.verbose(Messages$6.InformationMessages.StartingEndSession), c) a._Events.logEvent({
      messageType: Types.MessageType.SessionEnd
    }), a._Store.sessionId = null, a._Store.dateLastEventSent = null, a._Store.sessionAttributes = {}, a._Persistence.update();else if (a._Helpers.canLog()) {
      var d, e, f;
      if (e = a._Persistence.getPersistence(), !e) return;
      if (e.gs && !e.gs.sid) return void a.Logger.verbose(Messages$6.InformationMessages.NoSessionToEnd); // sessionId is not equal to cookies.sid if cookies.sid is changed in another tab

      if (e.gs.sid && a._Store.sessionId !== e.gs.sid && (a._Store.sessionId = e.gs.sid), e.gs && e.gs.les) {
        d = 6e4 * a._Store.SDKConfig.sessionTimeout;
        var g = new Date().getTime();
        f = g - e.gs.les, f < d ? b.setSessionTimer() : (a._Events.logEvent({
          messageType: Types.MessageType.SessionEnd
        }), a._Store.sessionId = null, a._Store.dateLastEventSent = null, a._Store.sessionStartDate = null, a._Store.sessionAttributes = {}, a._Persistence.update());
      }
    } else a.Logger.verbose(Messages$6.InformationMessages.AbandonEndSession);
  }, this.setSessionTimer = function () {
    var c = 6e4 * a._Store.SDKConfig.sessionTimeout;
    a._Store.globalTimer = window.setTimeout(function () {
      b.endSession();
    }, c);
  }, this.resetSessionTimer = function () {
    a._Store.webviewBridgeEnabled || (!a._Store.sessionId && b.startNewSession(), b.clearSessionTimeout(), b.setSessionTimer()), b.startNewSessionIfNeeded();
  }, this.clearSessionTimeout = function () {
    clearTimeout(a._Store.globalTimer);
  }, this.startNewSessionIfNeeded = function () {
    if (!a._Store.webviewBridgeEnabled) {
      var c = a._Persistence.getPersistence();

      !a._Store.sessionId && c && (c.sid ? a._Store.sessionId = c.sid : b.startNewSession());
    }
  };
}

var Messages$5 = Constants.Messages;

function Ecommerce(a) {
  var b = this; // sanitizes any non number, non string value to 0

  this.convertTransactionAttributesToProductAction = function (a, b) {
    a.hasOwnProperty("Id") && (b.TransactionId = a.Id), a.hasOwnProperty("Affiliation") && (b.Affiliation = a.Affiliation), a.hasOwnProperty("CouponCode") && (b.CouponCode = a.CouponCode), a.hasOwnProperty("Revenue") && (b.TotalAmount = this.sanitizeAmount(a.Revenue, "Revenue")), a.hasOwnProperty("Shipping") && (b.ShippingAmount = this.sanitizeAmount(a.Shipping, "Shipping")), a.hasOwnProperty("Tax") && (b.TaxAmount = this.sanitizeAmount(a.Tax, "Tax")), a.hasOwnProperty("Step") && (b.CheckoutStep = a.Step), a.hasOwnProperty("Option") && (b.CheckoutOptions = a.Option);
  }, this.getProductActionEventName = function (a) {
    switch (a) {
      case Types.ProductActionType.AddToCart:
        return "AddToCart";

      case Types.ProductActionType.AddToWishlist:
        return "AddToWishlist";

      case Types.ProductActionType.Checkout:
        return "Checkout";

      case Types.ProductActionType.CheckoutOption:
        return "CheckoutOption";

      case Types.ProductActionType.Click:
        return "Click";

      case Types.ProductActionType.Purchase:
        return "Purchase";

      case Types.ProductActionType.Refund:
        return "Refund";

      case Types.ProductActionType.RemoveFromCart:
        return "RemoveFromCart";

      case Types.ProductActionType.RemoveFromWishlist:
        return "RemoveFromWishlist";

      case Types.ProductActionType.ViewDetail:
        return "ViewDetail";

      case Types.ProductActionType.Unknown:
      default:
        return "Unknown";
    }
  }, this.getPromotionActionEventName = function (a) {
    return a === Types.PromotionActionType.PromotionClick ? "PromotionClick" : a === Types.PromotionActionType.PromotionView ? "PromotionView" : "Unknown";
  }, this.convertProductActionToEventType = function (b) {
    return b === Types.ProductActionType.AddToCart ? Types.CommerceEventType.ProductAddToCart : b === Types.ProductActionType.AddToWishlist ? Types.CommerceEventType.ProductAddToWishlist : b === Types.ProductActionType.Checkout ? Types.CommerceEventType.ProductCheckout : b === Types.ProductActionType.CheckoutOption ? Types.CommerceEventType.ProductCheckoutOption : b === Types.ProductActionType.Click ? Types.CommerceEventType.ProductClick : b === Types.ProductActionType.Purchase ? Types.CommerceEventType.ProductPurchase : b === Types.ProductActionType.Refund ? Types.CommerceEventType.ProductRefund : b === Types.ProductActionType.RemoveFromCart ? Types.CommerceEventType.ProductRemoveFromCart : b === Types.ProductActionType.RemoveFromWishlist ? Types.CommerceEventType.ProductRemoveFromWishlist : b === Types.ProductActionType.Unknown ? Types.EventType.Unknown : b === Types.ProductActionType.ViewDetail ? Types.CommerceEventType.ProductViewDetail : (a.Logger.error("Could not convert product action type " + b + " to event type"), null);
  }, this.convertPromotionActionToEventType = function (b) {
    return b === Types.PromotionActionType.PromotionClick ? Types.CommerceEventType.PromotionClick : b === Types.PromotionActionType.PromotionView ? Types.CommerceEventType.PromotionView : (a.Logger.error("Could not convert promotion action type " + b + " to event type"), null);
  }, this.generateExpandedEcommerceName = function (a, b) {
    return "eCommerce - " + a + " - " + (b ? "Total" : "Item");
  }, this.extractProductAttributes = function (a, b) {
    b.CouponCode && (a["Coupon Code"] = b.CouponCode), b.Brand && (a.Brand = b.Brand), b.Category && (a.Category = b.Category), b.Name && (a.Name = b.Name), b.Sku && (a.Id = b.Sku), b.Price && (a["Item Price"] = b.Price), b.Quantity && (a.Quantity = b.Quantity), b.Position && (a.Position = b.Position), b.Variant && (a.Variant = b.Variant), a["Total Product Amount"] = b.TotalAmount || 0;
  }, this.extractTransactionId = function (a, b) {
    b.TransactionId && (a["Transaction Id"] = b.TransactionId);
  }, this.extractActionAttributes = function (a, c) {
    b.extractTransactionId(a, c), c.Affiliation && (a.Affiliation = c.Affiliation), c.CouponCode && (a["Coupon Code"] = c.CouponCode), c.TotalAmount && (a["Total Amount"] = c.TotalAmount), c.ShippingAmount && (a["Shipping Amount"] = c.ShippingAmount), c.TaxAmount && (a["Tax Amount"] = c.TaxAmount), c.CheckoutOptions && (a["Checkout Options"] = c.CheckoutOptions), c.CheckoutStep && (a["Checkout Step"] = c.CheckoutStep);
  }, this.extractPromotionAttributes = function (a, b) {
    b.Id && (a.Id = b.Id), b.Creative && (a.Creative = b.Creative), b.Name && (a.Name = b.Name), b.Position && (a.Position = b.Position);
  }, this.buildProductList = function (a, b) {
    return b ? Array.isArray(b) ? b : [b] : a.ShoppingCart.ProductList;
  }, this.createProduct = function (b, c, d, e, f, g, h, i, j, k) {
    return (k = a._Helpers.sanitizeAttributes(k, b), "string" != typeof b) ? (a.Logger.error("Name is required when creating a product"), null) : a._Helpers.Validators.isStringOrNumber(c) ? a._Helpers.Validators.isStringOrNumber(d) ? (d = a._Helpers.parseNumber(d), i && !a._Helpers.Validators.isNumber(i) && (a.Logger.error("Position must be a number, it will be set to null."), i = null), e = a._Helpers.Validators.isStringOrNumber(e) ? a._Helpers.parseNumber(e) : 1, {
      Name: b,
      Sku: c,
      Price: d,
      Quantity: e,
      Brand: h,
      Variant: f,
      Category: g,
      Position: i,
      CouponCode: j,
      TotalAmount: e * d,
      Attributes: k
    }) : (a.Logger.error("Price is required when creating a product, and must be a string or a number"), null) : (a.Logger.error("SKU is required when creating a product, and must be a string or a number"), null);
  }, this.createPromotion = function (b, c, d, e) {
    return a._Helpers.Validators.isStringOrNumber(b) ? {
      Id: b,
      Creative: c,
      Name: d,
      Position: e
    } : (a.Logger.error(Messages$5.ErrorMessages.PromotionIdRequired), null);
  }, this.createImpression = function (b, c) {
    return "string" == typeof b ? c ? {
      Name: b,
      Product: c
    } : (a.Logger.error("Product is required when creating an impression."), null) : (a.Logger.error("Name is required when creating an impression."), null);
  }, this.createTransactionAttributes = function (b, c, d, e, f, g) {
    return a._Helpers.Validators.isStringOrNumber(b) ? {
      Id: b,
      Affiliation: c,
      CouponCode: d,
      Revenue: e,
      Shipping: f,
      Tax: g
    } : (a.Logger.error(Messages$5.ErrorMessages.TransactionIdRequired), null);
  }, this.expandProductImpression = function (c) {
    var d = [];
    return c.ProductImpressions ? (c.ProductImpressions.forEach(function (e) {
      e.ProductList && e.ProductList.forEach(function (f) {
        var g = a._Helpers.extend(!1, {}, c.EventAttributes);

        if (f.Attributes) for (var h in f.Attributes) g[h] = f.Attributes[h];
        b.extractProductAttributes(g, f), e.ProductImpressionList && (g["Product Impression List"] = e.ProductImpressionList);

        var i = a._ServerModel.createEventObject({
          messageType: Types.MessageType.PageEvent,
          name: b.generateExpandedEcommerceName("Impression"),
          data: g,
          eventType: Types.EventType.Transaction
        });

        d.push(i);
      });
    }), d) : d;
  }, this.expandCommerceEvent = function (a) {
    return a ? b.expandProductAction(a).concat(b.expandPromotionAction(a)).concat(b.expandProductImpression(a)) : null;
  }, this.expandPromotionAction = function (c) {
    var d = [];
    if (!c.PromotionAction) return d;
    var e = c.PromotionAction.PromotionList;
    return e.forEach(function (e) {
      var f = a._Helpers.extend(!1, {}, c.EventAttributes);

      b.extractPromotionAttributes(f, e);

      var g = a._ServerModel.createEventObject({
        messageType: Types.MessageType.PageEvent,
        name: b.generateExpandedEcommerceName(Types.PromotionActionType.getExpansionName(c.PromotionAction.PromotionActionType)),
        data: f,
        eventType: Types.EventType.Transaction
      });

      d.push(g);
    }), d;
  }, this.expandProductAction = function (c) {
    var d = [];
    if (!c.ProductAction) return d;
    var e = !1;

    if (c.ProductAction.ProductActionType === Types.ProductActionType.Purchase || c.ProductAction.ProductActionType === Types.ProductActionType.Refund) {
      var f = a._Helpers.extend(!1, {}, c.EventAttributes);

      f["Product Count"] = c.ProductAction.ProductList ? c.ProductAction.ProductList.length : 0, b.extractActionAttributes(f, c.ProductAction), c.CurrencyCode && (f["Currency Code"] = c.CurrencyCode);

      var g = a._ServerModel.createEventObject({
        messageType: Types.MessageType.PageEvent,
        name: b.generateExpandedEcommerceName(Types.ProductActionType.getExpansionName(c.ProductAction.ProductActionType), !0),
        data: f,
        eventType: Types.EventType.Transaction
      });

      d.push(g);
    } else e = !0;

    var h = c.ProductAction.ProductList;
    return h ? (h.forEach(function (f) {
      var g = a._Helpers.extend(!1, c.EventAttributes, f.Attributes);

      e ? b.extractActionAttributes(g, c.ProductAction) : b.extractTransactionId(g, c.ProductAction), b.extractProductAttributes(g, f);

      var h = a._ServerModel.createEventObject({
        messageType: Types.MessageType.PageEvent,
        name: b.generateExpandedEcommerceName(Types.ProductActionType.getExpansionName(c.ProductAction.ProductActionType)),
        data: g,
        eventType: Types.EventType.Transaction
      });

      d.push(h);
    }), d) : d;
  }, this.createCommerceEventObject = function (b) {
    var c;
    return (a.Logger.verbose(Messages$5.InformationMessages.StartingLogCommerceEvent), a._Helpers.canLog()) ? (c = a._ServerModel.createEventObject({
      messageType: Types.MessageType.Commerce
    }), c.EventName = "eCommerce - ", c.CurrencyCode = a._Store.currencyCode, c.ShoppingCart = [], c.CustomFlags = b, c) : (a.Logger.verbose(Messages$5.InformationMessages.AbandonLogEvent), null);
  }, this.sanitizeAmount = function (b, c) {
    if (!a._Helpers.Validators.isStringOrNumber(b)) {
      var d = [c, "must be of type number. A", _typeof(b), "was passed. Converting to 0"].join(" ");
      return a.Logger.warning(d), 0;
    } // if amount is a string, it will be parsed into a number if possible, or set to 0


    return a._Helpers.parseNumber(b);
  };
}

function createSDKConfig(a) {
  // TODO: Refactor to create a default config object
  var b = {};

  for (var c in Constants.DefaultConfig) Constants.DefaultConfig.hasOwnProperty(c) && (b[c] = Constants.DefaultConfig[c]);

  if (a) for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);

  for (var c in Constants.DefaultUrls) b[c] = Constants.DefaultUrls[c];

  return b;
} // TODO: Merge this with SDKStoreApi in sdkRuntimeModels


function Store(a, b) {
  var c = {
    isEnabled: !0,
    sessionAttributes: {},
    currentSessionMPIDs: [],
    consentState: null,
    sessionId: null,
    isFirstRun: null,
    clientId: null,
    deviceId: null,
    devToken: null,
    serverSettings: {},
    dateLastEventSent: null,
    sessionStartDate: null,
    currentPosition: null,
    isTracking: !1,
    watchPositionId: null,
    cartProducts: [],
    eventQueue: [],
    currencyCode: null,
    globalTimer: null,
    context: null,
    configurationLoaded: !1,
    identityCallInFlight: !1,
    SDKConfig: {},
    nonCurrentUserMPIDs: {},
    identifyCalled: !1,
    isLoggedIn: !1,
    cookieSyncDates: {},
    integrationAttributes: {},
    requireDelay: !0,
    isLocalStorageAvailable: null,
    storageName: null,
    prodStorageName: null,
    activeForwarders: [],
    kits: {},
    sideloadedKits: [],
    configuredForwarders: [],
    pixelConfigurations: [],
    wrapperSDKInfo: {
      name: "none",
      version: null,
      isInfoSet: !1
    }
  };

  for (var d in c) this[d] = c[d]; // Set configuration to default settings


  if (this.integrationDelayTimeoutStart = Date.now(), this.SDKConfig = createSDKConfig(a), a) {
    if (a.deviceId && (this.deviceId = a.deviceId), this.SDKConfig.isDevelopmentMode = !!a.hasOwnProperty("isDevelopmentMode") && b._Helpers.returnConvertedBoolean(a.isDevelopmentMode), a.hasOwnProperty("v1SecureServiceUrl") && (this.SDKConfig.v1SecureServiceUrl = a.v1SecureServiceUrl), a.hasOwnProperty("v2SecureServiceUrl") && (this.SDKConfig.v2SecureServiceUrl = a.v2SecureServiceUrl), a.hasOwnProperty("v3SecureServiceUrl") && (this.SDKConfig.v3SecureServiceUrl = a.v3SecureServiceUrl), a.hasOwnProperty("identityUrl") && (this.SDKConfig.identityUrl = a.identityUrl), a.hasOwnProperty("aliasUrl") && (this.SDKConfig.aliasUrl = a.aliasUrl), a.hasOwnProperty("configUrl") && (this.SDKConfig.configUrl = a.configUrl), a.hasOwnProperty("logLevel") && (this.SDKConfig.logLevel = a.logLevel), this.SDKConfig.useNativeSdk = !!a.useNativeSdk, this.SDKConfig.kits = a.kits || {}, this.SDKConfig.sideloadedKits = a.sideloadedKits || [], this.SDKConfig.isIOS = a.hasOwnProperty("isIOS") ? a.isIOS : !!(window.mParticle && window.mParticle.isIOS) && window.mParticle.isIOS, this.SDKConfig.useCookieStorage = !!a.hasOwnProperty("useCookieStorage") && a.useCookieStorage, this.SDKConfig.maxProducts = a.hasOwnProperty("maxProducts") ? a.maxProducts : Constants.DefaultConfig.maxProducts, this.SDKConfig.maxCookieSize = a.hasOwnProperty("maxCookieSize") ? a.maxCookieSize : Constants.DefaultConfig.maxCookieSize, a.hasOwnProperty("appName") && (this.SDKConfig.appName = a.appName), a.hasOwnProperty("package") && (this.SDKConfig["package"] = a["package"]), this.SDKConfig.integrationDelayTimeout = a.hasOwnProperty("integrationDelayTimeout") ? a.integrationDelayTimeout : Constants.DefaultConfig.integrationDelayTimeout, a.hasOwnProperty("identifyRequest") && (this.SDKConfig.identifyRequest = a.identifyRequest), a.hasOwnProperty("identityCallback")) {
      var e = a.identityCallback;
      b._Helpers.Validators.isFunction(e) ? this.SDKConfig.identityCallback = a.identityCallback : b.Logger.warning("The optional callback must be a function. You tried entering a(n) " + _typeof(e) + " . Callback not set. Please set your callback again.");
    }

    if (a.hasOwnProperty("appVersion") && (this.SDKConfig.appVersion = a.appVersion), a.hasOwnProperty("appName") && (this.SDKConfig.appName = a.appName), a.hasOwnProperty("sessionTimeout") && (this.SDKConfig.sessionTimeout = a.sessionTimeout), a.hasOwnProperty("dataPlan")) {
      this.SDKConfig.dataPlan = {
        PlanVersion: null,
        PlanId: null
      };
      var f = a.dataPlan;
      f.planId && (isDataPlanSlug(f.planId) ? this.SDKConfig.dataPlan.PlanId = f.planId : b.Logger.error("Your data plan id must be a string and match the data plan slug format (i.e. under_case_slug)")), f.planVersion && (isNumber(f.planVersion) ? this.SDKConfig.dataPlan.PlanVersion = f.planVersion : b.Logger.error("Your data plan version must be a number"));
    } else this.SDKConfig.dataPlan = {};

    if (this.SDKConfig.forceHttps = !a.hasOwnProperty("forceHttps") || a.forceHttps, this.SDKConfig.customFlags = a.customFlags || {}, this.SDKConfig.minWebviewBridgeVersion = a.hasOwnProperty("minWebviewBridgeVersion") ? a.minWebviewBridgeVersion : 1, this.SDKConfig.aliasMaxWindow = a.hasOwnProperty("aliasMaxWindow") ? a.aliasMaxWindow : Constants.DefaultConfig.aliasMaxWindow, a.hasOwnProperty("dataPlanOptions")) {
      var g = a.dataPlanOptions;
      g.hasOwnProperty("dataPlanVersion") && g.hasOwnProperty("blockUserAttributes") && g.hasOwnProperty("blockEventAttributes") && g.hasOwnProperty("blockEvents") && g.hasOwnProperty("blockUserIdentities") || b.Logger.error("Ensure your config.dataPlanOptions object has the following keys: a \"dataPlanVersion\" object, and \"blockUserAttributes\", \"blockEventAttributes\", \"blockEvents\", \"blockUserIdentities\" booleans");
    }

    a.hasOwnProperty("onCreateBatch") && ("function" == typeof a.onCreateBatch ? this.SDKConfig.onCreateBatch = a.onCreateBatch : (b.Logger.error("config.onCreateBatch must be a function"), this.SDKConfig.onCreateBatch = void 0)), a.hasOwnProperty("flags") || (this.SDKConfig.flags = {}), this.SDKConfig.flags.hasOwnProperty(Constants.FeatureFlags.EventBatchingIntervalMillis) || (this.SDKConfig.flags[Constants.FeatureFlags.EventBatchingIntervalMillis] = Constants.DefaultConfig.uploadInterval), this.SDKConfig.flags.hasOwnProperty(Constants.FeatureFlags.ReportBatching) || (this.SDKConfig.flags[Constants.FeatureFlags.ReportBatching] = !1), this.SDKConfig.flags.hasOwnProperty(Constants.FeatureFlags.OfflineStorage) || (this.SDKConfig.flags[Constants.FeatureFlags.OfflineStorage] = 0);
  }
}

function Logger(a) {
  var b = this,
      c = a.logLevel || "warning";
  this.logger = a.hasOwnProperty("logger") ? a.logger : new ConsoleLogger(), this.verbose = function (a) {
    "none" !== c && b.logger.verbose && "verbose" === c && b.logger.verbose(a);
  }, this.warning = function (a) {
    "none" !== c && b.logger.warning && ("verbose" === c || "warning" === c) && b.logger.warning(a);
  }, this.error = function (a) {
    "none" !== c && b.logger.error && b.logger.error(a);
  }, this.setLogLevel = function (a) {
    c = a;
  };
}

function ConsoleLogger() {
  this.verbose = function (a) {
    console && console.info && console.info(a);
  }, this.error = function (a) {
    console && console.error && console.error(a);
  }, this.warning = function (a) {
    console && console.warn && console.warn(a);
  };
}

var Base64 = Polyfill.Base64,
    Messages$4 = Constants.Messages,
    Base64CookieKeys = Constants.Base64CookieKeys,
    SDKv2NonMPIDCookieKeys = Constants.SDKv2NonMPIDCookieKeys,
    StorageNames = Constants.StorageNames;

function _Persistence(a) {
  function b(b) {
    var c = a._Store;
    return b.gs.sid = c.sessionId, b.gs.ie = c.isEnabled, b.gs.sa = c.sessionAttributes, b.gs.ss = c.serverSettings, b.gs.dt = c.devToken, b.gs.les = c.dateLastEventSent ? c.dateLastEventSent.getTime() : null, b.gs.av = c.SDKConfig.appVersion, b.gs.cgid = c.clientId, b.gs.das = c.deviceId, b.gs.c = c.context, b.gs.ssd = c.sessionStartDate ? c.sessionStartDate.getTime() : 0, b.gs.ia = c.integrationAttributes, b;
  }

  function c(a) {
    localStorage.removeItem(a);
  }

  function d(a, b, c) {
    return f.encodePersistence(JSON.stringify(a)) + ";expires=" + b + ";path=/" + c;
  }

  var f = this; // only used in persistence

  /*  This function determines if a cookie is greater than the configured maxCookieSize.
          - If it is, we remove an MPID and its associated UI/UA/CSD from the cookie.
          - Once removed, check size, and repeat.
          - Never remove the currentUser's MPID from the cookie.
  
      MPID removal priority:
      1. If there are no currentSessionMPIDs, remove a random MPID from the the cookie.
      2. If there are currentSessionMPIDs:
          a. Remove at random MPIDs on the cookie that are not part of the currentSessionMPIDs
          b. Then remove MPIDs based on order in currentSessionMPIDs array, which
          stores MPIDs based on earliest login.
  */
  // TODO: This should actually be decodePersistenceString or
  //       we should refactor this to take a string and return an object
  // This function loops through the parts of a full hostname, attempting to set a cookie on that domain. It will set a cookie at the highest level possible.
  // For example subdomain.domain.co.uk would try the following combinations:
  // "co.uk" -> fail
  // "domain.co.uk" -> success, return
  // "subdomain.domain.co.uk" -> skipped, because already found

  /**
       * set the "first seen" time for a user. the time will only be set once for a given
       * mpid after which subsequent calls will be ignored
       */

  /**
  * returns the "last seen" time for a user. If the mpid represents the current user, the
  * return value will always be the current time, otherwise it will be to stored "last seen"
  * time
  */
  // Forwarder Batching Code

  this.useLocalStorage = function () {
    return !a._Store.SDKConfig.useCookieStorage && a._Store.isLocalStorageAvailable;
  }, this.initializeStorage = function () {
    try {
      var b,
          c,
          d = f.getLocalStorage(),
          e = f.getCookie(); // Determine if there is any data in cookies or localStorage to figure out if it is the first time the browser is loading mParticle

      d || e ? a._Store.isFirstRun = !1 : (a._Store.isFirstRun = !0, a._Store.mpid = 0), a._Store.isLocalStorageAvailable || (a._Store.SDKConfig.useCookieStorage = !0), a._Store.isLocalStorageAvailable ? (b = window.localStorage, a._Store.SDKConfig.useCookieStorage ? (d ? (c = e ? a._Helpers.extend(!1, d, e) : d, b.removeItem(a._Store.storageName)) : e && (c = e), f.storeDataInMemory(c)) : e ? (c = d ? a._Helpers.extend(!1, d, e) : e, f.storeDataInMemory(c), f.expireCookies(a._Store.storageName)) : f.storeDataInMemory(d)) : f.storeDataInMemory(e);

      try {
        if (a._Store.isLocalStorageAvailable) {
          var g = localStorage.getItem(a._Store.prodStorageName);
          if (g) var h = JSON.parse(Base64.decode(g));
          a._Store.mpid && f.storeProductsInMemory(h, a._Store.mpid);
        }
      } catch (b) {
        a._Store.isLocalStorageAvailable && localStorage.removeItem(a._Store.prodStorageName), a._Store.cartProducts = [], a.Logger.error("Error loading products in initialization: " + b);
      }

      for (var i in c) c.hasOwnProperty(i) && (SDKv2NonMPIDCookieKeys[i] || (a._Store.nonCurrentUserMPIDs[i] = c[i]));

      f.update();
    } catch (b) {
      f.useLocalStorage() && a._Store.isLocalStorageAvailable ? localStorage.removeItem(a._Store.storageName) : f.expireCookies(a._Store.storageName), a.Logger.error("Error initializing storage: " + b);
    }
  }, this.update = function () {
    a._Store.webviewBridgeEnabled || (a._Store.SDKConfig.useCookieStorage && f.setCookie(), f.setLocalStorage());
  }, this.storeProductsInMemory = function (b, c) {
    if (b) try {
      a._Store.cartProducts = b[c] && b[c].cp ? b[c].cp : [];
    } catch (b) {
      a.Logger.error(Messages$4.ErrorMessages.CookieParseError);
    }
  }, this.storeDataInMemory = function (b, c) {
    try {
      b ? (a._Store.mpid = c ? c : b.cu || 0, b.gs = b.gs || {}, a._Store.sessionId = b.gs.sid || a._Store.sessionId, a._Store.isEnabled = "undefined" == typeof b.gs.ie ? a._Store.isEnabled : b.gs.ie, a._Store.sessionAttributes = b.gs.sa || a._Store.sessionAttributes, a._Store.serverSettings = b.gs.ss || a._Store.serverSettings, a._Store.devToken = a._Store.devToken || b.gs.dt, a._Store.SDKConfig.appVersion = a._Store.SDKConfig.appVersion || b.gs.av, a._Store.clientId = b.gs.cgid || a._Store.clientId || a._Helpers.generateUniqueId(), a._Store.deviceId = a._Store.deviceId || b.gs.das || a._Helpers.generateUniqueId(), a._Store.integrationAttributes = b.gs.ia || {}, a._Store.context = b.gs.c || a._Store.context, a._Store.currentSessionMPIDs = b.gs.csm || a._Store.currentSessionMPIDs, a._Store.isLoggedIn = !0 === b.l, b.gs.les && (a._Store.dateLastEventSent = new Date(b.gs.les)), a._Store.sessionStartDate = b.gs.ssd ? new Date(b.gs.ssd) : new Date(), b = c ? b[c] : b[b.cu]) : (a.Logger.verbose(Messages$4.InformationMessages.CookieNotFound), a._Store.clientId = a._Store.clientId || a._Helpers.generateUniqueId(), a._Store.deviceId = a._Store.deviceId || a._Helpers.generateUniqueId());
    } catch (b) {
      a.Logger.error(Messages$4.ErrorMessages.CookieParseError);
    }
  }, this.determineLocalStorageAvailability = function (a) {
    var b;
    window.mParticle && window.mParticle._forceNoLocalStorage && (a = void 0);

    try {
      return a.setItem("mparticle", "test"), b = "test" === a.getItem("mparticle"), a.removeItem("mparticle"), b && a;
    } catch (a) {
      return !1;
    }
  }, this.getUserProductsFromLS = function (b) {
    if (!a._Store.isLocalStorageAvailable) return [];
    var c,
        d,
        e,
        f = localStorage.getItem(a._Store.prodStorageName); // if there is an MPID, we are retrieving the user's products, which is an array

    if (f && (c = Base64.decode(f)), b) try {
      return c && (e = JSON.parse(c)), d = c && e[b] && e[b].cp && Array.isArray(e[b].cp) ? e[b].cp : [], d;
    } catch (a) {
      return [];
    } else return [];
  }, this.getAllUserProductsFromLS = function () {
    var b,
        c,
        d = localStorage.getItem(a._Store.prodStorageName);
    d && (b = Base64.decode(d)); // returns an object with keys of MPID and values of array of products

    try {
      c = JSON.parse(b);
    } catch (a) {
      c = {};
    }

    return c;
  }, this.setLocalStorage = function () {
    if (a._Store.isLocalStorageAvailable) {
      var c = a._Store.storageName,
          d = f.getAllUserProductsFromLS(),
          e = f.getLocalStorage() || {},
          g = a.Identity.getCurrentUser(),
          h = g ? g.getMPID() : null,
          i = {
        cp: d[h] ? d[h].cp : []
      };

      if (h) {
        d = d || {}, d[h] = i;

        try {
          window.localStorage.setItem(encodeURIComponent(a._Store.prodStorageName), Base64.encode(JSON.stringify(d)));
        } catch (b) {
          a.Logger.error("Error with setting products on localStorage.");
        }
      }

      if (!a._Store.SDKConfig.useCookieStorage) {
        e.gs = e.gs || {}, e.l = a._Store.isLoggedIn ? 1 : 0, a._Store.sessionId && (e.gs.csm = a._Store.currentSessionMPIDs), e.gs.ie = a._Store.isEnabled, h && (e.cu = h), Object.keys(a._Store.nonCurrentUserMPIDs).length && (e = a._Helpers.extend({}, e, a._Store.nonCurrentUserMPIDs), a._Store.nonCurrentUserMPIDs = {}), e = b(e);

        try {
          window.localStorage.setItem(encodeURIComponent(c), f.encodePersistence(JSON.stringify(e)));
        } catch (b) {
          a.Logger.error("Error with setting localStorage item.");
        }
      }
    }
  }, this.getLocalStorage = function () {
    if (!a._Store.isLocalStorageAvailable) return null;
    var b,
        c = a._Store.storageName,
        d = f.decodePersistence(window.localStorage.getItem(c)),
        e = {};
    if (d) for (b in d = JSON.parse(d), d) d.hasOwnProperty(b) && (e[b] = d[b]);
    return Object.keys(e).length ? e : null;
  }, this.expireCookies = function (a) {
    var b,
        c,
        d,
        e = new Date();
    d = f.getCookieDomain(), c = "" === d ? "" : ";domain=" + d, e.setTime(e.getTime() - 86400000), b = "; expires=" + e.toUTCString(), document.cookie = a + "=" + b + "; path=/" + c;
  }, this.getCookie = function () {
    var b,
        c,
        d,
        g,
        h,
        j = window.document.cookie.split("; "),
        k = a._Store.storageName,
        m = k ? void 0 : {};

    for (a.Logger.verbose(Messages$4.InformationMessages.CookieSearch), b = 0, c = j.length; b < c; b++) {
      try {
        d = j[b].split("="), g = d.shift(), h = d.join("=");
      } catch (b) {
        a.Logger.verbose("Unable to parse cookie: " + g + ". Skipping.");
      }

      if (k && k === g) {
        m = a._Helpers.converted(h);
        break;
      }

      k || (m[g] = a._Helpers.converted(h));
    }

    return m ? (a.Logger.verbose(Messages$4.InformationMessages.CookieFound), JSON.parse(f.decodePersistence(m))) : null;
  }, this.setCookie = function () {
    var c,
        d = a.Identity.getCurrentUser();
    d && (c = d.getMPID());
    var e,
        g,
        h,
        i = new Date(),
        j = a._Store.storageName,
        k = f.getCookie() || {},
        l = new Date(i.getTime() + 1e3 * (60 * (60 * (24 * a._Store.SDKConfig.cookieExpiration)))).toGMTString();
    e = f.getCookieDomain(), g = "" === e ? "" : ";domain=" + e, k.gs = k.gs || {}, a._Store.sessionId && (k.gs.csm = a._Store.currentSessionMPIDs), c && (k.cu = c), k.l = a._Store.isLoggedIn ? 1 : 0, k = b(k), Object.keys(a._Store.nonCurrentUserMPIDs).length && (k = a._Helpers.extend({}, k, a._Store.nonCurrentUserMPIDs), a._Store.nonCurrentUserMPIDs = {}), h = f.reduceAndEncodePersistence(k, l, g, a._Store.SDKConfig.maxCookieSize), a.Logger.verbose(Messages$4.InformationMessages.CookieSet), window.document.cookie = encodeURIComponent(j) + "=" + h;
  }, this.reduceAndEncodePersistence = function (b, c, e, f) {
    var g,
        h = b.gs.csm ? b.gs.csm : []; // Comment 1 above

    if (!h.length) for (var j in b) b.hasOwnProperty(j) && (g = d(b, c, e), g.length > f && !SDKv2NonMPIDCookieKeys[j] && j !== b.cu && delete b[j]);else {
      // Comment 2 above - First create an object of all MPIDs on the cookie
      var k = {};

      for (var l in b) b.hasOwnProperty(l) && (SDKv2NonMPIDCookieKeys[l] || l === b.cu || (k[l] = 1)); // Comment 2a above


      if (Object.keys(k).length) for (var m in k) g = d(b, c, e), g.length > f && k.hasOwnProperty(m) && -1 === h.indexOf(m) && delete b[m]; // Comment 2b above

      for (var n, o = 0; o < h.length && (g = d(b, c, e), g.length > f); o++) n = h[o], b[n] ? (a.Logger.verbose("Size of new encoded cookie is larger than maxCookieSize setting of " + f + ". Removing from cookie the earliest logged in MPID containing: " + JSON.stringify(b[n], 0, 2)), delete b[n]) : a.Logger.error("Unable to save MPID data to cookies because the resulting encoded cookie is larger than the maxCookieSize setting of " + f + ". We recommend using a maxCookieSize of 1500.");
    }
    return g;
  }, this.findPrevCookiesBasedOnUI = function (b) {
    var c,
        d = a._Persistence.getPersistence();

    if (b) for (var e in b.userIdentities) if (d && Object.keys(d).length) for (var g in d) // any value in persistence that has an MPID key will be an MPID to search through
    // other keys on the cookie are currentSessionMPIDs and currentMPID which should not be searched
    if (d[g].mpid) {
      var h = d[g].ui;

      for (var i in h) if (e === i && b.userIdentities[e] === h[i]) {
        c = g;
        break;
      }
    }
    c && f.storeDataInMemory(d, c);
  }, this.encodePersistence = function (b) {
    for (var c in b = JSON.parse(b), b.gs) b.gs.hasOwnProperty(c) && (Base64CookieKeys[c] ? b.gs[c] ? Array.isArray(b.gs[c]) && b.gs[c].length || a._Helpers.isObject(b.gs[c]) && Object.keys(b.gs[c]).length ? b.gs[c] = Base64.encode(JSON.stringify(b.gs[c])) : delete b.gs[c] : delete b.gs[c] : "ie" === c ? b.gs[c] = b.gs[c] ? 1 : 0 : !b.gs[c] && delete b.gs[c]);

    for (var d in b) if (b.hasOwnProperty(d) && !SDKv2NonMPIDCookieKeys[d]) for (c in b[d]) b[d].hasOwnProperty(c) && Base64CookieKeys[c] && (a._Helpers.isObject(b[d][c]) && Object.keys(b[d][c]).length ? b[d][c] = Base64.encode(JSON.stringify(b[d][c])) : delete b[d][c]);

    return createCookieString(JSON.stringify(b));
  }, this.decodePersistence = function (b) {
    try {
      if (b) {
        if (b = JSON.parse(revertCookieString(b)), a._Helpers.isObject(b) && Object.keys(b).length) {
          for (var c in b.gs) b.gs.hasOwnProperty(c) && (Base64CookieKeys[c] ? b.gs[c] = JSON.parse(Base64.decode(b.gs[c])) : "ie" === c && (b.gs[c] = !!b.gs[c]));

          for (var d in b) if (b.hasOwnProperty(d)) if (!SDKv2NonMPIDCookieKeys[d]) for (c in b[d]) b[d].hasOwnProperty(c) && Base64CookieKeys[c] && b[d][c].length && (b[d][c] = JSON.parse(Base64.decode(b[d][c])));else "l" === d && (b[d] = !!b[d]);
        }

        return JSON.stringify(b);
      }
    } catch (b) {
      a.Logger.error("Problem with decoding cookie", b);
    }
  }, this.getCookieDomain = function () {
    if (a._Store.SDKConfig.cookieDomain) return a._Store.SDKConfig.cookieDomain;
    var b = f.getDomain(document, location.hostname);
    return "" === b ? "" : "." + b;
  }, this.getDomain = function (a, b) {
    var c,
        d,
        e = b.split(".");

    for (c = e.length - 1; 0 <= c; c--) if (d = e.slice(c).join("."), a.cookie = "mptest=cookie;domain=." + d + ";", -1 < a.cookie.indexOf("mptest=cookie")) return a.cookie = "mptest=;domain=." + d + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;", d;

    return "";
  }, this.getUserIdentities = function (a) {
    var b = f.getPersistence();
    return b && b[a] && b[a].ui ? b[a].ui : {};
  }, this.getAllUserAttributes = function (a) {
    var b = f.getPersistence();
    return b && b[a] && b[a].ua ? b[a].ua : {};
  }, this.getCartProducts = function (b) {
    var c,
        d = localStorage.getItem(a._Store.prodStorageName);
    return d && (c = JSON.parse(Base64.decode(d)), c && c[b] && c[b].cp) ? c[b].cp : [];
  }, this.setCartProducts = function (b) {
    if (a._Store.isLocalStorageAvailable) try {
      window.localStorage.setItem(encodeURIComponent(a._Store.prodStorageName), Base64.encode(JSON.stringify(b)));
    } catch (b) {
      a.Logger.error("Error with setting products on localStorage.");
    }
  }, this.saveUserIdentitiesToPersistence = function (a, b) {
    if (b) {
      var c = f.getPersistence();
      c && (c[a] ? c[a].ui = b : c[a] = {
        ui: b
      }, f.savePersistence(c));
    }
  }, this.saveUserAttributesToPersistence = function (a, b) {
    var c = f.getPersistence();
    b && (c && (c[a] ? c[a].ui = b : c[a] = {
      ui: b
    }), f.savePersistence(c));
  }, this.saveUserCookieSyncDatesToPersistence = function (a, b) {
    if (b) {
      var c = f.getPersistence();
      c && (c[a] ? c[a].csd = b : c[a] = {
        csd: b
      }), f.savePersistence(c);
    }
  }, this.saveUserConsentStateToCookies = function (b, c) {
    //it's currently not supported to set persistence
    //for any MPID that's not the current one.
    if (c || null === c) {
      var d = f.getPersistence();
      d && (d[b] ? d[b].con = a._Consent.ConsentSerialization.toMinifiedJsonObject(c) : d[b] = {
        con: a._Consent.ConsentSerialization.toMinifiedJsonObject(c)
      }, f.savePersistence(d));
    }
  }, this.savePersistence = function (b) {
    var c,
        d = f.encodePersistence(JSON.stringify(b)),
        e = new Date(),
        g = a._Store.storageName,
        h = new Date(e.getTime() + 1e3 * (60 * (60 * (24 * a._Store.SDKConfig.cookieExpiration)))).toGMTString(),
        i = f.getCookieDomain();

    if (c = "" === i ? "" : ";domain=" + i, a._Store.SDKConfig.useCookieStorage) {
      var j = f.reduceAndEncodePersistence(b, h, c, a._Store.SDKConfig.maxCookieSize);
      window.document.cookie = encodeURIComponent(g) + "=" + j;
    } else a._Store.isLocalStorageAvailable && localStorage.setItem(a._Store.storageName, d);
  }, this.getPersistence = function () {
    var a = this.useLocalStorage() ? this.getLocalStorage() : this.getCookie();
    return a;
  }, this.getConsentState = function (b) {
    var c = f.getPersistence();
    return c && c[b] && c[b].con ? a._Consent.ConsentSerialization.fromMinifiedJsonObject(c[b].con) : null;
  }, this.getFirstSeenTime = function (a) {
    if (!a) return null;
    var b = f.getPersistence();
    return b && b[a] && b[a].fst ? b[a].fst : null;
  }, this.setFirstSeenTime = function (a, b) {
    if (a) {
      b || (b = new Date().getTime());
      var c = f.getPersistence();
      c && (!c[a] && (c[a] = {}), !c[a].fst && (c[a].fst = b, f.savePersistence(c)));
    }
  }, this.getLastSeenTime = function (b) {
    if (!b) return null;
    if (b === a.Identity.getCurrentUser().getMPID()) //if the mpid is the current user, its last seen time is the current time
      return new Date().getTime();
    var c = f.getPersistence();
    return c && c[b] && c[b].lst ? c[b].lst : null;
  }, this.setLastSeenTime = function (a, b) {
    if (a) {
      b || (b = new Date().getTime());
      var c = f.getPersistence();
      c && c[a] && (c[a].lst = b, f.savePersistence(c));
    }
  }, this.getDeviceId = function () {
    return a._Store.deviceId;
  }, this.setDeviceId = function (b) {
    a._Store.deviceId = b, f.update();
  }, this.resetPersistence = function () {
    if (c(StorageNames.localStorageName), c(StorageNames.localStorageNameV3), c(StorageNames.localStorageNameV4), c(a._Store.prodStorageName), c(a._Store.storageName), c(StorageNames.localStorageProductsV4), f.expireCookies(StorageNames.cookieName), f.expireCookies(StorageNames.cookieNameV2), f.expireCookies(StorageNames.cookieNameV3), f.expireCookies(StorageNames.cookieNameV4), f.expireCookies(a._Store.prodStorageName), f.expireCookies(a._Store.storageName), mParticle._isTestEnv) {
      c(a._Helpers.createMainStorageName("abcdef")), f.expireCookies(a._Helpers.createMainStorageName("abcdef")), c(a._Helpers.createProductStorageName("abcdef"));
    }
  }, this.forwardingStatsBatches = {
    uploadsTable: {},
    forwardingStatsEventQueue: []
  };
}

var Messages$3 = Constants.Messages;

function Events(a) {
  var b = this;
  this.logEvent = function (b, c) {
    if (a.Logger.verbose(Messages$3.InformationMessages.StartingLogEvent + ": " + b.name), a._Helpers.canLog()) {
      var d = a._ServerModel.createEventObject(b);

      a._APIClient.sendEventToServer(d, c);
    } else a.Logger.verbose(Messages$3.InformationMessages.AbandonLogEvent);
  }, this.startTracking = function (b) {
    function c(b, c) {
      if (b) try {
        c ? b(c) : b();
      } catch (b) {
        a.Logger.error("Error invoking the callback passed to startTrackingLocation."), a.Logger.error(b);
      }
    }

    if (!a._Store.isTracking) "geolocation" in navigator && (a._Store.watchPositionId = navigator.geolocation.watchPosition(function e(d) {
      // prevents callback from being fired multiple times
      a._Store.currentPosition = {
        lat: d.coords.latitude,
        lng: d.coords.longitude
      }, c(b, d), b = null, a._Store.isTracking = !0;
    }, function d() {
      // prevents callback from being fired multiple times
      c(b), b = null, a._Store.isTracking = !1;
    }));else {
      var d = {
        coords: {
          latitude: a._Store.currentPosition.lat,
          longitude: a._Store.currentPosition.lng
        }
      };
      c(b, d);
    }
  }, this.stopTracking = function () {
    a._Store.isTracking && (navigator.geolocation.clearWatch(a._Store.watchPositionId), a._Store.currentPosition = null, a._Store.isTracking = !1);
  }, this.logOptOut = function () {
    a.Logger.verbose(Messages$3.InformationMessages.StartingLogOptOut);

    var b = a._ServerModel.createEventObject({
      messageType: Types.MessageType.OptOut,
      eventType: Types.EventType.Other
    });

    a._APIClient.sendEventToServer(b);
  }, this.logAST = function () {
    b.logEvent({
      messageType: Types.MessageType.AppStateTransition
    });
  }, this.logCheckoutEvent = function (c, d, e, f) {
    var g = a._Ecommerce.createCommerceEventObject(f);

    g && (g.EventName += a._Ecommerce.getProductActionEventName(Types.ProductActionType.Checkout), g.EventCategory = Types.CommerceEventType.ProductCheckout, g.ProductAction = {
      ProductActionType: Types.ProductActionType.Checkout,
      CheckoutStep: c,
      CheckoutOptions: d,
      ProductList: []
    }, b.logCommerceEvent(g, e));
  }, this.logProductActionEvent = function (c, d, e, f, g, h) {
    var i = a._Ecommerce.createCommerceEventObject(f),
        j = Array.isArray(d) ? d : [d];

    j.forEach(function (b) {
      b.TotalAmount && (b.TotalAmount = a._Ecommerce.sanitizeAmount(b.TotalAmount, "TotalAmount")), b.Position && (b.Position = a._Ecommerce.sanitizeAmount(b.Position, "Position")), b.Price && (b.Price = a._Ecommerce.sanitizeAmount(b.Price, "Price")), b.Quantity && (b.Quantity = a._Ecommerce.sanitizeAmount(b.Quantity, "Quantity"));
    }), i && (i.EventCategory = a._Ecommerce.convertProductActionToEventType(c), i.EventName += a._Ecommerce.getProductActionEventName(c), i.ProductAction = {
      ProductActionType: c,
      ProductList: j
    }, a._Helpers.isObject(g) && a._Ecommerce.convertTransactionAttributesToProductAction(g, i.ProductAction), b.logCommerceEvent(i, e, h));
  }, this.logPurchaseEvent = function (c, d, e, f) {
    var g = a._Ecommerce.createCommerceEventObject(f);

    g && (g.EventName += a._Ecommerce.getProductActionEventName(Types.ProductActionType.Purchase), g.EventCategory = Types.CommerceEventType.ProductPurchase, g.ProductAction = {
      ProductActionType: Types.ProductActionType.Purchase
    }, g.ProductAction.ProductList = a._Ecommerce.buildProductList(g, d), a._Ecommerce.convertTransactionAttributesToProductAction(c, g.ProductAction), b.logCommerceEvent(g, e));
  }, this.logRefundEvent = function (c, d, e, f) {
    if (!c) return void a.Logger.error(Messages$3.ErrorMessages.TransactionRequired);

    var g = a._Ecommerce.createCommerceEventObject(f);

    g && (g.EventName += a._Ecommerce.getProductActionEventName(Types.ProductActionType.Refund), g.EventCategory = Types.CommerceEventType.ProductRefund, g.ProductAction = {
      ProductActionType: Types.ProductActionType.Refund
    }, g.ProductAction.ProductList = a._Ecommerce.buildProductList(g, d), a._Ecommerce.convertTransactionAttributesToProductAction(c, g.ProductAction), b.logCommerceEvent(g, e));
  }, this.logPromotionEvent = function (c, d, e, f, g) {
    var h = a._Ecommerce.createCommerceEventObject(f);

    h && (h.EventName += a._Ecommerce.getPromotionActionEventName(c), h.EventCategory = a._Ecommerce.convertPromotionActionToEventType(c), h.PromotionAction = {
      PromotionActionType: c,
      PromotionList: Array.isArray(d) ? d : [d]
    }, b.logCommerceEvent(h, e, g));
  }, this.logImpressionEvent = function (c, d, e, f) {
    var g = a._Ecommerce.createCommerceEventObject(e);

    g && (g.EventName += "Impression", g.EventCategory = Types.CommerceEventType.ProductImpression, !Array.isArray(c) && (c = [c]), g.ProductImpressions = [], c.forEach(function (a) {
      g.ProductImpressions.push({
        ProductImpressionList: a.Name,
        ProductList: Array.isArray(a.Product) ? a.Product : [a.Product]
      });
    }), b.logCommerceEvent(g, d, f));
  }, this.logCommerceEvent = function (b, c, d) {
    // If a developer typos the ProductActionType, the event category will be
    // null, resulting in kit forwarding errors on the server.
    // The check for `ProductAction` is required to denote that these are
    // ProductAction events, and not impression or promotions
    return a.Logger.verbose(Messages$3.InformationMessages.StartingLogCommerceEvent), b.ProductAction && null === b.EventCategory ? void a.Logger.error("Commerce event not sent.  The mParticle.ProductActionType you passed was invalid. Re-check your code.") : void (c = a._Helpers.sanitizeAttributes(c, b.EventName), a._Helpers.canLog() ? (a._Store.webviewBridgeEnabled && (b.ShoppingCart = {}), c && (b.EventAttributes = c), a._APIClient.sendEventToServer(b, d), a._Persistence.update()) : a.Logger.verbose(Messages$3.InformationMessages.AbandonLogEvent));
  }, this.addEventHandler = function (c, d, f, g, h) {
    var j,
        k,
        e = [],
        l = function handler(c) {
      var d = function timeoutHandler() {
        j.href ? window.location.href = j.href : j.submit && j.submit();
      };

      a.Logger.verbose("DOM event triggered, handling event"), b.logEvent({
        messageType: Types.MessageType.PageEvent,
        name: "function" == typeof f ? f(j) : f,
        data: "function" == typeof g ? g(j) : g,
        eventType: h || Types.EventType.Other
      }), (j.href && "_blank" !== j.target || j.submit) && (c.preventDefault ? c.preventDefault() : c.returnValue = !1, setTimeout(d, a._Store.SDKConfig.timeout));
    };

    if (!d) return void a.Logger.error("Can't bind event, selector is required"); // Handle a css selector string or a dom element

    if ("string" == typeof d ? e = document.querySelectorAll(d) : d.nodeType && (e = [d]), e.length) for (a.Logger.verbose("Found " + e.length + " element" + (1 < e.length ? "s" : "") + ", attaching event handlers"), k = 0; k < e.length; k++) j = e[k], j.addEventListener ? j.addEventListener(c, l, !1) : j.attachEvent ? j.attachEvent("on" + c, l) : j["on" + c] = l;else a.Logger.verbose("No elements found");
  };
}

function filteredMparticleUser(a, b, c, d) {
  var e = this;
  return {
    getUserIdentities: function getUserIdentities() {
      var e = {},
          f = c._Persistence.getUserIdentities(a);

      for (var g in f) if (f.hasOwnProperty(g)) {
        var h = Types.IdentityType.getIdentityName(c._Helpers.parseNumber(g));
        d && (!d || d.isIdentityBlocked(h)) || ( //if identity type is not blocked
        e[h] = f[g]);
      }

      return e = c._Helpers.filterUserIdentitiesForForwarders(e, b.userIdentityFilters), {
        userIdentities: e
      };
    },
    getMPID: function getMPID() {
      return a;
    },
    getUserAttributesLists: function getUserAttributesLists(a) {
      var b,
          f = {};

      for (var g in b = e.getAllUserAttributes(), b) b.hasOwnProperty(g) && Array.isArray(b[g]) && (d && (!d || d.isAttributeKeyBlocked(g)) || (f[g] = b[g].slice()));

      return f = c._Helpers.filterUserAttributes(f, a.userAttributeFilters), f;
    },
    getAllUserAttributes: function getAllUserAttributes() {
      var e = {},
          f = c._Persistence.getAllUserAttributes(a);

      if (f) for (var g in f) f.hasOwnProperty(g) && (d && (!d || d.isAttributeKeyBlocked(g)) || (Array.isArray(f[g]) ? e[g] = f[g].slice() : e[g] = f[g]));
      return e = c._Helpers.filterUserAttributes(e, b.userAttributeFilters), e;
    }
  };
}

function Forwarders(a, b) {
  var c = this,
      d = {
    setUserAttribute: "setUserAttribute",
    removeUserAttribute: "removeUserAttribute"
  }; // Processing forwarders is a 2 step process:
  //   1. Configure the kit
  //   2. Initialize the kit
  // There are 2 types of kits:
  //   1. UI-enabled kits
  //   2. Sideloaded kits.
  // These are kits that are enabled via the mParticle UI.
  // A kit that is UI-enabled will have a kit configuration that returns from
  // the server, or in rare cases, is passed in by the developer.
  // The kit configuration will be compared with the kit constructors to determine
  // if there is a match before being initialized.
  // Only kits that are configured properly can be active and used for kit forwarding.
  // Sideloaded kits are not configured in the UI and do not have kit configurations
  // They are automatically added to active forwarders.
  // TODO: Sideloading kits currently requires the use of a register method
  // which requires an object on which to be registered.
  // In the future, when all kits are moved to the config rather than
  // there being a separate process for MP configured kits and
  // sideloaded kits, this will need to be refactored.
  // kits can be included via mParticle UI, or via sideloaded kit config API

  this.initForwarders = function (b, d) {
    var e = a.Identity.getCurrentUser();
    !a._Store.webviewBridgeEnabled && a._Store.configuredForwarders && (a._Store.configuredForwarders.sort(function (a, b) {
      return a.settings.PriorityValue = a.settings.PriorityValue || 0, b.settings.PriorityValue = b.settings.PriorityValue || 0, -1 * (a.settings.PriorityValue - b.settings.PriorityValue);
    }), a._Store.activeForwarders = a._Store.configuredForwarders.filter(function (f) {
      if (!a._Consent.isEnabledForUserConsent(f.filteringConsentRuleValues, e)) return !1;
      if (!c.isEnabledForUserAttributes(f.filteringUserAttributeValue, e)) return !1;
      if (!c.isEnabledForUnknownUser(f.excludeAnonymousUser, e)) return !1;

      var g = a._Helpers.filterUserIdentities(b, f.userIdentityFilters),
          h = a._Helpers.filterUserAttributes(e ? e.getAllUserAttributes() : {}, f.userAttributeFilters);

      return f.initialized || (f.logger = a.Logger, f.init(f.settings, d, !1, null, h, g, a._Store.SDKConfig.appVersion, a._Store.SDKConfig.appName, a._Store.SDKConfig.customFlags, a._Store.clientId), f.initialized = !0), !0;
    }));
  }, this.isEnabledForUserAttributes = function (b, c) {
    if (!b || !a._Helpers.isObject(b) || !Object.keys(b).length) return !0;
    var d, e, f;
    if (!c) return !1;
    f = c.getAllUserAttributes();
    var g = !1;

    try {
      if (f && a._Helpers.isObject(f) && Object.keys(f).length) for (var h in f) if (f.hasOwnProperty(h) && (d = KitFilterHelper.hashAttributeConditionalForwarding(h), e = KitFilterHelper.hashAttributeConditionalForwarding(f[h]), d === b.userAttributeName && e === b.userAttributeValue)) {
        g = !0;
        break;
      }
      return !b || b.includeOnMatch === g;
    } catch (a) {
      // in any error scenario, err on side of returning true and forwarding event
      return !0;
    }
  }, this.isEnabledForUnknownUser = function (a, b) {
    return !!(b && b.isLoggedIn() || !a);
  }, this.applyToForwarders = function (b, c) {
    a._Store.activeForwarders.length && a._Store.activeForwarders.forEach(function (d) {
      var e = d[b];
      if (e) try {
        var f = d[b](c);
        f && a.Logger.verbose(f);
      } catch (b) {
        a.Logger.verbose(b);
      }
    });
  }, this.sendEventToForwarders = function (b) {
    var c,
        d,
        e,
        f = function (b, c) {
      b.UserIdentities && b.UserIdentities.length && b.UserIdentities.forEach(function (d, e) {
        a._Helpers.inArray(c, KitFilterHelper.hashUserIdentity(d.Type)) && (b.UserIdentities.splice(e, 1), 0 < e && e--);
      });
    },
        g = function (b, c) {
      var d;
      if (c) for (var e in b.EventAttributes) b.EventAttributes.hasOwnProperty(e) && (d = KitFilterHelper.hashEventAttributeKey(b.EventCategory, b.EventName, e), a._Helpers.inArray(c, d) && delete b.EventAttributes[e]);
    },
        h = function (b, c) {
      return !!(b && b.length && a._Helpers.inArray(b, c));
    },
        j = [Types.MessageType.PageEvent, Types.MessageType.PageView, Types.MessageType.Commerce];

    if (!a._Store.webviewBridgeEnabled && a._Store.activeForwarders) {
      d = KitFilterHelper.hashEventName(b.EventName, b.EventCategory), e = KitFilterHelper.hashEventType(b.EventCategory);

      for (var k = 0; k < a._Store.activeForwarders.length; k++) {
        // Check attribute forwarding rule. This rule allows users to only forward an event if a
        // specific attribute exists and has a specific value. Alternatively, they can specify
        // that an event not be forwarded if the specified attribute name and value exists.
        // The two cases are controlled by the "includeOnMatch" boolean value.
        // Supported message types for attribute forwarding rules are defined in the forwardingRuleMessageTypes array
        if (-1 < j.indexOf(b.EventDataType) && a._Store.activeForwarders[k].filteringEventAttributeValue && a._Store.activeForwarders[k].filteringEventAttributeValue.eventAttributeName && a._Store.activeForwarders[k].filteringEventAttributeValue.eventAttributeValue) {
          var l = null; // Attempt to find the attribute in the collection of event attributes

          if (b.EventAttributes) for (var m in b.EventAttributes) {
            var n;
            if (n = KitFilterHelper.hashAttributeConditionalForwarding(m), n === a._Store.activeForwarders[k].filteringEventAttributeValue.eventAttributeName && (l = {
              name: n,
              value: KitFilterHelper.hashAttributeConditionalForwarding(b.EventAttributes[m])
            }), l) break;
          }
          var o = null !== l && l.value === a._Store.activeForwarders[k].filteringEventAttributeValue.eventAttributeValue,
              p = !0 === a._Store.activeForwarders[k].filteringEventAttributeValue.includeOnMatch ? o : !o;
          if (!p) continue;
        } // Clone the event object, as we could be sending different attributes to each forwarder
        // Check event filtering rules


        if (c = {}, c = a._Helpers.extend(!0, c, b), b.EventDataType === Types.MessageType.PageEvent && (h(a._Store.activeForwarders[k].eventNameFilters, d) || h(a._Store.activeForwarders[k].eventTypeFilters, e))) continue;else if (b.EventDataType === Types.MessageType.Commerce && h(a._Store.activeForwarders[k].eventTypeFilters, e)) continue;else if (b.EventDataType === Types.MessageType.PageView && h(a._Store.activeForwarders[k].screenNameFilters, d)) continue; // Check attribute filtering rules

        if (c.EventAttributes && (b.EventDataType === Types.MessageType.PageEvent ? g(c, a._Store.activeForwarders[k].attributeFilters) : b.EventDataType === Types.MessageType.PageView && g(c, a._Store.activeForwarders[k].screenAttributeFilters)), f(c, a._Store.activeForwarders[k].userIdentityFilters), c.UserAttributes = a._Helpers.filterUserAttributes(c.UserAttributes, a._Store.activeForwarders[k].userAttributeFilters), a._Store.activeForwarders[k].process) {
          a.Logger.verbose("Sending message to forwarder: " + a._Store.activeForwarders[k].name);

          var q = a._Store.activeForwarders[k].process(c);

          q && a.Logger.verbose(q);
        }
      }
    }
  }, this.handleForwarderUserAttributes = function (c, e, f) {
    b && b.isAttributeKeyBlocked(e) || !a._Store.activeForwarders.length || a._Store.activeForwarders.forEach(function (b) {
      var g = b[c];
      if (g && !a._Helpers.isFilteredUserAttribute(e, b.userAttributeFilters)) try {
        var h;
        c === d.setUserAttribute ? h = b.setUserAttribute(e, f) : c === d.removeUserAttribute && (h = b.removeUserAttribute(e)), h && a.Logger.verbose(h);
      } catch (b) {
        a.Logger.error(b);
      }
    });
  }, this.setForwarderUserIdentities = function (b) {
    a._Store.activeForwarders.forEach(function (c) {
      var d = a._Helpers.filterUserIdentities(b, c.userIdentityFilters);

      c.setUserIdentity && d.forEach(function (b) {
        var d = c.setUserIdentity(b.Identity, b.Type);
        d && a.Logger.verbose(d);
      });
    });
  }, this.setForwarderOnUserIdentified = function (c) {
    a._Store.activeForwarders.forEach(function (d) {
      var e = filteredMparticleUser(c.getMPID(), d, a, b);

      if (d.onUserIdentified) {
        var f = d.onUserIdentified(e);
        f && a.Logger.verbose(f);
      }
    });
  }, this.setForwarderOnIdentityComplete = function (c, d) {
    var e;

    a._Store.activeForwarders.forEach(function (f) {
      var g = filteredMparticleUser(c.getMPID(), f, a, b);
      "identify" === d ? f.onIdentifyComplete && (e = f.onIdentifyComplete(g), e && a.Logger.verbose(e)) : "login" === d ? f.onLoginComplete && (e = f.onLoginComplete(g), e && a.Logger.verbose(e)) : "logout" === d ? f.onLogoutComplete && (e = f.onLogoutComplete(g), e && a.Logger.verbose(e)) : "modify" == d && f.onModifyComplete && (e = f.onModifyComplete(g), e && a.Logger.verbose(e));
    });
  }, this.getForwarderStatsQueue = function () {
    return a._Persistence.forwardingStatsBatches.forwardingStatsEventQueue;
  }, this.setForwarderStatsQueue = function (b) {
    a._Persistence.forwardingStatsBatches.forwardingStatsEventQueue = b;
  }, this.processForwarders = function (b, d) {
    b ? (this.processUIEnabledKits(b), this.processSideloadedKits(b), c.initForwarders(a._Store.SDKConfig.identifyRequest.userIdentities, d)) : a.Logger.warning("No config was passed. Cannot process forwarders");
  }, this.processUIEnabledKits = function (b) {
    var d = this.returnKitConstructors();

    try {
      Array.isArray(b.kitConfigs) && b.kitConfigs.length && b.kitConfigs.forEach(function (a) {
        c.configureUIEnabledKit(a, d);
      });
    } catch (b) {
      a.Logger.error("MP Kits not configured propertly. Kits may not be initialized. " + b);
    }
  }, this.returnKitConstructors = function () {
    var b = {}; // If there are kits inside of mpInstance._Store.SDKConfig.kits, then mParticle is self hosted

    return isEmpty(a._Store.SDKConfig.kits) ? !isEmpty(a._preInit.forwarderConstructors) && a._preInit.forwarderConstructors.forEach(function (a) {
      // A suffix is added to a kitConstructor and kit config if there are multiple different
      // versions of a client kit.  This matches the suffix in the DB.  As an example
      // the GA4 kit has a client kit and a server side kit which has a client side
      // component.  They share the same name/module ID in the DB, so we include a
      // suffix to distinguish them in the kits object.
      // If a customer wanted simultaneous GA4 client and server connections,
      // a suffix allows the SDK to distinguish the two.
      if (a.suffix) {
        var c = "".concat(a.name, "-").concat(a.suffix);
        b[c] = a;
      } else b[a.name] = a;
    }) : b = a._Store.SDKConfig.kits, b;
  }, this.configureUIEnabledKit = function (b, c) {
    var d = null,
        e = b;

    for (var f in c) {
      // Configs are returned with suffixes also. We need to consider the
      // config suffix here to match the constructor suffix
      var g = void 0;

      if (e.suffix && (g = "".concat(e.name, "-").concat(e.suffix)), (f === g || f === e.name) && (e.isDebug === a._Store.SDKConfig.isDevelopmentMode || e.isSandbox === a._Store.SDKConfig.isDevelopmentMode)) {
        d = this.returnConfiguredKit(c[f], e), a._Store.configuredForwarders.push(d);
        break;
      }
    }
  }, this.processSideloadedKits = function (b) {
    try {
      if (Array.isArray(b.sideloadedKits)) {
        var d = {
          kits: {}
        }; // First register each kit's constructor onto sideloadedKits,
        // which is typed { kits: Dictionary<constructor> }.
        // The constructors are keyed by the name of the kit.
        // Then configure each kit

        for (var e in b.sideloadedKits.forEach(function (a) {
          try {
            a.kitInstance.register(d);
          } catch (b) {
            console.error("Error registering sideloaded kit " + a.kitInstance.name);
          }
        }), d.kits) {
          var f = d.kits[e];
          c.configureSideloadedKit(f);
        } // If Sideloaded Kits are successfully registered,
        // record this in the Store.


        if (!isEmpty(d.kits)) {
          var g = Object.keys(d.kits);
          a._Store.sideloadedKitsCount = g.length;
        }
      }
    } catch (b) {
      a.Logger.error("Sideloaded Kits not configured propertly. Kits may not be initialized. " + b);
    }
  }, this.configureSideloadedKit = function (b) {
    a._Store.configuredForwarders.push(this.returnConfiguredKit(b));
  }, this.returnConfiguredKit = function (a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        c = new a.constructor();
    return c.id = b.moduleId, c.isSandbox = b.isDebug || b.isSandbox, c.hasSandbox = "true" === b.hasDebugString, c.isVisible = b.isVisible || !0, c.settings = b.settings || {}, c.eventNameFilters = b.eventNameFilters || [], c.eventTypeFilters = b.eventTypeFilters || [], c.attributeFilters = b.attributeFilters || [], c.screenNameFilters = b.screenNameFilters || [], c.screenAttributeFilters = b.screenAttributeFilters || [], c.userIdentityFilters = b.userIdentityFilters || [], c.userAttributeFilters = b.userAttributeFilters || [], c.filteringEventAttributeValue = b.filteringEventAttributeValue || {}, c.filteringUserAttributeValue = b.filteringUserAttributeValue || {}, c.eventSubscriptionId = b.eventSubscriptionId || null, c.filteringConsentRuleValues = b.filteringConsentRuleValues || {}, c.excludeAnonymousUser = b.excludeAnonymousUser || !1, c;
  }, this.configurePixel = function (b) {
    (b.isDebug === a._Store.SDKConfig.isDevelopmentMode || b.isProduction !== a._Store.SDKConfig.isDevelopmentMode) && a._Store.pixelConfigurations.push(b);
  }, this.processPixelConfigs = function (b) {
    try {
      isEmpty(b.pixelConfigs) || b.pixelConfigs.forEach(function (a) {
        c.configurePixel(a);
      });
    } catch (b) {
      a.Logger.error("Cookie Sync configs not configured propertly. Cookie Sync may not be initialized. " + b);
    }
  };
} // TODO: This file is no longer the server model because the web SDK payload


var MessageType$1 = Types.MessageType,
    ApplicationTransitionType = Types.ApplicationTransitionType; // TODO: Make this a pure function that returns a new object

function convertCustomFlags(a, b) {
  var c = [];

  for (var d in b.flags = {}, a.CustomFlags) c = [], a.CustomFlags.hasOwnProperty(d) && (Array.isArray(a.CustomFlags[d]) ? a.CustomFlags[d].forEach(function (a) {
    ("number" == typeof a || "string" == typeof a || "boolean" == typeof a) && c.push(a.toString());
  }) : ( // TODO: Can we use our utility functions here?
  "number" == typeof a.CustomFlags[d] || "string" == typeof a.CustomFlags[d] || "boolean" == typeof a.CustomFlags[d]) && c.push(a.CustomFlags[d].toString()), c.length && (b.flags[d] = c));
}

function convertProductToV2DTO(a) {
  return {
    id: parseStringOrNumber(a.Sku),
    nm: parseStringOrNumber(a.Name),
    pr: parseNumber(a.Price),
    qt: parseNumber(a.Quantity),
    br: parseStringOrNumber(a.Brand),
    va: parseStringOrNumber(a.Variant),
    ca: parseStringOrNumber(a.Category),
    ps: parseNumber(a.Position),
    cc: parseStringOrNumber(a.CouponCode),
    tpa: parseNumber(a.TotalAmount),
    attrs: a.Attributes
  };
}

function convertProductListToV2DTO(a) {
  return a ? a.map(function (a) {
    return convertProductToV2DTO(a);
  }) : [];
}

function ServerModel(a) {
  var b = this; // TODO: Can we refactor this to not mutate the event?

  this.appendUserInfo = function (b, c) {
    if (c) {
      if (!b) return c.MPID = null, c.ConsentState = null, c.UserAttributes = null, void (c.UserIdentities = null);

      if (!(c.MPID && c.MPID === b.getMPID())) {
        c.MPID = b.getMPID(), c.ConsentState = b.getConsentState(), c.UserAttributes = b.getAllUserAttributes();
        var d = b.getUserIdentities().userIdentities,
            e = {};

        for (var f in d) {
          var g = Types.IdentityType.getIdentityType(f);
          !1 !== g && (e[g] = d[f]);
        }

        var h = [];
        if (a._Helpers.isObject(e) && Object.keys(e).length) for (var i in e) {
          var j = {};
          j.Identity = e[i], j.Type = a._Helpers.parseNumber(i), h.push(j);
        }
        c.UserIdentities = h;
      }
    }
  }, this.convertToConsentStateV2DTO = function (a) {
    if (!a) return null;
    var b = {},
        c = a.getGDPRConsentState();

    if (c) {
      var d = {};

      for (var e in b.gdpr = d, c) if (c.hasOwnProperty(e)) {
        var f = c[e];
        b.gdpr[e] = {}, "boolean" == typeof f.Consented && (d[e].c = f.Consented), "number" == typeof f.Timestamp && (d[e].ts = f.Timestamp), "string" == typeof f.ConsentDocument && (d[e].d = f.ConsentDocument), "string" == typeof f.Location && (d[e].l = f.Location), "string" == typeof f.HardwareId && (d[e].h = f.HardwareId);
      }
    }

    var g = a.getCCPAConsentState();
    return g && (b.ccpa = {
      data_sale_opt_out: {
        c: g.Consented,
        ts: g.Timestamp,
        d: g.ConsentDocument,
        l: g.Location,
        h: g.HardwareId
      }
    }), b;
  }, this.createEventObject = function (c, d) {
    var e = {},
        f = {},
        g = c.messageType === Types.MessageType.OptOut ? !a._Store.isEnabled : null; //  The `optOut` variable is passed later in this method to the `uploadObject`
    //  so that it can be used to denote whether or not a user has "opted out" of being
    //  tracked. If this is an `optOut` Event, we set `optOut` to the inverse of the SDK's
    // `isEnabled` boolean which is controlled via `MPInstanceManager.setOptOut`.
    // TODO: Why is Webview Bridge Enabled or Opt Out necessary here?

    if (a._Store.sessionId || c.messageType === Types.MessageType.OptOut || a._Store.webviewBridgeEnabled) {
      f = c.hasOwnProperty("toEventAPIObject") ? c.toEventAPIObject() : {
        // This is an artifact from v2 events where SessionStart/End and AST event
        //  names are numbers (1, 2, or 10), but going forward with v3, these lifecycle
        //  events do not have names, but are denoted by their `event_type`
        EventName: c.name || c.messageType,
        EventCategory: c.eventType,
        EventAttributes: a._Helpers.sanitizeAttributes(c.data, c.name),
        SourceMessageId: c.sourceMessageId || a._Helpers.generateUniqueId(),
        EventDataType: c.messageType,
        CustomFlags: c.customFlags || {},
        UserAttributeChanges: c.userAttributeChanges,
        UserIdentityChanges: c.userIdentityChanges
      }, c.messageType !== Types.MessageType.SessionEnd && (a._Store.dateLastEventSent = new Date()), e = {
        // FIXME: Deprecate when we get rid of V2
        Store: a._Store.serverSettings,
        SDKVersion: Constants.sdkVersion,
        SessionId: a._Store.sessionId,
        SessionStartDate: a._Store.sessionStartDate ? a._Store.sessionStartDate.getTime() : 0,
        Debug: a._Store.SDKConfig.isDevelopmentMode,
        Location: a._Store.currentPosition,
        OptOut: g,
        ExpandedEventCount: 0,
        AppVersion: a.getAppVersion(),
        AppName: a.getAppName(),
        Package: a._Store.SDKConfig["package"],
        ClientGeneratedId: a._Store.clientId,
        DeviceId: a._Store.deviceId,
        IntegrationAttributes: a._Store.integrationAttributes,
        CurrencyCode: a._Store.currencyCode,
        DataPlan: a._Store.SDKConfig.dataPlan ? a._Store.SDKConfig.dataPlan : {}
      }, f.EventDataType === MessageType$1.AppStateTransition && (f.IsFirstRun = a._Store.isFirstRun, f.LaunchReferral = window.location.href || null), f.CurrencyCode = a._Store.currencyCode;
      var h = d || a.Identity.getCurrentUser();
      return b.appendUserInfo(h, f), c.messageType === Types.MessageType.SessionEnd && (f.SessionLength = a._Store.dateLastEventSent.getTime() - a._Store.sessionStartDate.getTime(), f.currentSessionMPIDs = a._Store.currentSessionMPIDs, f.EventAttributes = a._Store.sessionAttributes, a._Store.currentSessionMPIDs = [], a._Store.sessionStartDate = null), e.Timestamp = a._Store.dateLastEventSent.getTime(), a._Helpers.extend({}, f, e);
    }

    return null;
  }, this.convertEventToV2DTO = function (c) {
    var d = {
      n: c.EventName,
      et: c.EventCategory,
      ua: c.UserAttributes,
      ui: c.UserIdentities,
      ia: c.IntegrationAttributes,
      str: c.Store,
      attrs: c.EventAttributes,
      sdk: c.SDKVersion,
      sid: c.SessionId,
      sl: c.SessionLength,
      ssd: c.SessionStartDate,
      dt: c.EventDataType,
      dbg: c.Debug,
      ct: c.Timestamp,
      lc: c.Location,
      o: c.OptOut,
      eec: c.ExpandedEventCount,
      av: c.AppVersion,
      cgid: c.ClientGeneratedId,
      das: c.DeviceId,
      mpid: c.MPID,
      smpids: c.currentSessionMPIDs
    };
    c.DataPlan && c.DataPlan.PlanId && (d.dp_id = c.DataPlan.PlanId, c.DataPlan.PlanVersion && (d.dp_v = c.DataPlan.PlanVersion));
    var e = b.convertToConsentStateV2DTO(c.ConsentState);
    return e && (d.con = e), c.EventDataType === MessageType$1.AppStateTransition && (d.fr = c.IsFirstRun, d.iu = !1, d.at = ApplicationTransitionType.AppInit, d.lr = c.LaunchReferral, d.attrs = null), c.CustomFlags && convertCustomFlags(c, d), c.EventDataType === MessageType$1.Commerce ? (d.cu = c.CurrencyCode, c.ShoppingCart && (d.sc = {
      pl: convertProductListToV2DTO(c.ShoppingCart.ProductList)
    }), c.ProductAction ? d.pd = {
      an: c.ProductAction.ProductActionType,
      cs: a._Helpers.parseNumber(c.ProductAction.CheckoutStep),
      co: c.ProductAction.CheckoutOptions,
      pl: convertProductListToV2DTO(c.ProductAction.ProductList),
      ti: c.ProductAction.TransactionId,
      ta: c.ProductAction.Affiliation,
      tcc: c.ProductAction.CouponCode,
      tr: a._Helpers.parseNumber(c.ProductAction.TotalAmount),
      ts: a._Helpers.parseNumber(c.ProductAction.ShippingAmount),
      tt: a._Helpers.parseNumber(c.ProductAction.TaxAmount)
    } : c.PromotionAction ? d.pm = {
      an: c.PromotionAction.PromotionActionType,
      pl: c.PromotionAction.PromotionList.map(function (a) {
        return {
          id: a.Id,
          nm: a.Name,
          cr: a.Creative,
          ps: a.Position ? a.Position : 0
        };
      })
    } : c.ProductImpressions && (d.pi = c.ProductImpressions.map(function (a) {
      return {
        pil: a.ProductImpressionList,
        pl: convertProductListToV2DTO(a.ProductList)
      };
    }))) : c.EventDataType === MessageType$1.Profile && (d.pet = c.ProfileMessageType), d;
  };
}

function forwardingStatsUploader(a) {
  function b() {
    var b = a._Forwarders.getForwarderStatsQueue(),
        c = a._Persistence.forwardingStatsBatches.uploadsTable,
        d = Date.now();

    for (var e in b.length && (c[d] = {
      uploading: !1,
      data: b
    }, a._Forwarders.setForwarderStatsQueue([])), c) (function (b) {
      if (c.hasOwnProperty(b) && !1 === c[b].uploading) {
        var d = function () {
          4 === e.readyState && (200 === e.status || 202 === e.status ? (a.Logger.verbose("Successfully sent  " + e.statusText + " from server"), delete c[b]) : "4" === e.status.toString()[0] ? 429 !== e.status && delete c[b] : c[b].uploading = !1);
        },
            e = a._Helpers.createXHR(d),
            f = c[b].data;

        c[b].uploading = !0, a._APIClient.sendBatchForwardingStatsToServer(f, e);
      }
    })(e);
  }

  this.startForwardingStatsTimer = function () {
    mParticle._forwardingStatsTimer = setInterval(function () {
      b();
    }, a._Store.SDKConfig.forwarderStatsTimeout);
  };
}

var Messages$2 = Constants.Messages,
    HTTPCodes$2 = Constants.HTTPCodes;

function Identity(t) {
  var s = this;
  /**
  * Invoke these methods on the mParticle.Identity object.
  * Example: mParticle.Identity.getCurrentUser().
  * @class mParticle.Identity
  */

  /**
  * Invoke these methods on the mParticle.Identity.getCurrentUser() object.
  * Example: mParticle.Identity.getCurrentUser().getAllUserAttributes()
  * @class mParticle.Identity.getCurrentUser()
  */

  /**
  * Invoke these methods on the mParticle.Identity.getCurrentUser().getCart() object.
  * Example: mParticle.Identity.getCurrentUser().getCart().add(...);
  * @class mParticle.Identity.getCurrentUser().getCart()
  * @deprecated
  */
  // send a user identity change request on identify, login, logout, modify when any values change.
  // compare what identities exist vs what is previously was for the specific user if they were in memory before.
  // if it's the first time the user is logging in, send a user identity change request with

  this.checkIdentitySwap = function (e, s, r) {
    if (e && s && e !== s) {
      var i = t._Persistence.getPersistence();

      i && (i.cu = s, i.gs.csm = r, t._Persistence.savePersistence(i));
    }
  }, this.IdentityRequest = {
    createKnownIdentities: function createKnownIdentities(e, s) {
      var r = {};
      if (e && e.userIdentities && t._Helpers.isObject(e.userIdentities)) for (var i in e.userIdentities) r[i] = e.userIdentities[i];
      return r.device_application_stamp = s, r;
    },
    preProcessIdentityRequest: function preProcessIdentityRequest(e, s, r) {
      t.Logger.verbose(Messages$2.InformationMessages.StartingLogEvent + ": " + r);

      var i = t._Helpers.Validators.validateIdentities(e, r);

      if (!i.valid) return t.Logger.error("ERROR: " + i.error), {
        valid: !1,
        error: i.error
      };

      if (s && !t._Helpers.Validators.isFunction(s)) {
        var n = "The optional callback must be a function. You tried entering a(n) " + _typeof(s);

        return t.Logger.error(n), {
          valid: !1,
          error: n
        };
      }

      return {
        valid: !0
      };
    },
    createIdentityRequest: function createIdentityRequest(e, s, r, i, n, o, d) {
      var a = {
        client_sdk: {
          platform: s,
          sdk_vendor: r,
          sdk_version: i
        },
        context: o,
        environment: t._Store.SDKConfig.isDevelopmentMode ? "development" : "production",
        request_id: t._Helpers.generateUniqueId(),
        request_timestamp_ms: new Date().getTime(),
        previous_mpid: d || null,
        known_identities: this.createKnownIdentities(e, n)
      };
      return a;
    },
    createModifyIdentityRequest: function createModifyIdentityRequest(e, s, r, i, n, o) {
      return {
        client_sdk: {
          platform: r,
          sdk_vendor: i,
          sdk_version: n
        },
        context: o,
        environment: t._Store.SDKConfig.isDevelopmentMode ? "development" : "production",
        request_id: t._Helpers.generateUniqueId(),
        request_timestamp_ms: new Date().getTime(),
        identity_changes: this.createIdentityChanges(e, s)
      };
    },
    createIdentityChanges: function createIdentityChanges(e, s) {
      var r,
          i = [];
      if (s && t._Helpers.isObject(s) && e && t._Helpers.isObject(e)) for (r in s) i.push({
        old_value: e[r] || null,
        new_value: s[r],
        identity_type: r
      });
      return i;
    },
    // takes 2 UI objects keyed by name, combines them, returns them keyed by type
    combineUserIdentities: function combineUserIdentities(e, s) {
      var r = {},
          i = t._Helpers.extend(e, s);

      for (var n in i) {
        var o = Types.IdentityType.getIdentityType(n); // this check removes anything that is not whitelisted as an identity type

        !1 !== o && 0 <= o && (r[Types.IdentityType.getIdentityType(n)] = i[n]);
      }

      return r;
    },
    createAliasNetworkRequest: function createAliasNetworkRequest(e) {
      return {
        request_id: t._Helpers.generateUniqueId(),
        request_type: "alias",
        environment: t._Store.SDKConfig.isDevelopmentMode ? "development" : "production",
        api_key: t._Store.devToken,
        data: {
          destination_mpid: e.destinationMpid,
          source_mpid: e.sourceMpid,
          start_unixtime_ms: e.startTime,
          end_unixtime_ms: e.endTime,
          scope: e.scope,
          device_application_stamp: t._Store.deviceId
        }
      };
    },
    convertAliasToNative: function convertAliasToNative(e) {
      return {
        DestinationMpid: e.destinationMpid,
        SourceMpid: e.sourceMpid,
        StartUnixtimeMs: e.startTime,
        EndUnixtimeMs: e.endTime
      };
    },
    convertToNative: function convertToNative(e) {
      var t = [];

      if (e && e.userIdentities) {
        for (var s in e.userIdentities) e.userIdentities.hasOwnProperty(s) && t.push({
          Type: Types.IdentityType.getIdentityType(s),
          Identity: e.userIdentities[s]
        });

        return {
          UserIdentities: t
        };
      }
    }
  }, this.IdentityAPI = {
    HTTPCodes: HTTPCodes$2,

    /**
    * Initiate a logout request to the mParticle server
    * @method identify
    * @param {Object} identityApiData The identityApiData object as indicated [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/README.md#1-customize-the-sdk)
    * @param {Function} [callback] A callback function that is called when the identify request completes
    */
    identify: function identify(e, r) {
      var i,
          n = t.Identity.getCurrentUser(),
          o = t._Identity.IdentityRequest.preProcessIdentityRequest(e, r, "identify");

      if (n && (i = n.getMPID()), o.valid) {
        var d = t._Identity.IdentityRequest.createIdentityRequest(e, Constants.platform, Constants.sdkVendor, Constants.sdkVersion, t._Store.deviceId, t._Store.context, i);

        t._Helpers.canLog() ? t._Store.webviewBridgeEnabled ? (t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.Identify, JSON.stringify(t._Identity.IdentityRequest.convertToNative(e))), t._Helpers.invokeCallback(r, HTTPCodes$2.nativeIdentityRequest, "Identify request sent to native sdk")) : t._IdentityAPIClient.sendIdentityRequest(d, "identify", r, e, s.parseIdentityResponse, i) : (t._Helpers.invokeCallback(r, HTTPCodes$2.loggingDisabledOrMissingAPIKey, Messages$2.InformationMessages.AbandonLogEvent), t.Logger.verbose(Messages$2.InformationMessages.AbandonLogEvent));
      } else t._Helpers.invokeCallback(r, HTTPCodes$2.validationIssue, o.error), t.Logger.verbose(o);
    },

    /**
    * Initiate a logout request to the mParticle server
    * @method logout
    * @param {Object} identityApiData The identityApiData object as indicated [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/README.md#1-customize-the-sdk)
    * @param {Function} [callback] A callback function that is called when the logout request completes
    */
    logout: function logout(e, r) {
      var i,
          n = t.Identity.getCurrentUser(),
          o = t._Identity.IdentityRequest.preProcessIdentityRequest(e, r, "logout");

      if (n && (i = n.getMPID()), o.valid) {
        var d,
            a = t._Identity.IdentityRequest.createIdentityRequest(e, Constants.platform, Constants.sdkVendor, Constants.sdkVersion, t._Store.deviceId, t._Store.context, i);

        t._Helpers.canLog() ? t._Store.webviewBridgeEnabled ? (t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.Logout, JSON.stringify(t._Identity.IdentityRequest.convertToNative(e))), t._Helpers.invokeCallback(r, HTTPCodes$2.nativeIdentityRequest, "Logout request sent to native sdk")) : (t._IdentityAPIClient.sendIdentityRequest(a, "logout", r, e, s.parseIdentityResponse, i), d = t._ServerModel.createEventObject({
          messageType: Types.MessageType.Profile
        }), d.ProfileMessageType = Types.ProfileMessageType.Logout, t._Store.activeForwarders.length && t._Store.activeForwarders.forEach(function (e) {
          e.logOut && e.logOut(d);
        })) : (t._Helpers.invokeCallback(r, HTTPCodes$2.loggingDisabledOrMissingAPIKey, Messages$2.InformationMessages.AbandonLogEvent), t.Logger.verbose(Messages$2.InformationMessages.AbandonLogEvent));
      } else t._Helpers.invokeCallback(r, HTTPCodes$2.validationIssue, o.error), t.Logger.verbose(o);
    },

    /**
    * Initiate a login request to the mParticle server
    * @method login
    * @param {Object} identityApiData The identityApiData object as indicated [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/README.md#1-customize-the-sdk)
    * @param {Function} [callback] A callback function that is called when the login request completes
    */
    login: function login(e, r) {
      var i,
          n = t.Identity.getCurrentUser(),
          o = t._Identity.IdentityRequest.preProcessIdentityRequest(e, r, "login");

      if (n && (i = n.getMPID()), o.valid) {
        var d = t._Identity.IdentityRequest.createIdentityRequest(e, Constants.platform, Constants.sdkVendor, Constants.sdkVersion, t._Store.deviceId, t._Store.context, i);

        t._Helpers.canLog() ? t._Store.webviewBridgeEnabled ? (t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.Login, JSON.stringify(t._Identity.IdentityRequest.convertToNative(e))), t._Helpers.invokeCallback(r, HTTPCodes$2.nativeIdentityRequest, "Login request sent to native sdk")) : t._IdentityAPIClient.sendIdentityRequest(d, "login", r, e, s.parseIdentityResponse, i) : (t._Helpers.invokeCallback(r, HTTPCodes$2.loggingDisabledOrMissingAPIKey, Messages$2.InformationMessages.AbandonLogEvent), t.Logger.verbose(Messages$2.InformationMessages.AbandonLogEvent));
      } else t._Helpers.invokeCallback(r, HTTPCodes$2.validationIssue, o.error), t.Logger.verbose(o);
    },

    /**
    * Initiate a modify request to the mParticle server
    * @method modify
    * @param {Object} identityApiData The identityApiData object as indicated [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/README.md#1-customize-the-sdk)
    * @param {Function} [callback] A callback function that is called when the modify request completes
    */
    modify: function modify(e, r) {
      var i,
          n = t.Identity.getCurrentUser(),
          o = t._Identity.IdentityRequest.preProcessIdentityRequest(e, r, "modify");

      n && (i = n.getMPID());
      var d = e && e.userIdentities ? e.userIdentities : {};

      if (o.valid) {
        var a = t._Identity.IdentityRequest.createModifyIdentityRequest(n ? n.getUserIdentities().userIdentities : {}, d, Constants.platform, Constants.sdkVendor, Constants.sdkVersion, t._Store.context);

        t._Helpers.canLog() ? t._Store.webviewBridgeEnabled ? (t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.Modify, JSON.stringify(t._Identity.IdentityRequest.convertToNative(e))), t._Helpers.invokeCallback(r, HTTPCodes$2.nativeIdentityRequest, "Modify request sent to native sdk")) : t._IdentityAPIClient.sendIdentityRequest(a, "modify", r, e, s.parseIdentityResponse, i) : (t._Helpers.invokeCallback(r, HTTPCodes$2.loggingDisabledOrMissingAPIKey, Messages$2.InformationMessages.AbandonLogEvent), t.Logger.verbose(Messages$2.InformationMessages.AbandonLogEvent));
      } else t._Helpers.invokeCallback(r, HTTPCodes$2.validationIssue, o.error), t.Logger.verbose(o);
    },

    /**
    * Returns a user object with methods to interact with the current user
    * @method getCurrentUser
    * @return {Object} the current user object
    */
    getCurrentUser: function getCurrentUser() {
      var e;
      return t._Store ? (e = t._Store.mpid, e ? (e = t._Store.mpid.slice(), s.mParticleUser(e, t._Store.isLoggedIn)) : t._Store.webviewBridgeEnabled ? s.mParticleUser() : null) : null;
    },

    /**
    * Returns a the user object associated with the mpid parameter or 'null' if no such
    * user exists
    * @method getUser
    * @param {String} mpid of the desired user
    * @return {Object} the user for  mpid
    */
    getUser: function getUser(e) {
      var r = t._Persistence.getPersistence();

      return r ? r[e] && !Constants.SDKv2NonMPIDCookieKeys.hasOwnProperty(e) ? s.mParticleUser(e) : null : null;
    },

    /**
    * Returns all users, including the current user and all previous users that are stored on the device.
    * @method getUsers
    * @return {Array} array of users
    */
    getUsers: function getUsers() {
      var e = t._Persistence.getPersistence(),
          r = [];

      if (e) for (var i in e) Constants.SDKv2NonMPIDCookieKeys.hasOwnProperty(i) || r.push(s.mParticleUser(i));
      return r.sort(function (e, t) {
        var s = e.getLastSeenTime() || 0,
            r = t.getLastSeenTime() || 0;
        return s > r ? -1 : 1;
      }), r;
    },

    /**
    * Initiate an alias request to the mParticle server
    * @method aliasUsers
    * @param {Object} aliasRequest  object representing an AliasRequest
    * @param {Function} [callback] A callback function that is called when the aliasUsers request completes
    */
    aliasUsers: function aliasUsers(e, s) {
      var r;
      if (e.destinationMpid && e.sourceMpid || (r = Messages$2.ValidationMessages.AliasMissingMpid), e.destinationMpid === e.sourceMpid && (r = Messages$2.ValidationMessages.AliasNonUniqueMpid), e.startTime && e.endTime || (r = Messages$2.ValidationMessages.AliasMissingTime), e.startTime > e.endTime && (r = Messages$2.ValidationMessages.AliasStartBeforeEndTime), r) return t.Logger.warning(r), void t._Helpers.invokeAliasCallback(s, HTTPCodes$2.validationIssue, r);
      if (!t._Helpers.canLog()) t._Helpers.invokeAliasCallback(s, HTTPCodes$2.loggingDisabledOrMissingAPIKey, Messages$2.InformationMessages.AbandonAliasUsers), t.Logger.verbose(Messages$2.InformationMessages.AbandonAliasUsers);else if (t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.Alias, JSON.stringify(t._Identity.IdentityRequest.convertAliasToNative(e))), t._Helpers.invokeAliasCallback(s, HTTPCodes$2.nativeIdentityRequest, "Alias request sent to native sdk");else {
        t.Logger.verbose(Messages$2.InformationMessages.StartingAliasRequest + ": " + e.sourceMpid + " -> " + e.destinationMpid);

        var i = t._Identity.IdentityRequest.createAliasNetworkRequest(e);

        t._IdentityAPIClient.sendAliasRequest(i, s);
      }
    },

    /**
    Create a default AliasRequest for 2 MParticleUsers. This will construct the request
    using the sourceUser's firstSeenTime as the startTime, and its lastSeenTime as the endTime.
    In the unlikely scenario that the sourceUser does not have a firstSeenTime, which will only
    be the case if they have not been the current user since this functionality was added, the 
    startTime will be populated with the earliest firstSeenTime out of any stored user. Similarly,
    if the sourceUser does not have a lastSeenTime, the endTime will be populated with the current time
    There is a limit to how old the startTime can be, represented by the config field 'aliasMaxWindow', in days.
    If the startTime falls before the limit, it will be adjusted to the oldest allowed startTime. 
    In rare cases, where the sourceUser's lastSeenTime also falls outside of the aliasMaxWindow limit, 
    after applying this adjustment it will be impossible to create an aliasRequest passes the aliasUsers() 
    validation that the startTime must be less than the endTime 
    */
    createAliasRequest: function createAliasRequest(e, s) {
      try {
        if (!s || !e) return t.Logger.error("'destinationUser' and 'sourceUser' must both be present"), null;
        var r = e.getFirstSeenTime();
        r || t.Identity.getUsers().forEach(function (e) {
          e.getFirstSeenTime() && (!r || e.getFirstSeenTime() < r) && (r = e.getFirstSeenTime());
        });

        var i = new Date().getTime() - 1e3 * (60 * (60 * (24 * t._Store.SDKConfig.aliasMaxWindow))),
            n = e.getLastSeenTime() || new Date().getTime(); //if the startTime is greater than $maxAliasWindow ago, adjust the startTime to the earliest allowed


        return r < i && (r = i, n < r && t.Logger.warning("Source User has not been seen in the last " + t._Store.SDKConfig.maxAliasWindow + " days, Alias Request will likely fail")), {
          destinationMpid: s.getMPID(),
          sourceMpid: e.getMPID(),
          startTime: r,
          endTime: n
        };
      } catch (s) {
        return t.Logger.error("There was a problem with creating an alias request: " + s), null;
      }
    }
  }, this.mParticleUser = function (e, s) {
    var r = this;
    return {
      /**
      * Get user identities for current user
      * @method getUserIdentities
      * @return {Object} an object with userIdentities as its key
      */
      getUserIdentities: function getUserIdentities() {
        var s = {},
            r = t._Persistence.getUserIdentities(e);

        for (var i in r) r.hasOwnProperty(i) && (s[Types.IdentityType.getIdentityName(t._Helpers.parseNumber(i))] = r[i]);

        return {
          userIdentities: s
        };
      },

      /**
      * Get the MPID of the current user
      * @method getMPID
      * @return {String} the current user MPID as a string
      */
      getMPID: function getMPID() {
        return e;
      },

      /**
      * Sets a user tag
      * @method setUserTag
      * @param {String} tagName
      */
      setUserTag: function setUserTag(e) {
        return t._Helpers.Validators.isValidKeyValue(e) ? void this.setUserAttribute(e, null) : void t.Logger.error(Messages$2.ErrorMessages.BadKey);
      },

      /**
      * Removes a user tag
      * @method removeUserTag
      * @param {String} tagName
      */
      removeUserTag: function removeUserTag(e) {
        return t._Helpers.Validators.isValidKeyValue(e) ? void this.removeUserAttribute(e) : void t.Logger.error(Messages$2.ErrorMessages.BadKey);
      },

      /**
      * Sets a user attribute
      * @method setUserAttribute
      * @param {String} key
      * @param {String} value
      */
      setUserAttribute: function setUserAttribute(s, i) {
        var n, o, d, a;

        if (t._SessionManager.resetSessionTimer(), t._Helpers.canLog()) {
          if (!t._Helpers.Validators.isValidAttributeValue(i)) return void t.Logger.error(Messages$2.ErrorMessages.BadAttribute);
          if (!t._Helpers.Validators.isValidKeyValue(s)) return void t.Logger.error(Messages$2.ErrorMessages.BadKey);
          if (t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.SetUserAttribute, JSON.stringify({
            key: s,
            value: i
          }));else {
            n = t._Persistence.getPersistence(), o = this.getAllUserAttributes();

            var g = t._Helpers.findKeyInObject(o, s);

            g ? (a = !1, d = o[g], delete o[g]) : a = !0, o[s] = i, n && n[e] && (n[e].ua = o, t._Persistence.savePersistence(n, e)), r.sendUserAttributeChangeEvent(s, i, d, a, !1, this), t._Forwarders.initForwarders(r.IdentityAPI.getCurrentUser().getUserIdentities(), t._APIClient.prepareForwardingStats), t._Forwarders.handleForwarderUserAttributes("setUserAttribute", s, i);
          }
        }
      },

      /**
      * Set multiple user attributes
      * @method setUserAttributes
      * @param {Object} user attribute object with keys of the attribute type, and value of the attribute value
      */
      setUserAttributes: function setUserAttributes(e) {
        if (t._SessionManager.resetSessionTimer(), !t._Helpers.isObject(e)) t.Logger.error("Must pass an object into setUserAttributes. You passed a " + _typeof(e));else if (t._Helpers.canLog()) for (var s in e) e.hasOwnProperty(s) && this.setUserAttribute(s, e[s]);
      },

      /**
      * Removes a specific user attribute
      * @method removeUserAttribute
      * @param {String} key
      */
      removeUserAttribute: function removeUserAttribute(s) {
        var i, n;
        if (t._SessionManager.resetSessionTimer(), !t._Helpers.Validators.isValidKeyValue(s)) return void t.Logger.error(Messages$2.ErrorMessages.BadKey);
        if (t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.RemoveUserAttribute, JSON.stringify({
          key: s,
          value: null
        }));else {
          i = t._Persistence.getPersistence(), n = this.getAllUserAttributes();

          var o = t._Helpers.findKeyInObject(n, s);

          o && (s = o);
          var d = n[s] ? n[s].toString() : null;
          delete n[s], i && i[e] && (i[e].ua = n, t._Persistence.savePersistence(i, e)), r.sendUserAttributeChangeEvent(s, null, d, !1, !0, this), t._Forwarders.initForwarders(r.IdentityAPI.getCurrentUser().getUserIdentities(), t._APIClient.prepareForwardingStats), t._Forwarders.handleForwarderUserAttributes("removeUserAttribute", s, null);
        }
      },

      /**
      * Sets a list of user attributes
      * @method setUserAttributeList
      * @param {String} key
      * @param {Array} value an array of values
      */
      setUserAttributeList: function setUserAttributeList(s, n) {
        var o, d, a, g, l;
        if (t._SessionManager.resetSessionTimer(), !t._Helpers.Validators.isValidKeyValue(s)) return void t.Logger.error(Messages$2.ErrorMessages.BadKey);
        if (!Array.isArray(n)) return void t.Logger.error("The value you passed in to setUserAttributeList must be an array. You passed in a " + ("undefined" == typeof value ? "undefined" : _typeof(value)));
        var u = n.slice();
        if (t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.SetUserAttributeList, JSON.stringify({
          key: s,
          value: u
        }));else {
          o = t._Persistence.getPersistence(), d = this.getAllUserAttributes();

          var p = t._Helpers.findKeyInObject(d, s); // If the new attributeList length is different previous, then there is a change event.
          // Loop through new attributes list, see if they are all in the same index as previous user attributes list
          // If there are any changes, break, and immediately send a userAttributeChangeEvent with full array as a value


          if (p ? (g = !1, a = d[p], delete d[p]) : g = !0, d[s] = u, o && o[e] && (o[e].ua = d, t._Persistence.savePersistence(o, e)), !a || !Array.isArray(a)) l = !0;else if (n.length !== a.length) l = !0;else for (var c = 0; c < n.length; c++) if (a[c] !== n[c]) {
            l = !0;
            break;
          }
          l && r.sendUserAttributeChangeEvent(s, n, a, g, !1, this), t._Forwarders.initForwarders(r.IdentityAPI.getCurrentUser().getUserIdentities(), t._APIClient.prepareForwardingStats), t._Forwarders.handleForwarderUserAttributes("setUserAttribute", s, u);
        }
      },

      /**
      * Removes all user attributes
      * @method removeAllUserAttributes
      */
      removeAllUserAttributes: function removeAllUserAttributes() {
        var e;
        if (t._SessionManager.resetSessionTimer(), t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.RemoveAllUserAttributes);else if (e = this.getAllUserAttributes(), t._Forwarders.initForwarders(r.IdentityAPI.getCurrentUser().getUserIdentities(), t._APIClient.prepareForwardingStats), e) for (var s in e) e.hasOwnProperty(s) && t._Forwarders.handleForwarderUserAttributes("removeUserAttribute", s, null), this.removeUserAttribute(s);
      },

      /**
      * Returns all user attribute keys that have values that are arrays
      * @method getUserAttributesLists
      * @return {Object} an object of only keys with array values. Example: { attr1: [1, 2, 3], attr2: ['a', 'b', 'c'] }
      */
      getUserAttributesLists: function getUserAttributesLists() {
        var e,
            t = {};

        for (var s in e = this.getAllUserAttributes(), e) e.hasOwnProperty(s) && Array.isArray(e[s]) && (t[s] = e[s].slice());

        return t;
      },

      /**
      * Returns all user attributes
      * @method getAllUserAttributes
      * @return {Object} an object of all user attributes. Example: { attr1: 'value1', attr2: ['a', 'b', 'c'] }
      */
      getAllUserAttributes: function getAllUserAttributes() {
        var s = {},
            r = t._Persistence.getAllUserAttributes(e);

        if (r) for (var i in r) r.hasOwnProperty(i) && (s[i] = Array.isArray(r[i]) ? r[i].slice() : r[i]);
        return s;
      },

      /**
      * Returns the cart object for the current user
      * @method getCart
      * @return a cart object
      */
      getCart: function getCart() {
        return t.Logger.warning("Deprecated function Identity.getCurrentUser().getCart() will be removed in future releases"), r.mParticleUserCart(e);
      },

      /**
      * Returns the Consent State stored locally for this user.
      * @method getConsentState
      * @return a ConsentState object
      */
      getConsentState: function getConsentState() {
        return t._Persistence.getConsentState(e);
      },

      /**
      * Sets the Consent State stored locally for this user.
      * @method setConsentState
      * @param {Object} consent state
      */
      setConsentState: function setConsentState(s) {
        t._Persistence.saveUserConsentStateToCookies(e, s), t._Forwarders.initForwarders(this.getUserIdentities().userIdentities, t._APIClient.prepareForwardingStats), t._CookieSyncManager.attemptCookieSync(null, this.getMPID());
      },
      isLoggedIn: function isLoggedIn() {
        return s;
      },
      getLastSeenTime: function getLastSeenTime() {
        return t._Persistence.getLastSeenTime(e);
      },
      getFirstSeenTime: function getFirstSeenTime() {
        return t._Persistence.getFirstSeenTime(e);
      }
    };
  }, this.mParticleUserCart = function (e) {
    return {
      /**
      * Adds a cart product to the user cart
      * @method add
      * @param {Object} product the product
      * @param {Boolean} [logEvent] a boolean to log adding of the cart object. If blank, no logging occurs.
      * @deprecated
      */
      add: function add(s, r) {
        t.Logger.warning("Deprecated function Identity.getCurrentUser().getCart().add() will be removed in future releases");
        var i, n, o;
        if (o = Array.isArray(s) ? s.slice() : [s], o.forEach(function (e) {
          e.Attributes = t._Helpers.sanitizeAttributes(e.Attributes);
        }), t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.AddToCart, JSON.stringify(o));else {
          t._SessionManager.resetSessionTimer(), n = t._Persistence.getUserProductsFromLS(e), n = n.concat(o), !0 === r && t._Events.logProductActionEvent(Types.ProductActionType.AddToCart, o);
          n.length > t._Store.SDKConfig.maxProducts && (t.Logger.verbose("The cart contains " + n.length + " items. Only " + t._Store.SDKConfig.maxProducts + " can currently be saved in cookies."), n = n.slice(-t._Store.SDKConfig.maxProducts)), i = t._Persistence.getAllUserProductsFromLS(), i[e].cp = n, t._Persistence.setCartProducts(i);
        }
      },

      /**
      * Removes a cart product from the current user cart
      * @method remove
      * @param {Object} product the product
      * @param {Boolean} [logEvent] a boolean to log adding of the cart object. If blank, no logging occurs.
      * @deprecated
      */
      remove: function remove(s, r) {
        t.Logger.warning("Deprecated function Identity.getCurrentUser().getCart().remove() will be removed in future releases");
        var i,
            n,
            o = -1,
            d = null;
        if (t._Store.webviewBridgeEnabled) t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.RemoveFromCart, JSON.stringify(s));else {
          t._SessionManager.resetSessionTimer(), n = t._Persistence.getUserProductsFromLS(e), n && (n.forEach(function (e, t) {
            e.Sku === s.Sku && (o = t, d = e);
          }), -1 < o && (n.splice(o, 1), !0 === r && t._Events.logProductActionEvent(Types.ProductActionType.RemoveFromCart, d)));
          i = t._Persistence.getAllUserProductsFromLS(), i[e].cp = n, t._Persistence.setCartProducts(i);
        }
      },

      /**
      * Clears the user's cart
      * @method clear
      * @deprecated
      */
      clear: function clear() {
        t.Logger.warning("Deprecated function Identity.getCurrentUser().getCart().clear() will be removed in future releases");
        var s;
        t._Store.webviewBridgeEnabled ? t._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.ClearCart) : (t._SessionManager.resetSessionTimer(), s = t._Persistence.getAllUserProductsFromLS(), s && s[e] && s[e].cp && (s[e].cp = [], s[e].cp = [], t._Persistence.setCartProducts(s)));
      },

      /**
      * Returns all cart products
      * @method getCartProducts
      * @return {Array} array of cart products
      * @deprecated
      */
      getCartProducts: function getCartProducts() {
        return t.Logger.warning("Deprecated function Identity.getCurrentUser().getCart().getCartProducts() will be removed in future releases"), t._Persistence.getCartProducts(e);
      }
    };
  }, this.parseIdentityResponse = function (r, i, n, o, d) {
    var a,
        g,
        l,
        u,
        p = t.Identity.getUser(i),
        c = {},
        y = p ? p.getUserIdentities().userIdentities : {},
        I = t._Helpers.extend({}, y);

    t._Store.identityCallInFlight = !1;

    try {
      if (t.Logger.verbose("Parsing \"" + d + "\" identity response from server"), r.responseText && (l = JSON.parse(r.responseText), l.hasOwnProperty("is_logged_in") && (t._Store.isLoggedIn = l.is_logged_in)), (!p || p.getMPID() && l.mpid && l.mpid !== p.getMPID()) && (t._Store.mpid = l.mpid, p && t._Persistence.setLastSeenTime(i), !t._Persistence.getFirstSeenTime(l.mpid) && (g = !0), t._Persistence.setFirstSeenTime(l.mpid)), 200 === r.status) {
        if ("modify" === d) c = t._Identity.IdentityRequest.combineUserIdentities(y, o.userIdentities), t._Persistence.saveUserIdentitiesToPersistence(i, c);else {
          var _ = s.IdentityAPI.getUser(l.mpid),
              v = _ ? _.getUserIdentities().userIdentities : {},
              m = t._Helpers.extend({}, v);

          t.Logger.verbose("Successfully parsed Identity Response"), "identify" == d && p && l.mpid === p.getMPID() && t._Persistence.setFirstSeenTime(l.mpid), u = t._Store.currentSessionMPIDs.indexOf(l.mpid), t._Store.sessionId && l.mpid && i !== l.mpid && 0 > u && t._Store.currentSessionMPIDs.push(l.mpid), -1 < u && (t._Store.currentSessionMPIDs = t._Store.currentSessionMPIDs.slice(0, u).concat(t._Store.currentSessionMPIDs.slice(u + 1, t._Store.currentSessionMPIDs.length)), t._Store.currentSessionMPIDs.push(l.mpid)), t._CookieSyncManager.attemptCookieSync(i, l.mpid, g), s.checkIdentitySwap(i, l.mpid, t._Store.currentSessionMPIDs), o && o.userIdentities && Object.keys(o.userIdentities).length && (c = s.IdentityRequest.combineUserIdentities(v, o.userIdentities)), t._Persistence.saveUserIdentitiesToPersistence(l.mpid, c), t._Persistence.update(), t._Persistence.findPrevCookiesBasedOnUI(o), t._Store.context = l.context || t._Store.context;
        }
        if (a = t.Identity.getCurrentUser(), o && o.onUserAlias && t._Helpers.Validators.isFunction(o.onUserAlias)) try {
          t.Logger.warning("Deprecated function onUserAlias will be removed in future releases"), o.onUserAlias(p, a);
        } catch (s) {
          t.Logger.error("There was an error with your onUserAlias function - " + s);
        }

        var S = t._Persistence.getPersistence();

        a && (t._Persistence.storeDataInMemory(S, a.getMPID()), (!p || a.getMPID() !== p.getMPID() || p.isLoggedIn() !== a.isLoggedIn()) && t._Forwarders.initForwarders(a.getUserIdentities().userIdentities, t._APIClient.prepareForwardingStats), t._Forwarders.setForwarderUserIdentities(a.getUserIdentities().userIdentities), t._Forwarders.setForwarderOnIdentityComplete(a, d), t._Forwarders.setForwarderOnUserIdentified(a, d));
        var P = {};

        for (var b in c) P[Types.IdentityType.getIdentityName(t._Helpers.parseNumber(b))] = c[b];

        s.sendUserIdentityChangeEvent(P, d, l.mpid, "modify" === d ? I : m);
      }

      n ? 0 === r.status ? t._Helpers.invokeCallback(n, HTTPCodes$2.noHttpCoverage, l || null, a) : t._Helpers.invokeCallback(n, r.status, l || null, a) : l && l.errors && l.errors.length && t.Logger.error("Received HTTP response code of " + r.status + " - " + l.errors[0].message), t._APIClient.processQueuedEvents();
    } catch (s) {
      n && t._Helpers.invokeCallback(n, r.status, l || null), t.Logger.error("Error parsing JSON response from Identity server: " + s);
    }
  }, this.sendUserIdentityChangeEvent = function (e, r, i, n) {
    var o, d;
    if (i || "modify" === r) for (var a in o = this.IdentityAPI.getUser(i), e) if (n[a] !== e[a]) {
      var g = !n[a];
      d = s.createUserIdentityChange(a, e[a], n[a], g, o), t._APIClient.sendEventToServer(d);
    }
  }, this.createUserIdentityChange = function (e, s, r, i, n) {
    var o;
    return o = t._ServerModel.createEventObject({
      messageType: Types.MessageType.UserIdentityChange,
      userIdentityChanges: {
        New: {
          IdentityType: e,
          Identity: s,
          CreatedThisBatch: i
        },
        Old: {
          IdentityType: e,
          Identity: r,
          CreatedThisBatch: !1
        }
      },
      userInMemory: n
    }), o;
  }, this.sendUserAttributeChangeEvent = function (e, r, i, n, o, d) {
    var a = s.createUserAttributeChange(e, r, i, n, o, d);
    a && t._APIClient.sendEventToServer(a);
  }, this.createUserAttributeChange = function (e, s, r, i, n, o) {
    "undefined" == typeof r && (r = null);
    var d;
    return s !== r && (d = t._ServerModel.createEventObject({
      messageType: Types.MessageType.UserAttributeChange,
      userAttributeChanges: {
        UserAttributeName: e,
        New: s,
        Old: r,
        Deleted: n,
        IsNewAttribute: i
      }
    }, o)), d;
  };
}

var CCPAPurpose = Constants.CCPAPurpose;

function Consent(a) {
  var b = this; // this function is called when consent is required to
  // determine if a cookie sync should happen, or a
  // forwarder should be initialized
  // TODO: Refactor this method into a constructor

  this.isEnabledForUserConsent = function (a, b) {
    if (!a || !a.values || !a.values.length) return !0;
    if (!b) return !1;
    var c,
        d = {},
        e = b.getConsentState();

    if (e) {
      // the server hashes consent purposes in the following way:
      // GDPR - '1' + purpose name
      // CCPA - '2data_sale_opt_out' (there is only 1 purpose of data_sale_opt_out for CCPA)
      var f = e.getGDPRConsentState();
      if (f) for (var g in f) f.hasOwnProperty(g) && (c = KitFilterHelper.hashConsentPurposeConditionalForwarding("1", g), d[c] = f[g].Consented);
      var h = e.getCCPAConsentState();
      h && (c = KitFilterHelper.hashConsentPurposeConditionalForwarding("2", CCPAPurpose), d[c] = h.Consented);
    }

    var i = a.values.some(function (a) {
      var b = a.consentPurpose,
          c = a.hasConsented;
      return !!d.hasOwnProperty(b) && d[b] === c;
    });
    return a.includeOnMatch === i;
  }, this.createPrivacyConsent = function (b, c, d, e, f) {
    return "boolean" == typeof b ? c && isNaN(c) ? (a.Logger.error("Timestamp must be a valid number when constructing a Consent object."), null) : d && "string" != typeof d ? (a.Logger.error("Document must be a valid string when constructing a Consent object."), null) : e && "string" != typeof e ? (a.Logger.error("Location must be a valid string when constructing a Consent object."), null) : f && "string" != typeof f ? (a.Logger.error("Hardware ID must be a valid string when constructing a Consent object."), null) : {
      Consented: b,
      Timestamp: c || Date.now(),
      ConsentDocument: d,
      Location: e,
      HardwareId: f
    } : (a.Logger.error("Consented boolean is required when constructing a Consent object."), null);
  }, this.ConsentSerialization = {
    toMinifiedJsonObject: function toMinifiedJsonObject(a) {
      var b,
          c = {};

      if (a) {
        var d = a.getGDPRConsentState();
        if (d) for (var e in c.gdpr = {}, d) if (d.hasOwnProperty(e)) {
          var f = d[e];
          c.gdpr[e] = {}, "boolean" == typeof f.Consented && (c.gdpr[e].c = f.Consented), "number" == typeof f.Timestamp && (c.gdpr[e].ts = f.Timestamp), "string" == typeof f.ConsentDocument && (c.gdpr[e].d = f.ConsentDocument), "string" == typeof f.Location && (c.gdpr[e].l = f.Location), "string" == typeof f.HardwareId && (c.gdpr[e].h = f.HardwareId);
        }
        var g = a.getCCPAConsentState();
        g && (c.ccpa = (b = {}, b[CCPAPurpose] = {}, b), "boolean" == typeof g.Consented && (c.ccpa[CCPAPurpose].c = g.Consented), "number" == typeof g.Timestamp && (c.ccpa[CCPAPurpose].ts = g.Timestamp), "string" == typeof g.ConsentDocument && (c.ccpa[CCPAPurpose].d = g.ConsentDocument), "string" == typeof g.Location && (c.ccpa[CCPAPurpose].l = g.Location), "string" == typeof g.HardwareId && (c.ccpa[CCPAPurpose].h = g.HardwareId));
      }

      return c;
    },
    fromMinifiedJsonObject: function fromMinifiedJsonObject(a) {
      var c = b.createConsentState();
      if (a.gdpr) for (var d in a.gdpr) if (a.gdpr.hasOwnProperty(d)) {
        var e = b.createPrivacyConsent(a.gdpr[d].c, a.gdpr[d].ts, a.gdpr[d].d, a.gdpr[d].l, a.gdpr[d].h);
        c.addGDPRConsentState(d, e);
      }

      if (a.ccpa && a.ccpa.hasOwnProperty(CCPAPurpose)) {
        var f = b.createPrivacyConsent(a.ccpa[CCPAPurpose].c, a.ccpa[CCPAPurpose].ts, a.ccpa[CCPAPurpose].d, a.ccpa[CCPAPurpose].l, a.ccpa[CCPAPurpose].h);
        c.setCCPAConsentState(f);
      }

      return c;
    }
  }, this.createConsentState = function (c) {
    function d(a) {
      if ("string" != typeof a) return null;
      var b = a.trim();
      return b.length ? b.toLowerCase() : null;
    }
    /**
    * Invoke these methods on a consent state object.
    * <p>
    * Usage: const consent = mParticle.Consent.createConsentState()
    * <br>
    * consent.setGDPRCoonsentState()
    *
    * @class Consent
    */

    /**
    * Add a GDPR Consent State to the consent state object
    *
    * @method addGDPRConsentState
    * @param purpose [String] Data processing purpose that describes the type of processing done on the data subject’s data
    * @param gdprConsent [Object] A GDPR consent object created via mParticle.Consent.createGDPRConsent(...)
    */


    function e(c, e) {
      var f = d(c);
      if (!f) return a.Logger.error("Purpose must be a string."), this;
      if (!isObject(e)) return a.Logger.error("Invoked with a bad or empty consent object."), this;
      var g = b.createPrivacyConsent(e.Consented, e.Timestamp, e.ConsentDocument, e.Location, e.HardwareId);
      return g && (k[f] = g), this;
    }

    function f(a) {
      if (!a) k = {};else if (isObject(a)) for (var b in k = {}, a) a.hasOwnProperty(b) && this.addGDPRConsentState(b, a[b]);
      return this;
    }
    /**
    * Remove a GDPR Consent State to the consent state object
    *
    * @method removeGDPRConsentState
    * @param purpose [String] Data processing purpose that describes the type of processing done on the data subject’s data
    */


    function g(a) {
      var b = d(a);
      return b ? (delete k[b], this) : this;
    }
    /**
    * Gets the GDPR Consent State
    *
    * @method getGDPRConsentState
    * @return {Object} A GDPR Consent State
    */


    function h() {
      return Object.assign({}, k);
    }
    /**
    * Sets a CCPA Consent state (has a single purpose of 'data_sale_opt_out')
    *
    * @method setCCPAConsentState
    * @param {Object} ccpaConsent CCPA Consent State
    */


    function i(c) {
      if (!isObject(c)) return a.Logger.error("Invoked with a bad or empty CCPA consent object."), this;
      var d = b.createPrivacyConsent(c.Consented, c.Timestamp, c.ConsentDocument, c.Location, c.HardwareId);
      return d && (l[CCPAPurpose] = d), this;
    }
    /**
    * Gets the CCPA Consent State
    *
    * @method getCCPAConsentStatensent
    * @return {Object} A CCPA Consent State
    */

    /**
    * Removes CCPA from the consent state object
    *
    * @method removeCCPAConsentState
    */


    function j() {
      return delete l[CCPAPurpose], this;
    } // TODO: Can we remove this? It is deprecated.


    var k = {},
        l = {};

    if (c) {
      var m = b.createConsentState(); // TODO: Remove casting once `removeCCPAState` is removed;

      return m.setGDPRConsentState(c.getGDPRConsentState()), m.setCCPAConsentState(c.getCCPAConsentState()), m;
    }

    return {
      setGDPRConsentState: f,
      addGDPRConsentState: e,
      setCCPAConsentState: i,
      getCCPAConsentState: function a() {
        return l[CCPAPurpose];
      },
      getGDPRConsentState: h,
      removeGDPRConsentState: g,
      removeCCPAState: function b() {
        // @ts-ignore
        return a.Logger.warning("removeCCPAState is deprecated and will be removed in a future release; use removeCCPAConsentState instead"), j();
      },
      removeCCPAConsentState: j
    };
  };
}
/*
    TODO: Including this as a workaround because attempting to import it from
    @mparticle/data-planning-models directly creates a build error.
 */


var DataPlanMatchType = {
  ScreenView: "screen_view",
  CustomEvent: "custom_event",
  Commerce: "commerce",
  UserAttributes: "user_attributes",
  UserIdentities: "user_identities",
  ProductAction: "product_action",
  PromotionAction: "promotion_action",
  ProductImpression: "product_impression"
},
    KitBlocker =
/** @class */
function () {
  function a(a, b) {
    var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r = this; // if data plan is not requested, the data plan is {document: null}

    if (this.dataPlanMatchLookups = {}, this.blockEvents = !1, this.blockEventAttributes = !1, this.blockUserAttributes = !1, this.blockUserIdentities = !1, this.kitBlockingEnabled = !1, a && !a.document) return void (this.kitBlockingEnabled = !1);
    this.kitBlockingEnabled = !0, this.mpInstance = b, this.blockEvents = null === (e = null === (d = null === (c = null === a || void 0 === a ? void 0 : a.document) || void 0 === c ? void 0 : c.dtpn) || void 0 === d ? void 0 : d.blok) || void 0 === e ? void 0 : e.ev, this.blockEventAttributes = null === (h = null === (g = null === (f = null === a || void 0 === a ? void 0 : a.document) || void 0 === f ? void 0 : f.dtpn) || void 0 === g ? void 0 : g.blok) || void 0 === h ? void 0 : h.ea, this.blockUserAttributes = null === (k = null === (j = null === (i = null === a || void 0 === a ? void 0 : a.document) || void 0 === i ? void 0 : i.dtpn) || void 0 === j ? void 0 : j.blok) || void 0 === k ? void 0 : k.ua, this.blockUserIdentities = null === (n = null === (m = null === (l = null === a || void 0 === a ? void 0 : a.document) || void 0 === l ? void 0 : l.dtpn) || void 0 === m ? void 0 : m.blok) || void 0 === n ? void 0 : n.id;
    var s = null === (q = null === (p = null === (o = null === a || void 0 === a ? void 0 : a.document) || void 0 === o ? void 0 : o.dtpn) || void 0 === p ? void 0 : p.vers) || void 0 === q ? void 0 : q.version_document,
        t = null === s || void 0 === s ? void 0 : s.data_points;
    if (s) try {
      0 < (null === t || void 0 === t ? void 0 : t.length) && t.forEach(function (a) {
        return r.addToMatchLookups(a);
      });
    } catch (a) {
      this.mpInstance.Logger.error("There was an issue with the data plan: " + a);
    }
  }

  return a.prototype.addToMatchLookups = function (a) {
    var b, c, d;
    if (!a.match || !a.validator) return void this.mpInstance.Logger.warning("Data Plan Point is not valid' + ".concat(a)); // match keys for non product custom attribute related data points

    var e = this.generateMatchKey(a.match),
        f = this.getPlannedProperties(a.match.type, a.validator);
    this.dataPlanMatchLookups[e] = f, ((null === (b = null === a || void 0 === a ? void 0 : a.match) || void 0 === b ? void 0 : b.type) === DataPlanMatchType.ProductImpression || (null === (c = null === a || void 0 === a ? void 0 : a.match) || void 0 === c ? void 0 : c.type) === DataPlanMatchType.ProductAction || (null === (d = null === a || void 0 === a ? void 0 : a.match) || void 0 === d ? void 0 : d.type) === DataPlanMatchType.PromotionAction) && (e = this.generateProductAttributeMatchKey(a.match), f = this.getProductProperties(a.match.type, a.validator), this.dataPlanMatchLookups[e] = f);
  }, a.prototype.generateMatchKey = function (a) {
    var b = a.criteria || "";

    switch (a.type) {
      case DataPlanMatchType.CustomEvent:
        var c = b;
        return [DataPlanMatchType.CustomEvent, c.custom_event_type, c.event_name].join(":");

      case DataPlanMatchType.ScreenView:
        return [DataPlanMatchType.ScreenView, "", b.screen_name].join(":");

      case DataPlanMatchType.ProductAction:
        return [a.type, b.action].join(":");

      case DataPlanMatchType.PromotionAction:
        return [a.type, b.action].join(":");

      case DataPlanMatchType.ProductImpression:
        return [a.type, b.action].join(":");

      case DataPlanMatchType.UserIdentities:
      case DataPlanMatchType.UserAttributes:
        return [a.type].join(":");

      default:
        return null;
    }
  }, a.prototype.generateProductAttributeMatchKey = function (a) {
    var b = a.criteria || "";

    switch (a.type) {
      case DataPlanMatchType.ProductAction:
        return [a.type, b.action, "ProductAttributes"].join(":");

      case DataPlanMatchType.PromotionAction:
        return [a.type, b.action, "ProductAttributes"].join(":");

      case DataPlanMatchType.ProductImpression:
        return [a.type, "ProductAttributes"].join(":");

      default:
        return null;
    }
  }, a.prototype.getPlannedProperties = function (a, b) {
    var c, d, e, f, g, h, i, j, k, l;

    switch (a) {
      case DataPlanMatchType.CustomEvent:
      case DataPlanMatchType.ScreenView:
      case DataPlanMatchType.ProductAction:
      case DataPlanMatchType.PromotionAction:
      case DataPlanMatchType.ProductImpression:
        if (k = null === (f = null === (e = null === (d = null === (c = null === b || void 0 === b ? void 0 : b.definition) || void 0 === c ? void 0 : c.properties) || void 0 === d ? void 0 : d.data) || void 0 === e ? void 0 : e.properties) || void 0 === f ? void 0 : f.custom_attributes, k) {
          if (!0 === k.additionalProperties || void 0 === k.additionalProperties) return !0;

          for (var m, n = {}, o = 0, p = Object.keys(k.properties); o < p.length; o++) m = p[o], n[m] = !0;

          return n;
        }

        return !1 !== (null === (i = null === (h = null === (g = null === b || void 0 === b ? void 0 : b.definition) || void 0 === g ? void 0 : g.properties) || void 0 === h ? void 0 : h.data) || void 0 === i ? void 0 : i.additionalProperties) || {};

      case DataPlanMatchType.UserAttributes:
      case DataPlanMatchType.UserIdentities:
        if (l = null === (j = null === b || void 0 === b ? void 0 : b.definition) || void 0 === j ? void 0 : j.additionalProperties, !0 === l || void 0 === l) return !0;

        for (var m, n = {}, q = b.definition.properties, r = 0, s = Object.keys(q); r < s.length; r++) m = s[r], n[m] = !0;

        return n;

      default:
        return null;
    }
  }, a.prototype.getProductProperties = function (a, b) {
    var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;

    switch (a) {
      case DataPlanMatchType.ProductImpression:
        //product item attributes
        if (v = null === (l = null === (k = null === (j = null === (i = null === (h = null === (g = null === (f = null === (e = null === (d = null === (c = null === b || void 0 === b ? void 0 : b.definition) || void 0 === c ? void 0 : c.properties) || void 0 === d ? void 0 : d.data) || void 0 === e ? void 0 : e.properties) || void 0 === f ? void 0 : f.product_impressions) || void 0 === g ? void 0 : g.items) || void 0 === h ? void 0 : h.properties) || void 0 === i ? void 0 : i.products) || void 0 === j ? void 0 : j.items) || void 0 === k ? void 0 : k.properties) || void 0 === l ? void 0 : l.custom_attributes, !1 === (null === v || void 0 === v ? void 0 : v.additionalProperties)) {
          for (var w, x = {}, y = 0, z = Object.keys(null === v || void 0 === v ? void 0 : v.properties); y < z.length; y++) w = z[y], x[w] = !0;

          return x;
        }

        return !0;

      case DataPlanMatchType.ProductAction:
      case DataPlanMatchType.PromotionAction:
        //product item attributes
        if (v = null === (u = null === (t = null === (s = null === (r = null === (q = null === (p = null === (o = null === (n = null === (m = null === b || void 0 === b ? void 0 : b.definition) || void 0 === m ? void 0 : m.properties) || void 0 === n ? void 0 : n.data) || void 0 === o ? void 0 : o.properties) || void 0 === p ? void 0 : p.product_action) || void 0 === q ? void 0 : q.properties) || void 0 === r ? void 0 : r.products) || void 0 === s ? void 0 : s.items) || void 0 === t ? void 0 : t.properties) || void 0 === u ? void 0 : u.custom_attributes, v && !1 === v.additionalProperties) {
          for (var w, x = {}, A = 0, B = Object.keys(null === v || void 0 === v ? void 0 : v.properties); A < B.length; A++) w = B[A], x[w] = !0;

          return x;
        }

        return !0;

      default:
        return null;
    }
  }, a.prototype.getMatchKey = function (a) {
    switch (a.event_type) {
      case dist.EventTypeEnum.screenView:
        var b = a;
        return b.data ? ["screen_view", "", b.data.screen_name].join(":") : null;

      case dist.EventTypeEnum.commerceEvent:
        var c = a,
            d = [];

        if (c && c.data) {
          var e = c.data,
              f = e.product_action,
              g = e.product_impressions,
              h = e.promotion_action;
          f ? (d.push(DataPlanMatchType.ProductAction), d.push(f.action)) : h ? (d.push(DataPlanMatchType.PromotionAction), d.push(h.action)) : g && d.push(DataPlanMatchType.ProductImpression);
        }

        return d.join(":");

      case dist.EventTypeEnum.customEvent:
        var i = a;
        return i.data ? ["custom_event", i.data.custom_event_type, i.data.event_name].join(":") : null;

      default:
        return null;
    }
  }, a.prototype.getProductAttributeMatchKey = function (a) {
    switch (a.event_type) {
      case dist.EventTypeEnum.commerceEvent:
        var b = [],
            c = a.data,
            d = c.product_action,
            e = c.product_impressions,
            f = c.promotion_action;
        return d ? (b.push(DataPlanMatchType.ProductAction), b.push(d.action), b.push("ProductAttributes")) : f ? (b.push(DataPlanMatchType.PromotionAction), b.push(f.action), b.push("ProductAttributes")) : e && (b.push(DataPlanMatchType.ProductImpression), b.push("ProductAttributes")), b.join(":");

      default:
        return null;
    }
  }, a.prototype.createBlockedEvent = function (a) {
    /*
    return a transformed event based on event/event attributes,
    then product attributes if applicable, then user attributes,
    then the user identities
    */
    try {
      return a && (a = this.transformEventAndEventAttributes(a)), a && a.EventDataType === Types.MessageType.Commerce && (a = this.transformProductAttributes(a)), a && (a = this.transformUserAttributes(a), a = this.transformUserIdentities(a)), a;
    } catch (b) {
      return a;
    }
  }, a.prototype.transformEventAndEventAttributes = function (a) {
    var b = __assign({}, a),
        c = convertEvent(b),
        d = this.getMatchKey(c),
        e = this.dataPlanMatchLookups[d];

    if (this.blockEvents && !e)
      /*
      If the event is not planned, it doesn't exist in dataPlanMatchLookups
      and should be blocked (return null to not send anything to forwarders)
      */
      return null;

    if (this.blockEventAttributes) {
      /*
      matchedEvent is set to `true` if additionalProperties is `true`
      otherwise, delete attributes that exist on event.EventAttributes
      that aren't on
      */
      if (!0 === e) return b;

      if (e) {
        for (var f, g = 0, h = Object.keys(b.EventAttributes); g < h.length; g++) f = h[g], e[f] || delete b.EventAttributes[f];

        return b;
      }

      return b;
    }

    return b;
  }, a.prototype.transformProductAttributes = function (a) {
    function b(a, b) {
      b.forEach(function (b) {
        for (var c, d = 0, e = Object.keys(b.Attributes); d < e.length; d++) c = e[d], a[c] || delete b.Attributes[c];
      });
    }

    var c,
        d = __assign({}, a),
        e = convertEvent(d),
        f = this.getProductAttributeMatchKey(e),
        g = this.dataPlanMatchLookups[f];

    if (this.blockEvents && !g)
      /*
      If the event is not planned, it doesn't exist in dataPlanMatchLookups
      and should be blocked (return null to not send anything to forwarders)
      */
      return null;

    if (this.blockEventAttributes) {
      /*
      matchedEvent is set to `true` if additionalProperties is `true`
      otherwise, delete attributes that exist on event.EventAttributes
      that aren't on
      */
      if (!0 === g) return d;

      if (g) {
        switch (a.EventCategory) {
          case Types.CommerceEventType.ProductImpression:
            d.ProductImpressions.forEach(function (a) {
              b(g, null === a || void 0 === a ? void 0 : a.ProductList);
            });
            break;

          case Types.CommerceEventType.ProductPurchase:
            b(g, null === (c = d.ProductAction) || void 0 === c ? void 0 : c.ProductList);
            break;

          default:
            this.mpInstance.Logger.warning("Product Not Supported ");
        }

        return d;
      }

      return d;
    }

    return d;
  }, a.prototype.transformUserAttributes = function (a) {
    var b = __assign({}, a);

    if (this.blockUserAttributes) {
      /*
      If the user attribute is not found in the matchedAttributes
      then remove it from event.UserAttributes as it is blocked
      */
      var c = this.dataPlanMatchLookups.user_attributes;
      if (this.mpInstance._Helpers.isObject(c)) for (var d, e = 0, f = Object.keys(b.UserAttributes); e < f.length; e++) d = f[e], c[d] || delete b.UserAttributes[d];
    }

    return b;
  }, a.prototype.isAttributeKeyBlocked = function (a) {
    /* used when an attribute is added to the user */
    if (!this.blockUserAttributes) return !1;

    if (this.blockUserAttributes) {
      var b = this.dataPlanMatchLookups.user_attributes;
      if (!0 === b) return !1;
      if (!b[a]) return !0;
    }

    return !1;
  }, a.prototype.isIdentityBlocked = function (a) {
    /* used when an attribute is added to the user */
    if (!this.blockUserIdentities) return !1;

    if (this.blockUserIdentities) {
      var b = this.dataPlanMatchLookups.user_identities;
      if (!0 === b) return !1;
      if (!b[a]) return !0;
    } else return !1;

    return !1;
  }, a.prototype.transformUserIdentities = function (a) {
    var b,
        c = this,
        d = __assign({}, a);
    /*
    If the user identity is not found in matchedIdentities
    then remove it from event.UserIdentities as it is blocked.
    event.UserIdentities is of type [{Identity: 'id1', Type: 7}, ...]
    and so to compare properly in matchedIdentities, each Type needs
    to be converted to an identityName
    */


    if (this.blockUserIdentities) {
      var e = this.dataPlanMatchLookups.user_identities;
      this.mpInstance._Helpers.isObject(e) && (null === (b = null === d || void 0 === d ? void 0 : d.UserIdentities) || void 0 === b ? void 0 : b.length) && d.UserIdentities.forEach(function (a, b) {
        var f = Types.IdentityType.getIdentityName(c.mpInstance._Helpers.parseNumber(a.Type));
        e[f] || d.UserIdentities.splice(b, 1);
      });
    }

    return d;
  }, a;
}();

function ConfigAPIClient() {
  this.getSDKConfiguration = function (a, b, c, d) {
    var e;

    try {
      var f = function xhrCallback() {
        4 === g.readyState && (200 === g.status ? (b = d._Helpers.extend({}, b, JSON.parse(g.responseText)), c(a, b, d), d.Logger.verbose("Successfully received configuration from server")) : (c(a, b, d), d.Logger.verbose("Issue with receiving configuration from server, received HTTP Code of " + g.status)));
      },
          g = d._Helpers.createXHR(f);

      e = "https://" + d._Store.SDKConfig.configUrl + a + "/config?env=", e += b.isDevelopmentMode ? "1" : "0";
      var h = b.dataPlan;
      h && (h.planId && (e = e + "&plan_id=" + h.planId || ""), h.planVersion && (e = e + "&plan_version=" + h.planVersion || "")), g && (g.open("get", e), g.send(null));
    } catch (f) {
      c(a, b, d), d.Logger.error("Error getting forwarder configuration from mParticle servers.");
    }
  };
}

var HTTPCodes$1 = Constants.HTTPCodes,
    Messages$1 = Constants.Messages;

function IdentityAPIClient(a) {
  this.sendAliasRequest = function (b, c) {
    var d,
        e = function xhrCallback() {
      if (4 === d.readyState) {
        //only parse error messages from failing requests
        if (a.Logger.verbose("Received " + d.statusText + " from server"), 200 !== d.status && 202 !== d.status && d.responseText) {
          var b = JSON.parse(d.responseText);

          if (b.hasOwnProperty("message")) {
            var e = b.message;
            return void a._Helpers.invokeAliasCallback(c, d.status, e);
          }
        }

        a._Helpers.invokeAliasCallback(c, d.status);
      }
    };

    if (a.Logger.verbose(Messages$1.InformationMessages.SendAliasHttp), d = a._Helpers.createXHR(e), d) try {
      d.open("post", a._Helpers.createServiceUrl(a._Store.SDKConfig.aliasUrl, a._Store.devToken) + "/Alias"), d.send(JSON.stringify(b));
    } catch (b) {
      a._Helpers.invokeAliasCallback(c, HTTPCodes$1.noHttpCoverage, b), a.Logger.error("Error sending alias request to mParticle servers. " + b);
    }
  }, this.sendIdentityRequest = function (b, c, d, e, f, g) {
    var h,
        i,
        j = function xhrCallback() {
      4 === h.readyState && (a.Logger.verbose("Received " + h.statusText + " from server"), f(h, i, d, e, c));
    };

    if (a.Logger.verbose(Messages$1.InformationMessages.SendIdentityBegin), !b) return void a.Logger.error(Messages$1.ErrorMessages.APIRequestEmpty);
    if (a.Logger.verbose(Messages$1.InformationMessages.SendIdentityHttp), h = a._Helpers.createXHR(j), h) try {
      a._Store.identityCallInFlight ? a._Helpers.invokeCallback(d, HTTPCodes$1.activeIdentityRequest, "There is currently an Identity request processing. Please wait for this to return before requesting again") : (i = g || null, "modify" === c ? h.open("post", a._Helpers.createServiceUrl(a._Store.SDKConfig.identityUrl) + g + "/" + c) : h.open("post", a._Helpers.createServiceUrl(a._Store.SDKConfig.identityUrl) + c), h.setRequestHeader("Content-Type", "application/json"), h.setRequestHeader("x-mp-key", a._Store.devToken), a._Store.identityCallInFlight = !0, h.send(JSON.stringify(b)));
    } catch (b) {
      a._Store.identityCallInFlight = !1, a._Helpers.invokeCallback(d, HTTPCodes$1.noHttpCoverage, b), a.Logger.error("Error sending identity request to servers with status code " + h.status + " - " + b);
    }
  };
}

var Messages = Constants.Messages,
    HTTPCodes = Constants.HTTPCodes;
/**
* <p>All of the following methods can be called on the primary mParticle class. In version 2.10.0, we introduced <a href="https://docs.mparticle.com/developers/sdk/web/multiple-instances/">multiple instances</a>. If you are using multiple instances (self hosted environments only), you should call these methods on each instance.</p>
* <p>In current versions of mParticle, if your site has one instance, that instance name is 'default_instance'. Any methods called on mParticle on a site with one instance will be mapped to the `default_instance`.</p>
* <p>This is for simplicity and backwards compatibility. For example, calling mParticle.logPageView() automatically maps to mParticle.getInstance('default_instance').logPageView().</p>
* <p>If you have multiple instances, instances must first be initialized and then a method can be called on that instance. For example:</p>
* <code>
*  mParticle.init('apiKey', config, 'another_instance');
*  mParticle.getInstance('another_instance').logPageView();
* </code>
*
* @class mParticle & mParticleInstance
*/

function mParticleInstance(a) {
  var b = this; // These classes are for internal use only. Not documented for public consumption
  // required for forwarders once they reference the mparticle instance

  /**
       * Resets the SDK to an uninitialized state and removes cookies/localStorage. You MUST call mParticle.init(apiKey, window.mParticle.config)
       * before any other mParticle methods or the SDK will not function as intended.
       * @method setLogLevel
       * @param {String} logLevel verbose, warning, or none. By default, `warning` is chosen.
       */

  /**
  * Resets the SDK to an uninitialized state and removes cookies/localStorage. You MUST call mParticle.init(apiKey, window.mParticle.config)
  * before any other mParticle methods or the SDK will not function as intended.
  * @method reset
  */

  /**
  * A callback method that is invoked after mParticle is initialized.
  * @method ready
  * @param {Function} function A function to be called after mParticle is initialized
  */

  /**
  * Returns the current mParticle environment setting
  * @method getEnvironment
  * @returns {String} mParticle environment setting
  */

  /**
  * Returns the mParticle SDK version number
  * @method getVersion
  * @return {String} mParticle SDK version number
  */

  /**
  * Sets the app version
  * @method setAppVersion
  * @param {String} version version number
  */

  /**
  * Sets the device id
  * @method setDeviceId
  * @param {String} name device ID (UUIDv4-formatted string)
  */

  /**
  * Returns a boolean for whether or not the SDKhas been fully initialized
  * @method isInitialized
  * @return {Boolean} a boolean for whether or not the SDK has been fully initialized
  */

  /**
  * Gets the app name
  * @method getAppName
  * @return {String} App name
  */

  /**
  * Sets the app name
  * @method setAppName
  * @param {String} name App Name
  */

  /**
  * Gets the app version
  * @method getAppVersion
  * @return {String} App version
  */

  /**
  * Stops tracking the location of the user
  * @method stopTrackingLocation
  */

  /**
  * Starts tracking the location of the user
  * @method startTrackingLocation
  * @param {Function} [callback] A callback function that is called when the location is either allowed or rejected by the user. A position object of schema {coords: {latitude: number, longitude: number}} is passed to the callback
  */

  /**
  * Sets the position of the user
  * @method setPosition
  * @param {Number} lattitude lattitude digit
  * @param {Number} longitude longitude digit
  */

  /**
  * Starts a new session
  * @method startNewSession
  */

  /**
  * Ends the current session
  * @method endSession
  */

  /**
  * Logs a Base Event to mParticle's servers
  * @param {Object} event Base Event Object
  * @param {Object} [eventOptions] For Event-level Configuration Options
  */

  /**
  * Logs an event to mParticle's servers
  * @method logEvent
  * @param {String} eventName The name of the event
  * @param {Number} [eventType] The eventType as seen [here](http://docs.mparticle.com/developers/sdk/web/event-tracking#event-type)
  * @param {Object} [eventInfo] Attributes for the event
  * @param {Object} [customFlags] Additional customFlags
  * @param {Object} [eventOptions] For Event-level Configuration Options
  */

  /**
  * Used to log custom errors
  *
  * @method logError
  * @param {String or Object} error The name of the error (string), or an object formed as follows {name: 'exampleName', message: 'exampleMessage', stack: 'exampleStack'}
  * @param {Object} [attrs] Custom attrs to be passed along with the error event; values must be string, number, or boolean
  */

  /**
  * Logs `click` events
  * @method logLink
  * @param {String} selector The selector to add a 'click' event to (ex. #purchase-event)
  * @param {String} [eventName] The name of the event
  * @param {Number} [eventType] The eventType as seen [here](http://docs.mparticle.com/developers/sdk/javascript/event-tracking#event-type)
  * @param {Object} [eventInfo] Attributes for the event
  */

  /**
  * Logs `submit` events
  * @method logForm
  * @param {String} selector The selector to add the event handler to (ex. #search-event)
  * @param {String} [eventName] The name of the event
  * @param {Number} [eventType] The eventType as seen [here](http://docs.mparticle.com/developers/sdk/javascript/event-tracking#event-type)
  * @param {Object} [eventInfo] Attributes for the event
  */

  /**
  * Logs a page view
  * @method logPageView
  * @param {String} eventName The name of the event. Defaults to 'PageView'.
  * @param {Object} [attrs] Attributes for the event
  * @param {Object} [customFlags] Custom flags for the event
  * @param {Object} [eventOptions] For Event-level Configuration Options
  */

  /**
  * Forces an upload of the batch
  * @method upload
  */

  /**
  * Invoke these methods on the mParticle.Consent object.
  * Example: mParticle.Consent.createConsentState()
  *
  * @class mParticle.Consent
  */

  /**
  * Invoke these methods on the mParticle.eCommerce object.
  * Example: mParticle.eCommerce.createImpresion(...)
  * @class mParticle.eCommerce
  */

  /**
  * Sets a session attribute
  * @method setSessionAttribute
  * @param {String} key key for session attribute
  * @param {String or Number} value value for session attribute
  */

  /**
  * Set opt out of logging
  * @method setOptOut
  * @param {Boolean} isOptingOut boolean to opt out or not. When set to true, opt out of logging.
  */

  /**
  * Set or remove the integration attributes for a given integration ID.
  * Integration attributes are keys and values specific to a given integration. For example,
  * many integrations have their own internal user/device ID. mParticle will store integration attributes
  * for a given device, and will be able to use these values for server-to-server communication to services.
  * This is often useful when used in combination with a server-to-server feed, allowing the feed to be enriched
  * with the necessary integration attributes to be properly forwarded to the given integration.
  * @method setIntegrationAttribute
  * @param {Number} integrationId mParticle integration ID
  * @param {Object} attrs a map of attributes that will replace any current attributes. The keys are predefined by mParticle.
  * Please consult with the mParticle docs or your solutions consultant for the correct value. You may
  * also pass a null or empty map here to remove all of the attributes.
  */

  /**
  * Get integration attributes for a given integration ID.
  * @method getIntegrationAttributes
  * @param {Number} integrationId mParticle integration ID
  * @return {Object} an object map of the integrationId's attributes
  */
  // Used by our forwarders

  /*
          An integration delay is a workaround that prevents events from being sent when it is necessary to do so.
          Some server side integrations require a client side value to be included in the payload to successfully 
          forward.  This value can only be pulled from the client side partner SDK.
  
          During the kit initialization, the kit:
          * sets an integration delay to `true`
          * grabs the required value from the partner SDK,
          * sets it via `setIntegrationAttribute`
          * sets the integration delay to `false`
  
          The core SDK can then read via `isDelayedByIntegration` to no longer delay sending events.
  
          This integration attribute is now on the batch payload for the server side to read.
  
          If there is no delay, then the events sent before an integration attribute is included would not
          be forwarded successfully server side.
      */
  // Internal use only. Used by our wrapper SDKs to identify themselves during initialization.

  this._instanceName = a, this._NativeSdkHelpers = new NativeSdkHelpers(this), this._SessionManager = new SessionManager(this), this._Persistence = new _Persistence(this), this._Helpers = new Helpers(this), this._Events = new Events(this), this._CookieSyncManager = new cookieSyncManager(this), this._ServerModel = new ServerModel(this), this._Ecommerce = new Ecommerce(this), this._ForwardingStatsUploader = new forwardingStatsUploader(this), this._Consent = new Consent(this), this._IdentityAPIClient = new IdentityAPIClient(this), this._preInit = {
    readyQueue: [],
    integrationDelays: {},
    forwarderConstructors: []
  }, this.IdentityType = Types.IdentityType, this.EventType = Types.EventType, this.CommerceEventType = Types.CommerceEventType, this.PromotionType = Types.PromotionActionType, this.ProductActionType = Types.ProductActionType, this._Identity = new Identity(this), this.Identity = this._Identity.IdentityAPI, this.generateHash = this._Helpers.generateHash, this.getDeviceId = this._Persistence.getDeviceId, "undefined" != typeof window && window.mParticle && window.mParticle.config && window.mParticle.config.hasOwnProperty("rq") && (this._preInit.readyQueue = window.mParticle.config.rq), this.init = function (a, b) {
    // config code - Fetch config when requestConfig = true, otherwise, proceed with SDKInitialization
    // Since fetching the configuration is asynchronous, we must pass completeSDKInitialization
    // to it for it to be run after fetched
    return b || console.warn("You did not pass a config object to init(). mParticle will not initialize properly"), runPreConfigFetchInitialization(this, a, b), b ? void (!b.hasOwnProperty("requestConfig") || b.requestConfig ? new ConfigAPIClient().getSDKConfiguration(a, b, completeSDKInitialization, this) : completeSDKInitialization(a, b, this)) : void console.error("No config available on the window, please pass a config object to mParticle.init()");
  }, this.setLogLevel = function (a) {
    b.Logger.setLogLevel(a);
  }, this.reset = function (a) {
    try {
      a._Persistence.resetPersistence(), a._Store && delete a._Store;
    } catch (a) {
      console.error("Cannot reset mParticle", a);
    }
  }, this._resetForTests = function (a, b, c) {
    c._Store && delete c._Store, c._Store = new Store(a, c), c._Store.isLocalStorageAvailable = c._Persistence.determineLocalStorageAvailability(window.localStorage), c._Events.stopTracking(), b || c._Persistence.resetPersistence(), c._Persistence.forwardingStatsBatches.uploadsTable = {}, c._Persistence.forwardingStatsBatches.forwardingStatsEventQueue = [], c._preInit = {
      readyQueue: [],
      pixelConfigurations: [],
      integrationDelays: {},
      forwarderConstructors: [],
      isDevelopmentMode: !1
    };
  }, this.ready = function (a) {
    b.isInitialized() && "function" == typeof a ? a() : b._preInit.readyQueue.push(a);
  }, this.getEnvironment = function () {
    return b._Store.SDKConfig.isDevelopmentMode ? Types.Environment.Development : Types.Environment.Production;
  }, this.getVersion = function () {
    return Constants.sdkVersion;
  }, this.setAppVersion = function (a) {
    var c = queueIfNotInitialized(function () {
      b.setAppVersion(a);
    }, b);
    c || (b._Store.SDKConfig.appVersion = a, b._Persistence.update());
  }, this.setDeviceId = function (a) {
    var c = queueIfNotInitialized(function () {
      b.setDeviceId(a);
    }, b);
    c || this._Persistence.setDeviceId(a);
  }, this.isInitialized = function () {
    return !!b._Store && b._Store.isInitialized;
  }, this.getAppName = function () {
    return b._Store.SDKConfig.appName;
  }, this.setAppName = function (a) {
    var c = queueIfNotInitialized(function () {
      b.setAppName(a);
    }, b);
    c || (b._Store.SDKConfig.appName = a);
  }, this.getAppVersion = function () {
    return b._Store.SDKConfig.appVersion;
  }, this.stopTrackingLocation = function () {
    b._SessionManager.resetSessionTimer(), b._Events.stopTracking();
  }, this.startTrackingLocation = function (a) {
    b._Helpers.Validators.isFunction(a) || b.Logger.warning("Warning: Location tracking is triggered, but not including a callback into the `startTrackingLocation` may result in events logged too quickly and not being associated with a location."), b._SessionManager.resetSessionTimer(), b._Events.startTracking(a);
  }, this.setPosition = function (a, c) {
    var d = queueIfNotInitialized(function () {
      b.setPosition(a, c);
    }, b);
    d || (b._SessionManager.resetSessionTimer(), "number" == typeof a && "number" == typeof c ? b._Store.currentPosition = {
      lat: a,
      lng: c
    } : b.Logger.error("Position latitude and/or longitude must both be of type number"));
  }, this.startNewSession = function () {
    b._SessionManager.startNewSession();
  }, this.endSession = function () {
    // Sends true as an over ride vs when endSession is called from the setInterval
    b._SessionManager.endSession(!0);
  }, this.logBaseEvent = function (a, c) {
    var d = queueIfNotInitialized(function () {
      b.logBaseEvent(a, c);
    }, b);
    if (!d) return (b._SessionManager.resetSessionTimer(), "string" != typeof a.name) ? void b.Logger.error(Messages.ErrorMessages.EventNameInvalidType) : (a.eventType || (a.eventType = Types.EventType.Unknown), b._Helpers.canLog() ? void b._Events.logEvent(a, c) : void b.Logger.error(Messages.ErrorMessages.LoggingDisabled));
  }, this.logEvent = function (a, c, d, e, f) {
    var g = queueIfNotInitialized(function () {
      b.logEvent(a, c, d, e, f);
    }, b);
    if (!g) return (b._SessionManager.resetSessionTimer(), "string" != typeof a) ? void b.Logger.error(Messages.ErrorMessages.EventNameInvalidType) : (c || (c = Types.EventType.Unknown), b._Helpers.isEventType(c) ? b._Helpers.canLog() ? void b._Events.logEvent({
      messageType: Types.MessageType.PageEvent,
      name: a,
      data: d,
      eventType: c,
      customFlags: e
    }, f) : void b.Logger.error(Messages.ErrorMessages.LoggingDisabled) : void b.Logger.error("Invalid event type: " + c + ", must be one of: \n" + JSON.stringify(Types.EventType)));
  }, this.logError = function (a, c) {
    var d = queueIfNotInitialized(function () {
      b.logError(a, c);
    }, b);

    if (!d && (b._SessionManager.resetSessionTimer(), !!a)) {
      "string" == typeof a && (a = {
        message: a
      });
      var e = {
        m: a.message ? a.message : a,
        s: "Error",
        t: a.stack || null
      };

      if (c) {
        var f = b._Helpers.sanitizeAttributes(c, e.m);

        for (var g in f) e[g] = f[g];
      }

      b._Events.logEvent({
        messageType: Types.MessageType.CrashReport,
        name: a.name ? a.name : "Error",
        data: e,
        eventType: Types.EventType.Other
      });
    }
  }, this.logLink = function (a, c, d, e) {
    b._Events.addEventHandler("click", a, c, e, d);
  }, this.logForm = function (a, c, d, e) {
    b._Events.addEventHandler("submit", a, c, e, d);
  }, this.logPageView = function (a, c, d, e) {
    var f = queueIfNotInitialized(function () {
      b.logPageView(a, c, d, e);
    }, b);

    if (!f) {
      if (b._SessionManager.resetSessionTimer(), b._Helpers.canLog()) {
        if (b._Helpers.Validators.isStringOrNumber(a) || (a = "PageView"), !c) c = {
          hostname: window.location.hostname,
          title: window.document.title
        };else if (!b._Helpers.isObject(c)) return void b.Logger.error("The attributes argument must be an object. A " + _typeof(c) + " was entered. Please correct and retry.");
        if (d && !b._Helpers.isObject(d)) return void b.Logger.error("The customFlags argument must be an object. A " + _typeof(d) + " was entered. Please correct and retry.");
      }

      b._Events.logEvent({
        messageType: Types.MessageType.PageView,
        name: a,
        data: c,
        eventType: Types.EventType.Unknown,
        customFlags: d
      }, e);
    }
  }, this.upload = function () {
    b._Helpers.canLog() && (b._Store.webviewBridgeEnabled ? b._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.Upload) : b._APIClient.uploader.prepareAndUpload(!1, !1));
  }, this.Consent = {
    /**
    * Creates a CCPA Opt Out Consent State.
    *
    * @method createCCPAConsent
    * @param {Boolean} optOut true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
    * @param {Number} timestamp Unix time (likely to be Date.now())
    * @param {String} consentDocument document version or experience that the user may have consented to
    * @param {String} location location where the user gave consent
    * @param {String} hardwareId hardware ID for the device or browser used to give consent. This property exists only to provide additional context and is not used to identify users
    * @return {Object} CCPA Consent State
    */
    createCCPAConsent: b._Consent.createPrivacyConsent,

    /**
    * Creates a GDPR Consent State.
    *
    * @method createGDPRConsent
    * @param {Boolean} consent true represents a "data sale opt-out", false represents the user declining a "data sale opt-out"
    * @param {Number} timestamp Unix time (likely to be Date.now())
    * @param {String} consentDocument document version or experience that the user may have consented to
    * @param {String} location location where the user gave consent
    * @param {String} hardwareId hardware ID for the device or browser used to give consent. This property exists only to provide additional context and is not used to identify users
    * @return {Object} GDPR Consent State
    */
    createGDPRConsent: b._Consent.createPrivacyConsent,

    /**
    * Creates a Consent State Object, which can then be used to set CCPA states, add multiple GDPR states, as well as get and remove these privacy states.
    *
    * @method createConsentState
    * @return {Object} ConsentState object
    */
    createConsentState: b._Consent.createConsentState
  }, this.eCommerce = {
    /**
    * Invoke these methods on the mParticle.eCommerce.Cart object.
    * Example: mParticle.eCommerce.Cart.add(...)
    * @class mParticle.eCommerce.Cart
    * @deprecated
    */
    Cart: {
      /**
      * Adds a product to the cart
      * @method add
      * @param {Object} product The product you want to add to the cart
      * @param {Boolean} [logEventBoolean] Option to log the event to mParticle's servers. If blank, no logging occurs.
      * @deprecated
      */
      add: function add(a, c) {
        b.Logger.warning("Deprecated function eCommerce.Cart.add() will be removed in future releases");
        var d,
            e = b.Identity.getCurrentUser();
        e && (d = e.getMPID()), b._Identity.mParticleUserCart(d).add(a, c);
      },

      /**
      * Removes a product from the cart
      * @method remove
      * @param {Object} product The product you want to add to the cart
      * @param {Boolean} [logEventBoolean] Option to log the event to mParticle's servers. If blank, no logging occurs.
      * @deprecated
      */
      remove: function remove(a, c) {
        b.Logger.warning("Deprecated function eCommerce.Cart.remove() will be removed in future releases");
        var d,
            e = b.Identity.getCurrentUser();
        e && (d = e.getMPID()), b._Identity.mParticleUserCart(d).remove(a, c);
      },

      /**
      * Clears the cart
      * @method clear
      * @deprecated
      */
      clear: function clear() {
        b.Logger.warning("Deprecated function eCommerce.Cart.clear() will be removed in future releases");
        var a,
            c = b.Identity.getCurrentUser();
        c && (a = c.getMPID()), b._Identity.mParticleUserCart(a).clear();
      }
    },

    /**
    * Sets the currency code
    * @for mParticle.eCommerce
    * @method setCurrencyCode
    * @param {String} code The currency code
    */
    setCurrencyCode: function setCurrencyCode(a) {
      var c = queueIfNotInitialized(function () {
        b.eCommerce.setCurrencyCode(a);
      }, b);
      return c ? void 0 : "string" == typeof a ? void (b._SessionManager.resetSessionTimer(), b._Store.currencyCode = a) : void b.Logger.error("Code must be a string");
    },

    /**
    * Creates a product
    * @for mParticle.eCommerce
    * @method createProduct
    * @param {String} name product name
    * @param {String} sku product sku
    * @param {Number} price product price
    * @param {Number} [quantity] product quantity. If blank, defaults to 1.
    * @param {String} [variant] product variant
    * @param {String} [category] product category
    * @param {String} [brand] product brand
    * @param {Number} [position] product position
    * @param {String} [coupon] product coupon
    * @param {Object} [attributes] product attributes
    */
    createProduct: function createProduct(a, c, d, e, f, g, h, i, j, k) {
      return b._Ecommerce.createProduct(a, c, d, e, f, g, h, i, j, k);
    },

    /**
    * Creates a promotion
    * @for mParticle.eCommerce
    * @method createPromotion
    * @param {String} id a unique promotion id
    * @param {String} [creative] promotion creative
    * @param {String} [name] promotion name
    * @param {Number} [position] promotion position
    */
    createPromotion: function createPromotion(a, c, d, e) {
      return b._Ecommerce.createPromotion(a, c, d, e);
    },

    /**
    * Creates a product impression
    * @for mParticle.eCommerce
    * @method createImpression
    * @param {String} name impression name
    * @param {Object} product the product for which an impression is being created
    */
    createImpression: function createImpression(a, c) {
      return b._Ecommerce.createImpression(a, c);
    },

    /**
    * Creates a transaction attributes object to be used with a checkout
    * @for mParticle.eCommerce
    * @method createTransactionAttributes
    * @param {String or Number} id a unique transaction id
    * @param {String} [affiliation] affilliation
    * @param {String} [couponCode] the coupon code for which you are creating transaction attributes
    * @param {Number} [revenue] total revenue for the product being purchased
    * @param {String} [shipping] the shipping method
    * @param {Number} [tax] the tax amount
    */
    createTransactionAttributes: function createTransactionAttributes(a, c, d, e, f, g) {
      return b._Ecommerce.createTransactionAttributes(a, c, d, e, f, g);
    },

    /**
    * Logs a checkout action
    * @for mParticle.eCommerce
    * @method logCheckout
    * @param {Number} step checkout step number
    * @param {String} option
    * @param {Object} attrs
    * @param {Object} [customFlags] Custom flags for the event
    * @deprecated
    */
    logCheckout: function logCheckout(a, c, d, e) {
      return b.Logger.warning("mParticle.logCheckout is deprecated, please use mParticle.logProductAction instead"), b._Store.isInitialized ? void (b._SessionManager.resetSessionTimer(), b._Events.logCheckoutEvent(a, c, d, e)) : void b.ready(function () {
        b.eCommerce.logCheckout(a, c, d, e);
      });
    },

    /**
    * Logs a product action
    * @for mParticle.eCommerce
    * @method logProductAction
    * @param {Number} productActionType product action type as found [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/src/types.js#L206-L218)
    * @param {Object} product the product for which you are creating the product action
    * @param {Object} [attrs] attributes related to the product action
    * @param {Object} [customFlags] Custom flags for the event
    * @param {Object} [transactionAttributes] Transaction Attributes for the event
    * @param {Object} [eventOptions] For Event-level Configuration Options
    */
    logProductAction: function logProductAction(a, c, d, e, f, g) {
      var h = queueIfNotInitialized(function () {
        b.eCommerce.logProductAction(a, c, d, e, f, g);
      }, b);
      h || (b._SessionManager.resetSessionTimer(), b._Events.logProductActionEvent(a, c, d, e, f, g));
    },

    /**
    * Logs a product purchase
    * @for mParticle.eCommerce
    * @method logPurchase
    * @param {Object} transactionAttributes transactionAttributes object
    * @param {Object} product the product being purchased
    * @param {Boolean} [clearCart] boolean to clear the cart after logging or not. Defaults to false
    * @param {Object} [attrs] other attributes related to the product purchase
    * @param {Object} [customFlags] Custom flags for the event
    * @deprecated
    */
    logPurchase: function logPurchase(a, c, d, e, f) {
      return b.Logger.warning("mParticle.logPurchase is deprecated, please use mParticle.logProductAction instead"), b._Store.isInitialized ? a && c ? void (b._SessionManager.resetSessionTimer(), b._Events.logPurchaseEvent(a, c, e, f)) : void b.Logger.error(Messages.ErrorMessages.BadLogPurchase) : void b.ready(function () {
        b.eCommerce.logPurchase(a, c, d, e, f);
      });
    },

    /**
    * Logs a product promotion
    * @for mParticle.eCommerce
    * @method logPromotion
    * @param {Number} type the promotion type as found [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/src/types.js#L275-L279)
    * @param {Object} promotion promotion object
    * @param {Object} [attrs] boolean to clear the cart after logging or not
    * @param {Object} [customFlags] Custom flags for the event
    * @param {Object} [eventOptions] For Event-level Configuration Options
    */
    logPromotion: function logPromotion(a, c, d, e, f) {
      var g = queueIfNotInitialized(function () {
        b.eCommerce.logPromotion(a, c, d, e, f);
      }, b);
      g || (b._SessionManager.resetSessionTimer(), b._Events.logPromotionEvent(a, c, d, e, f));
    },

    /**
    * Logs a product impression
    * @for mParticle.eCommerce
    * @method logImpression
    * @param {Object} impression product impression object
    * @param {Object} attrs attributes related to the impression log
    * @param {Object} [customFlags] Custom flags for the event
    * @param {Object} [eventOptions] For Event-level Configuration Options
    */
    logImpression: function logImpression(a, c, d, e) {
      var f = queueIfNotInitialized(function () {
        b.eCommerce.logImpression(a, c, d, e);
      }, b);
      f || (b._SessionManager.resetSessionTimer(), b._Events.logImpressionEvent(a, c, d, e));
    },

    /**
    * Logs a refund
    * @for mParticle.eCommerce
    * @method logRefund
    * @param {Object} transactionAttributes transaction attributes related to the refund
    * @param {Object} product product being refunded
    * @param {Boolean} [clearCart] boolean to clear the cart after refund is logged. Defaults to false.
    * @param {Object} [attrs] attributes related to the refund
    * @param {Object} [customFlags] Custom flags for the event
    * @deprecated
    */
    logRefund: function logRefund(a, c, d, e, f) {
      return b.Logger.warning("mParticle.logRefund is deprecated, please use mParticle.logProductAction instead"), b._Store.isInitialized ? void (b._SessionManager.resetSessionTimer(), b._Events.logRefundEvent(a, c, e, f)) : void b.ready(function () {
        b.eCommerce.logRefund(a, c, d, e, f);
      });
    },
    expandCommerceEvent: function expandCommerceEvent(a) {
      return b._Ecommerce.expandCommerceEvent(a);
    }
  }, this.setSessionAttribute = function (a, c) {
    var d = queueIfNotInitialized(function () {
      b.setSessionAttribute(a, c);
    }, b);

    if (!d && b._Helpers.canLog()) // Logs to cookie
      // And logs to in-memory object
      // Example: mParticle.setSessionAttribute('location', '33431');
      {
        if (!b._Helpers.Validators.isValidAttributeValue(c)) return void b.Logger.error(Messages.ErrorMessages.BadAttribute);
        if (!b._Helpers.Validators.isValidKeyValue(a)) return void b.Logger.error(Messages.ErrorMessages.BadKey);
        if (b._Store.webviewBridgeEnabled) b._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.SetSessionAttribute, JSON.stringify({
          key: a,
          value: c
        }));else {
          var e = b._Helpers.findKeyInObject(b._Store.sessionAttributes, a);

          e && (a = e), b._Store.sessionAttributes[a] = c, b._Persistence.update(), b._Forwarders.applyToForwarders("setSessionAttribute", [a, c]);
        }
      }
  }, this.setOptOut = function (a) {
    var c = queueIfNotInitialized(function () {
      b.setOptOut(a);
    }, b);
    c || (b._SessionManager.resetSessionTimer(), b._Store.isEnabled = !a, b._Events.logOptOut(), b._Persistence.update(), b._Store.activeForwarders.length && b._Store.activeForwarders.forEach(function (c) {
      if (c.setOptOut) {
        var d = c.setOptOut(a);
        d && b.Logger.verbose(d);
      }
    }));
  }, this.setIntegrationAttribute = function (a, c) {
    var d = queueIfNotInitialized(function () {
      b.setIntegrationAttribute(a, c);
    }, b);

    if (!d) {
      if ("number" != typeof a) return void b.Logger.error("integrationId must be a number");
      if (null === c) b._Store.integrationAttributes[a] = {};else {
        if (!b._Helpers.isObject(c)) return void b.Logger.error("Attrs must be an object with keys and values. You entered a " + _typeof(c));
        if (0 === Object.keys(c).length) b._Store.integrationAttributes[a] = {};else for (var e in c) if ("string" != typeof e) {
          b.Logger.error("Keys must be strings, you entered a " + _typeof(e));
          continue;
        } else if ("string" == typeof c[e]) b._Helpers.isObject(b._Store.integrationAttributes[a]) ? b._Store.integrationAttributes[a][e] = c[e] : (b._Store.integrationAttributes[a] = {}, b._Store.integrationAttributes[a][e] = c[e]);else {
          b.Logger.error("Values for integration attributes must be strings. You entered a " + _typeof(c[e]));
          continue;
        }
      }

      b._Persistence.update();
    }
  }, this.getIntegrationAttributes = function (a) {
    return b._Store.integrationAttributes[a] ? b._Store.integrationAttributes[a] : {};
  }, this.addForwarder = function (a) {
    b._preInit.forwarderConstructors.push(a);
  }, this.configurePixel = function (a) {
    b._Forwarders.configurePixel(a);
  }, this._getActiveForwarders = function () {
    return b._Store.activeForwarders;
  }, this._getIntegrationDelays = function () {
    return b._preInit.integrationDelays;
  }, this._setIntegrationDelay = function (a, c) {
    // If the integration delay is set to true, no further action needed
    if (b._preInit.integrationDelays[a] = c, !0 !== c) {
      // If the integration delay is set to false, check to see if there are any
      // other integration delays set to true.  It not, process the queued events/.
      var d = Object.keys(b._preInit.integrationDelays);

      if (0 !== d.length) {
        var e = d.some(function (a) {
          return !0 === b._preInit.integrationDelays[a];
        });
        e || b._APIClient.processQueuedEvents();
      }
    }
  }, this._setWrapperSDKInfo = function (a, c) {
    var d = queueIfNotInitialized(function () {
      b._setWrapperSDKInfo(a, c);
    }, b);
    d || (b._Store.wrapperSDKInfo === void 0 || !b._Store.wrapperSDKInfo.isInfoSet) && (b._Store.wrapperSDKInfo = {
      name: a,
      version: c,
      isInfoSet: !0
    });
  };
} // Some (server) config settings need to be returned before they are set on SDKConfig in a self hosted environment


function completeSDKInitialization(a, b, c) {
  var d = createKitBlocker(b, c);
  if (c._APIClient = new APIClient(c, d), c._Forwarders = new Forwarders(c, d), b.flags && b.flags.hasOwnProperty(Constants.FeatureFlags.EventBatchingIntervalMillis) && (c._Store.SDKConfig.flags[Constants.FeatureFlags.EventBatchingIntervalMillis] = b.flags[Constants.FeatureFlags.EventBatchingIntervalMillis]), c._Store.storageName = c._Helpers.createMainStorageName(b.workspaceToken), c._Store.prodStorageName = c._Helpers.createProductStorageName(b.workspaceToken), b.hasOwnProperty("workspaceToken") ? c._Store.SDKConfig.workspaceToken = b.workspaceToken : c.Logger.warning("You should have a workspaceToken on your config object for security purposes."), b.hasOwnProperty("requiredWebviewBridgeName") ? c._Store.SDKConfig.requiredWebviewBridgeName = b.requiredWebviewBridgeName : b.hasOwnProperty("workspaceToken") && (c._Store.SDKConfig.requiredWebviewBridgeName = b.workspaceToken), c._Store.webviewBridgeEnabled = c._NativeSdkHelpers.isWebviewEnabled(c._Store.SDKConfig.requiredWebviewBridgeName, c._Store.SDKConfig.minWebviewBridgeVersion), c._Store.configurationLoaded = !0, c._Store.webviewBridgeEnabled || c._Persistence.initializeStorage(), c._Store.webviewBridgeEnabled) c._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.SetSessionAttribute, JSON.stringify({
    key: "$src_env",
    value: "webview"
  })), a && c._NativeSdkHelpers.sendToNative(Constants.NativeSdkPaths.SetSessionAttribute, JSON.stringify({
    key: "$src_key",
    value: a
  }));else {
    var e; // If no initialIdentityRequest is passed in, we set the user identities to what is currently in cookies for the identify request

    if (c._Helpers.isObject(c._Store.SDKConfig.identifyRequest) && c._Helpers.isObject(c._Store.SDKConfig.identifyRequest.userIdentities) && 0 === Object.keys(c._Store.SDKConfig.identifyRequest.userIdentities).length || !c._Store.SDKConfig.identifyRequest) {
      var f = {};

      if (e = c.Identity.getCurrentUser(), e) {
        var g = e.getUserIdentities().userIdentities || {};

        for (var h in g) g.hasOwnProperty(h) && (f[h] = g[h]);
      }

      c._Store.SDKConfig.identifyRequest = {
        userIdentities: f
      };
    }

    e = c.Identity.getCurrentUser(), c._Helpers.getFeatureFlag(Constants.FeatureFlags.ReportBatching) && c._ForwardingStatsUploader.startForwardingStatsTimer(), c._Forwarders.processForwarders(b, c._APIClient.prepareForwardingStats), c._Forwarders.processPixelConfigs(b), c._SessionManager.initialize(), c._Events.logAST(), !c._Store.identifyCalled && c._Store.SDKConfig.identityCallback && e && e.getMPID() && c._Store.SDKConfig.identityCallback({
      httpCode: HTTPCodes.activeSession,
      getUser: function getUser() {
        return c._Identity.mParticleUser(e.getMPID());
      },
      getPreviousUser: function getPreviousUser() {
        var a = c.Identity.getUsers(),
            b = a.shift();
        return b && e && b.getMPID() === e.getMPID() && (b = a.shift()), b || null;
      },
      body: {
        mpid: e.getMPID(),
        is_logged_in: c._Store.isLoggedIn,
        matched_identities: e.getUserIdentities().userIdentities,
        context: null,
        is_ephemeral: !1
      }
    });
  }
  c._Store.isInitialized = !0, c._preInit.readyQueue && c._preInit.readyQueue.length && (c._preInit.readyQueue.forEach(function (a) {
    c._Helpers.Validators.isFunction(a) ? a() : Array.isArray(a) && processPreloadedItem(a, c);
  }), c._preInit.readyQueue = []), c._Store.isFirstRun && (c._Store.isFirstRun = !1);
}

function createKitBlocker(a, b) {
  var c, d, e, f;
  /*  There are three ways a data plan object for blocking can be passed to the SDK:
  1. Manually via config.dataPlanOptions (this takes priority)
  If not passed in manually, we user the server provided via either
  2. Snippet via /mparticle.js endpoint (config.dataPlan.document)
  3. Self hosting via /config endpoint (config.dataPlanResult)
  */

  return a.dataPlanOptions && (b.Logger.verbose("Customer provided data plan found"), f = a.dataPlanOptions, d = {
    document: {
      dtpn: {
        vers: f.dataPlanVersion,
        blok: {
          ev: f.blockEvents,
          ea: f.blockEventAttributes,
          ua: f.blockUserAttributes,
          id: f.blockUserIdentities
        }
      }
    }
  }), d || (a.dataPlan && a.dataPlan.document ? a.dataPlan.document.error_message ? e = a.dataPlan.document.error_message : (b.Logger.verbose("Data plan found from mParticle.js"), d = a.dataPlan) : a.dataPlanResult && (a.dataPlanResult.error_message ? e = a.dataPlanResult.error_message : (b.Logger.verbose("Data plan found from /config"), d = {
    document: a.dataPlanResult
  }))), e && b.Logger.error(e), d && (c = new KitBlocker(d, b)), c;
}

function runPreConfigFetchInitialization(a, b, c) {
  a.Logger = new Logger(c), a._Store = new Store(c, a), window.mParticle.Store = a._Store, a._Store.devToken = b || null, a.Logger.verbose(Messages.InformationMessages.StartingInitialization); // Check to see if localStorage is available before main configuration runs
  // since we will need this for the current implementation of user persistence
  // TODO: Refactor this when we refactor User Identity Persistence

  try {
    a._Store.isLocalStorageAvailable = a._Persistence.determineLocalStorageAvailability(window.localStorage);
  } catch (b) {
    a.Logger.warning("localStorage is not available, using cookies if available"), a._Store.isLocalStorageAvailable = !1;
  }
}

function processPreloadedItem(a, b) {
  var c = a,
      d = c.splice(0, 1)[0]; // if the first argument is a method on the base mParticle object, run it

  if (mParticle[c[0]]) mParticle[d].apply(this, c);else {
    var e = d.split(".");

    try {
      for (var f, g = mParticle, h = 0; h < e.length; h++) f = e[h], g = g[f];

      g.apply(this, c);
    } catch (a) {
      b.Logger.verbose("Unable to compute proper mParticle function " + a);
    }
  }
}

function queueIfNotInitialized(a, b) {
  return !b.isInitialized() && (b.ready(function () {
    a();
  }), !0);
} // This file is used ONLY for the mParticle ESLint plugin. It should NOT be used otherwise!


var mockFunction = function () {
  return null;
},
    _BatchValidator =
/** @class */
function () {
  function a() {}

  return a.prototype.getMPInstance = function () {
    return {
      // Certain Helper, Store, and Identity properties need to be mocked to be used in the `returnBatch` method
      _Helpers: {
        sanitizeAttributes: window.mParticle.getInstance()._Helpers.sanitizeAttributes,
        generateHash: function generateHash() {
          return "mockHash";
        },
        generateUniqueId: function generateUniqueId() {
          return "mockId";
        },
        extend: window.mParticle.getInstance()._Helpers.extend,
        createServiceUrl: mockFunction,
        parseNumber: mockFunction,
        isObject: mockFunction,
        returnConvertedBoolean: mockFunction,
        Validators: null
      },
      _resetForTests: mockFunction,
      _APIClient: null,
      MPSideloadedKit: null,
      _Consent: null,
      _Forwarders: null,
      _NativeSdkHelpers: null,
      _Persistence: null,
      _preInit: null,
      Consent: null,
      _ServerModel: null,
      _SessionManager: null,
      _Store: {
        sessionId: "mockSessionId",
        sideloadedKits: [],
        devToken: "test_dev_token",
        isFirstRun: !0,
        isEnabled: !0,
        sessionAttributes: {},
        currentSessionMPIDs: [],
        consentState: null,
        clientId: null,
        deviceId: null,
        serverSettings: {},
        dateLastEventSent: null,
        sessionStartDate: null,
        currentPosition: null,
        isTracking: !1,
        watchPositionId: null,
        cartProducts: [],
        eventQueue: [],
        currencyCode: null,
        globalTimer: null,
        context: null,
        configurationLoaded: !1,
        identityCallInFlight: !1,
        nonCurrentUserMPIDs: {},
        identifyCalled: !1,
        isLoggedIn: !1,
        cookieSyncDates: {},
        integrationAttributes: {},
        requireDelay: !0,
        isLocalStorageAvailable: null,
        integrationDelayTimeoutStart: null,
        storageName: null,
        prodStorageName: null,
        activeForwarders: [],
        kits: {},
        configuredForwarders: [],
        pixelConfigurations: [],
        wrapperSDKInfo: {
          name: "none",
          version: null,
          isInfoSet: !1
        },
        SDKConfig: {
          isDevelopmentMode: !1,
          onCreateBatch: mockFunction
        }
      },
      config: null,
      eCommerce: null,
      Identity: {
        getCurrentUser: mockFunction,
        IdentityAPI: {},
        identify: mockFunction,
        login: mockFunction,
        logout: mockFunction,
        modify: mockFunction
      },
      Logger: {
        verbose: mockFunction,
        error: mockFunction,
        warning: mockFunction
      },
      ProductActionType: null,
      ServerModel: null,
      addForwarder: mockFunction,
      generateHash: mockFunction,
      getAppVersion: mockFunction,
      getAppName: mockFunction,
      getInstance: mockFunction,
      getDeviceId: mockFunction,
      init: mockFunction,
      logBaseEvent: mockFunction,
      logEvent: mockFunction,
      logLevel: "none",
      setPosition: mockFunction,
      upload: mockFunction
    };
  }, a.prototype.createSDKEventFunction = function (a) {
    return new ServerModel(this.getMPInstance()).createEventObject(a);
  }, a.prototype.returnBatch = function (a) {
    var b = this,
        c = this.getMPInstance(),
        d = Array.isArray(a) ? a.map(function (a) {
      return b.createSDKEventFunction(a);
    }) : [this.createSDKEventFunction(a)],
        e = convertEvents("0", d, c);
    return e;
  }, a;
}();

var EventTypeEnum;

(function (a) {
  a[a.Unknown = 0] = "Unknown", a[a.Navigation = 1] = "Navigation", a[a.Location = 2] = "Location", a[a.Search = 3] = "Search", a[a.Transaction = 4] = "Transaction", a[a.UserContent = 5] = "UserContent", a[a.UserPreference = 6] = "UserPreference", a[a.Social = 7] = "Social", a[a.Other = 8] = "Other", a[a.Media = 9] = "Media";
})(EventTypeEnum || (EventTypeEnum = {})); // TODO: https://mparticle-eng.atlassian.net/browse/SQDSDKS-5403


var MessageType;

(function (a) {
  a[a.SessionStart = 1] = "SessionStart", a[a.SessionEnd = 2] = "SessionEnd", a[a.PageView = 3] = "PageView", a[a.PageEvent = 4] = "PageEvent", a[a.CrashReport = 5] = "CrashReport", a[a.OptOut = 6] = "OptOut", a[a.AppStateTransition = 10] = "AppStateTransition", a[a.Profile = 14] = "Profile", a[a.Commerce = 16] = "Commerce", a[a.UserAttributeChange = 17] = "UserAttributeChange", a[a.UserIdentityChange = 18] = "UserIdentityChange", a[a.Media = 20] = "Media";
})(MessageType || (MessageType = {}));

var IdentityType;

(function (a) {
  a[a.Other = 0] = "Other", a[a.CustomerId = 1] = "CustomerId", a[a.Facebook = 2] = "Facebook", a[a.Twitter = 3] = "Twitter", a[a.Google = 4] = "Google", a[a.Microsoft = 5] = "Microsoft", a[a.Yahoo = 6] = "Yahoo", a[a.Email = 7] = "Email", a[a.FacebookCustomAudienceId = 9] = "FacebookCustomAudienceId", a[a.Other2 = 10] = "Other2", a[a.Other3 = 11] = "Other3", a[a.Other4 = 12] = "Other4", a[a.Other5 = 13] = "Other5", a[a.Other6 = 14] = "Other6", a[a.Other7 = 15] = "Other7", a[a.Other8 = 16] = "Other8", a[a.Other9 = 17] = "Other9", a[a.Other10 = 18] = "Other10", a[a.MobileNumber = 19] = "MobileNumber", a[a.PhoneNumber2 = 20] = "PhoneNumber2", a[a.PhoneNumber3 = 21] = "PhoneNumber3";
})(IdentityType || (IdentityType = {}));

var MPSideloadedKit =
/** @class */
function () {
  function a(a) {
    this.filterDictionary = {
      eventTypeFilters: [],
      eventNameFilters: [],
      screenNameFilters: [],
      screenAttributeFilters: [],
      userIdentityFilters: [],
      userAttributeFilters: [],
      attributeFilters: [],
      consentRegulationFilters: [],
      consentRegulationPurposeFilters: [],
      messageTypeFilters: [],
      messageTypeStateFilters: [],
      // The below filtering members are optional, but we instantiate them
      // to simplify public method assignment
      filteringEventAttributeValue: {},
      filteringUserAttributeValue: {},
      filteringConsentRuleValues: {}
    }, this.kitInstance = a;
  }

  return a.prototype.addEventTypeFilter = function (a) {
    var b = KitFilterHelper.hashEventType(a);
    this.filterDictionary.eventTypeFilters.push(b);
  }, a.prototype.addEventNameFilter = function (a, b) {
    var c = KitFilterHelper.hashEventName(b, a);
    this.filterDictionary.eventNameFilters.push(c);
  }, a.prototype.addEventAttributeFilter = function (a, b, c) {
    var d = KitFilterHelper.hashEventAttributeKey(a, b, c);
    this.filterDictionary.attributeFilters.push(d);
  }, a.prototype.addScreenNameFilter = function (a) {
    var b = KitFilterHelper.hashEventName(a, EventTypeEnum.Unknown);
    this.filterDictionary.screenNameFilters.push(b);
  }, a.prototype.addScreenAttributeFilter = function (a, b) {
    var c = KitFilterHelper.hashEventAttributeKey(EventTypeEnum.Unknown, a, b);
    this.filterDictionary.screenAttributeFilters.push(c);
  }, a.prototype.addUserIdentityFilter = function (a) {
    var b = KitFilterHelper.hashUserIdentity(a);
    this.filterDictionary.userIdentityFilters.push(b);
  }, a.prototype.addUserAttributeFilter = function (a) {
    var b = KitFilterHelper.hashUserAttribute(a);
    this.filterDictionary.userAttributeFilters.push(b);
  }, a;
}();

Array.prototype.forEach || (Array.prototype.forEach = Polyfill.forEach), Array.prototype.map || (Array.prototype.map = Polyfill.map), Array.prototype.filter || (Array.prototype.filter = Polyfill.filter), Array.isArray || (Array.prototype.isArray = Polyfill.isArray);

function mParticle$1() {
  var a = this; // Only leaving this here in case any clients are trying to access mParticle.Store, to prevent from throwing

  /**
       * Initializes the mParticle instance. If no instanceName is provided, an instance name of `default_instance` will be used.
       * <p>
       * If you'd like to initiate multiple mParticle instances, first review our <a href="https://docs.mparticle.com/developers/sdk/web/multiple-instances/">doc site</a>, and ensure you pass a unique instance name as the third argument as shown below.
       * @method init
       * @param {String} apiKey your mParticle assigned API key
       * @param {Object} [config] an options object for additional configuration
       * @param {String} [instanceName] If you are self hosting the JS SDK and working with multiple instances, you would pass an instanceName to `init`. This instance will be selected when invoking other methods. See the above link to the doc site for more info and examples.
       */

  this.Store = {}, this._instances = {}, this.IdentityType = Types.IdentityType, this.EventType = Types.EventType, this.CommerceEventType = Types.CommerceEventType, this.PromotionType = Types.PromotionActionType, this.ProductActionType = Types.ProductActionType, this.MPSideloadedKit = MPSideloadedKit, "undefined" != typeof window && (this.isIOS = !!(window.mParticle && window.mParticle.isIOS) && window.mParticle.isIOS, this.config = window.mParticle && window.mParticle.config ? window.mParticle.config : {}), this.init = function (b, c, d) {
    !c && window.mParticle && window.mParticle.config && (console.warn("You did not pass a config object to mParticle.init(). Attempting to use the window.mParticle.config if it exists. Please note that in a future release, this may not work and mParticle will not initialize properly"), c = window.mParticle ? window.mParticle.config : {}), d = (d && 0 !== d.length ? d : Constants.DefaultInstance).toLowerCase();
    var e = a._instances[d];
    e === void 0 && (e = new mParticleInstance(b), a._instances[d] = e), e.init(b, c, d);
  }, this.getInstance = function (b) {
    var c;
    return b ? (c = a._instances[b.toLowerCase()], c ? c : (console.log("You tried to initialize an instance named " + b + ". This instance does not exist. Check your instance name or initialize a new instance with this name before calling it."), null)) : (b = Constants.DefaultInstance, c = a._instances[b], c || (c = new mParticleInstance(b), a._instances[Constants.DefaultInstance] = c), c);
  }, this.getDeviceId = function () {
    return a.getInstance().getDeviceId();
  }, this.setDeviceId = function (b) {
    return a.getInstance().setDeviceId(b);
  }, this.isInitialized = function () {
    return a.getInstance().isInitialized();
  }, this.startNewSession = function () {
    a.getInstance().startNewSession();
  }, this.endSession = function () {
    a.getInstance().endSession();
  }, this.setLogLevel = function (b) {
    a.getInstance().setLogLevel(b);
  }, this.ready = function (b) {
    a.getInstance().ready(b);
  }, this.setAppVersion = function (b) {
    a.getInstance().setAppVersion(b);
  }, this.getAppName = function () {
    return a.getInstance().getAppName();
  }, this.setAppName = function (b) {
    a.getInstance().setAppName(b);
  }, this.getAppVersion = function () {
    return a.getInstance().getAppVersion();
  }, this.getEnvironment = function () {
    return a.getInstance().getEnvironment();
  }, this.stopTrackingLocation = function () {
    a.getInstance().stopTrackingLocation();
  }, this.startTrackingLocation = function (b) {
    a.getInstance().startTrackingLocation(b);
  }, this.setPosition = function (b, c) {
    a.getInstance().setPosition(b, c);
  }, this.startNewSession = function () {
    a.getInstance().startNewSession();
  }, this.endSession = function () {
    a.getInstance().endSession();
  }, this.logBaseEvent = function (b, c) {
    a.getInstance().logBaseEvent(b, c);
  }, this.logEvent = function (b, c, d, e, f) {
    a.getInstance().logEvent(b, c, d, e, f);
  }, this.logError = function (b, c) {
    a.getInstance().logError(b, c);
  }, this.logLink = function (b, c, d, e) {
    a.getInstance().logLink(b, c, d, e);
  }, this.logForm = function (b, c, d, e) {
    a.getInstance().logForm(b, c, d, e);
  }, this.logPageView = function (b, c, d, e) {
    a.getInstance().logPageView(b, c, d, e);
  }, this.upload = function () {
    a.getInstance().upload();
  }, this.eCommerce = {
    Cart: {
      add: function add(b, c) {
        a.getInstance().eCommerce.Cart.add(b, c);
      },
      remove: function remove(b, c) {
        a.getInstance().eCommerce.Cart.remove(b, c);
      },
      clear: function clear() {
        a.getInstance().eCommerce.Cart.clear();
      }
    },
    setCurrencyCode: function setCurrencyCode(b) {
      a.getInstance().eCommerce.setCurrencyCode(b);
    },
    createProduct: function createProduct(b, c, d, e, f, g, h, i, j, k) {
      return a.getInstance().eCommerce.createProduct(b, c, d, e, f, g, h, i, j, k);
    },
    createPromotion: function createPromotion(b, c, d, e) {
      return a.getInstance().eCommerce.createPromotion(b, c, d, e);
    },
    createImpression: function createImpression(b, c) {
      return a.getInstance().eCommerce.createImpression(b, c);
    },
    createTransactionAttributes: function createTransactionAttributes(b, c, d, e, f, g) {
      return a.getInstance().eCommerce.createTransactionAttributes(b, c, d, e, f, g);
    },
    logCheckout: function logCheckout(b, c, d, e) {
      a.getInstance().eCommerce.logCheckout(b, c, d, e);
    },
    logProductAction: function logProductAction(b, c, d, e, f, g) {
      a.getInstance().eCommerce.logProductAction(b, c, d, e, f, g);
    },
    logPurchase: function logPurchase(b, c, d, e, f) {
      a.getInstance().eCommerce.logPurchase(b, c, d, e, f);
    },
    logPromotion: function logPromotion(b, c, d, e, f) {
      a.getInstance().eCommerce.logPromotion(b, c, d, e, f);
    },
    logImpression: function logImpression(b, c, d, e) {
      a.getInstance().eCommerce.logImpression(b, c, d, e);
    },
    logRefund: function logRefund(b, c, d, e, f) {
      a.getInstance().eCommerce.logRefund(b, c, d, e, f);
    },
    expandCommerceEvent: function expandCommerceEvent(b) {
      return a.getInstance().eCommerce.expandCommerceEvent(b);
    }
  }, this.setSessionAttribute = function (b, c) {
    a.getInstance().setSessionAttribute(b, c);
  }, this.setOptOut = function (b) {
    a.getInstance().setOptOut(b);
  }, this.setIntegrationAttribute = function (b, c) {
    a.getInstance().setIntegrationAttribute(b, c);
  }, this.getIntegrationAttributes = function (b) {
    return a.getInstance().getIntegrationAttributes(b);
  }, this.Identity = {
    HTTPCodes: a.getInstance().Identity.HTTPCodes,
    aliasUsers: function aliasUsers(b, c) {
      a.getInstance().Identity.aliasUsers(b, c);
    },
    createAliasRequest: function createAliasRequest(b, c) {
      return a.getInstance().Identity.createAliasRequest(b, c);
    },
    getCurrentUser: function getCurrentUser() {
      return a.getInstance().Identity.getCurrentUser();
    },
    getUser: function getUser(b) {
      return a.getInstance().Identity.getUser(b);
    },
    getUsers: function getUsers() {
      return a.getInstance().Identity.getUsers();
    },
    identify: function identify(b, c) {
      a.getInstance().Identity.identify(b, c);
    },
    login: function login(b, c) {
      a.getInstance().Identity.login(b, c);
    },
    logout: function logout(b, c) {
      a.getInstance().Identity.logout(b, c);
    },
    modify: function modify(b, c) {
      a.getInstance().Identity.modify(b, c);
    }
  }, this.sessionManager = {
    getSession: function getSession() {
      return a.getInstance()._SessionManager.getSession();
    }
  }, this.Consent = {
    createConsentState: function createConsentState() {
      return a.getInstance().Consent.createConsentState();
    },
    createGDPRConsent: function createGDPRConsent(b, c, d, e, f) {
      return a.getInstance().Consent.createGDPRConsent(b, c, d, e, f);
    },
    createCCPAConsent: function createCCPAConsent(b, c, d, e, f) {
      return a.getInstance().Consent.createGDPRConsent(b, c, d, e, f);
    }
  }, this.reset = function () {
    a.getInstance().reset(a.getInstance());
  }, this._resetForTests = function (b, c) {
    "boolean" == typeof c ? a.getInstance()._resetForTests(b, c, a.getInstance()) : a.getInstance()._resetForTests(b, !1, a.getInstance());
  }, this.configurePixel = function (b) {
    a.getInstance().configurePixel(b);
  }, this._setIntegrationDelay = function (b, c) {
    a.getInstance()._setIntegrationDelay(b, c);
  }, this._getIntegrationDelays = function () {
    return a.getInstance()._getIntegrationDelays();
  }, this.getVersion = function () {
    return a.getInstance().getVersion();
  }, this.generateHash = function (b) {
    return a.getInstance().generateHash(b);
  }, this.addForwarder = function (b) {
    a.getInstance().addForwarder(b);
  }, this._getActiveForwarders = function () {
    return a.getInstance()._getActiveForwarders();
  }, this._setWrapperSDKInfo = function (b, c) {
    a.getInstance()._setWrapperSDKInfo(b, c);
  };
}

var mparticleInstance = new mParticle$1();
exports.default = mparticleInstance;
"undefined" != typeof window && (window.mParticle = mparticleInstance, window.mParticle._BatchValidator = new _BatchValidator());
},{}],"../../node_modules/@mparticle/web-appboy-kit/dist/AppboyKit.common.js":[function(require,module,exports) {
var global = arguments[3];
Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var appboy_min = createCommonjsModule(function (module) {
/*
* Braze Web SDK v2.5.2
* (c) Braze, Inc. 2020 - http://braze.com
* License available at https://github.com/Appboy/appboy-web-sdk/blob/master/LICENSE
* Compiled on 2020-04-16
*/
(function(){(function(b,a){if(module.exports)module.exports=a();else if(b.appboy){var d=a(),c;for(c in d)b.appboy[c]=d[c];}else b.appboy=a();})("undefined"!==typeof self?self:this,function(){var appboyInterface={};var p,aa="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ba;if("function"==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={Gf:!0},fa={};try{fa.__proto__=da;ca=fa.Gf;break a}catch(a){}ca=!1;}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;}var ha=ba;
function ia(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(ha)ha(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d);}else a[c]=b[c];a.Kg=b.prototype;}var ja="undefined"!=typeof window&&window===this?this:"undefined"!=typeof commonjsGlobal&&null!=commonjsGlobal?commonjsGlobal:this,ka="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value);};
function la(a,b){if(b){var c=ja;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e];}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ka(c,a,{configurable:!0,writable:!0,value:b});}}
la("String.prototype.repeat",function(a){return a?a:function(b){if(null==this)throw new TypeError("The 'this' value for String.prototype.repeat must not be null or undefined");var c=this+"";if(0>b||1342177279<b)throw new RangeError("Invalid count value");b|=0;for(var d="";b;)if(b&1&&(d+=c),b>>>=1)c+=c;return d}});
var ma={zg:function(a){var b="=".repeat((4-a.length%4)%4);a=(a+b).replace(/\-/g,"+").replace(/_/g,"/");a=atob(a);b=new Uint8Array(a.length);for(var c=0;c<a.length;++c)b[c]=a.charCodeAt(c);return b}};var oa={Ya:function(){function a(b){var c=(Math.random().toString(16)+"000000000").substr(2,8);return b?"-"+c.substr(0,4)+"-"+c.substr(4,4):c}return a()+a(!0)+a(!0)+a()}};function pa(a){var b=v;this.Wd="undefined"===typeof window?self:window;this.o=a;this.w=b;}function qa(a){if("indexedDB"in a.Wd)return a.Wd.indexedDB}
function ra(a){try{if(null==qa(a))return !1;qa(a).open("Braze IndexedDB Support Test");if("undefined"!==typeof window){var b=window.Fg||window.vb||window.Hg;if(b&&b.cg&&b.cg.id)return a.w.info("Not using IndexedDB for storage because we are running inside an extension"),!1}return !0}catch(c){return a.w.info("Not using IndexedDB for storage due to following error: "+c),!1}}
function sa(a,b,c){var d=qa(a).open(a.o.F,a.o.VERSION);if(null==d)return "function"===typeof c&&c(),!1;d.onupgradeneeded=function(e){a.w.info("Upgrading indexedDB "+a.o.F+" to v"+a.o.VERSION+"...");e=e.target.result;for(var f in a.o.M)a.o.M.hasOwnProperty(f)&&!e.objectStoreNames.contains(a.o.M[f])&&e.createObjectStore(a.o.M[f]);};d.onsuccess=function(e){a.w.debug("Opened indexedDB "+a.o.F+" v"+a.o.VERSION);var f=e.target.result;f.onversionchange=function(){f.close();"function"===typeof c&&c();a.w.error("Needed to close the database unexpectedly because of an upgrade in another tab");};
b(f);};d.onerror=function(e){a.w.info("Could not open indexedDB "+a.o.F+" v"+a.o.VERSION+": "+e.target.errorCode);"function"===typeof c&&c();return !0};return !0}
pa.prototype.setItem=function(a,b,c,d,e){if(!ra(this))return "function"===typeof e&&e(),!1;var f=this;return sa(this,function(g){g.objectStoreNames.contains(a)?(g=g.transaction([a],"readwrite").objectStore(a).put(c,b),g.onerror=function(){f.w.error("Could not store object "+b+" in "+a+" on indexedDB "+f.o.F);"function"===typeof e&&e();},g.onsuccess=function(){f.w.debug("Stored object "+b+" in "+a+" on indexedDB "+f.o.F);"function"===typeof d&&d();}):(f.w.error("Could not store object "+b+" in "+a+" on indexedDB "+
f.o.F+" - "+a+" is not a valid objectStore"),"function"===typeof e&&e());},e)};
pa.prototype.getItem=function(a,b,c){if(!ra(this))return !1;var d=this;return sa(this,function(e){e.objectStoreNames.contains(a)?(e=e.transaction([a],"readonly").objectStore(a).get(b),e.onerror=function(){d.w.error("Could not retrieve object "+b+" in "+a+" on indexedDB "+d.o.F);},e.onsuccess=function(f){d.w.debug("Retrieved object "+b+" in "+a+" on indexedDB "+d.o.F);f=f.target.result;null!=f&&c(f);}):d.w.error("Could not retrieve object "+b+" in "+a+" on indexedDB "+d.o.F+" - "+a+" is not a valid objectStore");})};
function ta(a,b,c,d){ra(a)?sa(a,function(e){e.objectStoreNames.contains(b)?(e=e.transaction([b],"readonly").objectStore(b).openCursor(null,"prev"),e.onerror=function(){a.w.error("Could not open cursor for "+b+" on indexedDB "+a.o.F);"function"===typeof d&&d();},e.onsuccess=function(f){f=f.target.result;null!=f&&null!=f.value&&null!=f.key?(a.w.debug("Retrieved last record "+f.key+" in "+b+" on indexedDB "+a.o.F),c(f.key,f.value)):"function"===typeof d&&d();}):(a.w.error("Could not retrieve last record from "+
b+" on indexedDB "+a.o.F+" - "+b+" is not a valid objectStore"),"function"===typeof d&&d());},d):"function"===typeof d&&d();}
function ua(a,b,c){ra(a)&&sa(a,function(d){d.objectStoreNames.contains(b)?(d=d.transaction([b],"readwrite").objectStore(b)["delete"](c),d.onerror=function(){a.w.error("Could not delete record "+c+" from "+b+" on indexedDB "+a.o.F);},d.onsuccess=function(){a.w.debug("Deleted record "+c+" from "+b+" on indexedDB "+a.o.F);}):a.w.error("Could not delete record "+c+" from "+b+" on indexedDB "+a.o.F+" - "+b+" is not a valid objectStore");});}
function va(a,b,c){ra(a)&&sa(a,function(d){if(d.objectStoreNames.contains(b)){var e=d.transaction([b],"readwrite").objectStore(b);d=e.openCursor();var f=[];d.onerror=function(){0<f.length?(a.w.info("Cursor closed midway through for "+b+" on indexedDB "+a.o.F),c(f)):a.w.error("Could not open cursor for "+b+" on indexedDB "+a.o.F);};d.onsuccess=function(g){var h=g.target.result;null!=h?(null!=h.value&&null!=h.key&&(e["delete"](h.key).onsuccess=function(){f.push(h.value);}),h.continue()):0<f.length&&c(f);};}else a.w.error("Could not retrieve objects from "+
b+" on indexedDB "+a.o.F+" - "+b+" is not a valid objectStore");});}
pa.prototype.clearData=function(){if(!ra(this))return !1;var a=[],b;for(b in this.o.M)this.o.M.hasOwnProperty(b)&&this.o.M[b]!==this.o.M.Ic&&a.push(this.o.M[b]);var c=this;return sa(this,function(d){d=d.transaction(a,"readwrite");for(var e=0;e<a.length;e++){var f=d.objectStore(a[e]).clear();f.onsuccess=function(){c.w.debug("Cleared "+this.source.name+" on indexedDB "+c.o.F);};f.onerror=function(){c.w.error("Could not clear "+this.source.name+" on indexedDB "+c.o.F);};}d.oncomplete=function(){c.w.debug("Cleared all object stores on indexedDB "+
c.o.F);};d.onerror=function(){c.w.error("Could not clear object stores on indexedDB "+c.o.F);};})};var w={dd:function(a){if(void 0!==a||void 0===w.Ba)w.Ba=!!a;w.Sd||(w.Sd=!0);},yb:function(){w.Sd=!1;w.Ba=void 0;w.w=void 0;},pd:function(a){"function"!==typeof a?w.info("Ignoring setLogger call since logger is not a function"):(w.dd(),w.w=a);},sd:function(){w.dd();w.Ba?(console.log("Disabling Appboy logging"),w.Ba=!1):(console.log("Enabled Appboy logging"),w.Ba=!0);},debug:function(a){w.Ba&&null!=w.w&&w.w("Appboy: "+a);},info:function(a){w.Ba&&(a="Appboy: "+a,null!=w.w?w.w(a):console.log(a));},error:function(a){w.Ba&&
(a="Appboy SDK Error: "+a+" (v2.5.2)",null!=w.w?w.w(a):console.error(a));}};var B={CustomEvent:"ce",bf:"p",nf:"pc",Dg:"ca",df:"i",cf:"ie",Me:"cci",Oe:"ccic",Ke:"ccc",Le:"ccd",Id:"ss",rf:"se",af:"si",Bd:"sc",Ad:"sbc",$e:"sfe",Pe:"iec",kf:"lr",Ge:"uae",Je:"ci",Ie:"cc",hf:"lcaa",jf:"lcar",Re:"inc",Qe:"add",Se:"rem",Te:"set"},wa={Ze:"feed_displayed",Ne:"content_cards_displayed"},xa={Na:{F:"AppboyServiceWorkerAsyncStorage",VERSION:5,M:{Ue:"data",Fd:"pushClicks",Kc:"pushSubscribed",Cg:"fallbackDevice",He:"cardUpdates",Ic:"optOut"},Ub:1}},v=w;function ya(a,b,c,d){a=za(a);return -1===a.indexOf(b)?(v.error(c+" Valid values from "+d+' are "'+a.join('"/"')+'".'),!1):!0}function Aa(a){return Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)}function Ba(a){return "[object Date]"===Object.prototype.toString.call(a)}
function Ca(a){null==a&&(a=[]);for(var b=[],c=arguments.length,d=0,e=a.length;d<e;d++){var f=a[d];if(-1===b.indexOf(f)){var g;for(g=1;g<c&&-1!==arguments[g].indexOf(f);g++);g===c&&b.push(f);}}return b}function Da(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b}function za(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&void 0!==a[c]&&b.push(a[c]);return b}
function Ea(a,b){if(a===b)return 0!==a||1/a===1/b;if(null==a||null==b)return a===b;var c=a.toString();if(c!==b.toString())return !1;switch(c){case "[object RegExp]":case "[object String]":return ""+a===""+b;case "[object Number]":return +a!==+a?+b!==+b:0===+a?1/+a===1/b:+a===+b;case "[object Date]":case "[object Boolean]":return +a===+b}c="[object Array]"===c;if(!c){if("object"!==typeof a||"object"!==typeof b)return !1;var d=a.constructor,e=b.constructor;if(d!==e&&!("function"===typeof d&&d instanceof
d&&"function"===typeof e&&e instanceof e)&&"constructor"in a&&"constructor"in b)return !1}d=[];e=[];for(var f=d.length;f--;)if(d[f]===a)return e[f]===b;d.push(a);e.push(b);if(c){f=a.length;if(f!==b.length)return !1;for(;f--;)if(!Ea(a[f],b[f]))return !1}else{c=Da(a);f=c.length;if(Da(b).length!==f)return !1;for(;f--;){var g=c[f];if(!b.hasOwnProperty(g)||!Ea(a[g],b[g]))return !1}}d.pop();e.pop();return !0}function Fa(a,b){a/=1E3;b&&(a=Math.floor(a));return a}function Ga(a){var b=parseInt(a);return null==a||isNaN(b)?null:new Date(1E3*b)}function Ha(a){return null!=a&&Ba(a)?a.toISOString().replace(/\.[0-9]{3}Z$/,""):a}function Ia(a){return null==a||""===a?null:new Date(a)}function D(a,b,c,d,e){this.Fb=a;this.type=b;this.time=null==c||""===c?(new Date).valueOf():c;this.sessionId=d;this.data=e;}D.prototype.ic=function(){var a={name:this.type,time:Fa(this.time),data:this.data||{},session_id:this.sessionId};null!=this.Fb&&(a.user_id=this.Fb);return a};D.prototype.B=function(){return {u:this.Fb,t:this.type,ts:this.time,s:this.sessionId,d:this.data}};function Ja(a){return null!=a&&"[object Object]"===Object.prototype.toString.call(a)&&null!=a.t&&""!==a.t}
function Ka(a){return new D(a.u,a.t,a.ts,a.s,a.d)}function Ma(a,b,c){null==a&&(a=oa.Ya());c=parseInt(c);if(isNaN(c)||0===c)c=(new Date).valueOf();this.ea=a;this.xb=c;this.nc=(new Date).valueOf();this.bd=b;}Ma.prototype.B=function(){return {g:this.ea,e:this.bd,c:this.xb,l:this.nc}};function Na(a){if(null==a||null==a.g)return null;var b=new Ma(a.g,a.e,a.c);b.nc=a.l;return b}function Oa(a,b,c,d){(d="string"===typeof a||null===a&&d)||v.error("Cannot "+b+" because "+c+' "'+a+'" is invalid.');return d}function Pa(a,b,c){var d=null!=a&&"string"===typeof a&&(""===a||a.match(Qa));d||v.error("Cannot "+b+" because "+c+' "'+a+'" is invalid.');return d}var Qa=/^[^\x00-\x1F\x22]+$/,Ra=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;var I={};function J(a,b){this.f=a;this.J=b;}p=J.prototype;p.A=function(a){null==a&&v.error("getUserId must be supplied with a callback. e.g., appboy.getUser().getUserId(function(userId) {console.log('the user id is ' + userId)})");"function"===typeof a&&a(this.f.A());};
p.Hf=function(a,b){if(!Oa(a,"add alias","the alias",!1)||0>=a.length)return v.error("addAlias requires a non-empty alias"),!1;if(!Oa(b,"add alias","the label",!1)||0>=b.length)return v.error("addAlias requires a non-empty label"),!1;var c=this.J,d=new Sa,e=Ta(c.G),f=B.Ge;d.j.push(new D(c.f.A(),f,(new Date).valueOf(),e,{a:a,l:b}));d.h=Ua(c.b,d.j);return d.h};p.kg=function(a){return Oa(a,"set first name","the firstName",!0)?this.f.H("first_name",a):!1};
p.og=function(a){return Oa(a,"set last name","the lastName",!0)?this.f.H("last_name",a):!1};p.ig=function(a){return null===a||"string"===typeof a&&null!=a.toLowerCase().match(Ra)?this.f.H("email",a):(v.error('Cannot set email address - "'+a+'" did not pass RFC-5322 validation.'),!1)};p.lg=function(a){"string"===typeof a&&(a=a.toLowerCase());return null===a||ya(Va,a,'Gender "'+a+'" is not a valid gender.',"User.Genders")?this.f.H("gender",a):!1};
p.hg=function(a,b,c){if(null===a&&null===b&&null===c)return this.f.H("dob",null);a=parseInt(a);b=parseInt(b);c=parseInt(c);return isNaN(a)||isNaN(b)||isNaN(c)||12<b||1>b||31<c||1>c?(v.error("Cannot set date of birth - parameters should comprise a valid date e.g. setDateOfBirth(1776, 7, 4);"),!1):this.f.H("dob",""+a+"-"+b+"-"+c)};p.fg=function(a){return Oa(a,"set country","the country",!0)?this.f.H("country",a):!1};
p.mg=function(a){return Oa(a,"set home city","the homeCity",!0)?this.f.H("home_city",a):!1};p.ng=function(a){return Oa(a,"set language","the language",!0)?this.f.H("language",a):!1};p.jg=function(a){return ya(Wa,a,'Email notification setting "'+a+'" is not a valid subscription type.',"User.NotificationSubscriptionTypes")?this.f.H("email_subscribe",a):!1};
p.qd=function(a){return ya(Wa,a,'Push notification setting "'+a+'" is not a valid subscription type.',"User.NotificationSubscriptionTypes")?this.f.H("push_subscribe",a):!1};p.pg=function(a){return Oa(a,"set phone number","the phoneNumber",!0)?null===a||a.match(Xa)?this.f.H("phone",a):(v.error('Cannot set phone number - "'+a+'" did not pass validation.'),!1):!1};p.eg=function(a){return this.f.H("image_url",a)};
p.vc=function(a,b,c,d,e){if(null==a||null==b)return v.error("Cannot set last-known location - latitude and longitude are required."),!1;a=parseFloat(a);b=parseFloat(b);null!=c&&(c=parseFloat(c));null!=d&&(d=parseFloat(d));null!=e&&(e=parseFloat(e));return isNaN(a)||isNaN(b)||null!=c&&isNaN(c)||null!=d&&isNaN(d)||null!=e&&isNaN(e)?(v.error("Cannot set last-known location - all supplied parameters must be numeric."),!1):90<a||-90>a||180<b||-180>b?(v.error("Cannot set last-known location - latitude and longitude are bounded by \u00b190 and \u00b1180 respectively."),
!1):null!=c&&0>c||null!=e&&0>e?(v.error("Cannot set last-known location - accuracy and altitudeAccuracy may not be negative."),!1):this.J.vc(this.f.A(),a,b,d,c,e).h};
p.od=function(a,b){if(!Pa(a,"set custom user attribute","the given key"))return !1;var c=typeof b,d=Ba(b),e=Aa(b);if("number"!==c&&"boolean"!==c&&!d&&!e&&null!==b&&!Pa(b,'set custom user attribute "'+a+'"',"the given value"))return !1;d&&(b=Ha(b));if(e){for(c=0;c<b.length;c++)if(!Pa(b[c],'set custom user attribute "'+a+'"',"the element in the given array"))return !1;return Ya(this.J,B.Te,a,b).h}return this.f.od(a,b)};
p.If=function(a,b){return !Pa(a,"add to custom user attribute array","the given key")||null!=b&&!Pa(b,"add to custom user attribute array","the given value")?!1:Ya(this.J,B.Qe,a,b).h};p.ag=function(a,b){return !Pa(a,"remove from custom user attribute array","the given key")||null!=b&&!Pa(b,"remove from custom user attribute array","the given value")?!1:Ya(this.J,B.Se,a,b).h};
p.Vf=function(a,b){if(!Pa(a,"increment custom user attribute","the given key"))return !1;null==b&&(b=1);var c=parseInt(b);return isNaN(c)||c!==parseFloat(b)?(v.error('Cannot increment custom user attribute because the given incrementValue "'+b+'" is not an integer.'),!1):Ya(this.J,B.Re,a,c).h};p.nd=function(a,b,c,d,e){this.f.nd(a,b,c,d,e);Za(this.J);};p.nb=function(a){this.f.nb(a);};
p.gg=function(a,b,c){if(!Pa(a,"set custom location attribute","the given key"))return !1;if(null!==b||null!==c)if(b=parseFloat(b),c=parseFloat(c),isNaN(b)||90<b||-90>b||isNaN(c)||180<c||-180>c)return v.error("Received invalid values for latitude and/or longitude. Latitude and longitude are bounded by \u00b190 and \u00b1180 respectively, or must both be null for removal."),!1;var d=this.J,e=c;c=new Sa;if($a(d.D,a))v.info('Custom Attribute "'+a+'" is blacklisted, ignoring.'),c.h=!1;else{var f=Ta(d.G);
if(null===b&&null===e){var g=B.jf;a={key:a};}else g=B.hf,a={key:a,latitude:b,longitude:e};c.j.push(new D(d.f.A(),g,(new Date).valueOf(),f,a));c.h=Ua(d.b,c.j);}return c.h};var Xa=/^[0-9 .\\(\\)\\+\\-]+$/,Va={MALE:"m",FEMALE:"f",OTHER:"o",UNKNOWN:"u",NOT_APPLICABLE:"n",PREFER_NOT_TO_SAY:"p"},Wa={OPTED_IN:"opted_in",SUBSCRIBED:"subscribed",UNSUBSCRIBED:"unsubscribed"};I.User=J;I.User.Genders=Va;I.User.NotificationSubscriptionTypes=Wa;I.User.prototype.getUserId=J.prototype.A;
I.User.prototype.setFirstName=J.prototype.kg;I.User.prototype.setLastName=J.prototype.og;I.User.prototype.setEmail=J.prototype.ig;I.User.prototype.setGender=J.prototype.lg;I.User.prototype.setDateOfBirth=J.prototype.hg;I.User.prototype.setCountry=J.prototype.fg;I.User.prototype.setHomeCity=J.prototype.mg;I.User.prototype.setLanguage=J.prototype.ng;I.User.prototype.setEmailNotificationSubscriptionType=J.prototype.jg;I.User.prototype.setPushNotificationSubscriptionType=J.prototype.qd;
I.User.prototype.setPhoneNumber=J.prototype.pg;I.User.prototype.setAvatarImageUrl=J.prototype.eg;I.User.prototype.setLastKnownLocation=J.prototype.vc;I.User.prototype.setUserAttribute=J.prototype.H;I.User.prototype.setCustomUserAttribute=J.prototype.od;I.User.prototype.addToCustomAttributeArray=J.prototype.If;I.User.prototype.removeFromCustomAttributeArray=J.prototype.ag;I.User.prototype.incrementCustomUserAttribute=J.prototype.Vf;I.User.prototype.addAlias=J.prototype.Hf;
I.User.prototype.setCustomLocationAttribute=J.prototype.gg;function ab(){var a=navigator.userAgent||"",b=a.match(/(samsungbrowser|tizen|roku|konqueror|icab|crios|opera|ucbrowser|chrome|safari|firefox|camino|msie|trident(?=\/))\/?\s*(\.?\d+(\.\d+)*)/i)||[];if(/trident/i.test(b[1])){var c=/\brv[ :]+(\.?\d+(\.\d+)*)/g.exec(a)||[];return [bb,c[1]||""]}if(-1!==a.indexOf("(Web0S; Linux/SmartTV)"))return ["LG Smart TV",null];if(-1!==a.indexOf("CrKey"))return ["Chromecast",null];if(-1!==a.indexOf("BRAVIA")||-1!==a.indexOf("SonyCEBrowser")||-1!==a.indexOf("SonyDTV"))return ["Sony Smart TV",
null];if(-1!==a.indexOf("PhilipsTV"))return ["Philips Smart TV",null];if(a.match(/\b(Roku)\b/))return ["Roku",null];if(a.match(/\bAFTM\b/))return ["Amazon Fire Stick",null];if(b[1]===cb&&(c=a.match(/\b(OPR|Edge|EdgA|Edg|UCBrowser)\/(\.?\d+(\.\d+)*)/),null!=c))return c=c.slice(1),c[0]=c[0].replace("OPR",db),c[0]=c[0].replace("EdgA",eb),"Edg"===c[0]&&(c[0]=eb),[c[0],c[1]];if(b[1]===fb&&(c=a.match(/\b(EdgiOS)\/(\.?\d+(\.\d+)*)/),null!=c))return c=c.slice(1),c[0]=c[0].replace("EdgiOS",eb),[c[0],c[1]];b=
b[2]?[b[1],b[2]]:[null,null];null!=(c=a.match(/version\/(\.?\d+(\.\d+)*)/i))&&b.splice(1,1,c[1]);null!=(c=a.match(/\b(UCBrowser)\/(\.?\d+(\.\d+)*)/))&&b.splice(1,1,c[2]);if(b[0]===db&&null!=(c=a.match(/mini\/(\.?\d+(\.\d+)*)/i)))return ["Opera Mini",c[1]||""];b[0]&&(a=b[0].toLowerCase(),"msie"===a&&(b[0]=bb),"crios"===a&&(b[0]=cb),"tizen"===a&&(b[0]="Samsung Smart TV",b[1]=null),"samsungbrowser"===a&&(b[0]="Samsung Browser"));return b}
function gb(){for(var a=hb,b=0;b<a.length;b++){var c=a[b].V,d=a[b].Jg;if(c)if(c=c.toLowerCase(),Aa(a[b].P))for(d=0;d<a[b].P.length;d++){if(-1!==c.indexOf(a[b].P[d].toLowerCase()))return a[b].R}else{if(-1!==c.indexOf(a[b].P.toLowerCase()))return a[b].R}else if(d)return a[b].R}}
var ib={td:"Android",Bc:"iOS",lf:"Mac",sf:"Windows"},cb="Chrome",eb="Edge",bb="Internet Explorer",db="Opera",fb="Safari",hb=[{V:navigator.platform,P:"Win",R:ib.sf},{V:navigator.platform,P:"Mac",R:ib.lf},{V:navigator.platform,P:"BlackBerry",R:"BlackBerry"},{V:navigator.platform,P:"FreeBSD",R:"FreeBSD"},{V:navigator.platform,P:"OpenBSD",R:"OpenBSD"},{V:navigator.platform,P:"Nintendo",R:"Nintendo"},{V:navigator.platform,P:"SunOS",R:"SunOS"},{V:navigator.platform,P:"PlayStation",R:"PlayStation"},{V:navigator.platform,
P:"X11",R:"X11"},{V:navigator.userAgent,P:["iPhone","iPad","iPod"],R:ib.Bc},{V:navigator.platform,P:"Pike v",R:ib.Bc},{V:navigator.userAgent,P:["Web0S"],R:"WebOS"},{V:navigator.platform,P:["Linux armv7l","Android"],R:ib.td},{V:navigator.userAgent,P:["Android"],R:ib.td},{V:navigator.platform,P:"Linux",R:"Linux"}],jb=new function(){var a=ab();this.vb=a[0]||"Unknown Browser";this.version=a[1]||"Unknown Version";this.Dd=gb()||navigator.platform;this.language=(navigator.Mg||navigator.language||navigator.browserLanguage||
navigator.Lg||"").toLowerCase();a:{a=navigator.userAgent;a=a.toLowerCase();for(var b="googlebot bingbot slurp duckduckbot baiduspider yandex facebookexternalhit sogou ia_archiver https://github.com/prerender/prerender aolbuild bingpreview msnbot adsbot mediapartners-google teoma".split(" "),c=0;c<b.length;c++)if(-1!==a.indexOf(b[c])){a=!0;break a}a=!1;}this.Wf=a;this.userAgent=navigator.userAgent;this.Zf=ib;};function kb(a,b){this.ia=a;this.T=b;}function lb(a,b,c){var d=c;null!=c&&c instanceof Ma&&(d=c.B());a.ia.store(b,d);}function Ua(a,b){if(null==b||0===b.length)return !1;Aa(b)||(b=[b]);var c=a.T.O(M.Gb);null!=c&&Aa(c)||(c=[]);for(var d=0;d<b.length;d++)c.push(b[d].B());return a.T.store(M.Gb,c)}
function mb(a){var b=a.T.O(M.Gb);a.T.remove(M.Gb);null==b&&(b=[]);a=[];var c=!1,d=null;if(Aa(b))for(var e=0;e<b.length;e++)Ja(b[e])?a.push(Ka(b[e])):d=e;else c=!0;if(c||null!=d)e="Stored events could not be deserialized as Events",c&&(e+=", was "+Object.prototype.toString.call(b)+" not an array"),null!=d&&(e+=", value at index "+d+" does not look like an event"),e+=", serialized values were of type "+typeof b+": "+JSON.stringify(b),a.push(new D(null,B.cf,(new Date).valueOf(),null,{e:e}));return a}
function P(a,b,c){ya(M,b,"StorageManager cannot store object.","StorageManager.KEYS.OBJECTS")&&a.T.store(b,c);}function Q(a,b){return ya(M,b,"StorageManager cannot retrieve object.","StorageManager.KEYS.OBJECTS")?a.T.O(b):!1}function R(a,b){ya(M,b,"StorageManager cannot remove object.","StorageManager.KEYS.OBJECTS")&&a.T.remove(b);}kb.prototype.clearData=function(){for(var a=Da(nb),b=Da(M),c=0;c<a.length;c++)this.ia.remove(nb[a[c]]);for(a=0;a<b.length;a++)this.T.remove(M[b[a]]);};
function ob(a,b){var c=a.T.O(M.Ka);null==c&&(c={});var d=b.user_id||M.ud,e;for(e in b)"user_id"===e||null!=c[d]&&null!=c[d][e]||pb(a,b.user_id,e,b[e]);}function pb(a,b,c,d){var e=a.T.O(M.Ka);null==e&&(e={});var f=b||M.ud,g=e[f];null==g&&(g={},null!=b&&(g.user_id=b));if("custom"===c){null==g[c]&&(g[c]={});for(var h in d)g[c][h]=d[h];}else g[c]=d;e[f]=g;return a.T.store(M.Ka,e)}function qb(a){var b=a.T.O(M.Ka);a.T.remove(M.Ka);a=[];for(var c in b)null!=b[c]&&a.push(b[c]);return a}
var nb={Oc:"ab.storage.userId",xd:"ab.storage.deviceId",Oa:"ab.storage.sessionId"},M={Lc:"ab.test",Gb:"ab.storage.events",Ka:"ab.storage.attributes",zc:"ab.storage.device",Tb:"ab.storage.pushToken",Gc:"ab.storage.newsFeed",Ec:"ab.storage.lastNewsFeedRefresh",ob:"ab.storage.cardImpressions",Hd:"ab.storage.serverConfig",Mc:"ab.storage.triggers",Nc:"ab.storage.triggers.ts",ff:"ab.storage.lastTriggeredTime",ef:"ab.storage.lastTriggeredTimesById",gf:"ab.storage.lastTriggerEventDataById",Pb:"ab.storage.messagingSessionStart",
pb:"ab.storage.cc",Lb:"ab.storage.ccLastFullSync",Kb:"ab.storage.ccLastCardUpdated",fb:"ab.storage.ccClicks",gb:"ab.storage.ccImpressions",ra:"ab.storage.ccDismissals",Ob:"ab.storage.lastDisplayedTriggerTimesById",Dc:"ab.storage.lastDisplayedTriggerTime",rb:"ab.storage.triggerFireInstancesById"};function rb(a){this.Z=a;this.ne=jb.vb===fb?3:10;}rb.prototype.Sa=function(a){return a+"."+this.Z};
rb.prototype.store=function(a,b){b={v:b};try{return localStorage.setItem(this.Sa(a),JSON.stringify(b)),!0}catch(c){return v.info("Storage failure: "+c.message),!1}};rb.prototype.O=function(a){try{var b=JSON.parse(localStorage.getItem(this.Sa(a)));return null==b?null:b.v}catch(c){return v.info("Storage retrieval failure: "+c.message),null}};rb.prototype.remove=function(a){try{localStorage.removeItem(this.Sa(a));}catch(b){return v.info("Storage removal failure: "+b.message),!1}};
function sb(a,b){this.Z=a;a=0;for(var c=document.domain,d=c.split("."),e="ab._gd"+(new Date).valueOf();a<d.length-1&&-1===document.cookie.indexOf(e+"="+e);)a++,c="."+d.slice(-1-a).join("."),document.cookie=e+"="+e+";domain="+c+";";document.cookie=e+"=;expires="+(new Date(0)).toGMTString()+";domain="+c+";";this.Xd=c;this.Pd=525949;this.ae=!!b;}sb.prototype.Sa=function(a){return null!=this.Z?a+"."+this.Z:a};function tb(a){var b=new Date;b.setTime(b.getTime()+6E4*a.Pd);return b.getFullYear()}
sb.prototype.store=function(a,b){for(var c=za(nb),d=document.cookie.split(";"),e=0;e<d.length;e++){for(var f=d[e];" "===f.charAt(0);)f=f.substring(1);for(var g=!1,h=0;h<c.length;h++)if(0===f.indexOf(c[h])){g=!0;break}g&&(f=f.split("=")[0],-1===f.indexOf("."+this.Z)&&ub(this,f));}c=new Date;c.setTime(c.getTime()+6E4*this.Pd);c="expires="+c.toUTCString();d="domain="+this.Xd;b=this.ae?b:encodeURIComponent(JSON.stringify(b));a=this.Sa(a)+"="+b+";"+c+";"+d+";path=/";if(4093<=a.length)return v.info("Storage failure: string is "+
a.length+" chars which is too large to store as a cookie."),!1;document.cookie=a;return !0};
sb.prototype.O=function(a){for(var b=[],c=this.Sa(a)+"=",d=document.cookie.split(";"),e=0;e<d.length;e++){for(var f=d[e];" "===f.charAt(0);)f=f.substring(1);if(0===f.indexOf(c))try{var g=void 0;g=this.ae?f.substring(c.length,f.length):JSON.parse(decodeURIComponent(f.substring(c.length,f.length)));b.push(g);}catch(h){return v.info("Storage retrieval failure: "+h.message),this.remove(a),null}}return 0<b.length?b[b.length-1]:null};sb.prototype.remove=function(a){ub(this,this.Sa(a));};
function ub(a,b){b=b+"=;expires="+(new Date(0)).toGMTString();document.cookie=b;document.cookie=b+";path=/";document.cookie=b+";path="+document.location.pathname;a=b+";domain="+a.Xd;document.cookie=a;document.cookie=a+";path=/";document.cookie=a+";path="+document.location.pathname;}function vb(){this.Vc={};this.Vd=5242880;this.ne=3;}
vb.prototype.store=function(a,b){var c={value:b};var d=[];b=[b];for(var e=0;b.length;){var f=b.pop();if("boolean"===typeof f)e+=4;else if("string"===typeof f)e+=2*f.length;else if("number"===typeof f)e+=8;else if("object"===typeof f&&-1===d.indexOf(f)){d.push(f);for(var g in f)b.push(f[g]);}}d=e;if(d>this.Vd)return v.info("Storage failure: object is \u2248"+d+" bytes which is greater than the max of "+this.Vd),!1;this.Vc[a]=c;return !0};vb.prototype.O=function(a){a=this.Vc[a];return null==a?null:a.value};
vb.prototype.remove=function(a){this.Vc[a]=null;};function wb(a,b,c){this.ha=[];b&&this.ha.push(new sb(a));c&&this.ha.push(new rb(a));this.ha.push(new vb);}wb.prototype.store=function(a,b){for(var c=!0,d=0;d<this.ha.length;d++)c=this.ha[d].store(a,b)&&c;return c};wb.prototype.O=function(a){for(var b=0;b<this.ha.length;b++){var c=this.ha[b].O(a);if(null!=c)return c}return null};wb.prototype.remove=function(a){for(var b=0;b<this.ha.length;b++)this.ha[b].remove(a);};function xb(){this.ub={};}function yb(a,b){if("function"!==typeof b)return null;var c=oa.Ya();a.ub[c]=b;return c}xb.prototype.S=function(a){delete this.ub[a];};xb.prototype.N=function(){this.ub={};};function zb(a,b){var c=[],d;for(d in a.ub)c.push(a.ub[d](b));}function Ab(){var a=this;if(null==this.Wc){this.Wc=!1;try{var b=Object.defineProperty({},"passive",{get:function(){a.Wc=!0;}});window.addEventListener("testPassive",null,b);window.removeEventListener("testPassive",null,b);}catch(c){}}return this.Wc}function Bb(a,b,c){a.addEventListener(b,c,Ab()?{passive:!0}:!1);}
function Cb(a,b,c,d){if(null==a)return !1;b=b||!1;c=c||!1;a=a.getBoundingClientRect();return null==a?!1:(0<=a.top&&a.top<=(window.innerHeight||document.documentElement.clientHeight)||!b)&&(0<=a.left||!d)&&(0<=a.bottom&&a.bottom<=(window.innerHeight||document.documentElement.clientHeight)||!c)&&(a.right<=(window.innerWidth||document.documentElement.clientWidth)||!d)}function Db(a){if(a.onclick){var b=document.createEvent("MouseEvents");b.initEvent("click",!0,!0);a.onclick.apply(a,[b]);}}
function Eb(a,b,c){var d=null,e=null;Bb(a,"touchstart",function(f){d=f.touches[0].clientX;e=f.touches[0].clientY;});Bb(a,"touchmove",function(f){if(null!=d&&null!=e){var g=d-f.touches[0].clientX,h=e-f.touches[0].clientY;Math.abs(g)>Math.abs(h)&&25<=Math.abs(g)?(0<g&&b===Fb?c(f):0>g&&b===Gb&&c(f),e=d=null):25<=Math.abs(h)&&(0<h&&b===Hb&&a.scrollTop===a.scrollHeight-a.offsetHeight?c(f):0>h&&b===Ib&&0===a.scrollTop&&c(f),e=d=null);}});}
function Jb(a,b,c){var d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("viewBox",a);d.setAttribute("xmlns","http://www.w3.org/2000/svg");a=document.createElementNS("http://www.w3.org/2000/svg","path");a.setAttribute("d",b);null!=c&&a.setAttribute("fill",c);d.appendChild(a);return d}var Hb="up",Ib="down",Fb="left",Gb="right";function Kb(a,b,c){var d=document.createElement("button");d.setAttribute("aria-label",a);d.setAttribute("tabindex","0");d.setAttribute("role","button");Bb(d,"touchstart",function(){});d.className="ab-close-button";a=Jb("0 0 15 15","M15 1.5L13.5 0l-6 6-6-6L0 1.5l6 6-6 6L1.5 15l6-6 6 6 1.5-1.5-6-6 6-6z",b);d.appendChild(a);d.addEventListener("keydown",function(e){if(32===e.keyCode||13===e.keyCode)c(),e.stopPropagation();});d.onclick=function(e){c();e.stopPropagation();};return d}var Lb={Xf:function(){return 600>=screen.width},Sf:function(){if("orientation"in window)return 90===Math.abs(window.orientation)||270===window.orientation?Lb.Ma.Cc:Lb.Ma.Sb;if("screen"in window){var a=window.screen.orientation||screen.Gg||screen.Ig;null!=a&&"object"===typeof a&&(a=a.type);if("landscape-primary"===a||"landscape-secondary"===a)return Lb.Ma.Cc}return Lb.Ma.Sb},Yf:function(a,b,c){c||null!=b&&b.metaKey?window.open(a):window.location=a;},Ma:{Sb:0,Cc:1}};I.WindowUtils=Lb;
I.WindowUtils.openUri=Lb.Yf;function Mb(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A){this.id=a;this.viewed=b||!1;this.title=c||"";this.imageUrl=d;this.description=e||"";this.created=f||null;this.updated=g||null;this.categories=h||[];this.expiresAt=l||null;this.url=k;this.linkText=m;q=parseFloat(q);this.aspectRatio=isNaN(q)?null:q;this.extras=t;this.pinned=r||!1;this.dismissible=y||!1;this.dismissed=!1;this.clicked=A||!1;this.Rc=this.W=null;}function Nb(a){null==a.W&&(a.W=new xb);return a.W}
function Ob(a){null==a.Rc&&(a.Rc=new xb);return a.Rc}p=Mb.prototype;p.wc=function(a){return yb(Nb(this),a)};p.ye=function(a){return yb(Ob(this),a)};p.S=function(a){Nb(this).S(a);Ob(this).S(a);};p.N=function(){Nb(this).N();Ob(this).N();};p.md=function(){this.viewed=!0;};p.eb=function(){this.clicked=this.viewed=!0;zb(Nb(this));};p.kd=function(){return this.dismissible&&!this.dismissed?(this.dismissed=!0,zb(Ob(this)),!0):!1};
function Pb(a,b){if(null==b||b[S.ta]!==a.id)return !0;if(b[S.Gd])return !1;if(null!=b[S.aa]&&null!=a.updated&&b[S.aa]<Fa(a.updated.valueOf()))return !0;b[S.wa]&&!a.viewed&&(a.viewed=!0);b[S.qa]&&!a.clicked&&(a.clicked=b[S.qa]);null!=b[S.Pa]&&(a.title=b[S.Pa]);null!=b[S.ua]&&(a.imageUrl=b[S.ua]);null!=b[S.La]&&(a.description=b[S.La]);if(null!=b[S.aa]){var c=Ga(b[S.aa]);null!=c&&(a.updated=c);}null!=b[S.$]&&(a.expiresAt=b[S.$]===Qb?null:Ga(b[S.$]));null!=b[S.URL]&&(a.url=b[S.URL]);null!=b[S.va]&&(a.linkText=
b[S.va]);null!=b[S.pa]&&(c=parseFloat(b[S.pa]),a.aspectRatio=isNaN(c)?null:c);null!=b[S.fa]&&(a.extras=b[S.fa]);null!=b[S.ga]&&(a.pinned=b[S.ga]);null!=b[S.sa]&&(a.dismissible=b[S.sa]);return !0}
function Rb(a){if(a[S.Gd])return null;var b=a[S.ta],c=a[S.Qa],d=a[S.wa],e=a[S.Pa],f=a[S.ua],g=a[S.La],h=Ga(a[S.aa]);var l=a[S.$]===Qb?null:Ga(a[S.$]);var k=a[S.URL],m=a[S.va],q=a[S.pa],t=a[S.fa],r=a[S.ga],y=a[S.sa];a=a[T.qa];return c===Sb.Kd||c===Sb.Rb?new Tb(b,d,e,f,g,null,h,null,l,k,m,q,t,r,y,a):c===Sb.Ib?new Ub(b,d,e,f,g,null,h,null,l,k,m,q,t,r,y,a):c===Sb.Hb?new Vb(b,d,f,null,h,null,l,k,m,q,t,r,y,a):c===Sb.xc?new Wb(b,d,h,l,t,r):null}
function Xb(a){var b=a[T.ta],c=a[T.Qa],d=a[T.wa],e=a[T.Pa],f=a[T.ua],g=a[T.La],h=Ia(a[T.Mb]),l=Ia(a[T.aa]),k=a[T.Jb],m=Ia(a[T.$]),q=a[T.URL],t=a[T.va],r=a[T.pa],y=a[T.fa],A=a[T.ga],z=a[T.sa];a=a[T.qa];if(c===Sb.Rb)return new Tb(b,d,e,f,g,h,l,k,m,q,t,r,y,A,z,a);if(c===Sb.Ib)return new Ub(b,d,e,f,g,h,l,k,m,q,t,r,y,A,z,a);if(c===Sb.Hb)return new Vb(b,d,f,h,l,k,m,q,t,r,y,A,z,a);if(c===Sb.xc)return new Wb(b,d,l,m,y,A)}
function Yb(a){null!=a&&(a=a.querySelectorAll(".ab-unread-indicator")[0],null!=a&&(a.className+=" read"));}
p.Y=function(a,b,c){function d(q){Yb(f);g&&(a(e),Lb.openUri(e.url,q,c));return !1}var e=this,f=document.createElement("div");f.className="ab-card ab-effect-card "+this.constructor.prototype.jc;f.setAttribute("data-ab-card-id",this.id);f.setAttribute("role","article");f.setAttribute("tabindex","0");var g=this.url&&""!==this.url;if(this.pinned){var h=document.createElement("div");h.className="ab-pinned-indicator";var l=document.createElement("i");l.className="fa fa-star";h.appendChild(l);f.appendChild(h);}this.imageUrl&&
""!==this.imageUrl&&(h=document.createElement("div"),h.className="ab-image-area",l=document.createElement("img"),l.setAttribute("src",this.imageUrl),h.appendChild(l),f.className+=" with-image",g&&!this.constructor.prototype.mc?(l=document.createElement("a"),l.setAttribute("href",this.url),l.onclick=d,l.appendChild(h),f.appendChild(l)):f.appendChild(h));h=document.createElement("div");h.className="ab-card-body";if(this.dismissible){this.Ud=b;var k=Kb("Dismiss Card",void 0,this.le.bind(this));f.appendChild(k);
Eb(h,Fb,function(q){f.className+=" ab-swiped-left";k.onclick(q);});Eb(h,Gb,function(q){f.className+=" ab-swiped-right";k.onclick(q);});}if(b=this.title&&""!==this.title){l=document.createElement("h1");l.className="ab-title";l.id=oa.Ya();f.setAttribute("aria-labelledby",l.id);if(g){var m=document.createElement("a");m.setAttribute("href",this.url);m.onclick=d;m.appendChild(document.createTextNode(this.title));l.appendChild(m);}else l.appendChild(document.createTextNode(this.title));h.appendChild(l);}l=document.createElement("div");
l.className=b?"ab-description":"ab-description ab-no-title";l.id=oa.Ya();f.setAttribute("aria-describedby",l.id);l.appendChild(document.createTextNode(this.description));g&&(b=document.createElement("div"),b.className="ab-url-area",m=document.createElement("a"),m.setAttribute("href",this.url),m.appendChild(document.createTextNode(this.linkText)),m.onclick=d,b.appendChild(m),l.appendChild(b));h.appendChild(l);f.appendChild(h);h=document.createElement("div");h.className="ab-unread-indicator";this.viewed&&
(h.className+=" read");f.appendChild(h);return this.yf=f};p.le=function(){if(this.dismissible&&!this.dismissed){this.Ud&&this.Ud(this);var a=this.yf;a&&(a.style.height=a.offsetHeight+"px",a.className+=" ab-hide",setTimeout(function(){a&&a.parentNode&&(a.style.height="0",a.style.margin="0",setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a);},Zb));},$b));}};
var Qb=-1,Sb={Ib:"captioned_image",Kd:"text_announcement",Rb:"short_news",Hb:"banner_image",xc:"control"},S={ta:"id",wa:"v",sa:"db",Gd:"r",aa:"ca",ga:"p",$:"ea",fa:"e",Qa:"tp",ua:"i",Pa:"tt",La:"ds",URL:"u",va:"dm",pa:"ar",qa:"cl"},T={ta:"id",wa:"v",sa:"db",Mb:"cr",aa:"ca",ga:"p",Jb:"t",$:"ea",fa:"e",Qa:"tp",ua:"i",Pa:"tt",La:"ds",URL:"u",va:"dm",pa:"ar",qa:"cl"},Zb=400;I.Card=Mb;I.Card.prototype.dismissCard=Mb.prototype.le;function Vb(a,b,c,d,e,f,g,h,l,k,m,q,t,r){Mb.call(this,a,b,null,c,null,d,e,f,g,h,l,k,m,q,t,r);}ia(Vb,Mb);Vb.prototype.B=function(){var a={};a[T.Qa]=Sb.Hb;a[T.ta]=this.id;a[T.wa]=this.viewed;a[T.ua]=this.imageUrl;a[T.aa]=this.updated;a[T.Mb]=this.created;a[T.Jb]=this.categories;a[T.$]=this.expiresAt;a[T.URL]=this.url;a[T.va]=this.linkText;a[T.pa]=this.aspectRatio;a[T.fa]=this.extras;a[T.ga]=this.pinned;a[T.sa]=this.dismissible;a[T.qa]=this.clicked;return a};
ja.Object.defineProperties(Vb.prototype,{jc:{configurable:!0,enumerable:!0,get:function(){return "ab-banner"}},mc:{configurable:!0,enumerable:!0,get:function(){return !1}}});I.Banner=Vb;function Ub(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A){Mb.call(this,a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A);}ia(Ub,Mb);Ub.prototype.B=function(){var a={};a[T.Qa]=Sb.Ib;a[T.ta]=this.id;a[T.wa]=this.viewed;a[T.Pa]=this.title;a[T.ua]=this.imageUrl;a[T.La]=this.description;a[T.aa]=this.updated;a[T.Mb]=this.created;a[T.Jb]=this.categories;a[T.$]=this.expiresAt;a[T.URL]=this.url;a[T.va]=this.linkText;a[T.pa]=this.aspectRatio;a[T.fa]=this.extras;a[T.ga]=this.pinned;a[T.sa]=this.dismissible;a[T.qa]=this.clicked;return a};
ja.Object.defineProperties(Ub.prototype,{jc:{configurable:!0,enumerable:!0,get:function(){return "ab-captioned-image"}},mc:{configurable:!0,enumerable:!0,get:function(){return !0}}});I.CaptionedImage=Ub;function Tb(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A){Mb.call(this,a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A);}ia(Tb,Mb);Tb.prototype.B=function(){var a={};a[T.Qa]=Sb.Rb;a[T.ta]=this.id;a[T.wa]=this.viewed;a[T.Pa]=this.title;a[T.ua]=this.imageUrl;a[T.La]=this.description;a[T.aa]=this.updated;a[T.Mb]=this.created;a[T.Jb]=this.categories;a[T.$]=this.expiresAt;a[T.URL]=this.url;a[T.va]=this.linkText;a[T.pa]=this.aspectRatio;a[T.fa]=this.extras;a[T.ga]=this.pinned;a[T.sa]=this.dismissible;a[T.qa]=this.clicked;return a};
ja.Object.defineProperties(Tb.prototype,{jc:{configurable:!0,enumerable:!0,get:function(){return "ab-classic-card"}},mc:{configurable:!0,enumerable:!0,get:function(){return !0}}});I.ClassicCard=Tb;function Wb(a,b,c,d,e,f){Mb.call(this,a,b,null,null,null,null,c,null,d,null,null,null,e,f,null);}ia(Wb,Mb);Wb.prototype.B=function(){var a={};a[T.Qa]=Sb.xc;a[T.ta]=this.id;a[T.wa]=this.viewed;a[T.aa]=this.updated;a[T.$]=this.expiresAt;a[T.fa]=this.extras;a[T.ga]=this.pinned;return a};ja.Object.defineProperties(Wb.prototype,{jc:{configurable:!0,enumerable:!0,get:function(){return "ab-control-card"}},mc:{configurable:!0,enumerable:!0,get:function(){return !1}}});I.ControlCard=Wb;function ac(a){a=parseInt(a);return !isNaN(a)&&0===(a&4278190080)>>>24}function bc(a){a=parseInt(a);if(isNaN(a))return "";var b=parseFloat(b);isNaN(b)&&(b=1);a>>>=0;var c=a&255,d=(a&65280)>>>8,e=(a&16711680)>>>16;return (jb.vb===bb?8<jb.version:1)?"rgba("+[e,d,c,((a&4278190080)>>>24)/255*b].join()+")":"rgb("+[e,d,c].join()+")"}function U(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,L,Y,ea,n,u,x,C,H,O){this.message=a;this.messageAlignment=b||cc.CENTER;this.duration=q||5E3;this.slideFrom=c||dc.BOTTOM;this.extras=d||[];this.campaignId=e;this.cardId=f;this.triggerId=g;this.clickAction=h||ec.NONE;this.uri=l;this.openTarget=k||fc.NONE;this.dismissType=m||gc.AUTO_DISMISS;this.icon=t;this.imageUrl=r;this.imageStyle=y||hc.TOP;this.iconColor=A||ic.Pc;this.iconBackgroundColor=z||ic.vd;this.backgroundColor=F||ic.Pc;this.textColor=G||
ic.wd;this.closeButtonColor=E||ic.Ve;this.animateIn=K;null==this.animateIn&&(this.animateIn=!0);this.animateOut=N;null==this.animateOut&&(this.animateOut=!0);this.header=L;this.headerAlignment=Y||cc.CENTER;this.headerTextColor=ea||ic.wd;this.frameColor=n||ic.qf;this.buttons=u||[];this.cropType=x||jc;this.orientation=C;this.htmlId=H;this.css=O;this.Qd=this.Ra=this.Rd=!1;this.W=new xb;this.Yb=new xb;}p=U.prototype;p.Za=function(){return !0};p.Ce=function(){return this.Za()};
function kc(a){return null!=a.htmlId&&4<a.htmlId.length}function lc(a){return kc(a)&&null!=a.css&&0<a.css.length}function mc(a){if(kc(a)&&lc(a))return a.htmlId+"-css"}p.wc=function(a){return yb(this.W,a)};p.ye=function(a){return yb(this.Yb,a)};p.S=function(a){this.W.S(a);this.Yb.S(a);};p.N=function(){this.W.N();this.Yb.N();};p.md=function(){return this.Rd?!1:this.Rd=!0};p.eb=function(){return this.Ra?!1:(this.Ra=!0,zb(this.W),!0)};p.kd=function(){return this.Qd?!1:(this.Qd=!0,zb(this.Yb),!0)};
function nc(a){if(a.is_control)return new oc(a.trigger_id);var b=a.type;null!=b&&(b=b.toUpperCase());var c=a.message,d=a.text_align_message,e=a.slide_from,f=a.extras,g=a.campaign_id,h=a.card_id,l=a.trigger_id,k=a.click_action,m=a.uri,q=a.open_target,t=a.message_close,r=a.duration,y=a.icon,A=a.image_url,z=a.image_style,F=a.icon_color,G=a.icon_bg_color,E=a.bg_color,K=a.text_color,N=a.close_btn_color,L=a.header,Y=a.text_align_header,ea=a.header_text_color,n=a.frame_color,u=[],x=a.btns;null==x&&(x=[]);
for(var C=0;C<x.length;C++){var H=x[C];u.push(new pc(H.text,H.bg_color,H.text_color,H.border_color,H.click_action,H.uri,H.id));}x=a.crop_type;C=a.orientation;H=a.animate_in;var O=a.animate_out,Z=a.html_id,na=a.css;if(null==Z||""===Z||null==na||""===na)na=Z=void 0;if(b===qc||b===rc)c=new sc(c,d,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,H,O,L,Y,ea,n,u,x,Z,na);else if(b===tc)c=new uc(c,d,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,H,O,L,Y,ea,n,u,x,C,Z,na);else if(b===vc)c=new wc(c,d,e,f,g,h,l,k,m,q,t,r,y,A,F,G,E,K,N,H,
O,Z,na);else if(b===xc||b===yc)c=new zc(c,f,g,h,l,t,r,H,O,n,Z,na,a.message_fields),c.xg=a.trusted||!1;else{v.error("Ignoring message with unknown type "+b);return}c.dg=b;return c}function Ac(a,b){if(b&&b.parentNode){var c=b.closest(".ab-iam-root");null==c&&(c=b);a.Za()&&null!=c.parentNode&&((b=c.parentNode.classList)&&b.contains(Bc)&&b.remove(Bc),document.body.removeEventListener("touchmove",Cc));c.className=c.className.replace(Dc,Ec);}return a.animateOut}
function Fc(a,b,c){if(null!=b){a.bc=null;var d=-1===b.className.indexOf("ab-in-app-message")?b.getElementsByClassName("ab-in-app-message")[0]:b;var e=!1;d&&(e=Ac(a,d));var f=document.body;if(null!=f)var g=f.scrollTop;d=function(){if(b&&b.parentNode){var h=b.closest(".ab-iam-root");null==h&&(h=b);h.parentNode&&h.parentNode.removeChild(h);}null!=mc(a)&&(h=document.getElementById(mc(a)))&&h.parentNode&&h.parentNode.removeChild(h);null!=f&&"Safari"===jb.vb&&(f.scrollTop=g);c?c():a.kd();};e?setTimeout(d,
Gc):d();a.cc&&a.cc.focus();}}p.ge=function(){Fc(this,this.bc);};
p.Y=function(a,b,c,d){function e(){-1!==g.className.indexOf("ab-start-hidden")&&(g.className=g.className.replace("ab-start-hidden",""),c(g));}var f=this,g=document.createElement("div");g.className="ab-in-app-message ab-start-hidden ab-background";this.Za()&&(g.className+=" ab-modal-interactions",g.setAttribute("tabindex","-1"));lc(this)||(g.style.color=bc(this.textColor),g.style.backgroundColor=bc(this.backgroundColor),ac(this.backgroundColor)&&(g.className+=" ab-no-shadow"));this.imageStyle===hc.GRAPHIC&&
(g.className+=" graphic");this.orientation===Hc.LANDSCAPE&&(g.className+=" landscape");0===this.buttons.length&&(this.clickAction!==ec.NONE&&(g.className+=" ab-clickable"),g.onclick=function(t){Fc(f,g,function(){a.qc(f);f.clickAction===ec.URI?Lb.openUri(f.uri,t,d||f.openTarget===fc.BLANK):f.clickAction===ec.NEWS_FEED&&b();});t.stopPropagation();return !1});var h=Kb("Close Message",lc(this)?void 0:bc(this.closeButtonColor),function(){Fc(f,g);});g.appendChild(h);h=document.createElement("div");h.className=
"ab-message-text";h.className+=" "+(this.messageAlignment||this.constructor.DefaultTextAlignment).toLowerCase()+"-aligned";var l=!1,k=document.createElement("div");k.className="ab-image-area";if(this.imageUrl){if(this.cropType===Ic.CENTER_CROP){var m=document.createElement("span");m.className="ab-center-cropped-img";m.style.backgroundImage="url("+this.imageUrl+")";k.appendChild(m);}else m=document.createElement("img"),m.setAttribute("src",this.imageUrl),l=!0,m.onload=e,setTimeout(e,1E3),k.appendChild(m);
g.appendChild(k);h.className+=" ab-with-image";}else if(this.icon){k.className+=" ab-icon-area";m=document.createElement("span");m.className="ab-icon";lc(this)||(m.style.backgroundColor=bc(this.iconBackgroundColor),m.style.color=bc(this.iconColor));var q=document.createElement("i");q.className="fa";q.appendChild(document.createTextNode(this.icon));m.appendChild(q);k.appendChild(m);g.appendChild(k);h.className+=" ab-with-icon";}Bb(h,"touchstart",function(){});this.header&&0<this.header.length&&(k=document.createElement("h1"),
k.className="ab-message-header",this.Sc=oa.Ya(),k.id=this.Sc,k.className+=" "+(this.headerAlignment||Jc).toLowerCase()+"-aligned",lc(this)||(k.style.color=bc(this.headerTextColor)),k.appendChild(document.createTextNode(this.header)),h.appendChild(k));h.appendChild(this.fe());g.appendChild(h);l||e();return this.bc=g};p.fe=function(){return document.createTextNode(this.message)};
function Cc(a){a.targetTouches&&1<a.targetTouches.length||a.target.classList&&a.target.classList.contains("ab-message-text")&&a.target.scrollHeight>a.target.clientHeight||a.preventDefault();}p.rc=function(a){this.Za()&&null!=a.parentNode&&this.orientation!==Hc.LANDSCAPE&&(null!=a.parentNode.classList&&a.parentNode.classList.add(Bc),document.body.addEventListener("touchmove",Cc,Ab()?{passive:!1}:!1));a.className+=" "+Dc;};
p.ma=function(){var a="";this.animateIn&&(a+=" ab-animate-in");this.animateOut&&(a+=" ab-animate-out");return a};
var ic={wd:4281545523,Pc:4294967295,vd:4278219733,We:4293914607,Xe:4283782485,qf:3224580915,Ve:4288387995},Kc={yd:"hd",Fe:"ias",mf:"of",Ye:"do",sb:"umt",qb:"tf",zd:"te"},dc={TOP:"TOP",BOTTOM:"BOTTOM"},ec={NEWS_FEED:"NEWS_FEED",URI:"URI",NONE:"NONE"},gc={AUTO_DISMISS:"AUTO_DISMISS",MANUAL:"SWIPE"},fc={NONE:"NONE",BLANK:"BLANK"},hc={TOP:"TOP",GRAPHIC:"GRAPHIC"},Hc={PORTRAIT:"PORTRAIT",LANDSCAPE:"LANDSCAPE"},Jc="CENTER",cc={START:"START",CENTER:Jc,END:"END"},jc="FIT_CENTER",Ic={CENTER_CROP:"CENTER_CROP",
FIT_CENTER:jc},vc="SLIDEUP",qc="MODAL",rc="MODAL_STYLED",tc="FULL",xc="WEB_HTML",yc="HTML",Gc=500,Dc="ab-show",Ec="ab-hide",Bc="ab-pause-scrolling";I.InAppMessage=U;I.InAppMessage.SlideFrom=dc;I.InAppMessage.ClickAction=ec;I.InAppMessage.DismissType=gc;I.InAppMessage.OpenTarget=fc;I.InAppMessage.ImageStyle=hc;I.InAppMessage.TextAlignment=cc;I.InAppMessage.Orientation=Hc;I.InAppMessage.CropType=Ic;I.InAppMessage.prototype.subscribeToClickedEvent=U.prototype.wc;
I.InAppMessage.prototype.subscribeToDismissedEvent=U.prototype.ye;I.InAppMessage.prototype.removeSubscription=U.prototype.S;I.InAppMessage.prototype.removeAllSubscriptions=U.prototype.N;I.InAppMessage.prototype.closeMessage=U.prototype.ge;function pc(a,b,c,d,e,f,g){this.text=a||"";this.backgroundColor=b||ic.vd;this.textColor=c||ic.Pc;this.borderColor=d||this.backgroundColor;this.clickAction=e||ec.NEWS_FEED;this.uri=f;null==g&&(g=Lc);this.id=g;this.Ra=!1;this.W=new xb;}pc.prototype.wc=function(a){return yb(this.W,a)};pc.prototype.S=function(a){this.W.S(a);};pc.prototype.N=function(){this.W.N();};pc.prototype.eb=function(){return this.Ra?!1:(this.Ra=!0,zb(this.W),!0)};var Lc=-1;I.InAppMessage.Button=pc;
I.InAppMessage.Button.prototype.subscribeToClickedEvent=pc.prototype.wc;I.InAppMessage.Button.prototype.removeSubscription=pc.prototype.S;I.InAppMessage.Button.prototype.removeAllSubscriptions=pc.prototype.N;function oc(a){this.triggerId=a;}I.ControlMessage=oc;function Mc(a){var b=a.querySelectorAll(".ab-close-button, .ab-message-button");if(0<b.length){var c=b[0],d=b[b.length-1];a.addEventListener("keydown",function(e){var f=document.activeElement;9===e.keyCode&&(e.shiftKey||f!==d&&f!==a?!e.shiftKey||f!==c&&f!==a||(e.preventDefault(),d.focus()):(e.preventDefault(),c.focus()));});}}function Nc(a,b){b.setAttribute("role","dialog");b.setAttribute("aria-modal",!0);b.setAttribute("aria-label","Modal Message");a&&b.setAttribute("aria-labelledby",a);}
function Oc(a,b,c,d,e){if(0<a.buttons.length){var f=document.createElement("div");f.className="ab-message-buttons";d.appendChild(f);var g=d.getElementsByClassName("ab-message-text")[0];null!=g&&(g.className+=" ab-with-buttons");g=function(q){return function(t){Fc(a,d,function(){b.pc(q,a);q.clickAction===ec.URI?Lb.openUri(q.uri,t,e||a.openTarget===fc.BLANK):q.clickAction===ec.NEWS_FEED&&c();});t.stopPropagation();return !1}};for(var h=0;h<a.buttons.length;h++){var l=a.buttons[h],k=document.createElement("button");
k.className="ab-message-button";k.setAttribute("type","button");Bb(k,"touchstart",function(){});var m=l.text;""===l.text&&(m="\u00a0");k.appendChild(document.createTextNode(m));lc(a)||(k.style.backgroundColor=bc(l.backgroundColor),k.style.color=bc(l.textColor),k.style.borderColor=bc(l.borderColor));k.onclick=g(l);f.appendChild(k);}}}function uc(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,L,Y,ea,n,u,x,C,H){k=k||gc.MANUAL;x=x||Hc.PORTRAIT;u=u||Ic.CENTER_CROP;U.call(this,a,b,null,c,d,e,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,L,Y,ea,n,u,x,C,H);}ia(uc,U);uc.prototype.Y=function(a,b,c,d,e){this.cc=document.activeElement;b=U.prototype.Y.call(this,a,c,d,e);b.className+=" ab-fullscreen ab-centered";Oc(this,a,c,b,e);Mc(b);Nc(this.Sc,b);return b};uc.prototype.ma=function(){return U.prototype.ma.call(this)+" ab-effect-fullscreen"};
uc.DefaultTextAlignment=Jc;I.FullScreenMessage=uc;var Pc=new function(){this.je=".ab-pause-scrolling,body.ab-pause-scrolling,html.ab-pause-scrolling{overflow:hidden;touch-action:none}.ab-centering-div,.ab-iam-root.v3{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:1050;-webkit-tap-highlight-color:transparent}.ab-centering-div:focus,.ab-iam-root.v3:focus{outline:0}.ab-centering-div.ab-effect-fullscreen,.ab-centering-div.ab-effect-html,.ab-centering-div.ab-effect-modal,.ab-iam-root.v3.ab-effect-fullscreen,.ab-iam-root.v3.ab-effect-html,.ab-iam-root.v3.ab-effect-modal{opacity:0}.ab-centering-div.ab-effect-fullscreen.ab-show,.ab-centering-div.ab-effect-html.ab-show,.ab-centering-div.ab-effect-modal.ab-show,.ab-iam-root.v3.ab-effect-fullscreen.ab-show,.ab-iam-root.v3.ab-effect-html.ab-show,.ab-iam-root.v3.ab-effect-modal.ab-show{opacity:1}.ab-centering-div.ab-effect-fullscreen.ab-show.ab-animate-in,.ab-centering-div.ab-effect-html.ab-show.ab-animate-in,.ab-centering-div.ab-effect-modal.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-fullscreen.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-html.ab-show.ab-animate-in,.ab-iam-root.v3.ab-effect-modal.ab-show.ab-animate-in{-webkit-transition:opacity .5s;-moz-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}.ab-centering-div.ab-effect-fullscreen.ab-hide,.ab-centering-div.ab-effect-html.ab-hide,.ab-centering-div.ab-effect-modal.ab-hide,.ab-iam-root.v3.ab-effect-fullscreen.ab-hide,.ab-iam-root.v3.ab-effect-html.ab-hide,.ab-iam-root.v3.ab-effect-modal.ab-hide{opacity:0}.ab-centering-div.ab-effect-fullscreen.ab-hide.ab-animate-out,.ab-centering-div.ab-effect-html.ab-hide.ab-animate-out,.ab-centering-div.ab-effect-modal.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-fullscreen.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-html.ab-hide.ab-animate-out,.ab-iam-root.v3.ab-effect-modal.ab-hide.ab-animate-out{-webkit-transition:opacity .5s;-moz-transition:opacity .5s;-o-transition:opacity .5s;transition:opacity .5s}.ab-centering-div.ab-effect-slide .ab-in-app-message,.ab-iam-root.v3.ab-effect-slide .ab-in-app-message{-webkit-transform:translateX(535px);-moz-transform:translateX(535px);-ms-transform:translateX(535px);transform:translateX(535px)}.ab-centering-div.ab-effect-slide.ab-show .ab-in-app-message,.ab-iam-root.v3.ab-effect-slide.ab-show .ab-in-app-message{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}.ab-centering-div.ab-effect-slide.ab-show.ab-animate-in .ab-in-app-message,.ab-iam-root.v3.ab-effect-slide.ab-show.ab-animate-in .ab-in-app-message{-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-centering-div.ab-effect-slide.ab-hide .ab-in-app-message,.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message{-webkit-transform:translateX(535px);-moz-transform:translateX(535px);-ms-transform:translateX(535px);transform:translateX(535px)}.ab-centering-div.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-left,.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-left{-webkit-transform:translateX(-535px);-moz-transform:translateX(-535px);-ms-transform:translateX(-535px);transform:translateX(-535px)}.ab-centering-div.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-up,.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-up{-webkit-transform:translateY(-535px);-moz-transform:translateY(-535px);-ms-transform:translateY(-535px);transform:translateY(-535px)}.ab-centering-div.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-down,.ab-iam-root.v3.ab-effect-slide.ab-hide .ab-in-app-message.ab-swiped-down{-webkit-transform:translateY(535px);-moz-transform:translateY(535px);-ms-transform:translateY(535px);transform:translateY(535px)}.ab-centering-div.ab-effect-slide.ab-hide.ab-animate-out .ab-in-app-message,.ab-iam-root.v3.ab-effect-slide.ab-hide.ab-animate-out .ab-in-app-message{-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-centering-div .ab-ios-scroll-wrapper,.ab-iam-root.v3 .ab-ios-scroll-wrapper{position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;pointer-events:all;touch-action:auto;-webkit-overflow-scrolling:touch}.ab-centering-div .ab-in-app-message,.ab-iam-root.v3 .ab-in-app-message{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:fixed;text-align:center;-webkit-box-shadow:0 0 4px rgba(0,0,0,.3);-moz-box-shadow:0 0 4px rgba(0,0,0,.3);box-shadow:0 0 4px rgba(0,0,0,.3);line-height:normal;letter-spacing:normal;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;z-index:1050;max-width:100%;overflow:hidden;display:inline-block;pointer-events:all;color:#333}.ab-centering-div .ab-in-app-message.ab-no-shadow,.ab-iam-root.v3 .ab-in-app-message.ab-no-shadow{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.ab-centering-div .ab-in-app-message :focus,.ab-centering-div .ab-in-app-message:focus,.ab-iam-root.v3 .ab-in-app-message :focus,.ab-iam-root.v3 .ab-in-app-message:focus{outline:0}.ab-centering-div .ab-in-app-message.ab-clickable,.ab-iam-root.v3 .ab-in-app-message.ab-clickable{cursor:pointer}.ab-centering-div .ab-in-app-message.ab-background,.ab-iam-root.v3 .ab-in-app-message.ab-background{background-color:#fff}.ab-centering-div .ab-in-app-message .ab-close-button,.ab-iam-root.v3 .ab-in-app-message .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-repeat:no-repeat;background-origin:content-box;background-size:15px;border:none;width:15px;height:15px;-webkit-border-radius:7.5px;-moz-border-radius:7.5px;border-radius:7.5px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:10px;padding-bottom:10px;position:absolute;right:0;top:0;text-align:center;z-index:1060}.ab-centering-div .ab-in-app-message .ab-close-button svg,.ab-iam-root.v3 .ab-in-app-message .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b}.ab-centering-div .ab-in-app-message .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message .ab-close-button svg.ab-chevron{display:none}.ab-centering-div .ab-in-app-message .ab-close-button:active,.ab-iam-root.v3 .ab-in-app-message .ab-close-button:active{background-color:transparent}.ab-centering-div .ab-in-app-message .ab-close-button:focus,.ab-iam-root.v3 .ab-in-app-message .ab-close-button:focus{background-color:transparent}.ab-centering-div .ab-in-app-message .ab-close-button:hover,.ab-iam-root.v3 .ab-in-app-message .ab-close-button:hover{background-color:transparent}.ab-centering-div .ab-in-app-message .ab-close-button:hover svg,.ab-iam-root.v3 .ab-in-app-message .ab-close-button:hover svg{fill-opacity:.8}.ab-centering-div .ab-in-app-message .ab-message-text,.ab-iam-root.v3 .ab-in-app-message .ab-message-text{line-height:1.5;margin:20px 25px;max-width:100%;overflow:hidden;overflow-y:auto;vertical-align:text-bottom;word-wrap:break-word;white-space:pre-wrap}.ab-centering-div .ab-in-app-message .ab-message-text.start-aligned,.ab-iam-root.v3 .ab-in-app-message .ab-message-text.start-aligned{text-align:left;text-align:start}.ab-centering-div .ab-in-app-message .ab-message-text.end-aligned,.ab-iam-root.v3 .ab-in-app-message .ab-message-text.end-aligned{text-align:right;text-align:end}.ab-centering-div .ab-in-app-message .ab-message-text.center-aligned,.ab-iam-root.v3 .ab-in-app-message .ab-message-text.center-aligned{text-align:center}.ab-centering-div .ab-in-app-message .ab-message-text::-webkit-scrollbar,.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar{-webkit-appearance:none;width:14px}.ab-centering-div .ab-in-app-message .ab-message-text::-webkit-scrollbar-thumb,.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-thumb{-webkit-appearance:none;border:4px solid transparent;background-clip:padding-box;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;background-color:rgba(0,0,0,.2)}.ab-centering-div .ab-in-app-message .ab-message-text::-webkit-scrollbar-button,.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-button{width:0;height:0;display:none}.ab-centering-div .ab-in-app-message .ab-message-text::-webkit-scrollbar-corner,.ab-iam-root.v3 .ab-in-app-message .ab-message-text::-webkit-scrollbar-corner{background-color:transparent}.ab-centering-div .ab-in-app-message .ab-message-header,.ab-iam-root.v3 .ab-in-app-message .ab-message-header{letter-spacing:0;margin:0;font-weight:700;display:block;font-size:20px;margin-bottom:10px;line-height:1.3}.ab-centering-div .ab-in-app-message .ab-message-header.start-aligned,.ab-iam-root.v3 .ab-in-app-message .ab-message-header.start-aligned{text-align:left;text-align:start}.ab-centering-div .ab-in-app-message .ab-message-header.end-aligned,.ab-iam-root.v3 .ab-in-app-message .ab-message-header.end-aligned{text-align:right;text-align:end}.ab-centering-div .ab-in-app-message .ab-message-header.center-aligned,.ab-iam-root.v3 .ab-in-app-message .ab-message-header.center-aligned{text-align:center}.ab-centering-div .ab-in-app-message.ab-fullscreen,.ab-centering-div .ab-in-app-message.ab-modal,.ab-centering-div .ab-in-app-message.ab-slideup,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-slideup{-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.ab-centering-div .ab-in-app-message.ab-slideup,.ab-iam-root.v3 .ab-in-app-message.ab-slideup{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;cursor:pointer;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;font-size:14px;font-weight:700;margin:20px;margin-top:calc(constant(safe-area-inset-top,0) + 20px);margin-right:calc(constant(safe-area-inset-right,0) + 20px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 20px);margin-left:calc(constant(safe-area-inset-left,0) + 20px);margin-top:calc(env(safe-area-inset-top,0) + 20px);margin-right:calc(env(safe-area-inset-right,0) + 20px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 20px);margin-left:calc(env(safe-area-inset-left,0) + 20px);max-height:150px;padding:10px;right:0;background-color:#efefef}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone{max-height:66px;margin:10px;margin-top:calc(constant(safe-area-inset-top,0) + 10px);margin-right:calc(constant(safe-area-inset-right,0) + 10px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 10px);margin-left:calc(constant(safe-area-inset-left,0) + 10px);margin-top:calc(env(safe-area-inset-top,0) + 10px);margin-right:calc(env(safe-area-inset-right,0) + 10px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 10px);margin-left:calc(env(safe-area-inset-left,0) + 10px);max-width:90%;max-width:calc(100% - 40px);min-width:90%;min-width:calc(100% - 40px)}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button{display:none}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button svg:not(.ab-chevron),.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-close-button svg:not(.ab-chevron){display:none}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button{display:block;height:20px;padding:0 20px 0 18px;pointer-events:none;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:12px}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-close-button svg.ab-chevron{display:inline}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone.ab-clickable .ab-message-text{border-right-width:40px}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text{max-width:100%;border-right-width:10px}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text span,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text span{max-height:66px}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-icon,.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-image,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-message-text.ab-with-image{max-width:80%;max-width:calc(100% - 50px - 5px - 10px - 25px)}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area{width:50px}.ab-centering-div .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.simulate-phone .ab-image-area img{max-width:50px;max-height:50px;width:auto}.ab-centering-div .ab-in-app-message.ab-slideup.ab-clickable:active .ab-message-text,.ab-centering-div .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-message-text,.ab-centering-div .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:active .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-message-text{opacity:.8}.ab-centering-div .ab-in-app-message.ab-slideup.ab-clickable:active .ab-close-button svg.ab-chevron,.ab-centering-div .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-close-button svg.ab-chevron,.ab-centering-div .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:active .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:focus .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable:hover .ab-close-button svg.ab-chevron{fill-opacity:.8}.ab-centering-div .ab-in-app-message.ab-slideup .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:table-cell;border-color:transparent;border-style:solid;border-width:5px 25px 5px 10px;max-width:430px;vertical-align:middle;margin:0}.ab-centering-div .ab-in-app-message.ab-slideup .ab-message-text span,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text span{display:block;max-height:150px;overflow:auto}.ab-centering-div .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-centering-div .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image{max-width:365px;border-top:0;border-bottom:0}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-repeat:no-repeat;background-origin:content-box;background-size:15px;border:none;width:15px;height:15px;-webkit-border-radius:7.5px;-moz-border-radius:7.5px;border-radius:7.5px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:10px;padding-right:10px;padding-left:6.66666667px;padding-bottom:6.66666667px;position:absolute;right:0;top:0;text-align:center;z-index:1060}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button svg,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button svg.ab-chevron,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg.ab-chevron{display:none}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button:active,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:active{background-color:transparent}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button:focus,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:focus{background-color:transparent}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button:hover,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:hover{background-color:transparent}.ab-centering-div .ab-in-app-message.ab-slideup .ab-close-button:hover svg,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button:hover svg{fill-opacity:.8}.ab-centering-div .ab-in-app-message.ab-slideup .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:table-cell;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;vertical-align:top;width:60px;margin:0}.ab-centering-div .ab-in-app-message.ab-slideup .ab-image-area.ab-icon-area,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area.ab-icon-area{width:auto}.ab-centering-div .ab-in-app-message.ab-slideup .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area img{width:100%}.ab-centering-div .ab-in-app-message.ab-fullscreen,.ab-centering-div .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-modal{font-size:14px}.ab-centering-div .ab-in-app-message.ab-fullscreen .ab-image-area,.ab-centering-div .ab-in-app-message.ab-modal .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area{position:relative;display:block;overflow:hidden}.ab-centering-div .ab-in-app-message.ab-fullscreen .ab-image-area .ab-center-cropped-img,.ab-centering-div .ab-in-app-message.ab-modal .ab-image-area .ab-center-cropped-img,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area .ab-center-cropped-img,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area .ab-center-cropped-img{background-size:cover;background-repeat:no-repeat;background-position:50% 50%;position:absolute;top:0;right:0;bottom:0;left:0}.ab-centering-div .ab-in-app-message.ab-fullscreen .ab-icon,.ab-centering-div .ab-in-app-message.ab-modal .ab-icon,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-icon{margin-top:20px}.ab-centering-div .ab-in-app-message.ab-fullscreen.graphic,.ab-centering-div .ab-in-app-message.ab-modal.graphic,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic{padding:0}.ab-centering-div .ab-in-app-message.ab-fullscreen.graphic .ab-message-text,.ab-centering-div .ab-in-app-message.ab-modal.graphic .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-message-text{display:none}.ab-centering-div .ab-in-app-message.ab-fullscreen.graphic .ab-message-buttons,.ab-centering-div .ab-in-app-message.ab-modal.graphic .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-message-buttons{bottom:0;left:0}.ab-centering-div .ab-in-app-message.ab-fullscreen.graphic .ab-image-area,.ab-centering-div .ab-in-app-message.ab-modal.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area{height:auto;margin:0}.ab-centering-div .ab-in-app-message.ab-fullscreen.graphic .ab-image-area img,.ab-centering-div .ab-in-app-message.ab-modal.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{display:block;top:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none}.ab-centering-div .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-modal{padding-top:20px;width:450px;max-width:450px;max-height:720px}.ab-centering-div .ab-in-app-message.ab-modal.simulate-phone,.ab-iam-root.v3 .ab-in-app-message.ab-modal.simulate-phone{max-width:91%;max-width:calc(100% - 30px)}.ab-centering-div .ab-in-app-message.ab-modal.simulate-phone.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.simulate-phone.graphic .ab-image-area img{max-width:91vw;max-width:calc(100vw - 30px)}.ab-centering-div .ab-in-app-message.ab-modal .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text{max-height:660px}.ab-centering-div .ab-in-app-message.ab-modal .ab-message-text.ab-with-image,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-image{max-height:524.82758621px}.ab-centering-div .ab-in-app-message.ab-modal .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-icon{max-height:610px}.ab-centering-div .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons{margin-bottom:93px;max-height:587px}.ab-centering-div .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-image,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-image{max-height:451.82758621px}.ab-centering-div .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-icon{max-height:537px}.ab-centering-div .ab-in-app-message.ab-modal .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area{margin-top:-20px;max-height:155.17241379px}.ab-centering-div .ab-in-app-message.ab-modal .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area img{max-width:100%;max-height:155.17241379px}.ab-centering-div .ab-in-app-message.ab-modal .ab-image-area.ab-icon-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-image-area.ab-icon-area{height:auto}.ab-centering-div .ab-in-app-message.ab-modal.graphic,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic{width:auto;overflow:hidden}.ab-centering-div .ab-in-app-message.ab-modal.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area{display:inline}.ab-centering-div .ab-in-app-message.ab-modal.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{max-height:720px;max-width:450px}.ab-centering-div .ab-in-app-message.ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen{width:450px;max-height:720px}.ab-centering-div .ab-in-app-message.ab-fullscreen.landscape,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape{width:720px;max-height:450px}.ab-centering-div .ab-in-app-message.ab-fullscreen.landscape .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape .ab-image-area{height:225px}.ab-centering-div .ab-in-app-message.ab-fullscreen.landscape.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape.graphic .ab-image-area{height:450px}.ab-centering-div .ab-in-app-message.ab-fullscreen.landscape .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape .ab-message-text{max-height:112px}.ab-centering-div .ab-in-app-message.ab-fullscreen .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-message-text{max-height:247px}.ab-centering-div .ab-in-app-message.ab-fullscreen .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-message-text.ab-with-buttons{margin-bottom:93px}.ab-centering-div .ab-in-app-message.ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area{height:360px}.ab-centering-div .ab-in-app-message.ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.graphic .ab-image-area{height:720px}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone{-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-close-button,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone .ab-image-area,.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-image-area{height:50%}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic),.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic) .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone:not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone.graphic,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic{display:block}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-image-area{height:100%}.ab-centering-div .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-message-button,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.simulate-phone.graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}.ab-centering-div .ab-in-app-message.ab-html-message,.ab-iam-root.v3 .ab-in-app-message.ab-html-message{background-color:transparent;border:none;height:100%;overflow:auto;position:relative;touch-action:auto;width:100%}.ab-centering-div .ab-in-app-message .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message .ab-message-buttons{position:absolute;bottom:0;width:100%;padding:17px 25px 30px 25px;z-index:inherit;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ab-centering-div .ab-in-app-message .ab-message-button,.ab-iam-root.v3 .ab-in-app-message .ab-message-button{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;height:44px;line-height:normal;letter-spacing:normal;margin:0;max-width:100%;min-width:80px;padding:0 12px;position:relative;text-transform:none;width:48%;width:calc(50% - 5px);border:1px solid #1b78cf;-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;word-wrap:normal;white-space:nowrap}.ab-centering-div .ab-in-app-message .ab-message-button:first-of-type,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:first-of-type{float:left;background-color:#fff;color:#1b78cf}.ab-centering-div .ab-in-app-message .ab-message-button:last-of-type,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:last-of-type{float:right;background-color:#1b78cf;color:#fff}.ab-centering-div .ab-in-app-message .ab-message-button:first-of-type:last-of-type,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:first-of-type:last-of-type{float:none;width:auto}.ab-centering-div .ab-in-app-message .ab-message-button:after,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent}.ab-centering-div .ab-in-app-message .ab-message-button:after,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:after{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease}.ab-centering-div .ab-in-app-message .ab-message-button:hover,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:hover{opacity:.8}.ab-centering-div .ab-in-app-message .ab-message-button:active:after,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:active:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.08)}.ab-centering-div .ab-in-app-message .ab-message-button:focus:after,.ab-iam-root.v3 .ab-in-app-message .ab-message-button:focus:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.15)}.ab-centering-div .ab-in-app-message .ab-message-button a,.ab-iam-root.v3 .ab-in-app-message .ab-message-button a{color:inherit;text-decoration:inherit}.ab-centering-div .ab-in-app-message img,.ab-iam-root.v3 .ab-in-app-message img{display:inline-block}.ab-centering-div .ab-in-app-message .ab-icon,.ab-iam-root.v3 .ab-in-app-message .ab-icon{display:inline-block;padding:10px;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px}.ab-centering-div .ab-in-app-message .ab-icon .fa,.ab-iam-root.v3 .ab-in-app-message .ab-icon .fa{font-size:30px;width:30px}.ab-centering-div .ab-start-hidden,.ab-iam-root.v3 .ab-start-hidden{visibility:hidden}.ab-centering-div .ab-centered,.ab-centering-div.ab-centering-div .ab-modal,.ab-iam-root.v3 .ab-centered,.ab-iam-root.v3.ab-centering-div .ab-modal{margin:auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.ab-email-capture,.ab-iam-root.v3{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ab-email-capture .ab-page-blocker,.ab-iam-root.v3 .ab-page-blocker{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1040;pointer-events:all;background-color:rgba(51,51,51,.75)}.ab-email-capture .ab-in-app-message.ab-modal .ab-email-capture-input{margin-bottom:30px}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-buttons~.ab-message-text{max-height:541px;margin-bottom:160px}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-buttons~.ab-message-text.with-explanatory-link{max-height:513px;margin-bottom:188px}.ab-email-capture .ab-in-app-message.ab-modal .ab-image-area~.ab-message-text{max-height:385.82758621px}.ab-email-capture .ab-in-app-message.ab-modal .ab-image-area~.ab-message-text.with-explanatory-link{max-height:357.82758621px}.ab-email-capture .ab-in-app-message.ab-modal .ab-email-validation-error{margin-top:62px}.ab-email-capture .ab-in-app-message.ab-modal .ab-explanatory-link{display:block}.ab-email-capture .ab-in-app-message.ab-modal .ab-background,.ab-email-capture .ab-in-app-message.ab-modal .ab-mask{position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.ab-email-capture .ab-in-app-message.ab-modal .ab-close-button{line-height:normal}.ab-email-capture .ab-in-app-message.ab-modal .ab-html-close-button{right:3px;top:-1px;font-size:34px;padding-top:0}@media (max-width:600px){.ab-iam-root.v3 .ab-in-app-message.ab-slideup{max-height:66px;margin:10px;margin-top:calc(constant(safe-area-inset-top,0) + 10px);margin-right:calc(constant(safe-area-inset-right,0) + 10px);margin-bottom:calc(constant(safe-area-inset-bottom,0) + 10px);margin-left:calc(constant(safe-area-inset-left,0) + 10px);margin-top:calc(env(safe-area-inset-top,0) + 10px);margin-right:calc(env(safe-area-inset-right,0) + 10px);margin-bottom:calc(env(safe-area-inset-bottom,0) + 10px);margin-left:calc(env(safe-area-inset-left,0) + 10px);max-width:90%;max-width:calc(100% - 40px);min-width:90%;min-width:calc(100% - 40px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button{display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-close-button svg:not(.ab-chevron){display:none}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button{display:block;height:20px;padding:0 20px 0 18px;pointer-events:none;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:12px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-close-button svg.ab-chevron{display:inline}.ab-iam-root.v3 .ab-in-app-message.ab-slideup.ab-clickable .ab-message-text{border-right-width:40px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text{max-width:100%;border-right-width:10px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text span{max-height:66px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-message-text.ab-with-image{max-width:80%;max-width:calc(100% - 50px - 5px - 10px - 25px)}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area{width:50px}.ab-iam-root.v3 .ab-in-app-message.ab-slideup .ab-image-area img{max-width:50px;max-height:50px;width:auto}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape{-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-close-button,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-message-text,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape:not(.graphic),.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen:not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape:not(.graphic) .ab-message-buttons,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen:not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic{display:block}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic .ab-image-area,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.graphic .ab-message-button,.ab-iam-root.v3 .ab-in-app-message:not(.force-desktop).ab-fullscreen.landscape.graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-width:480px){.ab-email-capture .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-modal{max-width:91%;max-width:calc(100% - 30px)}.ab-email-capture .ab-in-app-message.ab-modal.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{max-width:91vw;max-width:calc(100vw - 30px)}}@media (max-height:750px){.ab-email-capture .ab-in-app-message.ab-modal,.ab-iam-root.v3 .ab-in-app-message.ab-modal{max-height:91%;max-height:calc(100% - 30px)}.ab-email-capture .ab-in-app-message.ab-modal.graphic .ab-image-area img,.ab-iam-root.v3 .ab-in-app-message.ab-modal.graphic .ab-image-area img{max-height:91vh;max-height:calc(100vh - 30px)}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-text,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text{max-height:65vh;max-height:calc(100vh - 30px - 60px)}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-text.ab-with-image,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-image{max-height:45vh;max-height:calc(100vh - 30px - 155.17241379310346px - 40px)}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-text.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-icon{max-height:45vh;max-height:calc(100vh - 30px - 70px - 40px)}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons{max-height:50vh;max-height:calc(100vh - 30px - 93px - 40px)}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-image,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-image{max-height:30vh;max-height:calc(100vh - 30px - 155.17241379310346px - 93px - 20px)}.ab-email-capture .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-icon,.ab-iam-root.v3 .ab-in-app-message.ab-modal .ab-message-text.ab-with-buttons.ab-with-icon{max-height:30vh;max-height:calc(100vh - 30px - 70px - 93px - 20px)}}@media (min-width:601px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen .ab-image-area img{max-height:100%;max-width:100%}}@media (max-height:750px) and (min-width:601px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important;width:450px}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen:not(.landscape):not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-height:480px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}@media (max-width:750px){.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop){-webkit-transition:top none;-moz-transition:top none;-o-transition:top none;transition:top none;top:0;right:0;bottom:0;left:0;height:100%;width:100%;max-height:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-transform:none;-moz-transform:none;-ms-transform:none;transform:none;height:auto!important}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-close-button{margin-right:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-right:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0));margin-left:calc(constant(safe-area-inset-bottom,0) + constant(safe-area-inset-top,0));margin-left:calc(env(safe-area-inset-bottom,0) + env(safe-area-inset-top,0))}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-image-area,.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-image-area{height:50%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text{max-height:48%;max-height:calc(50% - 20px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop) .ab-message-text.ab-with-buttons{margin-bottom:20px;max-height:30%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).landscape .ab-message-text.ab-with-buttons{max-height:20%;max-height:calc(50% - 93px - 20px)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic){padding-bottom:0;padding-bottom:constant(safe-area-inset-bottom,0);padding-bottom:env(safe-area-inset-bottom,0)}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop):not(.graphic) .ab-message-buttons{padding-top:0;position:relative}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic{display:block}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-image-area{height:100%}.ab-iam-root.v3 .ab-in-app-message.ab-fullscreen.landscape:not(.force-desktop).graphic .ab-message-button{margin-bottom:0;margin-bottom:constant(safe-area-inset-bottom,0);margin-bottom:env(safe-area-inset-bottom,0)}}body>.ab-feed{position:fixed;top:0;right:0;bottom:0;width:421px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}body>.ab-feed .ab-feed-body{position:absolute;top:0;left:0;right:0;border:none;border-left:1px solid #d0d0d0;padding-top:58px;min-height:100%}body>.ab-feed .ab-no-cards-message{position:absolute;width:100%;margin-left:-20px;top:40%}.ab-feed{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 1px 7px 1px rgba(66,82,113,.15);-moz-box-shadow:0 1px 7px 1px rgba(66,82,113,.15);box-shadow:0 1px 7px 1px rgba(66,82,113,.15);width:402px;background-color:#eee;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;font-size:13px;line-height:130%;letter-spacing:normal;overflow-y:auto;overflow-x:visible;z-index:1050;-webkit-overflow-scrolling:touch}.ab-feed :focus,.ab-feed:focus{outline:0}.ab-feed .ab-feed-body{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border:1px solid #d0d0d0;border-top:none;padding:20px 20px 0 20px}.ab-feed.ab-effect-slide{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px);-webkit-transition:transform .5s ease-in-out;-moz-transition:transform .5s ease-in-out;-o-transition:transform .5s ease-in-out;transition:transform .5s ease-in-out}.ab-feed.ab-effect-slide.ab-show{-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}.ab-feed.ab-effect-slide.ab-hide{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px)}.ab-feed .ab-card{position:relative;-webkit-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-moz-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;width:100%;border:1px solid #d0d0d0;margin-bottom:20px;overflow:hidden;background-color:#fff;-webkit-transition:height .4s ease-in-out,margin .4s ease-in-out;-moz-transition:height .4s ease-in-out,margin .4s ease-in-out;-o-transition:height .4s ease-in-out,margin .4s ease-in-out;transition:height .4s ease-in-out,margin .4s ease-in-out}.ab-feed .ab-card .ab-pinned-indicator{position:absolute;right:0;top:0;margin-right:-1px;width:0;height:0;border-style:solid;border-width:0 24px 24px 0;border-color:transparent #1676d0 transparent transparent}.ab-feed .ab-card .ab-pinned-indicator .fa-star{position:absolute;right:-21px;top:2px;font-size:9px;color:#fff}.ab-feed .ab-card.ab-effect-card.ab-hide{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out}.ab-feed .ab-card.ab-effect-card.ab-hide.ab-swiped-left{-webkit-transform:translateX(-450px);-moz-transform:translateX(-450px);-ms-transform:translateX(-450px);transform:translateX(-450px)}.ab-feed .ab-card.ab-effect-card.ab-hide.ab-swiped-right{-webkit-transform:translateX(450px);-moz-transform:translateX(450px);-ms-transform:translateX(450px);transform:translateX(450px)}.ab-feed .ab-card.ab-effect-card.ab-hide:not(.ab-swiped-left):not(.ab-swiped-right){opacity:0}.ab-feed .ab-card .ab-close-button{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;background-color:transparent;background-repeat:no-repeat;background-origin:content-box;background-size:15px;border:none;width:15px;height:15px;-webkit-border-radius:7.5px;-moz-border-radius:7.5px;border-radius:7.5px;cursor:pointer;display:block;font-size:15px;line-height:0;padding-top:15px;padding-right:15px;padding-left:10px;padding-bottom:10px;position:absolute;right:0;top:0;text-align:center;z-index:1060;opacity:0;-webkit-transition:.5s;-moz-transition:.5s;-o-transition:.5s;transition:.5s}.ab-feed .ab-card .ab-close-button svg{-webkit-transition:.2s ease;-moz-transition:.2s ease;-o-transition:.2s ease;transition:.2s ease;fill:#9b9b9b}.ab-feed .ab-card .ab-close-button svg.ab-chevron{display:none}.ab-feed .ab-card .ab-close-button:active{background-color:transparent}.ab-feed .ab-card .ab-close-button:focus{background-color:transparent}.ab-feed .ab-card .ab-close-button:hover{background-color:transparent}.ab-feed .ab-card .ab-close-button:hover svg{fill-opacity:.8}.ab-feed .ab-card .ab-close-button:hover{opacity:1}.ab-feed .ab-card .ab-close-button:focus{opacity:1}.ab-feed .ab-card a{color:inherit;text-decoration:none}.ab-feed .ab-card a:hover{text-decoration:underline}.ab-feed .ab-card .ab-image-area{display:inline-block;vertical-align:top;line-height:0;overflow:hidden;width:100%;-webkit-box-sizing:initial;-moz-box-sizing:initial;box-sizing:initial}.ab-feed .ab-card .ab-image-area img{height:auto;width:100%}.ab-feed .ab-card.ab-banner .ab-card-body{display:none}.ab-feed .ab-card .ab-card-body{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:inline-block;width:100%;position:relative}.ab-feed .ab-card .ab-unread-indicator{position:absolute;bottom:0;margin-right:-1px;width:100%;height:5px;background-color:#1676d0}.ab-feed .ab-card .ab-unread-indicator.read{background-color:transparent}.ab-feed .ab-card .ab-title{letter-spacing:0;margin:0;font-weight:700;display:block;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;font-size:18px;line-height:130%;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;padding:20px 25px 0 25px}.ab-feed .ab-card .ab-description{color:#545454;padding:15px 25px 20px 25px;word-wrap:break-word;white-space:pre-wrap}.ab-feed .ab-card .ab-description.ab-no-title{padding-top:20px}.ab-feed .ab-card .ab-url-area{color:#1676d0;margin-top:12px;font-family:'Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif}.ab-feed .ab-card.ab-classic-card .ab-card-body{min-height:40px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.ab-feed .ab-card.ab-classic-card.with-image .ab-card-body{min-height:100px;padding-left:72px}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area{width:60px;height:60px;padding:25px 0 25px 25px;position:absolute}.ab-feed .ab-card.ab-classic-card.with-image .ab-image-area img{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;width:60px;height:60px}.ab-feed .ab-card.ab-classic-card.with-image .ab-title{background-color:transparent;font-size:16px}.ab-feed .ab-card.ab-classic-card.with-image .ab-description{padding-top:10px}.ab-feed .ab-card.ab-control-card{height:0;width:0;margin:0;border:0}.ab-feed .ab-feed-buttons-wrapper{position:relative;background-color:#282828;height:38px;-webkit-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);-moz-box-shadow:0 2px 3px 0 rgba(178,178,178,.5);box-shadow:0 2px 3px 0 rgba(178,178,178,.5);z-index:1}.ab-feed .ab-feed-buttons-wrapper .ab-close-button,.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button{cursor:pointer;color:#fff;font-size:18px;margin:10px;-webkit-transition:.2s;-moz-transition:.2s;-o-transition:.2s;transition:.2s}.ab-feed .ab-feed-buttons-wrapper .ab-close-button:hover,.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button:hover{font-size:22px}.ab-feed .ab-feed-buttons-wrapper .ab-close-button{float:right;margin-top:9px}.ab-feed .ab-feed-buttons-wrapper .ab-close-button:hover{margin-top:6px;margin-right:9px}.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button{margin-left:12px}.ab-feed .ab-feed-buttons-wrapper .ab-refresh-button:hover{margin-top:8px;margin-left:10px}.ab-feed .ab-no-cards-message{text-align:center;margin-bottom:20px}@media (max-width:600px){body>.ab-feed{width:100%}}";};function Qc(a){null==a&&(a="");var b=a.split("?").slice(1).join("?");a={};if(null!=b){b=b.split("&");for(var c=0;c<b.length;c++){var d=b[c].split("=");""!==d[0]&&(a[d[0]]=d[1]);}}return a}function Rc(a){return a&&(a=a.toString().toLowerCase(),0===a.lastIndexOf("javascript:",0)||0===a.lastIndexOf("data:",0))?!0:!1}function zc(a,b,c,d,e,f,g,h,l,k,m,q,t){f=f||gc.MANUAL;null!=a&&0<a.length&&0<a.indexOf('"ab-in-app-message ab-html-message ab-email-capture"')&&0<a.indexOf('"ab-in-app-message ab-show ab-modal ab-effect-modal"')&&(l=h=!0);U.call(this,a,null,null,b,c,d,e,null,null,null,f,g,null,null,null,null,null,null,null,null,h,l,null,null,null,k,void 0,void 0,void 0,m,q);this.messageFields=t;}ia(zc,U);zc.prototype.Ce=function(){return !1};zc.prototype.eb=function(a){return this.Ra?!1:(this.Ra=!0,zb(this.W,a),!0)};
zc.prototype.Y=function(a,b,c,d,e){function f(l){var k=l.getAttribute("href"),m=l.onclick;return function(q){if(null==m||"function"!==typeof m||!1!==m()){var t=Qc(k).abButtonId;if(null==t||""===t)t=l.getAttribute("id");if(null!=k&&""!==k&&0!==k.indexOf("#")){var r="blank"===(l.getAttribute("target")||"").toLowerCase().replace("_",""),y=e||g.openTarget===fc.BLANK||r;r=function(){a.Bb(g,t,k);Lb.openUri(k,q,y);};y?r():Fc(g,h,r);}else a.Bb(g,t,k);q.stopPropagation();return !1}}}var g=this;this.cc=document.activeElement;
var h=document.createElement("iframe");h.setAttribute("title","Modal Message");h.onload=function(){function l(z){return function(){var F=arguments;Fc(g,h,function(){b.display[z].apply(b.display,Array.prototype.slice.call(F));});}}function k(z){return function(){var F=b.getUser();F[z].apply(F,Array.prototype.slice.call(arguments));}}function m(z){return function(){b[z].apply(b,Array.prototype.slice.call(arguments));}}var q=null,t=a.Tf();if(null!=t){q=document.createElement("html");q.innerHTML=g.message;
for(var r=q.getElementsByTagName("style"),y=0;y<r.length;y++)r[y].setAttribute("nonce",t);r=q.getElementsByTagName("script");for(y=0;y<r.length;y++)r[y].setAttribute("nonce",t);}h.contentWindow.focus();h.contentWindow.document.write(q?q.innerHTML:g.message);q=h.contentWindow.document.getElementsByTagName("head")[0];null!=q&&(r=document.createElement("style"),r.innerHTML=Pc.je,null!=t&&r.setAttribute("nonce",t),q.appendChild(r),lc(g)&&(r=document.createElement("style"),r.innerHTML=g.css,r.id=mc(g),
null!=t&&r.setAttribute("nonce",t),q.appendChild(r)),t=h.contentWindow.document.createElement("base"),t.setAttribute("target","_parent"),q.appendChild(t));t=h.contentWindow.document.getElementsByTagName("title");0<t.length&&h.setAttribute("title",t[0].textContent);t={closeMessage:function(){Fc(g,h);},logClick:function(){var z=[g];0<arguments.length&&z.push(arguments[0]);b.logInAppMessageHtmlClick.apply(b,z);},display:{},web:{}};q=["requestImmediateDataFlush","logCustomEvent","logPurchase","unregisterAppboyPushMessages"];
for(r=0;r<q.length;r++)t[q[r]]=m(q[r]);q="setFirstName setLastName setEmail setGender setDateOfBirth setCountry setHomeCity setEmailNotificationSubscriptionType setPushNotificationSubscriptionType setPhoneNumber setCustomUserAttribute addToCustomAttributeArray removeFromCustomAttributeArray incrementCustomUserAttribute setCustomLocationAttribute".split(" ");var A={};for(r=0;r<q.length;r++)A[q[r]]=k(q[r]);t.getUser=function(){return A};q=["showFeed"];for(r=0;r<q.length;r++)t.display[q[r]]=l(q[r]);
q=["registerAppboyPushMessages","trackLocation"];for(r=0;r<q.length;r++)t.web[q[r]]=m(q[r]);h.contentWindow.appboyBridge=t;if(g.dg!==yc){q=h.contentWindow.document.getElementsByTagName("a");for(r=0;r<q.length;r++)q[r].onclick=f(q[r]);q=h.contentWindow.document.getElementsByTagName("button");for(r=0;r<q.length;r++)q[r].onclick=f(q[r]);}q=h.contentWindow.document.body;null!=q&&(kc(g)&&(q.id=g.htmlId),r=document.createElement("hidden"),r.onclick=t.closeMessage,r.className="ab-programmatic-close-button",
q.appendChild(r));h.contentWindow.dispatchEvent(new CustomEvent("ab.BridgeReady"));-1!==h.className.indexOf("ab-start-hidden")&&(h.className=h.className.replace("ab-start-hidden",""),d(h));document.activeElement!==h&&h.focus();};h.className="ab-in-app-message ab-start-hidden ab-html-message ab-modal-interactions";return jb.Dd===jb.Zf.Bc?(c=document.createElement("div"),c.className="ab-ios-scroll-wrapper",c.appendChild(h),this.bc=c):this.bc=h};
zc.prototype.ma=function(){return U.prototype.ma.call(this)+" ab-effect-html"};I.HtmlMessage=zc;function sc(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,L,Y,ea,n,u,x,C){k=k||gc.MANUAL;u=u||Ic.FIT_CENTER;U.call(this,a,b,null,c,d,e,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,L,Y,ea,n,u,void 0,x,C);}ia(sc,U);sc.prototype.Y=function(a,b,c,d,e){this.cc=document.activeElement;b=U.prototype.Y.call(this,a,c,d,e);b.className+=" ab-modal ab-centered";Oc(this,a,c,b,e);Mc(b);Nc(this.Sc,b);return b};sc.prototype.ma=function(){return U.prototype.ma.call(this)+" ab-effect-modal"};sc.DefaultTextAlignment=Jc;
I.ModalMessage=sc;function wc(a,b,c,d,e,f,g,h,l,k,m,q,t,r,y,A,z,F,G,E,K,N,L){F=F||ic.Xe;z=z||ic.We;b=b||cc.START;U.call(this,a,b,c,d,e,f,g,h,l,k,m,q,t,r,null,y,A,z,F,G,E,K,void 0,void 0,void 0,void 0,void 0,void 0,void 0,N,L);}ia(wc,U);p=wc.prototype;p.Za=function(){return !1};
p.Y=function(a,b,c,d,e){var f=U.prototype.Y.call(this,a,c,d,e);f.className+=" ab-slideup";var g=f.getElementsByClassName("ab-close-button")[0];null!=g&&(a=Jb("0 0 11.38 19.44","M11.38 9.72l-9.33 9.72L0 17.3l7.27-7.58L0 2.14 2.05 0l9.33 9.72z",lc(this)?void 0:bc(this.closeButtonColor)),a.setAttribute("class","ab-chevron"),g.appendChild(a));Eb(f,Fb,function(l){f.className+=" ab-swiped-left";g.onclick(l);});Eb(f,Gb,function(l){f.className+=" ab-swiped-right";g.onclick(l);});if(this.slideFrom===dc.TOP){a=
Hb;var h=" ab-swiped-up";}else a=Ib,h=" ab-swiped-down";Eb(f,a,function(l){f.className+=h;g.onclick(l);});return f};p.fe=function(){var a=document.createElement("span");a.appendChild(document.createTextNode(this.message));return a};p.rc=function(a){var b=a.getElementsByClassName("ab-in-app-message")[0];Cb(b,!0,!0)||(this.slideFrom===dc.TOP?b.style.top="0px":b.style.bottom="0px");U.prototype.rc.call(this,a);};p.ma=function(){return U.prototype.ma.call(this)+" ab-effect-slide"};
wc.DefaultTextAlignment="START";I.SlideUpMessage=wc;function Sc(a,b){Tc={en:{NO_CARDS_MESSAGE:"We have no updates for you at this time.<br/>Please check again later.",FEED_TIMEOUT_MESSAGE:"Sorry, this refresh timed out.<br/>Please try again later."},ar:{NO_CARDS_MESSAGE:"\u0644\u064a\u0633 \u0644\u062f\u064a\u0646\u0627 \u0623\u064a \u062a\u062d\u062f\u064a\u062b. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0644\u0627\u062d\u0642\u0627\u064b",FEED_TIMEOUT_MESSAGE:"\u064a\u0631\u062c\u0649 \u062a\u0643\u0631\u0627\u0631 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0644\u0627\u062d\u0642\u0627"},
cs:{NO_CARDS_MESSAGE:"V tuto chv\u00edli pro v\u00e1s nem\u00e1me \u017e\u00e1dn\u00e9 aktualizace.<br/>Zkontrolujte pros\u00edm znovu pozd\u011bji.",FEED_TIMEOUT_MESSAGE:"Pros\u00edm zkuste to znovu pozd\u011bji."},da:{NO_CARDS_MESSAGE:"Vi har ingen updates.<br/>Pr\u00f8v venligst senere.",FEED_TIMEOUT_MESSAGE:"Pr\u00f8v venligst senere."},de:{NO_CARDS_MESSAGE:"Derzeit sind keine Updates verf\u00fcgbar.<br/>Bitte sp\u00e4ter noch einmal versuchen.",FEED_TIMEOUT_MESSAGE:"Bitte sp\u00e4ter noch einmal versuchen."},
es:{NO_CARDS_MESSAGE:"No tenemos actualizaciones.<br/>Por favor compru\u00e9belo m\u00e1s tarde.",FEED_TIMEOUT_MESSAGE:"Por favor int\u00e9ntelo m\u00e1s tarde."},"es-mx":{NO_CARDS_MESSAGE:"No tenemos ninguna actualizaci\u00f3n.<br/>Vuelva a verificar m\u00e1s tarde.",FEED_TIMEOUT_MESSAGE:"Por favor, vuelva a intentarlo m\u00e1s tarde."},et:{NO_CARDS_MESSAGE:"Uuendusi pole praegu saadaval.<br/>Proovige hiljem uuesti.",FEED_TIMEOUT_MESSAGE:"Palun proovige hiljem uuesti."},fi:{NO_CARDS_MESSAGE:"P\u00e4ivityksi\u00e4 ei ole saatavilla.<br/>Tarkista my\u00f6hemmin uudelleen.",
FEED_TIMEOUT_MESSAGE:"Yrit\u00e4 my\u00f6hemmin uudelleen."},fr:{NO_CARDS_MESSAGE:"Aucune mise \u00e0 jour disponible.<br/>Veuillez v\u00e9rifier ult\u00e9rieurement.",FEED_TIMEOUT_MESSAGE:"Veuillez r\u00e9essayer ult\u00e9rieurement."},he:{NO_CARDS_MESSAGE:".\u05d0\u05d9\u05df \u05dc\u05e0\u05d5 \u05e2\u05d3\u05db\u05d5\u05e0\u05d9\u05dd. \u05d1\u05d1\u05e7\u05e9\u05d4 \u05d1\u05d3\u05d5\u05e7 \u05e9\u05d5\u05d1 \u05d1\u05e7\u05e8\u05d5\u05d1",FEED_TIMEOUT_MESSAGE:".\u05d1\u05d1\u05e7\u05e9\u05d4 \u05e0\u05e1\u05d4 \u05e9\u05d5\u05d1 \u05d1\u05e7\u05e8\u05d5\u05d1"},
hi:{NO_CARDS_MESSAGE:"\u0939\u092e\u093e\u0930\u0947 \u092a\u093e\u0938 \u0915\u094b\u0908 \u0905\u092a\u0921\u0947\u091f \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964 \u0915\u0943\u092a\u092f\u093e \u092c\u093e\u0926 \u092e\u0947\u0902 \u092b\u093f\u0930 \u0938\u0947 \u091c\u093e\u0901\u091a \u0915\u0930\u0947\u0902.\u0964",FEED_TIMEOUT_MESSAGE:"\u0915\u0943\u092a\u092f\u093e \u092c\u093e\u0926 \u092e\u0947\u0902 \u0926\u094b\u092c\u093e\u0930\u093e \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902\u0964."},
id:{NO_CARDS_MESSAGE:"Kami tidak memiliki pembaruan. Coba lagi nanti.",FEED_TIMEOUT_MESSAGE:"Coba lagi nanti."},it:{NO_CARDS_MESSAGE:"Non ci sono aggiornamenti.<br/>Ricontrollare pi\u00f9 tardi.",FEED_TIMEOUT_MESSAGE:"Riprovare pi\u00f9 tardi."},ja:{NO_CARDS_MESSAGE:"\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8\u306f\u3042\u308a\u307e\u305b\u3093\u3002<br/>\u5f8c\u3067\u3082\u3046\u4e00\u5ea6\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",FEED_TIMEOUT_MESSAGE:"\u5f8c\u3067\u3082\u3046\u4e00\u5ea6\u8a66\u3057\u3066\u304f\u3060\u3055\u3044\u3002"},
ko:{NO_CARDS_MESSAGE:"\uc5c5\ub370\uc774\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc74c\uc5d0 \ub2e4\uc2dc \ud655\uc778\ud574 \uc8fc\uc2ed\uc2dc\uc624.",FEED_TIMEOUT_MESSAGE:"\ub098\uc911\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc2ed\uc2dc\uc624."},ms:{NO_CARDS_MESSAGE:"Tiada kemas kini. Sila periksa kemudian.",FEED_TIMEOUT_MESSAGE:"Sila cuba kemudian."},nl:{NO_CARDS_MESSAGE:"Er zijn geen updates.<br/>Probeer het later opnieuw.",FEED_TIMEOUT_MESSAGE:"Probeer het later opnieuw."},no:{NO_CARDS_MESSAGE:"Vi har ingen oppdateringer.<br/>Vennligst sjekk igjen senere.",
FEED_TIMEOUT_MESSAGE:"Vennligst pr\u00f8v igjen senere."},pl:{NO_CARDS_MESSAGE:"Brak aktualizacji.<br/>Prosz\u0119 sprawdzi\u0107 ponownie p\u00f3\u017aniej.",FEED_TIMEOUT_MESSAGE:"Prosz\u0119 spr\u00f3bowa\u0107 ponownie p\u00f3\u017aniej."},pt:{NO_CARDS_MESSAGE:"N\u00e3o temos atualiza\u00e7\u00f5es.<br/>Por favor, verifique mais tarde.",FEED_TIMEOUT_MESSAGE:"Por favor, tente mais tarde."},"pt-br":{NO_CARDS_MESSAGE:"N\u00e3o temos nenhuma atualiza\u00e7\u00e3o.<br/>Verifique novamente mais tarde.",
FEED_TIMEOUT_MESSAGE:"Tente novamente mais tarde."},ru:{NO_CARDS_MESSAGE:"\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b.<br/>\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043d\u043e\u0432\u0430 \u043f\u043e\u0437\u0436\u0435.",FEED_TIMEOUT_MESSAGE:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 \u043f\u043e\u0437\u0436\u0435."},
sv:{NO_CARDS_MESSAGE:"Det finns inga uppdateringar.<br/>F\u00f6rs\u00f6k igen senare.",FEED_TIMEOUT_MESSAGE:"F\u00f6rs\u00f6k igen senare."},th:{NO_CARDS_MESSAGE:"\u0e40\u0e23\u0e32\u0e44\u0e21\u0e48\u0e21\u0e35\u0e01\u0e32\u0e23\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e15 \u0e01\u0e23\u0e38\u0e13\u0e32\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e20\u0e32\u0e22\u0e2b\u0e25\u0e31\u0e07.",FEED_TIMEOUT_MESSAGE:"\u0e01\u0e23\u0e38\u0e13\u0e32\u0e25\u0e2d\u0e07\u0e43\u0e2b\u0e21\u0e48\u0e20\u0e32\u0e22\u0e2b\u0e25\u0e31\u0e07."},
uk:{NO_CARDS_MESSAGE:"\u041e\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0456.<br/>\u043b\u0430\u0441\u043a\u0430, \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0437\u043d\u043e\u0432\u0443 \u043f\u0456\u0437\u043d\u0456\u0448\u0435.",FEED_TIMEOUT_MESSAGE:"\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."},
vi:{NO_CARDS_MESSAGE:"Ch\u00fang t\u00f4i kh\u00f4ng c\u00f3 c\u1eadp nh\u1eadt n\u00e0o.<br/>Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i sau.",FEED_TIMEOUT_MESSAGE:"Vui l\u00f2ng th\u1eed l\u1ea1i sau."},"zh-hk":{NO_CARDS_MESSAGE:"\u66ab\u6642\u6c92\u6709\u66f4\u65b0.<br/>\u8acb\u7a0d\u5019\u518d\u8a66.",FEED_TIMEOUT_MESSAGE:"\u8acb\u7a0d\u5019\u518d\u8a66."},"zh-hans":{NO_CARDS_MESSAGE:"\u6682\u65f6\u6ca1\u6709\u66f4\u65b0.<br/>\u8bf7\u7a0d\u540e\u518d\u8bd5.",FEED_TIMEOUT_MESSAGE:"\u8bf7\u7a0d\u5019\u518d\u8bd5."},
"zh-hant":{NO_CARDS_MESSAGE:"\u66ab\u6642\u6c92\u6709\u66f4\u65b0.<br/>\u8acb\u7a0d\u5019\u518d\u8a66.",FEED_TIMEOUT_MESSAGE:"\u8acb\u7a0d\u5019\u518d\u8a66."},"zh-tw":{NO_CARDS_MESSAGE:"\u66ab\u6642\u6c92\u6709\u66f4\u65b0.<br/>\u8acb\u7a0d\u5019\u518d\u8a66.",FEED_TIMEOUT_MESSAGE:"\u8acb\u7a0d\u5019\u518d\u8a66."},zh:{NO_CARDS_MESSAGE:"\u6682\u65f6\u6ca1\u6709\u66f4\u65b0.<br/>\u8bf7\u7a0d\u540e\u518d\u8bd5.",FEED_TIMEOUT_MESSAGE:"\u8bf7\u7a0d\u5019\u518d\u8bd5."}};null!=a&&(a=a.toLowerCase());
if(null!=a&&null==Tc[a]){var c=a.indexOf("-");0<c&&(a=a.substring(0,c));}null==Tc[a]&&(a="Braze does not yet have a localization for language "+a+", defaulting to English. Please contact us if you are willing and able to help us translate our SDK into this language.",b?v.error(a):v.info(a),a="en");Uc=a;}var Tc,Uc;function Vc(a,b){this.cards=a;this.lastUpdated=b;}p=Vc.prototype;p.oe=function(){for(var a=0,b=0;b<this.cards.length;b++)this.cards[b].viewed||a++;return a};function Wc(a,b){b&&(b.className=b.className.replace("ab-show","ab-hide"),setTimeout(function(){b&&b.parentNode&&b.parentNode.removeChild(b);},$b));var c=b.getAttribute(Xc);null!=c&&a.S(c);}p.Ga=function(a,b){a.Ga(b);};p.Fa=function(a,b){a.Fa(b);};
function Yc(a,b,c){var d=document.createElement("div");d.className="ab-feed-body";if(null==a.lastUpdated){c=document.createElement("div");c.className="ab-no-cards-message";var e=document.createElement("i");e.className="fa fa-spinner fa-spin fa-4x ab-initial-spinner";c.appendChild(e);d.appendChild(c);}else{e=!1;for(var f=function(k){a.Fa(b,k);},g=function(k){b.oc(k);},h=0;h<a.cards.length;h++){var l=a.cards[h]instanceof Wb;!l||a instanceof Zc?(d.appendChild(a.cards[h].Y(f,g,c)),e=e||!l):v.error("Received a control card for a legacy news feed. Control cards are only supported with content cards.");}e||
(c=document.createElement("div"),c.className="ab-no-cards-message",c.innerHTML=Tc[Uc].NO_CARDS_MESSAGE,d.appendChild(c));}return d}
function $c(a,b,c){if(null!=c){var d=[];c=c.querySelectorAll(".ab-card");a.Qc||(a.Qc={});for(var e=0;e<c.length;e++){var f=c[e].getAttribute("data-ab-card-id");if(!a.Qc[f]){var g=c[e];g=null!=g&&!!g.getAttribute("data-ab-had-top-impression");var h=c[e];h=null!=h&&!!h.getAttribute("data-ab-had-bottom-impression");var l=g,k=h,m=Cb(c[e],!0,!1,!1),q=Cb(c[e],!1,!0,!1);if(!g&&m){g=!0;var t=c[e];null!=t&&t.setAttribute("data-ab-had-top-impression",!0);}!h&&q&&(h=!0,t=c[e],null!=t&&t.setAttribute("data-ab-had-bottom-impression",
!0));if(g&&h&&(m||q||Yb(c[e]),!l||!k))for(g=0;g<a.cards.length;g++)if(a.cards[e].id===f){a.Qc[a.cards[e].id]=!0;d.push(a.cards[e]);break}}}0<d.length&&a.Ga(b,d);}}p.ce=function(a){a.uc();};
function ad(a,b,c){c.setAttribute("aria-busy","true");var d=c.querySelectorAll(".ab-refresh-button")[0];null!=d&&(d.className+=" fa-spin");var e=(new Date).valueOf().toString();c.setAttribute(bd,e);setTimeout(function(){if(c.getAttribute(bd)===e){for(var f=c.querySelectorAll(".fa-spin"),g=0;g<f.length;g++)f[g].className=f[g].className.replace(/fa-spin/g,"");f=c.querySelectorAll(".ab-initial-spinner")[0];null!=f&&(g=document.createElement("span"),g.innerHTML=Tc[Uc].FEED_TIMEOUT_MESSAGE,f.parentNode.appendChild(g),
f.parentNode.removeChild(f));"true"===c.getAttribute("aria-busy")&&c.setAttribute("aria-busy","false");}},cd);a.ce(b);}
p.Y=function(a,b){function c(k){ad(e,a,f);k.stopPropagation();}function d(k){Wc(a,f);k.stopPropagation();}var e=this,f=document.createElement("div");f.className="ab-feed ab-hide ab-effect-slide";f.setAttribute("tabindex","-1");f.setAttribute("aria-label","Feed");f.setAttribute("role","feed");var g=document.createElement("div");g.className="ab-feed-buttons-wrapper";f.appendChild(g);var h=document.createElement("i");h.className="fa fa-times ab-close-button";h.setAttribute("aria-label","Close Feed");h.setAttribute("tabindex",
"0");h.setAttribute("role","button");h.addEventListener("keydown",function(k){32!==k.keyCode&&13!==k.keyCode||d(k);});h.onclick=d;var l=document.createElement("i");l.className="fa fa-refresh ab-refresh-button";null==this.lastUpdated&&(l.className+=" fa-spin");l.setAttribute("aria-label","Refresh Feed");l.setAttribute("tabindex","0");l.setAttribute("role","button");l.addEventListener("keydown",function(k){32!==k.keyCode&&13!==k.keyCode||c(k);});l.onclick=c;g.appendChild(l);g.appendChild(h);f.appendChild(Yc(this,
a,b));f.onscroll=function(){$c(e,a,f);};return f};function dd(a,b,c,d,e,f){if(Aa(b)){for(var g=[],h=0;h<b.length;h++)b[h]instanceof Mb&&g.push(b[h]);a.cards=g;a.lastUpdated=c;null!=d&&(d.setAttribute("aria-busy","false"),null==a.lastUpdated?Wc(e,d):(b=d.querySelectorAll(".ab-feed-body")[0],null!=b&&(f=Yc(a,e,f),b.parentNode.replaceChild(f,b),$c(a,e,f.parentNode))));}}var $b=500,Xc="data-update-subscription-id",bd="data-last-requested-refresh",cd=1E4;I.Feed=Vc;I.Feed.prototype.getUnreadCardCount=Vc.prototype.oe;function Zc(a,b){Vc.call(this,a,b);}ia(Zc,Vc);Zc.prototype.Uf=function(){return Vc.prototype.oe.call(this)};Zc.prototype.Ga=function(a,b){a.Ga(b,!0);};Zc.prototype.Fa=function(a,b){a.Fa(b,!0);};Zc.prototype.ce=function(a){a.Ha();};I.ContentCards=Zc;I.ContentCards.prototype.getUnviewedCardCount=Zc.prototype.Uf;function Sa(){this.h=!1;this.j=[];}function ed(a){this.Xa=a;}ed.prototype.ba=function(a){return null==this.Xa||this.Xa===a[0]};ed.prototype.B=function(){return this.Xa};function fd(a,b,c,d){this.te=a;this.tc=b;this.jb=c;this.I=d;this.tc===gd&&this.jb!==hd&&this.jb!==id&&this.jb!==jd&&this.jb!==kd&&(this.I=Ga(this.I));}
fd.prototype.ba=function(a){var b=null;null!=a&&(b=a[this.te]);switch(this.jb){case ld:return null!=b&&b.valueOf()===this.I.valueOf();case md:return null==b||b.valueOf()!==this.I.valueOf();case nd:return typeof b===typeof this.I&&b>this.I;case hd:return this.tc===gd?null!=b&&Ba(b)&&((new Date).valueOf()-b.valueOf())/1E3<=this.I:typeof b===typeof this.I&&b>=this.I;case od:return typeof b===typeof this.I&&b<this.I;case id:return this.tc===gd?null!=b&&Ba(b)&&((new Date).valueOf()-b.valueOf())/1E3>=this.I:
typeof b===typeof this.I&&b<=this.I;case pd:return null!=b&&"string"===typeof b&&typeof b===typeof this.I&&null!=b.match(this.I);case qd:return null!=b;case rd:return null==b;case jd:return null!=b&&Ba(b)&&(b.valueOf()-(new Date).valueOf())/1E3<this.I;case kd:return null!=b&&Ba(b)&&(b.valueOf()-(new Date).valueOf())/1E3>this.I;case sd:return null==b||typeof b!==typeof this.I||"string"!==typeof b||null==b.match(this.I)}return !1};
fd.prototype.B=function(){var a=this.I;Ba(this.I)&&(a=Fa(a.valueOf()));return {k:this.te,t:this.tc,c:this.jb,v:a}};var ld=1,md=2,nd=3,hd=4,od=5,id=6,pd=10,qd=11,rd=12,jd=15,kd=16,sd=17,gd="date";function td(a){this.filters=a;}td.prototype.ba=function(a){for(var b=!0,c=0;c<this.filters.length;c++){for(var d=this.filters[c],e=!1,f=0;f<d.length;f++)if(d[f].ba(a)){e=!0;break}if(!e){b=!1;break}}return b};function ud(a){if(null==a||!Aa(a))return null;for(var b=[],c=0;c<a.length;c++){for(var d=[],e=a[c],f=0;f<e.length;f++){var g=e[f];d.push(new fd(g.property_key,g.property_type,g.comparator,g.property_value));}b.push(d);}return new td(b)}
td.prototype.B=function(){for(var a=[],b=0;b<this.filters.length;b++){for(var c=this.filters[b],d=[],e=0;e<c.length;e++)d.push(c[e].B());a.push(d);}return a};function vd(a){for(var b=[],c=0;c<a.length;c++){for(var d=[],e=a[c],f=0;f<e.length;f++){var g=e[f];d.push(new fd(g.k,g.t,g.c,g.v));}b.push(d);}return new td(b)}function wd(a,b){this.Xa=a;this.cb=b;}wd.prototype.ba=function(a){if(null==this.Xa||null==this.cb)return !1;var b=a[1];return a[0]===this.Xa&&this.cb.ba(b)};wd.prototype.B=function(){return {e:this.Xa,pf:this.cb.B()}};function xd(a,b){this.Ta=a;this.wb=b;}xd.prototype.ba=function(a){if(null==this.Ta)return !1;var b=yd(a[0],this.Ta);if(!b)return !1;var c=null==this.wb||0===this.wb.length;if(null!=this.wb)for(var d=0;d<this.wb.length;d++)if(this.wb[d]===a[1]){c=!0;break}return b&&c};xd.prototype.B=function(){return this.Ta};function zd(a){this.bb=a;}zd.prototype.ba=function(a){return null==this.bb||a[0]===this.bb};zd.prototype.B=function(){return this.bb};function Ad(a,b){this.bb=a;this.cb=b;}Ad.prototype.ba=function(a){if(null==this.bb||null==this.cb)return !1;var b=a[1];return a[0]===this.bb&&this.cb.ba(b)};Ad.prototype.B=function(){return {id:this.bb,pf:this.cb.B()}};function Bd(a){this.Ta=a;}Bd.prototype.ba=function(a){return null==this.Ta?!0:yd(a[0],this.Ta)};Bd.prototype.B=function(){return this.Ta};var Cd={OPEN:"open",Jc:"purchase",Ed:"push_click",yc:"custom_event",Nb:"iam_click",Vb:"test"};function Dd(a,b){this.type=a;this.data=b;}function Ed(a,b,c){return Fd[a.type]===b&&(null==a.data||a.data.ba(c))}function yd(a,b){var c=null;try{c=window.atob(a);}catch(d){return v.info("Failed to unencode analytics id "+a+": "+d.message),!1}return b===c.split("_")[0]}
function Gd(a){var b=a.type;switch(b){case Hd:var c=null;break;case Id:a=a.data;c=new zd(a?a.product_id:null);break;case Jd:a=a.data;c=new Ad(a?a.product_id:null,a?ud(a.property_filters):null);break;case Kd:a=a.data;c=new Bd(a?a.campaign_id:null);break;case Ld:a=a.data;c=new ed(a?a.event_name:null);break;case Md:a=a.data;c=new wd(a?a.event_name:null,a?ud(a.property_filters):null);break;case Nd:a=a.data;c=new xd(a?a.id:null,a?a.buttons:null);break;case Od:c=null;}return new Dd(b,c)}
Dd.prototype.B=function(){return {t:this.type,d:this.data?this.data.B():null}};function Pd(a){switch(a.t){case Hd:var b=null;break;case Id:b=new zd(a.d);break;case Jd:b=a.d||{};b=new Ad(b.id,vd(b.pf||[]));break;case Kd:b=new Bd(a.d);break;case Ld:b=new ed(a.d);break;case Md:b=a.d||{};b=new wd(b.e,vd(b.pf||[]));break;case Nd:b=new xd(a.d);break;case Od:b=null;}return new Dd(a.t,b)}
var Hd="open",Id="purchase",Jd="purchase_property",Kd="push_click",Ld="custom_event",Md="custom_event_property",Nd="iam_click",Od="test",Fd={};Fd[Hd]=Cd.OPEN;Fd[Id]=Cd.Jc;Fd[Jd]=Cd.Jc;Fd[Kd]=Cd.Ed;Fd[Ld]=Cd.yc;Fd[Md]=Cd.yc;Fd[Nd]=Cd.Nb;Fd[Od]=Cd.Vb;function Qd(a,b,c,d,e,f,g,h,l,k,m,q){this.id=a;this.kb=b||[];void 0===c&&(c=null);this.startTime=c;void 0===d&&(d=null);this.endTime=d;this.priority=e||0;this.type=f;this.Wa=h||0;null==k&&(k=1E3*(this.Wa+30));this.Ia=k;this.data=g;null==l&&(l=Rd);this.Db=l;this.se=m;this.za=q||null;}
function Sd(a,b){var c=(new Date).valueOf()-b;(b=null==b||isNaN(c)||null==a.Ia||c<a.Ia)||v.info("Trigger action "+a.type+" is no longer eligible for display - fired "+c+"ms ago and has a timeout of "+a.Ia+"ms");return !b}Qd.prototype.B=function(){for(var a=[],b=0;b<this.kb.length;b++)a.push(this.kb[b].B());return {i:this.id,c:a,s:this.startTime,e:this.endTime,p:this.priority,t:this.type,da:this.data,d:this.Wa,r:this.Db,tm:this.Ia,ss:this.se,ld:this.za}};
function Td(a){for(var b=[],c=0;c<a.c.length;c++)b.push(Pd(a.c[c]));return new Qd(a.i,b,Ia(a.s),Ia(a.e),a.p,a.t,a.da,a.d,a.r,a.tm,a.ss,a.ld)}var Rd=-1,Ud={Ac:"inapp",Jd:"templated_iam"};function Vd(a,b){a=Math.ceil(a);b=Math.floor(b);return Math.floor(Math.random()*(b-a+1))+a}function Wd(a){var b,c=!1;try{if(window.XMLHttpRequest&&(b=new XMLHttpRequest)&&"undefined"!==typeof b.withCredentials||("undefined"!==typeof XDomainRequest?(b=new XDomainRequest,c=b.async=!0):v.error("This browser does not have any supported ajax options!")),null!=b){var d=function(){"function"===typeof a.error&&a.error(b.status);"function"===typeof a.hc&&a.hc(!1);};b.onload=function(){if(c)var h=!0;else{if(4!==b.readyState)return;h=200<=b.status&&300>b.status||304===b.status;}h?("function"===typeof a.h&&
a.h(JSON.parse(b.responseText)),"function"===typeof a.hc&&a.hc(!0)):d();};b.onerror=function(){d();};b.ontimeout=function(){d();};var e=JSON.stringify(a.data);if(c)b.onprogress=function(){},b.open("post",a.url);else{b.open("POST",a.url,!0);b.setRequestHeader("Content-type","application/json");b.setRequestHeader("X-Requested-With","XMLHttpRequest");for(var f=a.headers||[],g=0;g<f.length;g++)b.setRequestHeader(f[g][0],f[g][1]);}b.send(e);}}catch(h){v.error("Network request error: "+h.message);}}function Xd(a,b,c,d,e,f,g,h,l,k,m){this.Z=a;this.Cf=b;this.Zd=c;this.xf=d;this.Wb=e;this.hb=0;this.$b=k.T.ne;this.Td=null;this.G=f;this.Xb=g;this.f=h;this.D=l;this.b=k;this.vf=m;this.Uc=new xb;this.uf=1E3;this.tf=6E4;}function Yd(a,b){var c=Zd(a.Xb),d=c.ic(),e=Q(a.b,M.zc);Ea(e,d)||(b.device=d);b.api_key=a.Z;b.time=Fa((new Date).valueOf(),!0);b.sdk_version=a.Cf;a.Zd&&(b.sdk_flavor=a.Zd);b.app_version=a.xf;b.device_id=c.id;return b}
function $d(a,b){if(b.error){var c=b.error;"invalid_api_key"===b.error?c='The API key "'+a.api_key+'" is invalid.':"blacklisted"===b.error?c="Sorry, we are not currently accepting your requests. If you think this is in error, please contact us.":"no_device_identifier"===b.error&&(c="No device identifier. Please contact support@braze.com");v.error("Backend error: "+c);return !1}return !0}
function ae(a,b,c,d,e,f,g){null==d&&(d=!0);d&&be(a);var h=mb(a.b),l=qb(a.b),k=ce(a.G);if(0<h.length)for(var m=0;m<h.length;m++)h[m].type===B.Id&&(k=!0);var q=c||k;if(!d||0!==h.length||0!==l.length||b||q){var t=de(a,b,q);if(0<h.length){b=[];for(c=0;c<h.length;c++)b.push(h[c].ic());t.events=b;}0<l.length&&(t.attributes=l);t=Yd(a,t);b=ee(a,t);q&&a.hb++;Wd({url:""+a.Wb+"/data/",data:t,headers:b,h:function(r){q&&(a.hb=Math.max(a.hb-1,0));if($d(t,r)){var y=a.D;if(null!=r&&null!=r.config){var A=r.config;
if(A.time>fe(y).$a){A=new ge(A.time,A.events_blacklist,A.attributes_blacklist,A.purchases_blacklist,A.messaging_session_timeout,A.vapid_public_key,A.content_cards);var z=!1;null!=A.oa&&fe(y).oa!==A.oa&&(z=!0);var F=!1;null!=A.Va.enabled&&(fe(y).Va.enabled||!1)!==A.Va.enabled&&(F=!0);y.dc=A;P(y.b,M.Hd,A.B());z&&zb(y.Zc);F&&zb(y.Ld);}}if(null==t.respond_with||t.respond_with.user_id==a.f.A())null!=t.device&&P(a.b,M.zc,t.device),a.vf(r),"function"===typeof e&&e();}},error:function(){q&&(a.hb=Math.max(a.hb-
1,0));Ua(a.b,h);for(var r=0;r<l.length;r++)ob(a.b,l[r]);"function"===typeof f&&f();},hc:function(r){"function"===typeof g&&g(r);if(d)if(r)ie(a);else{r=a.Td;if(null==r||r<1E3*a.$b)r=1E3*a.$b;ie(a,Math.min(3E5,Vd(1E3*a.$b,3*r)));}}});k&&(v.info("Invoking new session subscriptions"),zb(a.Uc));}else ie(a),"function"===typeof g&&g(!0);}function je(a,b){var c="HTTP error ";null!=a&&(c+=a+" ");v.error(c+b);}
function ke(a,b,c,d,e){var f=de(a,!1,!1);f=Yd(a,f);f.template={trigger_id:b.Ja,trigger_event_type:c};null!=d&&(f.template.data=d.ic());var g=ee(a,f);Wd({url:""+a.Wb+"/template/",data:f,headers:g,h:function(h){$d(f,h)?null==h||null==h.templated_message?a.L(b.Ja,Kc.qb):(h=h.templated_message,h.type!==Ud.Ac?a.L(b.Ja,Kc.sb):(h=nc(h.data),null==h?a.L(b.Ja,Kc.sb):"function"===typeof b.Ee?b.Ee(h):a.L(b.Ja,Kc.qb))):(a.L(b.Ja,Kc.qb),"function"===typeof b.De&&b.De());},error:function(h){var l="getting user personalization for message "+
b.Ja;if((new Date).valueOf()-b.kc>b.Ia)a.L(b.Ja,Kc.qb);else{var k=Math.min(b.Ia,a.tf),m=a.uf;null==e&&(e=m);var q=Math.min(k,Vd(m,3*e));l+=". Retrying in "+q+"ms";setTimeout(function(){ke(a,b,c,d,q);},q);}je(h,l);}});}p=Xd.prototype;
p.Ha=function(a,b,c){var d=Yd(this,{});d.last_full_sync_at=a;d.last_card_updated_at=b;a=this.f.A();null!=a&&(d.user_id=a);Wd({url:""+this.Wb+"/content_cards/sync",data:d,headers:[["X-Braze-Api-Key",this.Z],["X-Braze-DataRequest","true"],["X-Braze-ContentCardsRequest","true"]],h:function(e){$d(d,e)&&c(e);},error:function(e){je(e,"retrieving content cards");}});};
function de(a,b,c){var d={};b&&(d.feed=!0);c&&(d.triggers=!0);b=a.f.A();null!=b&&(d.user_id=b);d.config={config_time:fe(a.D).$a};return {respond_with:d}}function ee(a,b){a=[["X-Braze-Api-Key",a.Z]];var c=!1;null!=b.respond_with&&b.respond_with.triggers&&(a.push(["X-Braze-TriggersRequest","true"]),c=!0);null!=b.respond_with&&b.respond_with.feed&&(a.push(["X-Braze-FeedRequest","true"]),c=!0);c&&a.push(["X-Braze-DataRequest","true"]);return a}
function le(a){if(null==a.campaignId&&null==a.cardId&&null==a.triggerId)return v.info("The in-app message has no analytics id. Not logging event to Braze servers."),null;var b={};null!=a.cardId&&(b.card_ids=[a.cardId]);null!=a.campaignId&&(b.campaign_ids=[a.campaignId]);null!=a.triggerId&&(b.trigger_ids=[a.triggerId]);return b}function me(a){for(var b=null,c=0;c<a.length;c++)null!=a[c].id&&""!==a[c].id&&(b=b||{},b.ids=b.ids||[],b.ids.push(a[c].id));return b}
function ie(a,b){a.Nd||(null==b&&(b=1E3*a.$b),be(a),a.ac=setTimeout(function(){if(document.hidden){var c=function(){document.hidden||(document.removeEventListener("visibilitychange",c,!1),ae(a));};document.addEventListener("visibilitychange",c,!1);}else ae(a);},b),a.Td=b);}function be(a){null!=a.ac&&(clearTimeout(a.ac),a.ac=null);}p.ed=function(){this.Nd=!1;ie(this);};p.yb=function(){this.Uc.N();be(this);this.Nd=!0;ae(this,null,null,!1);this.ac=null;};function ne(a,b){yb(a.Uc,b);}
p.sc=function(a,b){var c=this,d=oe(this.G),e=Ta(this.G);d=d!==e;ae(this,null,!1,null,null,null,b);Za(this);if(d&&null!=a&&(a.Ab()||a.Da())){var f=function(){a.zf?v.info("Push token maintenance is disabled, not refreshing token for backend."):a.subscribe();};b=xa.Na;ta(new pa(b),b.M.Kc,function(g,h){h&&f();},function(){var g=Q(c.b,M.Tb);(null==g||g)&&f();});}};
p.Ua=function(a,b,c,d){var e=this.f.A();if(e!==a){var f=this.G,g=Na(f.b.ia.O(nb.Oa));null!=g&&(f.b.ia.remove(nb.Oa),g=pe(f,(new Date).valueOf(),g),null==g||Ua(f.b,[g]));f=this.f;g=null==f.A();lb(f.b,nb.Oc,new Ma(a));if(g){f=f.b;g=f.T.O(M.Ka);if(null!=g){var h=M.ud,l=g[h];null!=l&&(g[h]=void 0,f.T.store(M.Ka,g),l.user_id=a,ob(f,l));}h=Na(f.ia.O(nb.Oa));g=null;null!=h&&(g=h.ea);h=mb(f);if(null!=h)for(l=0;l<h.length;l++){var k=h[l];null==k.Fb&&k.sessionId==g&&(k.Fb=a);null==k||Ua(f,[k]);}}for(f=0;f<b.length;f++)b[f].Ua(null==
e);null!=e&&R(this.b,M.ob);R(this.b,M.zc);this.sc(d,c);v.info('Changed user to "'+a+'".');}else"function"===typeof c?(v.info('Current user is already "'+a+'". Executing networkCallCompleteCallback.'),c()):v.info('Current user is already "'+a+'". Doing nothing.');};p.mb=function(){return new J(this.f,this)};p.Eb=function(a){be(this);Ta(this.G);ae(this,null,null,null,null,null,a);};p.uc=function(){Ta(this.G);ae(this,!0);};
function qe(a,b,c){Ta(a.G);v.info("Requesting explicit trigger refresh.");ae(a,null,!0,null,b,c);}p.gd=function(a,b){var c=new Sa,d=Ta(this.G);if(-1!==fe(this.D).me.indexOf(a))return v.info('Custom Event "'+a+'" is blacklisted, ignoring.'),c;c.j.push(new D(this.f.A(),B.CustomEvent,(new Date).valueOf(),d,{n:a,p:b}));c.h=Ua(this.b,c.j);return c};
function Ya(a,b,c,d){var e=new Sa,f=Ta(a.G);if($a(a.D,c))return v.info('Custom Attribute "'+c+'" is blacklisted, ignoring.'),e;e.j.push(new D(a.f.A(),b,(new Date).valueOf(),f,{key:c,value:d}));e.h=Ua(a.b,e.j);return e}p.hd=function(a,b,c,d,e){var f=new Sa,g=Ta(this.G);if(-1!==fe(this.D).ue.indexOf(a))return v.info('Purchase "'+a+'" is blacklisted, ignoring.'),f;f.j.push(new D(this.f.A(),B.bf,(new Date).valueOf(),g,{pid:a,c:c,p:b,q:d,pr:e}));f.h=Ua(this.b,f.j);return f};
p.vc=function(a,b,c,d,e,f){var g=new Sa,h=Ta(this.G);b={latitude:b,longitude:c};null!=d&&(b.altitude=d);null!=e&&(b.ll_accuracy=e);null!=f&&(b.alt_accuracy=f);g.j.push(new D(a,B.kf,(new Date).valueOf(),h,b));g.h=Ua(this.b,g.j);return g};
p.Cb=function(a){var b=new Sa,c=Ta(this.G);if(a instanceof oc)b.j.push(new D(this.f.A(),B.Pe,(new Date).valueOf(),c,{trigger_ids:[a.triggerId]}));else{if(!a.md())return v.info("This in-app message has already received an impression. Ignoring analytics event."),b;a=le(a);if(null==a)return b;b.j.push(new D(this.f.A(),B.af,(new Date).valueOf(),c,a));}b.h=Ua(this.b,b.j);return b};
p.qc=function(a){var b=new Sa,c=Ta(this.G);if(!a.eb())return v.info("This in-app message has already received a click. Ignoring analytics event."),b;a=le(a);if(null==a)return b;b.j.push(new D(this.f.A(),B.Bd,(new Date).valueOf(),c,a));b.h=Ua(this.b,b.j);return b};
p.pc=function(a,b){var c=new Sa,d=Ta(this.G);if(!a.eb())return v.info("This in-app message button has already received a click. Ignoring analytics event."),c;b=le(b);if(null==b)return c;if(a.id===Lc)return v.info("This in-app message button does not have a tracking id. Not logging event to Braze servers."),c;null!=a.id&&(b.bid=a.id);c.j.push(new D(this.f.A(),B.Ad,(new Date).valueOf(),d,b));c.h=Ua(this.b,c.j);return c};
p.Bb=function(a,b,c){var d=new Sa,e=Ta(this.G);if(!a.eb(c))return v.info("This in-app message has already received a click. Ignoring analytics event."),d;a=le(a);if(null==a)return d;c=B.Bd;null!=b&&(a.bid=b,c=B.Ad);d.j.push(new D(this.f.A(),c,(new Date).valueOf(),e,a));d.h=Ua(this.b,d.j);return d};p.L=function(a,b){var c=new Sa,d=Ta(this.G);a={trigger_ids:[a],error_code:b};c.j.push(new D(this.f.A(),B.$e,(new Date).valueOf(),d,a));c.h=Ua(this.b,c.j);return c};
p.Ga=function(a,b){var c=new Sa,d=Ta(this.G),e=[],f=[];var g=b?Q(this.b,M.gb)||{}:Q(this.b,M.ob)||{};for(var h=0;h<a.length;h++)a[h].md(),a[h]instanceof Wb?f.push(a[h]):e.push(a[h]),g[a[h].id]=!0;a=me(e);f=me(f);if(null==a&&null==f)return c;b?P(this.b,M.gb,g):P(this.b,M.ob,g);null!=a&&c.j.push(new D(this.f.A(),b?B.Me:B.Je,(new Date).valueOf(),d,a));null!=f&&b&&c.j.push(new D(this.f.A(),B.Oe,(new Date).valueOf(),d,f));c.h=Ua(this.b,c.j);return c};
p.Fa=function(a,b){var c=new Sa,d=Ta(this.G);a.eb();if(null==a.url||""===a.url)return v.info("Card "+a.id+" has no url. Not logging click to Braze servers."),c;if(b){var e=Q(this.b,M.fb)||{};e[a.id]=!0;P(this.b,M.fb,e);}a=me([a]);if(null==a)return c;c.j.push(new D(this.f.A(),b?B.Ke:B.Ie,(new Date).valueOf(),d,a));c.h=Ua(this.b,c.j);return c};
p.oc=function(a){var b=new Sa,c=Ta(this.G);if(!a.kd())return v.info("Card "+a.id+" refused this dismissal. Ignoring analytics event."),b;var d=Q(this.b,M.ra)||{};d[a.id]=!0;P(this.b,M.ra,d);a=me([a]);if(null==a)return b;b.j.push(new D(this.f.A(),B.Le,(new Date).valueOf(),c,a));b.h=Ua(this.b,b.j);return b};function re(a,b){var c=new Sa,d=Ta(a.G);c.j.push(new D(a.f.A(),B.df,(new Date).valueOf(),d,{n:b}));c.h=Ua(a.b,c.j);return c}
function se(a,b,c){var d=Ta(a.G);return new D(a.f.A(),B.nf,b,d,{cid:c})}function Za(a){var b=xa.Na;(new pa(b)).setItem(b.M.Ue,1,{baseUrl:a.Wb,data:{api_key:a.Z,device_id:Zd(a.Xb).id},userId:a.f.A()});}var V={BROWSER:"browser",BROWSER_VERSION:"browserVersion",OS:"os",RESOLUTION:"resolution",LANGUAGE:"language",TIME_ZONE:"timeZone",USER_AGENT:"userAgent"};I.DeviceProperties=V;function te(a){this.id=a;}te.prototype.ic=function(){var a={};null!=this[V.BROWSER]&&(a.browser=this[V.BROWSER]);null!=this[V.BROWSER_VERSION]&&(a.browser_version=this[V.BROWSER_VERSION]);null!=this[V.OS]&&(a.os_version=this[V.OS]);null!=this[V.RESOLUTION]&&(a.resolution=this[V.RESOLUTION]);null!=this[V.LANGUAGE]&&(a.locale=this[V.LANGUAGE]);null!=this[V.TIME_ZONE]&&(a.time_zone=this[V.TIME_ZONE]);null!=this[V.USER_AGENT]&&(a.user_agent=this[V.USER_AGENT]);return a};function ue(a,b){this.b=a;null==b&&(b=za(V));this.Od=b;}
function Zd(a){var b=Na(a.b.ia.O(nb.xd));null==b&&(b=new Ma(oa.Ya()),lb(a.b,nb.xd,b));b=new te(b.ea);for(var c=0;c<a.Od.length;c++){var d=a.Od[c];switch(d){case V.BROWSER:b[d]=jb.vb;break;case V.BROWSER_VERSION:b[d]=jb.version;break;case V.OS:b[d]=jb.Dd;break;case V.RESOLUTION:b[d]=screen.width+"x"+screen.height;break;case V.LANGUAGE:b[d]=jb.language;break;case V.TIME_ZONE:a:{var e=new Date;if("undefined"!==typeof Intl&&"function"===typeof Intl.DateTimeFormat)try{if("function"===typeof Intl.DateTimeFormat().resolvedOptions){var f=
Intl.DateTimeFormat().resolvedOptions().timeZone;if(null!=f&&""!==f){var g=f;break a}}}catch(k){v.info("Intl.DateTimeFormat threw an error, probably https://bugs.chromium.org/p/chromium/issues/detail?id=811403, falling back to GTM offset: "+k.message);}g=e.getTimezoneOffset();e=parseInt(g/60);var h=parseInt(g%60),l="GMT";0!==g&&(l=l+(0>g?"+":"-")+(("00"+Math.abs(e)).slice(-2)+":"+("00"+Math.abs(h)).slice(-2)));g=l;}b[d]=g;break;case V.USER_AGENT:b[d]=jb.userAgent;}}return b}function ve(a){this.la=a;this.fc=null;this.be="geolocation"in navigator;}ve.prototype.Ff=function(a){var b=this;if(document.hidden){we(this);var c=function(){document.hidden||(document.removeEventListener("visibilitychange",c,!1),b.watchPosition());};document.addEventListener("visibilitychange",c,!1);}this.la.vc(a.coords.latitude,a.coords.longitude,a.coords.accuracy,a.coords.altitude,a.coords.altitudeAccuracy);};
ve.prototype.Ef=function(a){a.code===a.PERMISSION_DENIED?v.info(a.message):v.error("Could not detect user location: "+a.code+" - "+a.message);};ve.prototype.watchPosition=function(){this.be?(we(this),this.fc=navigator.geolocation.watchPosition(this.Ff.bind(this),this.Ef.bind(this)),v.info("Requested Geolocation")):v.info(this.Hc);};function we(a){a.be?null!=a.fc&&(navigator.geolocation.clearWatch(a.fc),a.fc=null,v.info("Stopped watching Geolocation")):v.info(a.Hc);}function xe(a,b,c,d,e){this.endpoint=a||null;this.ie=b||null;this.publicKey=c||null;this.Ag=d||null;this.oa=e||null;}xe.prototype.B=function(){return {e:this.endpoint,c:this.ie,p:this.publicKey,u:this.Ag,v:this.oa}};function ye(a,b,c,d,e,f,g,h,l,k){this.la=a;this.Z=b;this.Xb=c;this.Bf=d;this.$d=e||"/service-worker.js";this.Yd=f;this.D=g;this.Tc=l||!1;this.zf=h||!1;this.b=k;this.ec="serviceWorker"in navigator&&"undefined"!==typeof ServiceWorkerRegistration&&"showNotification"in ServiceWorkerRegistration.prototype&&"PushManager"in window;this.Xc="safari"in window&&"pushNotification"in window.safari;}p=ye.prototype;p.Ea=function(){return this.ec||this.Xc};
p.Da=function(){return this.Ea()&&null!=Notification&&null!=Notification.permission&&"denied"===Notification.permission};p.Ab=function(){return this.Ea()&&null!=Notification&&null!=Notification.permission&&"granted"===Notification.permission};
p.fd=function(a,b,c){var d=this;c=this.Yd||c;this.Ea()?this.ec?ze(this).then(function(e){d.Da()?b():null==e?b():e.pushManager.getSubscription().then(function(f){f?a():b();}).catch(function(){b();});}).catch(function(){b();}):null==c||""===c?v.error("You must supply the safariWebsitePushId argument in order to use isPushGranted on Safari"):"granted"===window.safari.pushNotification.permission(c).permission?a():b():b();};
function Ae(a,b,c,d,e,f){b.unsubscribe().then(function(g){g?Be(a,c,d,e,f):(v.error("Failed to unsubscribe device from push."),"function"===typeof f&&f(!1));}).catch(function(g){v.error("Push unsubscription error: "+g);"function"===typeof f&&f(!1);});}
function Ce(a,b,c,d){var e=function(h){if("string"===typeof h)return h;if(0!==h.endpoint.indexOf("https://android.googleapis.com/gcm/send"))return h.endpoint;var l=h.endpoint;h.subscriptionId&&-1===h.endpoint.indexOf(h.subscriptionId)&&(l=h.endpoint+"/"+h.subscriptionId);return l}(b),f=null,g=null;if(null!=b.getKey)try{f=btoa(String.fromCharCode.apply(null,new Uint8Array(b.getKey("p256dh")))),g=btoa(String.fromCharCode.apply(null,new Uint8Array(b.getKey("auth"))));}catch(h){if("invalid arguments"!==
h.message)throw h;}b=function(h){var l;return h.options&&(l=h.options.applicationServerKey)&&l.byteLength&&0<l.byteLength?btoa(String.fromCharCode.apply(null,new Uint8Array(l))).replace(/\+/g,"-").replace(/\//g,"_"):null}(b);a.la.nd(e,d,f,g,b);e&&"function"===typeof c&&c(e,f,g);}
function De(a,b,c,d,e){"default"===c.permission?window.safari.pushNotification.requestPermission(a.Bf,b,{api_key:a.Z,device_id:Zd(a.Xb).id},function(f){"granted"===f.permission&&a.la.qd(Wa.OPTED_IN);De(a,b,f,d,e);}):"denied"===c.permission?(a.la.nb(!1),v.info("The user has blocked notifications from this site, or Safari push is not configured in the Braze dashboard."),"function"===typeof e&&e(!1)):"granted"===c.permission&&(v.info("Device successfully subscribed to push."),Ce(a,c.deviceToken,d,new Date));}
function Ee(a,b,c){function d(g){switch(g){case "granted":"function"===typeof a&&a();break;case "default":"function"===typeof b&&b();break;case "denied":"function"===typeof c&&c();break;default:v.error("Received unexpected permission result "+g);}}var e=!1,f=Notification.requestPermission(function(g){e&&d(g);});f?f.then(function(g){d(g);}):e=!0;}
function Be(a,b,c,d,e){var f={userVisibleOnly:!0};null!=c&&(f.applicationServerKey=c);b.pushManager.subscribe(f).then(function(g){v.info("Device successfully subscribed to push.");Ce(a,g,d,new Date);}).catch(function(g){a.Da()?(v.info("Permission for push notifications was denied."),"function"===typeof e&&e(!1)):v.error("Push subscription failed: "+g);});}
function ze(a){return a.Tc?navigator.serviceWorker.getRegistration():navigator.serviceWorker.register(a.$d).then(function(){return navigator.serviceWorker.ready.then(function(b){b&&"function"===typeof b.update&&b.update().catch(function(c){v.info("ServiceWorker update failed: "+c);});return b})})}
p.subscribe=function(a,b,c){var d=this;a=this.Yd||a;if(this.Ea())if(this.ec){if(!this.Tc&&null!=window.location){var e=this.$d;-1===e.indexOf(window.location.host)&&(e=window.location.host+e);-1===e.indexOf(window.location.protocol)&&(e=window.location.protocol+"//"+e);if(0!==window.location.href.indexOf(e.substr(0,e.lastIndexOf("/")+1))){v.error("Cannot subscribe to push from a path higher than the service worker location (tried to subscribe from "+window.location.pathname+" but service worker is at "+
e+")");return}}if(this.Da())v.info("Notifications from this site are blocked. This may be a temporary embargo or a permanent denial."),this.la.nb(!1),"function"===typeof c&&c();else if(this.D&&!fe(this.D).oa&&0===fe(this.D).$a)v.info("Waiting for VAPID key from server config before subscribing to push."),Fe(this.D,function(){d.subscribe(a,b,c);});else{var f=this.Ab();Ee(function(){f||d.la.qd(Wa.OPTED_IN);ze(d).then(function(g){null==g?(v.error("No service worker registration. Set the `manageServiceWorkerExternally` initialization option to false or ensure that your service worker is registered before calling registerAppboyPushMessages."),
"function"===typeof c&&c()):g.pushManager.getSubscription().then(function(h){var l=null;d.D&&null!=fe(d.D).oa&&(l=ma.zg(fe(d.D).oa));if(h){var k=null,m=null,q=Q(d.b,M.Tb);if(q&&!Aa(q)){try{var t=(new xe(q.e,Ia(q.c),q.p,q.u,q.v)).ie;}catch(r){t=null;}null==t||isNaN(t.getTime())||0===t.getTime()||(k=t,m=new Date(k),m.setMonth(k.getMonth()+6));}null!=l&&h.options&&h.options.applicationServerKey&&h.options.applicationServerKey.byteLength&&0<h.options.applicationServerKey.byteLength&&!Ea(l,new Uint8Array(h.options.applicationServerKey))?
(12<h.options.applicationServerKey.byteLength?v.info("Device was already subscribed to push using a different VAPID provider, creating new subscription."):v.info("Attempting to upgrade a gcm_sender_id-based push registration to VAPID - depending on the browser this may or may not result in the same gcm_sender_id-based subscription."),Ae(d,h,g,l,b,c)):h.expirationTime&&new Date(h.expirationTime)<=(new Date).valueOf()?(v.info("Push subscription is expired, creating new subscription."),Ae(d,h,g,l,b,
c)):q&&Aa(q)?Ae(d,h,g,l,b,c):null==m?(v.info("No push subscription creation date found, creating new subscription."),Ae(d,h,g,l,b,c)):m<=(new Date).valueOf()?(v.info("Push subscription older than 6 months, creating new subscription."),Ae(d,h,g,l,b,c)):(v.info("Device already subscribed to push, sending existing subscription to backend."),Ce(d,h,b,k));}else Be(d,g,l,b,c);}).catch(function(h){v.error("Error checking current push subscriptions: "+h);});}).catch(function(g){v.error("ServiceWorker registration failed: "+
g);});},function(){var g="Permission for push notifications was ignored.";d.Da()&&(g+=" The browser has automatically blocked further permission requests for a period (probably 1 week).");v.info(g);"function"===typeof c&&c(!0);},function(){v.info("Permission for push notifications was denied.");"function"===typeof c&&c(!1);});}}else this.Xc&&(null==a||""===a?v.error("You must supply the safariWebsitePushId argument in order to use registerAppboyPushMessages on Safari"):(e=window.safari.pushNotification.permission(a),
De(this,a,e,b,c)));else v.info(this.Hc);};
p.unsubscribe=function(a,b){var c=this;this.Ea()?this.ec?navigator.serviceWorker.getRegistration().then(function(d){d&&d.pushManager.getSubscription().then(function(e){e&&(c.la.nb(!0),e.unsubscribe().then(function(f){f?(v.info("Device successfully unsubscribed from push."),"function"===typeof a&&a()):(v.error("Failed to unsubscribe device from push."),"function"===typeof b&&b());c.Tc||(d.unregister(),v.info("Service worker successfully unregistered."));}).catch(function(f){v.error("Push unsubscription error: "+f);
"function"===typeof b&&b();}));}).catch(function(e){v.error("Error unsubscribing from push: "+e);"function"===typeof b&&b();});}):this.Xc&&(this.la.nb(!0),v.info("Device unsubscribed from push."),"function"===typeof a&&a()):v.info(this.Hc);};function ge(a,b,c,d,e,f,g){this.$a=a||0;this.me=b||[];this.ee=c||[];this.ue=d||[];this.jd=e;if(null==e||""===e)this.jd=null;this.oa=f||null;this.Va=g||{};}ge.prototype.B=function(){return {s:"2.5.2",l:this.$a,e:this.me,a:this.ee,p:this.ue,m:this.jd,v:this.oa,c:this.Va}};function Ge(a){this.b=a;this.Zc=new xb;this.Ld=new xb;this.dc=null;}function fe(a){if(null==a.dc){var b=Q(a.b,M.Hd);if(null!=b){var c=b.l;"2.5.2"!==b.s&&(c=0);b=new ge(c,b.e,b.a,b.p,b.m,b.v,b.c);}else b=new ge;a.dc=b;}return a.dc}function Fe(a,b){b=yb(a.Zc,b);a.Md&&a.Zc.S(a.Md);a.Md=b;}function He(a,b){yb(a.Ld,b);}function $a(a,b){return -1!==fe(a).ee.indexOf(b)}function Ie(a,b,c,d){this.b=a;this.f=b;this.D=c;this.tb=1E3;d=parseFloat(d);isNaN(d)&&(d=1800);d<this.tb/1E3&&(v.info("Specified session timeout of "+d+"s is too small, using the minimum session timeout of "+this.tb/1E3+"s instead."),d=this.tb/1E3);this.Df=d;}function pe(a,b,c){return new D(a.f.A(),B.rf,b,c.ea,{d:Fa(b-c.xb)})}function oe(a){a=Na(a.b.ia.O(nb.Oa));return null==a?null:a.ea}
function ce(a){var b=(new Date).valueOf(),c=fe(a.D).jd;if(null==c)return !1;var d=Q(a.b,M.Pb);(c=null==d||b-d>1E3*c)&&P(a.b,M.Pb,b);return c}
function Ta(a){var b=(new Date).valueOf(),c=b+1E3*a.Df,d=Na(a.b.ia.O(nb.Oa));if(null==d||(b-d.xb<a.tb?0:d.bd<b)){var e="Generating session start event with time "+b;if(null!=d){var f=d.nc;f-d.xb<a.tb&&(f=d.xb+a.Eg);d=pe(a,f,d);null==d||Ua(a.b,[d]);e+=" (old session ended "+f+")";}e+=". Will expire "+c.valueOf();v.info(e);c=new Ma(oa.Ya(),c);e=new D(a.f.A(),B.Id,b,c.ea);null==e||Ua(a.b,[e]);lb(a.b,nb.Oa,c);null==Q(a.b,M.Pb)&&P(a.b,M.Pb,b);return c.ea}d.nc=b;d.bd=c;lb(a.b,nb.Oa,d);return d.ea}function Je(a,b){var c=!1;try{if(localStorage&&localStorage.getItem)try{localStorage.setItem(M.Lc,!0),localStorage.getItem(M.Lc)&&(localStorage.removeItem(M.Lc),c=!0);}catch(e){if(("QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0<localStorage.length)c=!0;else throw e;}}catch(e){v.info("Local Storage not supported!");}var d=navigator.cookieEnabled||"cookie"in document&&(0<document.cookie.length||-1<(document.cookie="test").indexOf.call(document.cookie,"test"));b=new wb(a,d&&!b,
c);return new kb(b,c?new rb(a):new vb)}function Ke(a){for(var b=a.length,c=a.length-1;0<=c;c--){var d=a.charCodeAt(c);127<d&&2047>=d?b++:2047<d&&65535>=d&&(b+=2);56320<=d&&57343>=d&&c--;}return b}function Le(a,b){this.D=a;this.b=b;}p=Le.prototype;p.A=function(){var a=Na(this.b.ia.O(nb.Oc));if(null==a)return null;var b=a.ea,c=Ke(b);if(997<c){for(;997<c;)b=b.slice(0,b.length-1),c=Ke(b);a.ea=b;lb(this.b,nb.Oc,a);}return b};p.od=function(a,b){if($a(this.D,a))return v.info('Custom Attribute "'+a+'" is blacklisted, ignoring.'),!1;var c={};c[a]=b;return this.H("custom",c)};p.H=function(a,b){return pb(this.b,this.A(),a,b)};
p.nd=function(a,b,c,d,e){this.H("push_token",a);this.H("custom_push_public_key",c);this.H("custom_push_user_auth",d);this.H("custom_push_vapid_public_key",e);var f=xa.Na,g=new pa(f);P(this.b,M.Tb,(new xe(a,b,c,d,e)).B());g.setItem(f.M.Kc,f.Ub,!0);};p.nb=function(a){this.H("push_token",null);this.H("custom_push_public_key",null);this.H("custom_push_user_auth",null);this.H("custom_push_vapid_public_key",null);if(a){a=xa.Na;var b=new pa(a);P(this.b,M.Tb,!1);b.setItem(a.M.Kc,a.Ub,!1);}};function Me(){}Me.prototype.zb=function(){};Me.prototype.Ua=function(){};Me.prototype.clearData=function(){};function Ne(a,b,c,d,e){this.ca=a;this.J=b;this.b=c;this.D=d;this.wf=e;this.xa=this.Aa=0;this.Ca();}ia(Ne,Me);p=Ne.prototype;p.Ca=function(){for(var a=Q(this.b,M.pb)||[],b=[],c=0;c<a.length;c++){var d=Xb(a[c]);null!=d&&b.push(d);}this.C=Oe(this,Pe(this,b,!1));this.Aa=Q(this.b,M.Lb)||this.Aa;this.xa=Q(this.b,M.Kb)||this.xa;};
p.zb=function(a){if(!fe(this.D).Va.enabled)0!==fe(this.D).$a&&Qe(this);else if(null!=a&&a.cards){var b=a.full_sync;b||this.Ca();var c=a.cards,d=a.last_full_sync_at;a=a.last_card_updated_at;var e=b?[]:this.C.slice();for(var f=0;f<c.length;f++){for(var g=c[f],h=null,l=0;l<this.C.length;l++)if(g.id===this.C[l].id){h=this.C[l];break}if(b)g=Rb(g),null!=h&&h.viewed&&(g.viewed=!0),null!=g&&e.push(g);else if(null==h)g=Rb(g),null!=g&&e.push(g);else if(!Pb(h,g))for(h=0;h<e.length;h++)if(g.id===e[h].id){e.splice(h,
1);break}}this.C=Oe(this,Pe(this,e,b));this.gc();this.Aa=d||0;P(this.b,M.Lb,this.Aa);this.xa=a||0;P(this.b,M.Kb,this.xa);zb(this.ca,this.lb(!0));}};
function Re(a,b){if(fe(a.D).Va.enabled){a.Ca();var c=a.C.slice();a.J.mb().A(function(d){for(var e=0;e<b.length;e++)if(d===b[e].userId||null==d&&null==b[e].userId){for(var f=b[e].card,g=null,h=0;h<a.C.length;h++)if(f.id===a.C[h].id){g=a.C[h];break}if(null==g)f=Rb(f),null!=f&&c.push(f);else if(!Pb(g,f))for(g=0;g<c.length;g++)if(f.id===c[g].id){c.splice(g,1);break}}a.C=Oe(a,Pe(a,c,!1));a.gc();zb(a.ca,a.lb(!0));});}else 0!==fe(a.D).$a&&Qe(a);}
function Pe(a,b,c){for(var d=Q(a.b,M.fb)||{},e=Q(a.b,M.gb)||{},f=Q(a.b,M.ra)||{},g={},h={},l={},k=0;k<b.length;k++)d[b[k].id]&&(b[k].clicked=!0,g[b[k].id]=!0),e[b[k].id]&&(b[k].viewed=!0,h[b[k].id]=!0),f[b[k].id]&&(b[k].dismissed=!0,l[b[k].id]=!0);c&&(P(a.b,M.fb,g),P(a.b,M.gb,h),P(a.b,M.ra,l));return b}
function Oe(a,b){for(var c=[],d=new Date,e=Q(a.b,M.ra)||{},f=!1,g=0;g<b.length;g++){var h=b[g].url;!a.wf&&h&&Rc(h)?v.error('Card with url "'+h+'" will not be displayed because Javascript URLs are disabled. Use the "allowUserSuppliedJavascript" option for appboy.initialize to enable this card.'):(null==b[g].expiresAt||b[g].expiresAt>=d)&&!b[g].dismissed?c.push(b[g]):f=e[b[g].id]=!0;}f&&P(a.b,M.ra,e);return c}p.gc=function(){for(var a=[],b=0;b<this.C.length;b++)a.push(this.C[b].B());P(this.b,M.pb,a);};
p.Ha=function(){if(fe(this.D).Va.enabled)return this.J.Ha(this.Aa,this.xa,this.zb.bind(this));0!==fe(this.D).$a&&Qe(this);};p.lb=function(a){a||this.Ca();a=Oe(this,this.C);a.sort(function(c,d){return c.pinned&&!d.pinned?-1:d.pinned&&!c.pinned?1:c.updated>d.updated?-1:d.updated>c.updated?1:0});var b=Math.max(this.xa||0,this.Aa||0);0===b&&(b=void 0);return new Zc(a,Ga(b))};
p.Ua=function(a){a||(this.C=[],zb(this.ca,new Zc(this.C.slice(),null)),R(this.b,M.pb),R(this.b,M.fb),R(this.b,M.gb),R(this.b,M.ra));this.xa=this.Aa=0;R(this.b,M.Lb);R(this.b,M.Kb);};p.clearData=function(a){this.xa=this.Aa=0;this.C=[];zb(this.ca,new Zc(this.C.slice(),null));a&&(R(this.b,M.pb),R(this.b,M.fb),R(this.b,M.gb),R(this.b,M.ra),R(this.b,M.Lb),R(this.b,M.Kb));};function Qe(a){zb(a.ca,new Zc([],(new Date).valueOf()));R(a.b,M.pb);}function Se(a,b){this.ca=a;this.b=b;this.Ca();}ia(Se,Me);p=Se.prototype;p.Ca=function(){for(var a=Q(this.b,M.Gc)||[],b=[],c=0;c<a.length;c++){var d=Xb(a[c]);null!=d&&b.push(d);}this.C=b;this.ib=Ia(Q(this.b,M.Ec));};p.gc=function(){for(var a=[],b=0;b<this.C.length;b++)a.push(this.C[b].B());P(this.b,M.Gc,a);};
p.zb=function(a){if(null!=a&&a.feed){this.Ca();a=a.feed;for(var b=[],c,d=Q(this.b,M.ob)||{},e={},f=0;f<a.length;f++){c=a[f];var g=c.id,h=c.type,l=c.viewed,k=c.title,m=c.image,q=c.description,t=Ga(c.created),r=Ga(c.updated),y=c.categories,A=Ga(c.expires_at),z=c.url,F=c.domain,G=c.aspect_ratio;c=c.extras;g=h===Sb.Kd||h===Sb.Rb?new Tb(g,l,k,m,q,t,r,y,A,z,F,G,c,!1,!1):h===Sb.Ib?new Ub(g,l,k,m,q,t,r,y,A,z,F,G,c,!1,!1):h===Sb.Hb?new Vb(g,l,m,t,r,y,A,z,F,G,c,!1,!1):null;null!=g&&(d[g.id]&&(g.viewed=!0,e[g.id]=
!0),b.push(g));}P(this.b,M.ob,e);this.C=b;this.gc();this.ib=new Date;P(this.b,M.Ec,this.ib);zb(this.ca,new Vc(this.C.slice(),this.ib));}};p.lc=function(){this.Ca();for(var a=[],b=new Date,c=0;c<this.C.length;c++)(null==this.C[c].expiresAt||this.C[c].expiresAt>=b)&&a.push(this.C[c]);return new Vc(a,this.ib)};p.clearData=function(a){null==a&&(a=!1);this.C=[];this.ib=null;a&&(R(this.b,M.Gc),R(this.b,M.Ec));zb(this.ca,new Vc(this.C.slice(),this.ib));};function Te(a,b,c,d,e){this.Ja=a;this.Ee=b;this.De=c;this.kc=d;this.Ia=e;}function Ue(a,b,c,d,e){return null==a||null==a.trigger_id?null:new Te(a.trigger_id,b,c,d,e)}function Ve(a,b,c,d){this.Af=a;this.ca=b;this.b=c;this.J=d;this.Zb=[];this.ka=[];this.ya=null;this.K={};this.X={};We(this);Xe(this);}ia(Ve,Me);function Ye(a){a.ya=Q(a.b,M.Dc)||a.ya;a.K=Q(a.b,M.rb)||a.K;a.X=Q(a.b,M.Ob)||a.X;for(var b=0;b<a.U.length;b++){var c=a.U[b];null!=a.X[c.id]&&(c.za=a.X[c.id]);}}function We(a){a.Yc=Q(a.b,M.Nc)||0;for(var b=Q(a.b,M.Mc)||[],c=[],d=0;d<b.length;d++)c.push(Td(b[d]));a.U=c;Ye(a);}
function Xe(a){function b(z,F,G,E,K){return function(){Ze(a,z,F,G,E,K);}}for(var c={},d=0;d<a.U.length;d++)c[a.U[d].id]=a.U[d];d=!1;for(var e=0;e<a.U.length;e++){var f=a.U[e];if(null!=a.K[f.id]){for(var g=a.K[f.id],h=[],l=0;l<g.length;l++){var k=g[l],m=Math.max(k.kc+1E3*f.Wa-(new Date).valueOf(),0);if(0<m){h.push(k);var q=void 0,t=void 0;null!=k.Be&&(q=k.Be);null!=k.$c&&Ja(k.$c)&&(t=Ka(k.$c));var r=[];if(Aa(k.cd))for(var y=0;y<k.cd.length;y++){var A=c[k.cd[y]];null!=A&&r.push(A);}a.ka.push(setTimeout(b(f,
k.kc,q,t,r),m));}}a.K[f.id].length>h.length&&(a.K[f.id]=h,d=!0,0===a.K[f.id].length&&delete a.K[f.id]);}}d&&P(a.b,M.rb,a.K);}
Ve.prototype.zb=function(a){var b=!1;if(null!=a&&a.triggers){Ye(this);var c={},d={};this.U=[];for(var e=0;e<a.triggers.length;e++){for(var f=a.triggers[e],g=f.id,h=[],l=0;l<f.trigger_condition.length;l++)h.push(Gd(f.trigger_condition[l]));l=Ga(f.start_time);var k=Ga(f.end_time),m=f.priority,q=f.type,t=f.delay,r=f.re_eligibility,y=f.timeout,A=f.data;f=f.min_seconds_since_last_trigger;g=ya(Ud,q,"Could not construct Trigger from server data","Trigger.Types")?new Qd(g,h,l,k,m,q,A,t,r,y,f):null;null!=
this.X[g.id]&&(g.za=this.X[g.id],c[g.id]=this.X[g.id]);null!=this.K[g.id]&&(d[g.id]=this.K[g.id]);for(h=0;h<g.kb.length;h++)if(Ed(g.kb[h],Cd.Vb,null)){b=!0;break}null!=g&&this.U.push(g);}Ea(this.X,c)||(this.X=c,P(this.b,M.Ob,this.X));Ea(this.K,d)||(this.K=d,P(this.b,M.rb,this.K));a=[];for(c=0;c<this.U.length;c++)a.push(this.U[c].B());this.Yc=(new Date).valueOf();P(this.b,M.Mc,a);P(this.b,M.Nc,this.Yc);b&&(v.info("Trigger with test condition found, firing test."),this.na(Cd.Vb));this.na(Cd.OPEN);b=
this.Zb;this.Zb=[];for(a=0;a<b.length;a++)this.na.apply(this,b[a]);}};
function Ze(a,b,c,d,e,f){function g(){Ye(a);var k=f.pop();if(null!=k)if($e(a,k,c,d,e,f),Sd(k,c)){var m="Server aborted in-app message display, but the timeout on fallback trigger "+k.id+"has already elapsed.";0<f.length&&(m+=" Continuing to fall back.");v.info(m);a.J.L(k.id,Kc.zd);g();}else v.info("Server aborted in-app message display. Falling back to lower priority "+k.type+" trigger action "+k.id),m=1E3*k.Wa-((new Date).valueOf()-c),0<m?a.ka.push(setTimeout(function(){Ze(a,k,c,d,e,f);},m)):Ze(a,
k,c,d,e,f);}function h(k){Ye(a);var m=(new Date).valueOf();Sd(b,c)?b.type===Ud.Jd?a.J.L(b.id,Kc.qb):a.J.L(b.id,Kc.zd):!1===navigator.onLine&&b.type===Ud.Ac&&k.imageUrl?(v.info("Not showing "+b.type+" trigger action "+b.id+" due to offline state."),a.J.L(b.id,Kc.Ye)):(null==b.za||b.Db!==Rd&&m-b.za>=1E3*b.Db)&&af(a,b,m,d)?(zb(a.ca,[k]),Ye(a),b.za=m,a.ya=m,P(a.b,M.Dc,m),a.X[b.id]=m,P(a.b,M.Ob,a.X)):v.info("Not displaying trigger "+b.id+" because display time fell outside of the acceptable time window.");}
switch(b.type){case Ud.Ac:var l=nc(b.data);if(null==l){v.error("Could not parse trigger data for trigger "+b.id+", ignoring.");a.J.L(b.id,Kc.sb);break}h(l);break;case Ud.Jd:l=Ue(b.data,h,g,c,b.Ia);if(null==l){v.error("Could not parse trigger data for trigger "+b.id+", ignoring.");a.J.L(b.id,Kc.sb);break}ke(a.J,l,d,e);break;default:v.error("Trigger "+b.id+" was of unexpected type "+b.type+", ignoring."),a.J.L(b.id,Kc.sb);}}
Ve.prototype.na=function(a,b,c){var d=this;if(ya(Cd,a,"Cannot fire trigger action.","TriggerEvents"))if(0<this.J.hb)v.info("Trigger sync is currently in progress, awaiting sync completion before firing trigger event."),this.Zb.push(arguments);else{(Q(this.b,M.Nc)||0)>this.Yc?We(this):Ye(this);for(var e=(new Date).valueOf(),f=e-this.ya,g=!0,h=!0,l=[],k=0;k<this.U.length;k++){var m=this.U[k],q=e+1E3*m.Wa;if((null==m.za||m.Db!==Rd&&q-m.za>=1E3*m.Db)&&(null==m.startTime||m.startTime<=e)&&(null==m.endTime||
m.endTime>=e)){for(var t=!1,r=0;r<m.kb.length;r++)if(Ed(m.kb[r],a,b)){t=!0;break}t&&(g=!1,af(this,m,q,a)&&(h=!1,l.push(m)));}}if(g)v.info("Trigger event "+a+" did not match any trigger conditions.");else if(h)v.info("Ignoring "+a+" trigger event because a trigger was displayed "+f/1E3+"s ago.");else{l.sort(function(A,z){return A.priority-z.priority});var y=l.pop();null!=y&&(v.info("Firing "+y.type+" trigger action "+y.id+" from trigger event "+a+"."),$e(this,y,e,a,c,l),0===y.Wa?Ze(this,y,e,a,c,l):
this.ka.push(setTimeout(function(){Ze(d,y,e,a,c,l);},1E3*y.Wa)));}}};Ve.prototype.Ua=function(a){this.U=[];R(this.b,M.Mc);if(!a){this.Zb=[];this.ya=null;this.X={};this.K={};for(a=0;a<this.ka.length;a++)clearTimeout(this.ka[a]);this.ka=[];R(this.b,M.Dc);R(this.b,M.Ob);R(this.b,M.rb);R(this.b,M.ff);R(this.b,M.ef);R(this.b,M.gf);}};Ve.prototype.clearData=function(){this.U=[];this.ya=null;this.X={};this.K={};for(var a=0;a<this.ka.length;a++)clearTimeout(this.ka[a]);this.ka=[];};
function af(a,b,c,d){if(null==a.ya)return !0;if(d===Cd.Vb)return v.info("Ignoring minimum interval between trigger because it is a test type."),!0;b=b.se;null==b&&(b=a.Af);return c-a.ya>=1E3*b}function $e(a,b,c,d,e,f){Ye(a);a.K[b.id]=a.K[b.id]||[];var g={};g.kc=c;g.Be=d;var h;null!=e&&(h=e.B());g.$c=h;c=[];for(d=0;d<f.length;d++)c.push(f[d].id);g.cd=c;a.K[b.id].push(g);P(a.b,M.rb,a.K);}var bf;"undefined"===typeof console&&(window.console={log:function(){}});var cf=window.Element.prototype;"function"!==typeof cf.matches&&(cf.matches=cf.msMatchesSelector||cf.mozMatchesSelector||cf.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return !!a[b]});
Element.prototype.closest||(Element.prototype.closest=function(a){var b=this;if(!document.documentElement.contains(b))return null;do{if(b.matches(a))return b;b=b.parentElement||b.parentNode;}while(null!==b&&1===b.nodeType);return null});
if("function"!==typeof window.CustomEvent){var df=function(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};var c=document.createEvent("CustomEvent");c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail);return c};df.prototype=window.Event.prototype;window.CustomEvent=df;}var ef;module.exports?ef=module.exports:(window.appboy||(window.appboy={}),ef=window.appboy);var ff=ef;var W=new function(a){function b(n){var u={},x;for(x in n){var C=n[x];null==C?delete n[x]:u[x]=Ba(C)?Ha(C):C;}return u}function c(n,u,x,C,H){null==n&&(n={});if("object"!==typeof n||Aa(n))return v.error(u+" requires that "+x+" be an object. Ignoring "+H+"."),!1;for(var O in n){if(!Pa(O,C,"the "+H+" property name"))return !1;u=n[O];if(x=null!=u){x=typeof u;var Z=Ba(u);(x=null!=u&&("number"===x||"boolean"===x||Z||"string"===x))||v.error("Cannot "+C+" because the "+(H+' property "'+O+'" "')+u+'" is invalid.');
x=!x;}if(x)return !1}return !0}function d(){v.yb();Y&&(zb(N),N.N(),r.clearData(!1),r=null,z.clearData(!1),z=null,t.N(),t=null,F.N(),F=null,y.N(),y=null,m.yb(),G=m=null,we(E),g=l=E=null,L=[],k=null);ea=Y=!1;}function e(){if(ea)return !1;if(!Y)throw Error("Appboy must be initialized before calling methods.");return !0}var f={Lf:function(n,u){return new ue(n,u)},Pf:function(n,u,x,C,H,O,Z,na,La){null==H&&(H={});var he=new Le(La,Z),lf=new Ie(Z,he,La,H.sessionTimeoutInSeconds);return new Xd(n,x,C,H.appVersion,
u,lf,na,he,La,Z,O)},ad:function(){return new xb},Mf:function(n,u){return new Se(n,u)},Kf:function(n,u,x,C){return new Ne(n,u,x,C)},Qf:function(n,u,x,C){return new Ve(n,u,x,C)},Of:function(n,u,x,C,H,O,Z){null==H&&(H={});return new ye(n,u,x,C+"/safari/"+u,H.serviceWorkerLocation,H.safariWebsitePushId,O,H.manageServiceWorkerExternally,H.disablePushTokenMaintenance,Z)},Nf:function(n){return new ve(n)}};null==a&&(a=f);var g,h,l,k,m,q,t,r,y,A,z,F,G,E,K=new xb,N=new xb,L=[],Y=!1,ea=!1;bf={Cd:100,Qb:"inAppMessage must be an InAppMessage object",
Fc:"must be a Card object"};return {sg:function(n){return yb(K,n)},rg:function(n){return yb(N,n)},ed:function(n,u){if(Y)return v.info("Braze has already been initialized with an API key."),!0;v.dd(null!=u&&u.enableLogging);if(null==n||""===n||"string"!==typeof n)return v.error("Braze requires a valid API key to be initialized."),!1;g=n;l=u||{};if(jb.Wf&&!l.allowCrawlerActivity)return v.info("Ignoring activity from crawler bot "+navigator.userAgent),ea=!0,!1;h=u=Je(n,l.noCookies||!1);if((new sb(null,
!0)).O("ab.optOut"))return v.info("Ignoring all activity due to previous opt out"),ea=!0,!1;var x=["mparticle","wordpress","tealium"];if(null!=l.sdkFlavor){var C=l.sdkFlavor;-1!==x.indexOf(C)?k=C:v.error("Invalid sdk flavor passed: "+C);}var H=[];t=a.ad();L.push(t);r=a.Mf(t,u);H.push(r);F=a.ad();L.push(F);x=null!=l.baseUrl?l.baseUrl:"https://sdk.iad-01.braze.com/api/v3";x=x.replace(/(\.[a-z]+)[^\.]*$/i,"$1/api/v3");0!==x.indexOf("http")&&(x="https://"+x);C=l.devicePropertyWhitelist;if(null!=C)if(Aa(C)){for(var O=
[],Z=0;Z<C.length;Z++)ya(V,C[Z],"devicePropertyWhitelist contained an invalid value.","DeviceProperties")&&O.push(C[Z]);C=O;}else v.error("devicePropertyWhitelist must be an array. Defaulting to all properties."),C=null;q=a.Lf(u,C);C=new Ge(u);m=a.Pf(g,x,"2.5.2",k,l,function(na){if(Y)for(var La=0;La<H.length;La++)H[La].zb(na);},u,q,C);O=l.minimumIntervalBetweenTriggerActionsInSeconds;null==O&&(O=30);z=a.Qf(O,F,u,m);H.push(z);O=!0===l.allowUserSuppliedJavascript||!0===l.enableHtmlInAppMessages;
y=a.ad();L.push(y);A=a.Kf(y,m,u,C,O);H.push(A);He(C,function(){A.Ha();});ne(m,function(){A.Ha();});m.ed();G=a.Of(m.mb(),g,q,x,l,C,u);E=a.Nf(m.mb());u="Initialized ";l&&l.baseUrl&&(u+='for the Braze backend at "'+l.baseUrl+'" ');v.info(u+('with API key "'+n+'".'));n=jb.language;u=!1;l&&(l.language&&(n=l.language,u=!0),l.localization&&(n=l.localization,u=!0));Sc(n,u);zb(K,l);return Y=!0},yb:function(){v.info("Destroying appboy instance");h=null;d();},Rf:function(n){e()&&(null==n&&v.error("getDeviceId must be supplied with a callback. e.g., appboy.getDeviceId(function(deviceId) {console.log('the device id is ' + deviceId)})"),
"function"===typeof n&&n(Zd(q).id));},sd:function(){v.sd();},pd:function(n){v.pd(n);},sc:function(n){if(e()){m.sc(G,n);var u=xa.Na,x=new pa(u);ta(x,u.M.Fd,function(C,H){function O(){z.na(Cd.Ed,[na],La);}var Z=H.lastClick,na=H.trackingString;v.info("Firing push click trigger from "+na+" push click at "+Z);var La=se(m,Z,na);qe(m,O,O);ua(x,u.M.Fd,C);});va(x,u.M.He,function(C){Re(A,C);});}},Ua:function(n,u){e()&&(null==n||0===n.length||n!==n?(v.error("changeUser requires a non-empty userId."),"function"===typeof u&&
(v.info("messagingReadyCallback provided with an empty userId. Firing immediately."),u())):997<Ke(n)?v.error('Rejected user id "'+n+'" because it is longer than 997 bytes.'):m.Ua(n.toString(),[r,A,z],u,G));},mb:function(){if(e())return m.mb()},Tf:function(){if(e())return l.contentSecurityNonce},Eb:function(n){e()&&m.Eb(n);},uc:function(){e()&&m.uc();},ze:function(n){if(e())return yb(t,n)},lc:function(){if(e())return r.lc()},Ha:function(){if(e())return A.Ha()},xe:function(n){if(e())return yb(y,n)},lb:function(){if(e())return A.lb(!1)},
tg:function(n){if(e())return yb(F,n)},Ae:function(n){if(e())return "function"!==typeof n?null:yb(F,function(u){n(u[0]);return u.slice(1)})},Cb:function(n){if(e())return n instanceof U||n instanceof oc?m.Cb(n).h:(v.error(bf.Qb),!1)},qc:function(n){if(e()){if(!(n instanceof U))return v.error(bf.Qb),!1;var u=m.qc(n);if(u.h)for(var x=0;x<u.j.length;x++)z.na(Cd.Nb,[n.triggerId],u.j[x]);return u.h}},pc:function(n,u){if(e()){if(!(n instanceof pc))return v.error("button must be an ab.InAppMessage.Button object"),
!1;if(!(u instanceof U))return v.error(bf.Qb),!1;var x=m.pc(n,u);if(x.h)for(var C=0;C<x.j.length;C++)z.na(Cd.Nb,[u.triggerId,n.id],x.j[C]);return x.h}},Bb:function(n,u,x){if(e()){if(!(n instanceof zc))return v.error("inAppMessage argument to logInAppMessageHtmlClick must be an HtmlMessage object."),!1;x=m.Bb(n,u,x);if(x.h)for(var C=0;C<x.j.length;C++)z.na(Cd.Nb,[n.triggerId,u],x.j[C]);return x.h}},L:function(n,u){if(e())return n instanceof U||n instanceof oc?ya(Kc,u,u+" is not a valid in-app message display failure",
"InAppMessage.DisplayFailures")?m.L(n.triggerId,u).h:!1:(v.error(bf.Qb),!1)},Ga:function(n,u){if(e()){if(!Aa(n))return v.error("cards must be an array"),!1;for(var x=0;x<n.length;x++)if(!(n[x]instanceof Mb))return v.error("Each card in cards "+bf.Fc),!1;return m.Ga(n,u).h}},Fa:function(n,u){if(e())return n instanceof Mb?m.Fa(n,u).h:(v.error("card "+bf.Fc),!1)},oc:function(n){if(e())return n instanceof Mb?m.oc(n).h:(v.error("card "+bf.Fc),!1)},re:function(){if(e())return re(m,wa.Ze).h},qe:function(){if(e())return re(m,
wa.Ne).h},S:function(n){if(e()){for(var u=0;u<L.length;u++)L[u].S(n);K.S(n);N.S(n);}},N:function(){if(e())for(var n=0;n<L.length;n++)L[n].N();},gd:function(n,u){if(e()){if(null==n||0>=n.length)return v.error('logCustomEvent requires a non-empty eventName, got "'+n+'". Ignoring event.'),!1;if(!Pa(n,"log custom event","the event name")||!c(u,"logCustomEvent","eventProperties",'log custom event "'+n+'"',"event"))return !1;var x=m.gd(n,b(u));if(x.h){v.info('Logged custom event "'+n+'".');for(var C=0;C<x.j.length;C++)z.na(Cd.yc,
[n,u],x.j[C]);}return x.h}},hd:function(n,u,x,C,H){if(e()){null==x&&(x="USD");null==C&&(C=1);if(null==n||0>=n.length)return v.error('logPurchase requires a non-empty productId, got "'+n+'", ignoring.'),!1;if(!Pa(n,"log purchase","the purchase name"))return !1;var O=parseFloat(u);if(isNaN(O))return v.error("logPurchase requires a numeric price, got "+u+", ignoring."),!1;O=O.toFixed(2);u=parseInt(C);if(isNaN(u))return v.error("logPurchase requires an integer quantity, got "+C+", ignoring."),!1;if(1>u||
u>bf.Cd)return v.error("logPurchase requires a quantity >1 and <"+bf.Cd+", got "+u+", ignoring."),!1;x=x.toUpperCase();if(-1==="AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD BTC BTN BWP BYR BZD CAD CDF CHF CLF CLP CNY COP CRC CUC CUP CVE CZK DJF DKK DOP DZD EEK EGP ERN ETB EUR FJD FKP GBP GEL GGP GHS GIP GMD GNF GTQ GYD HKD HNL HRK HTG HUF IDR ILS IMP INR IQD IRR ISK JEP JMD JOD JPY KES KGS KHR KMF KPW KRW KWD KYD KZT LAK LBP LKR LRD LSL LTL LVL LYD MAD MDL MGA MKD MMK MNT MOP MRO MTL MUR MVR MWK MXN MYR MZN NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP PKR PLN PYG QAR RON RSD RUB RWF SAR SBD SCR SDG SEK SGD SHP SLL SOS SRD STD SVC SYP SZL THB TJS TMT TND TOP TRY TTD TWD TZS UAH UGX USD UYU UZS VEF VND VUV WST XAF XAG XAU XCD XDR XOF XPD XPF XPT YER ZAR ZMK ZMW ZWL".split(" ").indexOf(x))return v.error("logPurchase requires a valid currencyCode, got "+
x+", ignoring."),!1;if(!c(H,"logPurchase","purchaseProperties",'log purchase "'+n+'"',"purchase"))return !1;C=m.hd(n,O,x,u,b(H));if(C.h)for(v.info("Logged "+u+" purchase"+(1<u?"s":"")+' of "'+n+'" for '+x+" "+O+"."),x=0;x<C.j.length;x++)z.na(Cd.Jc,[n,H],C.j[x]);return C.h}},Ea:function(){if(e())return G.Ea()},Da:function(){if(e())return G.Da()},fd:function(n,u,x){e()&&G.fd(n,u,x);},Ab:function(){if(e())return G.Ab()},$f:function(n,u,x){if(e())return G.subscribe(x,function(C,H,O){m.Eb();"function"===
typeof n&&n(C,H,O);},u)},yg:function(n,u){if(e())return G.unsubscribe(n,u)},wg:function(){e()&&E.watchPosition();},qg:function(){null!=m&&m.Eb();var n=new sb(null,!0);n.store("ab.optOut","This-cookie-will-expire-in-"+tb(n));n=xa.Na;(new pa(n)).setItem(n.M.Ic,n.Ub,!0);d();ea=!0;},bg:function(){(new sb(null,!0)).remove("ab.optOut");var n=xa.Na;ua(new pa(n),n.M.Ic,n.Ub);d();},Bg:function(){if(null==h)throw Error("Appboy must be initialized before calling methods.");h.clearData();for(var n=Da(xa),u=0;u<n.length;u++)(new pa(xa[n[u]])).clearData();
Y&&(r.clearData(!0),z.clearData(!0));}}},X={ab:{}},gf=X.ab,hf;for(hf in I)gf[hf]=I[hf];X.initialize=W.ed;X.destroy=W.yb;X.getDeviceId=W.Rf;X.toggleAppboyLogging=W.sd;X.setLogger=W.pd;X.openSession=W.sc;X.changeUser=W.Ua;X.getUser=W.mb;X.requestImmediateDataFlush=W.Eb;X.requestFeedRefresh=W.uc;X.getCachedFeed=W.lc;X.subscribeToFeedUpdates=W.ze;X.requestContentCardsRefresh=W.Ha;X.getCachedContentCards=W.lb;X.subscribeToContentCardsUpdates=W.xe;X.logCardImpressions=W.Ga;X.logCardClick=W.Fa;
X.logCardDismissal=W.oc;X.logFeedDisplayed=W.re;X.logContentCardsDisplayed=W.qe;X.logInAppMessageImpression=W.Cb;X.logInAppMessageClick=W.qc;X.logInAppMessageButtonClick=W.pc;X.logInAppMessageHtmlClick=W.Bb;X.subscribeToNewInAppMessages=W.tg;X.subscribeToInAppMessage=W.Ae;X.removeSubscription=W.S;X.removeAllSubscriptions=W.N;X.logCustomEvent=W.gd;X.logPurchase=W.hd;X.isPushSupported=W.Ea;X.isPushBlocked=W.Da;X.isPushGranted=W.fd;X.isPushPermissionGranted=W.Ab;X.registerAppboyPushMessages=W.$f;
X.unregisterAppboyPushMessages=W.yg;X.trackLocation=W.wg;X.stopWebTracking=W.qg;X.resumeWebTracking=W.bg;X.wipeData=W.Bg;for(var jf in X)"object"===typeof appboyInterface?appboyInterface[jf]=X[jf]:ff[jf]=X[jf];var kf="object"===typeof appboyInterface?appboyInterface:ff,mf=new function(a,b){var c=!1,d=!1,e=!1,f=!1,g=null,h=null,l=null;a.sg(function(k){function m(t){if(27===t.keyCode&&!e&&0<document.querySelectorAll(".ab-modal-interactions").length){t=document.getElementsByClassName("ab-html-message");for(var r=!1,y=0;y<t.length;y++){var A=t[y].contentWindow.document.getElementsByClassName("ab-programmatic-close-button")[0];null!=A&&(Db(A),r=!0);}r||(t=document.querySelectorAll(".ab-modal-interactions > .ab-close-button")[0],
null!=t&&Db(t));}}c=k.openInAppMessagesInNewTab||!1;d=k.openCardsInNewTab||k.openNewsFeedCardsInNewTab||!1;e=k.requireExplicitInAppMessageDismissal||!1;f=k.enableHtmlInAppMessages||!1;!0===k.allowUserSuppliedJavascript&&(f=!0);g=null;l=k.contentSecurityNonce||null;k.doNotLoadFontAwesome||null!==document.querySelector('link[rel=stylesheet][href="https://use.fontawesome.com/7f85a56ba4.css"]')||(k=document.createElement("link"),k.setAttribute("rel","stylesheet"),k.setAttribute("href","https://use.fontawesome.com/7f85a56ba4.css"),
document.getElementsByTagName("head")[0].appendChild(k));k="ab-css-definitions-"+"2.5.2".replace(/\./g,"-");if(null==document.getElementById(k)){var q=document.createElement("style");q.innerHTML=Pc.je;q.id=k;null!=l&&q.setAttribute("nonce",l);document.getElementsByTagName("head")[0].appendChild(q);}e||(document.addEventListener("keydown",m,!1),a.rg(function(){document.removeEventListener("keydown",m);}));});return {Jf:function(){null==g&&(g=a.Ae(function(k){a.display.we(k);}));return g},we:function(k,
m,q){if(null==k)return !1;if(k instanceof oc)return v.info("User received control for a multivariate test, logging to Braze servers."),a.Cb(k),!0;if(!(k instanceof U))return !1;var t=k instanceof zc;if(t&&!k.xg&&!f)return v.error('HTML in-app messages are disabled. Use the "enableHtmlInAppMessages" option for appboy.initialize to enable these messages.'),a.L(k,Kc.yd),!1;null==m&&(m=document.body);if(k.Za()&&0<m.querySelectorAll(".ab-modal-interactions").length)return v.info("Cannot show in-app message '"+
k.message+"' because another message is being shown."),a.L(k,Kc.Fe),!1;if(Lb.Xf()){var r=Lb.Sf();if(r===Lb.Ma.Sb&&k.orientation===Hc.LANDSCAPE||r===Lb.Ma.Cc&&k.orientation===Hc.PORTRAIT)return v.info("Not showing "+(k.orientation===Hc.PORTRAIT?"portrait":"landscape")+" in-app message '"+k.message+"' because the screen is currently "+(r===Lb.Ma.Sb?"portrait":"landscape")),a.L(k,Kc.mf),!1}if(!f){r=!1;if(k.buttons&&0<k.buttons.length)for(var y=k.buttons,A=0;A<y.length;A++)y[A].clickAction===ec.URI&&
(r=Rc(y[A].uri));else k.clickAction===ec.URI&&(r=Rc(k.uri));if(r)return v.error('Javascript click actions are disabled. Use the "allowUserSuppliedJavascript" option for appboy.initialize to enable these actions.'),a.L(k,Kc.yd),!1}var z=document.createElement("div");z.className="ab-iam-root v3";z.className+=k.ma();kc(k)&&(z.id=k.htmlId);m.appendChild(z);lc(k)&&(m=document.createElement("style"),m.innerHTML=k.css,m.id=mc(k),null!=l&&m.setAttribute("nonce",l),document.getElementsByTagName("head")[0].appendChild(m));
var F=k instanceof wc;m=k.Y(a,b,function(){a.display.rd();},function(G){if(k.Za()&&k.Ce()){var E=document.createElement("div");E.className="ab-page-blocker";lc(k)||(E.style.backgroundColor=bc(k.frameColor));z.appendChild(E);if(!e){var K=(new Date).valueOf();E.onclick=function(Y){200<(new Date).valueOf()-K&&(Fc(k,G),Y.stopPropagation());};}z.appendChild(G);G.focus();k.rc(z);}else if(F){var N=document.querySelectorAll(".ab-slideup");E=null;for(var L=N.length-1;0<=L;L--)if(N[L]!==G){E=N[L];break}k.slideFrom===
dc.TOP?(N=0,null!=E&&(N=E.offsetTop+E.offsetHeight),G.style.top=Math.max(N,0)+"px"):(N=0,null!=E&&(N=(window.innerHeight||document.documentElement.clientHeight)-E.offsetTop),G.style.bottom=Math.max(N,0)+"px");}else t&&!e&&G.contentWindow.addEventListener("keydown",function(Y){27===Y.keyCode&&k.ge();});a.Cb(k);k.dismissType===gc.AUTO_DISMISS&&setTimeout(function(){z.contains(G)&&Fc(k,G);},k.duration);"function"===typeof q&&q();},c);if(t||F)z.appendChild(m),k.rc(z);return !0},rd:function(k,m,q){function t(E){for(var K=
E.querySelectorAll(".ab-feed"),N=null,L=0;L<K.length;L++)K[L].parentNode===E&&(N=K[L]);null!=N?(Wc(a,N),N.parentNode.replaceChild(F,N)):E.appendChild(F);setTimeout(function(){F.className=F.className.replace("ab-hide","ab-show");},0);y&&F.focus();a.re();$c(z,a,F);}function r(E,K){if(null==K)return E;for(var N=[],L=0;L<K.length;L++)N.push(K[L].toLowerCase());K=[];for(L=0;L<E.length;L++){for(var Y=[],ea=0;ea<E[L].categories.length;ea++)Y.push(E[L].categories[ea].toLowerCase());0<Ca(Y,N).length&&K.push(E[L]);}return K}
var y=!1;null==k&&(k=document.body,y=!0);var A=!1,z=null;null==m?(z=a.lc(),dd(z,r(z.cards,q),z.lastUpdated,null,a,d),A=!0):z=new Vc(r(m,q),new Date);var F=z.Y(a,d);if(A){if(null==z.lastUpdated||6E4<(new Date).valueOf()-z.lastUpdated.valueOf())v.info("Cached feed was older than max TTL of 60000 ms, requesting an update from the server."),ad(z,a,F);var G=(new Date).valueOf();m=a.ze(function(E){var K=F.querySelectorAll(".ab-refresh-button")[0];if(null!=K){var N=500,L=parseInt(F.getAttribute(bd));N=isNaN(L)?
N-((new Date).valueOf()-G):N-((new Date).valueOf()-L);setTimeout(function(){K.className=K.className.replace(/fa-spin/g,"");},Math.max(N,0));}dd(z,r(E.cards,q),E.lastUpdated,F,a,d);});F.setAttribute(Xc,m);}null!=k?t(k):window.onload=function(E){return function(){"function"===typeof E&&E();t(document.body);}}(window.onload);},ke:function(){for(var k=document.querySelectorAll(".ab-feed"),m=0;m<k.length;m++)Wc(a,k[m]);},vg:function(k,m,q){0<document.querySelectorAll(".ab-feed").length?a.display.ke():a.display.rd(k,
m,q);},ve:function(k,m){function q(F){for(var G=F.querySelectorAll(".ab-feed"),E=null,K=0;K<G.length;K++)G[K].parentNode===F&&(E=G[K]);null!=E?(Wc(a,E),E.parentNode.replaceChild(y,E)):F.appendChild(y);setTimeout(function(){y.className=y.className.replace("ab-hide","ab-show");},0);t&&y.focus();a.qe();$c(r,a,y);}var t=!1;null==k&&(k=document.body,t=!0);var r=null;r=a.lb();"function"===typeof m&&dd(r,m(r.cards.slice()),r.lastUpdated,null,a,d);var y=r.Y(a,d);(null==r.lastUpdated||6E4<(new Date).valueOf()-
r.lastUpdated.valueOf())&&(null==h||6E4<(new Date).valueOf()-h.valueOf())&&(v.info("Cached content cards were older than max TTL of 60000 ms, requesting a sync from the server."),ad(r,a,y),h=(new Date).valueOf());var A=(new Date).valueOf(),z=a.xe(function(F){var G=y.querySelectorAll(".ab-refresh-button")[0];if(null!=G){var E=500,K=parseInt(y.getAttribute(bd));E=isNaN(K)?E-((new Date).valueOf()-A):E-((new Date).valueOf()-K);setTimeout(function(){G.className=G.className.replace(/fa-spin/g,"");},Math.max(E,
0));}E=F.cards;"function"===typeof m&&(E=m(E.slice()));dd(r,E,F.lastUpdated,y,a,d);});y.setAttribute(Xc,z);null!=k?q(k):window.onload=function(F){return function(){"function"===typeof F&&F();q(document.body);}}(window.onload);},pe:function(){for(var k=document.querySelectorAll(".ab-feed"),m=0;m<k.length;m++)Wc(a,k[m]);},ug:function(k,m){0<document.querySelectorAll(".ab-feed").length?a.display.pe():a.display.ve(k,m);}}}(W,kf);kf.display={};kf.display.automaticallyShowNewInAppMessages=mf.Jf;
kf.display.showInAppMessage=mf.we;kf.display.showFeed=mf.rd;kf.display.destroyFeed=mf.ke;kf.display.toggleFeed=mf.vg;kf.display.showContentCards=mf.ve;kf.display.hideContentCards=mf.pe;kf.display.toggleContentCards=mf.ug;W.display=mf;return appboyInterface});var a=window.appboyQueue||("undefined"!==typeof appboyQueue?appboyQueue:null);
if("undefined"!==typeof a&&a&&a.length&&0<a.length){var b=a===window.appboyQueue;window.appboyQueue=appboyQueue=null;for(var c=0;c<a.length;c++)if(a[c].callee){var d=a[c].callee.name;if(null==d||""===d)d=/^function ([\w]*)\(/g.exec(a[c].callee.toString())[1];if(null!=d&&""!==d){for(var e=d.split("_"),f=b?window.appboy:appboy,g=this,h="appboy",k=0;k<e.length;k++){if("prototype"===e[k]){var l=eval({"appboy.ab.User":"appboy.getUser","appboy.ab.Feed":"appboy.getCachedFeed","appboy.ab.ContentCards":"appboy.getCachedContentCards"}[h]);
g=f=null!=l?l.apply():new f.constructor;}else f=f[e[k]];h+="."+e[k];}null!=f&&"function"===typeof f&&f.apply(g,a[c]);}}}}).call(window);
});

/* eslint-disable no-undef */
window.appboy = appboy_min;
//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

var name = 'Appboy',
    moduleId = 28,
    version = '2.0.11',
    MessageType = {
        PageView: 3,
        PageEvent: 4,
        Commerce: 16,
    };

var clusterMapping = {
    '01': 'sdk.iad-01.braze.com',
    '02': 'sdk.iad-02.braze.com',
    '03': 'sdk.iad-03.braze.com',
    '04': 'sdk.iad-04.braze.com',
    '05': 'sdk.iad-05.braze.com',
    '06': 'sdk.iad-06.braze.com',
    '08': 'sdk.iad-08.braze.com',
    EU: 'sdk.fra-01.braze.eu',
    EU02: 'sdk.fra-02.braze.eu'
};

var constructor = function() {
    var self = this,
        forwarderSettings,
        options = {},
        reportingService,
        mpCustomFlags;

    self.name = name;

    var DefaultAttributeMethods = {
        $LastName: 'setLastName',
        $FirstName: 'setFirstName',
        Email: 'setEmail',
        $Gender: 'setGender',
        $Country: 'setCountry',
        $City: 'setHomeCity',
        $Mobile: 'setPhoneNumber',
        $Age: 'setDateOfBirth',
        last_name: 'setLastName',
        first_name: 'setFirstName',
        email: 'setEmail',
        gender: 'setGender',
        country: 'setCountry',
        home_city: 'setHomeCity',
        email_subscribe: 'setEmailNotificationSubscriptionType',
        push_subscribe: 'setPushNotificationSubscriptionType',
        phone: 'setPhoneNumber',
        image_url: 'setAvatarImageUrl',
        dob: 'setDateOfBirth',
    };

    function logPurchaseEvent(event) {
        var reportEvent = false;
        if (event.ProductAction.ProductList) {
            event.ProductAction.ProductList.forEach(function(product) {
                if (product.Attributes == null) {
                    product.Attributes = {};
                }
                product.Attributes['Sku'] = product.Sku;

                var sanitizedProductName;
                if (forwarderSettings.forwardSkuAsProductName === 'True') {
                    sanitizedProductName = getSanitizedValueForAppboy(
                        String(product.Sku)
                    );
                } else {
                    sanitizedProductName = getSanitizedValueForAppboy(
                        String(product.Name)
                    );
                }

                var sanitizedProperties = getSanitizedCustomProperties(
                    product.Attributes
                );

                if (sanitizedProperties == null) {
                    return (
                        'Properties did not pass validation for ' +
                        sanitizedProductName
                    );
                }

                reportEvent = appboy.logPurchase(
                    sanitizedProductName,
                    parseFloat(product.Price),
                    event.CurrencyCode,
                    product.Quantity,
                    sanitizedProperties
                );
            });
        }
        return reportEvent === true;
    }

    function logAppboyPageViewEvent(event) {
        var sanitizedEventName,
            sanitizedAttrs,
            eventName,
            attrs = event.EventAttributes || {};

        attrs.hostname = window.location.hostname;
        attrs.title = window.document.title;

        if (forwarderSettings.setEventNameForPageView === 'True') {
            eventName = event.EventName;
        } else {
            eventName = window.location.pathname;
        }
        sanitizedEventName = getSanitizedValueForAppboy(eventName);
        sanitizedAttrs = getSanitizedCustomProperties(attrs);
        var reportEvent = appboy.logCustomEvent(
            sanitizedEventName,
            sanitizedAttrs
        );
        return reportEvent === true;
    }

    function setDefaultAttribute(key, value) {
        if (key === 'dob') {
            if (!(value instanceof Date)) {
                return (
                    "Can't call removeUserAttribute or setUserAttribute on forwarder " +
                    name +
                    ", removeUserAttribute or setUserAttribute must set 'dob' to a date"
                );
            } else {
                appboy
                    .getUser()
                    .setDateOfBirth(
                        value.getFullYear(),
                        value.getMonth() + 1,
                        value.getDate()
                    );
            }
        } else if (key === '$Age') {
            if (typeof value === 'number') {
                var year = new Date().getFullYear() - value;
                appboy.getUser().setDateOfBirth(year, 1, 1);
            } else {
                return '$Age must be a number';
            }
        } else {
            if (value == null) {
                value = '';
            }
            if (!(typeof value === 'string')) {
                return (
                    "Can't call removeUserAttribute or setUserAttribute on forwarder " +
                    name +
                    ', removeUserAttribute or setUserAttribute must set this value to a string'
                );
            }
            var params = [];
            params.push(value);
            var u = appboy.getUser();
            //This method uses the setLastName, setFirstName, setEmail, setCountry, setHomeCity, setPhoneNumber, setAvatarImageUrl, setDateOfBirth, setGender, setEmailNotificationSubscriptionType, and setPushNotificationSubscriptionType methods
            if (!u[DefaultAttributeMethods[key]].apply(u, params)) {
                return (
                    'removeUserAttribute or setUserAttribute on forwarder ' +
                    name +
                    ' failed to call, an invalid attribute value was passed in'
                );
            }
        }
    }

    function logAppboyEvent(event) {
        var sanitizedEventName = getSanitizedValueForAppboy(event.EventName);
        var sanitizedProperties = getSanitizedCustomProperties(
            event.EventAttributes
        );

        if (sanitizedProperties == null) {
            return (
                'Properties did not pass validation for ' + sanitizedEventName
            );
        }

        var reportEvent = appboy.logCustomEvent(
            sanitizedEventName,
            sanitizedProperties
        );
        return reportEvent === true;
    }

    /**************************/
    /** Begin mParticle API **/
    /**************************/
    function processEvent(event) {
        var reportEvent = false;

        if (
            event.EventDataType == MessageType.Commerce &&
            event.EventCategory == mParticle.CommerceEventType.ProductPurchase
        ) {
            reportEvent = logPurchaseEvent(event);
        } else if (event.EventDataType == MessageType.Commerce) {
            var listOfPageEvents = mParticle.eCommerce.expandCommerceEvent(
                event
            );
            if (listOfPageEvents != null) {
                for (var i = 0; i < listOfPageEvents.length; i++) {
                    // finalLoopResult keeps track of if any logAppBoyEvent in this loop returns true or not
                    var finalLoopResult = false;
                    try {
                        reportEvent = logAppboyEvent(listOfPageEvents[i]);
                        if (reportEvent === true) {
                            finalLoopResult = true;
                        }
                    } catch (err) {
                        return 'Error logging page event' + err.message;
                    }
                }
                reportEvent = finalLoopResult === true;
            }
        } else if (event.EventDataType == MessageType.PageEvent) {
            reportEvent = logAppboyEvent(event);
        } else if (event.EventDataType == MessageType.PageView) {
            if (forwarderSettings.forwardScreenViews == 'True') {
                reportEvent = logAppboyPageViewEvent(event);
            }
        } else {
            return (
                "Can't send event type to forwarder " +
                name +
                ', event type is not supported'
            );
        }

        if (reportEvent === true && reportingService) {
            reportingService(self, event);
        }
    }

    function removeUserAttribute(key) {
        if (!(key in DefaultAttributeMethods)) {
            var sanitizedKey = getSanitizedValueForAppboy(key);
            appboy.getUser().setCustomUserAttribute(sanitizedKey, null);
        } else {
            return setDefaultAttribute(key, null);
        }
    }

    function setUserAttribute(key, value) {
        if (!(key in DefaultAttributeMethods)) {
            var sanitizedKey = getSanitizedValueForAppboy(key);
            var sanitizedValue = getSanitizedValueForAppboy(value);
            if (value != null && sanitizedValue == null) {
                return 'Value did not pass validation for ' + key;
            }
            appboy
                .getUser()
                .setCustomUserAttribute(sanitizedKey, sanitizedValue);
        } else {
            return setDefaultAttribute(key, value);
        }
    }

    function setUserIdentity(id, type) {
        // Only use this method when mParicle core SDK is version 1
        // Other versions use onUserIdentified, which is called after setUserIdentity from core SDK
        if (window.mParticle.getVersion().split('.')[0] === '1') {
            if (type == window.mParticle.IdentityType.CustomerId) {
                appboy.changeUser(id);
            } else if (type == window.mParticle.IdentityType.Email) {
                appboy.getUser().setEmail(id);
            } else {
                return (
                    "Can't call setUserIdentity on forwarder " +
                    name +
                    ', identity type not supported.'
                );
            }
        }
    }

    // onUserIdentified is not used in version 1 so there is no need to check for version number
    function onUserIdentified(user) {
        var appboyUserIDType,
            userIdentities = user.getUserIdentities().userIdentities;

        if (forwarderSettings.userIdentificationType === 'MPID') {
            appboyUserIDType = user.getMPID();
        } else {
            appboyUserIDType =
                userIdentities[
                    forwarderSettings.userIdentificationType.toLowerCase()
                ];
        }

        appboy.changeUser(appboyUserIDType);

        if (userIdentities.email) {
            appboy.getUser().setEmail(userIdentities.email);
        }
    }

    function primeAppBoyWebPush() {
        appboy.subscribeToNewInAppMessages(function(inAppMessages) {
            var message = inAppMessages[0];
            var pushPrimer = false;
            if (message != null) {
                var shouldDisplay = true;

                if (message instanceof appboy.ab.InAppMessage) {
                    // Read the key-value pair for msg-id
                    var msgId = message.extras['msg-id'];

                    // If this is our push primer message
                    if (msgId == 'push-primer') {
                        pushPrimer = true;
                        // We don't want to display the soft push prompt to users on browsers that don't support push, or if the user
                        // has already granted/blocked permission
                        if (
                            !appboy.isPushSupported() ||
                            appboy.isPushPermissionGranted() ||
                            appboy.isPushBlocked()
                        ) {
                            shouldDisplay = false;
                        }
                        if (message.buttons[0] != null) {
                            // Prompt the user when the first button is clicked
                            message.buttons[0].subscribeToClickedEvent(
                                function() {
                                    appboy.registerAppboyPushMessages();
                                }
                            );
                        }
                    }
                }

                // Display the message if it's a push primer message and shouldDisplay is true
                if (
                    (pushPrimer && shouldDisplay) ||
                    (!pushPrimer && forwarderSettings.register_inapp === 'True')
                ) {
                    appboy.display.showInAppMessage(message);
                }
            }

            // Remove this message from the array of IAMs and return whatever's left
            return inAppMessages.slice(1);
        });
    }

    function openSession(forwarderSettings) {
        appboy.openSession(function() {
            if (forwarderSettings.softPushCustomEventName) {
                appboy.logCustomEvent(
                    forwarderSettings.softPushCustomEventName
                );
            }
        });
    }

    function initForwarder(
        settings,
        service,
        testMode,
        trackerId,
        userAttributes,
        userIdentities,
        appVersion,
        appName,
        customFlags
    ) {
        console.warn(
            'mParticle is upgrading the Braze web kit that you are currently using on 6/14/2022.  You will automatically receive this update if implementing mParticle via snippet/CDN.  There may be breaking changes if you invoke deprecated Braze SDK methods. Please see https://docs.mparticle.com/integrations/braze/event for more information.'
        );
        // eslint-disable-line no-unused-vars
        mpCustomFlags = customFlags;
        try {
            forwarderSettings = settings;
            reportingService = service;
            // 30 min is Appboy default
            options.sessionTimeoutInSeconds =
                forwarderSettings.ABKSessionTimeoutKey || 1800;
            options.sdkFlavor = 'mparticle';
            options.enableHtmlInAppMessages =
                forwarderSettings.enableHtmlInAppMessages == 'True';
            options.doNotLoadFontAwesome =
                forwarderSettings.doNotLoadFontAwesome == 'True';

            if (forwarderSettings.safariWebsitePushId) {
                options.safariWebsitePushId =
                    forwarderSettings.safariWebsitePushId;
            }

            if (forwarderSettings.serviceWorkerLocation) {
                options.serviceWorkerLocation =
                    forwarderSettings.serviceWorkerLocation;
            }

            var cluster =
                forwarderSettings.cluster ||
                forwarderSettings.dataCenterLocation;

            if (clusterMapping.hasOwnProperty(cluster)) {
                options.baseUrl = clusterMapping[cluster];
            } else {
                var customUrl = decodeClusterSetting(cluster);
                if (customUrl) {
                    options.baseUrl = customUrl;
                }
            }

            if (mpCustomFlags && mpCustomFlags[moduleId.toString()]) {
                var brazeFlags = mpCustomFlags[moduleId.toString()];

                if (typeof brazeFlags.initOptions === 'function') {
                    brazeFlags.initOptions(options);
                }
            }

            if (testMode !== true) {
                /* eslint-disable */
                appboy.initialize(forwarderSettings.apiKey, options);

                primeAppBoyWebPush();
                openSession(forwarderSettings);

                /* eslint-enable */
            } else {
                if (!appboy.initialize(forwarderSettings.apiKey, options)) {
                    return 'Failed to initialize: ' + name;
                }

                primeAppBoyWebPush();
                openSession(forwarderSettings);
            }
            return 'Successfully initialized: ' + name;
        } catch (e) {
            return (
                'Failed to initialize: ' + name + ' with error: ' + e.message
            );
        }
    }
    /**************************/
    /** End mParticle API **/
    /**************************/

    function decodeClusterSetting(clusterSetting) {
        if (clusterSetting) {
            var decodedSetting = clusterSetting.replace(/&amp;/g, '&');
            decodedSetting = clusterSetting.replace(/&quot;/g, '"');
            try {
                var clusterSettingObject = JSON.parse(decodedSetting);
                if (clusterSettingObject && clusterSettingObject.JS) {
                    return 'https://' + clusterSettingObject.JS + '/api/v3';
                }
            } catch (e) {
                console.log(
                    'Unable to configure custom Appboy cluster: ' + e.toString()
                );
            }
        }
    }

    function getSanitizedStringForAppboy(value) {
        if (typeof value === 'string') {
            if (value.substr(0, 1) === '$') {
                return value.replace(/^\$+/g, '');
            } else {
                return value;
            }
        }
        return null;
    }

    function getSanitizedValueForAppboy(value) {
        if (typeof value === 'string') {
            return getSanitizedStringForAppboy(value);
        }

        if (Array.isArray(value)) {
            var sanitizedArray = [];
            for (var i in value) {
                var element = value[i];
                var sanitizedElement = getSanitizedStringForAppboy(element);
                if (sanitizedElement == null) {
                    return null;
                }
                sanitizedArray.push(sanitizedElement);
            }
            return sanitizedArray;
        }
        return value;
    }

    function getSanitizedCustomProperties(customProperties) {
        var sanitizedProperties = {},
            value,
            sanitizedPropertyName,
            sanitizedValue;

        if (customProperties == null) {
            customProperties = {};
        }

        if (typeof customProperties !== 'object') {
            return null;
        }

        for (var propertyName in customProperties) {
            value = customProperties[propertyName];
            sanitizedPropertyName = getSanitizedValueForAppboy(propertyName);
            sanitizedValue =
                typeof value === 'string'
                    ? getSanitizedValueForAppboy(value)
                    : value;
            sanitizedProperties[sanitizedPropertyName] = sanitizedValue;
        }
        return sanitizedProperties;
    }

    this.init = initForwarder;
    this.process = processEvent;
    this.setUserIdentity = setUserIdentity;
    this.setUserAttribute = setUserAttribute;
    this.onUserIdentified = onUserIdentified;
    this.removeUserAttribute = removeUserAttribute;
    this.decodeClusterSetting = decodeClusterSetting;
};

function getId() {
    return moduleId;
}

function register(config) {
    if (!config) {
        window.console.log(
            'You must pass a config object to register the kit ' + name
        );
        return;
    }

    if (!isObject(config)) {
        window.console.log(
            "'config' must be an object. You passed in a " + typeof config
        );
        return;
    }

    if (isObject(config.kits)) {
        config.kits[name] = {
            constructor: constructor,
        };
    } else {
        config.kits = {};
        config.kits[name] = {
            constructor: constructor,
        };
    }
    window.console.log(
        'Successfully registered ' + name + ' to your mParticle configuration'
    );
}

if (window && window.mParticle && window.mParticle.addForwarder) {
    window.mParticle.addForwarder({
        name: name,
        constructor: constructor,
        getId: getId,
    });
}

function isObject(val) {
    return (
        val != null && typeof val === 'object' && Array.isArray(val) === false
    );
}

var AppboyKitDev = {
    register: register,
    getVersion: function() {
        return version;
    },
};
var AppboyKitDev_1 = AppboyKitDev.register;
var AppboyKitDev_2 = AppboyKitDev.getVersion;

exports.default = AppboyKitDev;
exports.getVersion = AppboyKitDev_2;
exports.register = AppboyKitDev_1;

},{}],"../../node_modules/@mparticle/web-google-analytics-kit/dist/GoogleAnalyticsEventForwarder.common.js":[function(require,module,exports) {
Object.defineProperty(exports, '__esModule', { value: true });

//
//  Copyright 2019 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

    var name = 'GoogleAnalyticsEventForwarder',
        moduleId = 6,
        version = '2.1.12',
        MessageType = {
            SessionStart: 1,
            SessionEnd: 2,
            PageView: 3,
            PageEvent: 4,
            CrashReport: 5,
            OptOut: 6,
            Commerce: 16
        },
        trackerCount = 1,
        externalUserIdentityType = {
            none: 'None',
            customerId: "CustomerId",
            other: "Other",
            other2: "Other2",
            other3: "Other3",
            other4: "Other4",
            other5: "Other5",
            other6: "Other6",
            other7: "Other7",
            other8: "Other8",
            other9: "Other9",
            other10: "Other10",
        },

        NON_INTERACTION_FLAG = 'Google.NonInteraction',
        CATEGORY = 'Google.Category',
        LABEL = 'Google.Label',
        TITLE = 'Google.Title',
        PAGE = 'Google.Page',
        LOCATION = 'Google.Location',
        HOSTNAME = 'Google.Hostname',
        VALUE = 'Google.Value',
        USERTIMING = 'Google.UserTiming',
        HITTYPE = 'Google.HitType',
        CONTENTGROUPNUMBER = 'Google.CGNumber',
        CONTENTGROUPVALUE = 'Google.CGValue',
        CONTENTGROUP1 = 'Google.CG1',
        CONTENTGROUP2 = 'Google.CG2',
        CONTENTGROUP3 = 'Google.CG3',
        CONTENTGROUP4 = 'Google.CG4',
        CONTENTGROUP5 = 'Google.CG5';

    var constructor = function() {
        var self = this,
            isInitialized = false,
            isEnhancedEcommerceLoaded = false,
            forwarderSettings,
            reportingService,
            trackerId = null,
            eventLevelMap = {
                customDimensions: {},
                customMetrics: {}
            },
            userLevelMap = {
                customDimensions: {},
                customMetrics: {}
            },
            productLevelMap = {
                customDimensions: {},
                customMetrics: {}
            };

        self.name = name;

        function createTrackerId() {
            return 'mpgaTracker' + trackerCount++;
        }

        function createCmd(cmd) {
            // Prepends the specified command with the tracker id
            return trackerId + '.' + cmd;
        }

        function getEventTypeName(eventType) {
            return mParticle.EventType.getName(eventType);
        }

        function formatDimensionOrMetric(attr) {
            return attr.replace(/ /g, '').toLowerCase();
        }

        function applyCustomDimensionsAndMetrics(event, gaOptionalParameters) {
            // apply custom dimensions and metrics to each event, product, or user if respective attributes exist
            if (event.EventAttributes && Object.keys(event.EventAttributes).length) {
                applyCustomDimensionsMetricsForSourceAttributes(event.EventAttributes, gaOptionalParameters, eventLevelMap);
            }

            if (event.UserAttributes && Object.keys(event.UserAttributes).length) {
                applyCustomDimensionsMetricsForSourceAttributes(event.UserAttributes, gaOptionalParameters, userLevelMap);
            }
        }

        function applyCustomDimensionsMetricsForSourceAttributes(attributes, targetDimensionsAndMetrics, mapLevel) {
            for (var customDimension in mapLevel.customDimensions) {
                for (var attrDimName in attributes) {
                    if (customDimension === attrDimName) {
                        mapLevel.customDimensions[customDimension].forEach(function(cd) {
                            if (!targetDimensionsAndMetrics[cd]) {
                                targetDimensionsAndMetrics[cd] = attributes[attrDimName];
                            }
                        });
                    }
                }
            }

            for (var customMetric in mapLevel.customMetrics) {
                for (var attrMetricName in attributes) {
                    if (customMetric === attrMetricName) {
                        mapLevel.customMetrics[customMetric].forEach(function(cm) {
                            if (!targetDimensionsAndMetrics[cm]) {
                                targetDimensionsAndMetrics[cm] = attributes[attrMetricName];
                            }
                        });
                    }
                }
            }
        }

        function applyCustomFlags(flags, gaOptionalParameters) {
            if (flags.hasOwnProperty(NON_INTERACTION_FLAG)) {
                gaOptionalParameters['nonInteraction'] = flags[NON_INTERACTION_FLAG];
            }
        }

        function processEvent(event) {
            var gaOptionalParameters = {};
            var reportEvent = false;

            if (isInitialized) {
                event.ExpandedEventCount = 0;

                applyCustomDimensionsAndMetrics(event, gaOptionalParameters);

                if (event.CustomFlags && Object.keys(event.CustomFlags).length) {
                    applyCustomFlags(event.CustomFlags, gaOptionalParameters);
                    applyContentGroups(event.CustomFlags, gaOptionalParameters);
                }

                try {
                    if (event.EventDataType == MessageType.PageView) {
                        logPageView(event, gaOptionalParameters, event.CustomFlags);
                        reportEvent = true;
                    }
                    else if (event.EventDataType == MessageType.Commerce) {
                        logCommerce(event, gaOptionalParameters, event.CustomFlags);
                        reportEvent = true;
                    }
                    else if (event.EventDataType == MessageType.PageEvent) {
                        reportEvent = true;

                        logEvent(event, gaOptionalParameters, event.CustomFlags);
                    }

                    if (reportEvent && reportingService) {
                        reportingService(self, event);
                    }

                    return 'Successfully sent to ' + name;
                }
                catch (e) {
                    return 'Failed to send to: ' + name + ' ' + e;
                }
            }

            return 'Can\'t send to forwarder ' + name + ', not initialized';
        }

        function setUserIdentity(id, type) {
            if (window.mParticle.getVersion().split('.')[0] === '1') {
                if (isInitialized) {
                    if (forwarderSettings.hashUserId == 'True' && type == window.mParticle.IdentityType.CustomerId) {
                        if (forwarderSettings.classicMode == 'True') ;
                        else {
                            ga(createCmd('set'), 'userId', window.mParticle.generateHash(id));
                        }
                    }
                }
                else {
                    return 'Can\'t call setUserIdentity on forwarder ' + name + ', not initialized';
                }
            }
        }

        function generateHash(id) {
            return window.mParticle.generateHash(id);
        }

        function onUserIdentified(user) {
            if (!user) {
                return;
            }
            var userId,
                userIdentities = user.getUserIdentities().userIdentities;
            if (isInitialized) {
                if (forwarderSettings.externalUserIdentityType !== externalUserIdentityType.none) {
                    switch (forwarderSettings.externalUserIdentityType) {
                        case "CustomerId":
                            userId = userIdentities.customerid;
                            break;
                        case "Other":
                            userId = userIdentities.other;
                            break;
                        case "Other2":
                            userId = userIdentities.other2;
                            break;
                        case "Other3":
                            userId = userIdentities.other3;
                            break;
                        case "Other4":
                            userId = userIdentities.other4;
                            break;
                        case "Other5":
                            userId = userIdentities.other5;
                            break;
                        case "Other6":
                            userId = userIdentities.other6;
                            break;
                        case "Other7":
                            userId = userIdentities.other7;
                            break;
                        case "Other8":
                            userId = userIdentities.other8;
                            break;
                        case "Other9":
                            userId = userIdentities.other9;
                            break;
                        case "Other10":
                            userId = userIdentities.other10;
                            break;
                        default:
                            console.warn('External identity type not found for setting identity on ' + name + '. User not set. Please double check your implementation.');
                    }
                }
                if (userId) {
                    if (forwarderSettings.hashUserId == 'True') {
                        userId = generateHash(userId);
                    }
                    if (forwarderSettings.classicMode !== 'True') {
                        ga(createCmd('set'), 'userId', userId);
                    }
                } else {
                    console.warn('External identity type of ' + forwarderSettings.externalUserIdentityType + ' not set on the user');
                }
                
            }
        }

        function addEcommerceProduct(product, updatedProductDimentionAndMetrics) {
            var productAttrs = {
                id: product.Sku,
                name: product.Name,
                category: product.Category,
                brand: product.Brand,
                variant: product.Variant,
                price: product.Price,
                coupon: product.CouponCode,
                quantity: product.Quantity
            };

            for (var attr in updatedProductDimentionAndMetrics) {
                if (updatedProductDimentionAndMetrics.hasOwnProperty(attr)) {
                    productAttrs[attr] = updatedProductDimentionAndMetrics[attr];
                }
            }

            ga(createCmd('ec:addProduct'), productAttrs);
        }

        function addEcommerceProductImpression(product, impressionListName, updatedProductDimentionAndMetrics) {
            var productAttrs = {
                id: product.Sku,
                name: product.Name,
                category: product.Category,
                brand: product.Brand,
                variant: product.Variant,
                price: product.Price,
                coupon: product.CouponCode,
                quantity: product.Quantity,
                list: impressionListName,
                type: 'view'
            };

            for (var attr in updatedProductDimentionAndMetrics) {
                if (updatedProductDimentionAndMetrics.hasOwnProperty(attr)) {
                    productAttrs[attr] = updatedProductDimentionAndMetrics[attr];
                }
            }

            ga(createCmd('ec:addImpression'), productAttrs);
        }

        function sendEcommerceEvent(type, gaOptionalParameters, customFlags) {
            ga(createCmd('send'), customFlags && customFlags[HITTYPE] ? customFlags[HITTYPE] : 'event', 'eCommerce', getEventTypeName(type), gaOptionalParameters);
        }

        function logCommerce(event, gaOptionalParameters, customFlags) {
            if (!isEnhancedEcommerceLoaded) {
                ga(createCmd('require'), 'ec');
                isEnhancedEcommerceLoaded = true;
            }

            if (event.CurrencyCode) {
                // Set currency code if present
                ga(createCmd('set'), '&cu', event.CurrencyCode);
            }

            if (event.ProductImpressions) {
                // Impression event
                event.ProductImpressions.forEach(function(impression) {
                    var impressionListName = impression.ProductImpressionList;
                    impression.ProductList.forEach(function(product) {
                        var updatedProductDimentionAndMetrics = {};
                        applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, updatedProductDimentionAndMetrics, productLevelMap);
                        addEcommerceProductImpression(product, impressionListName, updatedProductDimentionAndMetrics);
                    });
                });

                sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
            }
            else if (event.PromotionAction) {
                // Promotion event
                event.PromotionAction.PromotionList.forEach(function(promotion) {
                    ga(createCmd('ec:addPromo'), {
                        id: promotion.Id,
                        name: promotion.Name,
                        creative: promotion.Creative,
                        position: promotion.Position
                    });
                });

                if (event.PromotionAction.PromotionActionType == mParticle.PromotionType.PromotionClick) {
                    ga(createCmd('ec:setAction'), 'promo_click');
                }

                sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
            }
            else if (event.ProductAction) {
                if (event.ProductAction.ProductActionType == mParticle.ProductActionType.Purchase) {
                    event.ProductAction.ProductList.forEach(function(product) {
                        var updatedProductDimentionAndMetrics = {};
                        applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, updatedProductDimentionAndMetrics, productLevelMap);
                        addEcommerceProduct(product, updatedProductDimentionAndMetrics);
                    });

                    ga(createCmd('ec:setAction'), 'purchase', {
                        id: event.ProductAction.TransactionId,
                        affiliation: event.ProductAction.Affiliation,
                        revenue: event.ProductAction.TotalAmount,
                        tax: event.ProductAction.TaxAmount,
                        shipping: event.ProductAction.ShippingAmount,
                        coupon: event.ProductAction.CouponCode
                    });

                    sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
                }
                else if (event.ProductAction.ProductActionType == mParticle.ProductActionType.Refund) {
                    if (event.ProductAction.ProductList.length) {
                        event.ProductAction.ProductList.forEach(function(product) {
                            var productAttrs = {
                                id: product.Sku,
                                quantity: product.Quantity
                            };
                            applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, productAttrs, productLevelMap);
                            ga(createCmd('ec:addProduct'), productAttrs);
                        });
                    }

                    ga(createCmd('ec:setAction'), 'refund', {
                        id: event.ProductAction.TransactionId
                    });

                    sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
                }
                else if (event.ProductAction.ProductActionType == mParticle.ProductActionType.AddToCart ||
                    event.ProductAction.ProductActionType == mParticle.ProductActionType.RemoveFromCart) {
                    var updatedProductDimentionAndMetrics = {};
                    event.ProductAction.ProductList.forEach(function(product) {
                        applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, updatedProductDimentionAndMetrics, productLevelMap);
                        addEcommerceProduct(product, updatedProductDimentionAndMetrics);
                    });

                    ga(createCmd('ec:setAction'),
                        event.ProductAction.ProductActionType == mParticle.ProductActionType.AddToCart ? 'add' : 'remove');

                    sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
                }
                else if (event.ProductAction.ProductActionType == mParticle.ProductActionType.Checkout || event.ProductAction.ProductActionType == mParticle.ProductActionType.CheckoutOption) {
                    event.ProductAction.ProductList.forEach(function(product) {
                        var updatedProductDimentionAndMetrics = {};
                        applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, updatedProductDimentionAndMetrics, productLevelMap);
                        addEcommerceProduct(product, updatedProductDimentionAndMetrics);
                    });

                    ga(createCmd('ec:setAction'), event.ProductAction.ProductActionType == mParticle.ProductActionType.Checkout ? 'checkout' : 'checkout_option', {
                        step: event.ProductAction.CheckoutStep || event.EventAttributes.step || null,
                        option: event.ProductAction.CheckoutOptions || event.EventAttributes.option || null,
                    });

                    sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
                }
                else if (event.ProductAction.ProductActionType == mParticle.ProductActionType.Click) {
                    event.ProductAction.ProductList.forEach(function(product) {
                        var updatedProductDimentionAndMetrics = {};
                        applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, updatedProductDimentionAndMetrics, productLevelMap);
                        addEcommerceProduct(product, updatedProductDimentionAndMetrics);
                    });

                    ga(createCmd('ec:setAction'), 'click');
                    sendEcommerceEvent(event.EventCategory, gaOptionalParameters, customFlags);
                }
                else if (event.ProductAction.ProductActionType == mParticle.ProductActionType.ViewDetail) {
                    event.ProductAction.ProductList.forEach(function(product) {
                        var updatedProductDimentionAndMetrics = {};
                        applyCustomDimensionsMetricsForSourceAttributes(product.Attributes, updatedProductDimentionAndMetrics, productLevelMap);
                        addEcommerceProduct(product );
                    });

                    ga(createCmd('ec:setAction'), 'detail');
                    ga(createCmd('send'), customFlags && customFlags[HITTYPE] ? customFlags[HITTYPE] : 'event', 'eCommerce', getEventTypeName(event.EventCategory), gaOptionalParameters);
                }

                sendOptionalUserTimingMessage(event, gaOptionalParameters);
            }
        }

        function logPageView(event, gaOptionalParameters, customFlags) {
            if (forwarderSettings.classicMode == 'True') {
                _gaq.push(['_trackPageview']);
            }
            else {
                if (event.CustomFlags) {
                    if (event.CustomFlags[PAGE]) {
                        ga(createCmd('set'), 'page', event.CustomFlags[PAGE]);
                    }
                    if (event.CustomFlags[HOSTNAME]) {
                        ga(createCmd('set'), 'hostname', event.CustomFlags[HOSTNAME]);
                    }
                    if (event.CustomFlags[LOCATION]) {
                        ga(createCmd('set'), 'location', event.CustomFlags[LOCATION]);
                    }
                    if (event.CustomFlags[TITLE]){
                        ga(createCmd('set'), 'title', event.CustomFlags[TITLE]);
                    }
                }
                ga(createCmd('send'), customFlags && customFlags[HITTYPE] ? customFlags[HITTYPE] : 'pageview', gaOptionalParameters);
                sendOptionalUserTimingMessage(event, gaOptionalParameters);
            }
        }

        function logEvent(event, gaOptionalParameters, customFlags) {
            var label = '',
                category = getEventTypeName(event.EventCategory),
                value;

            if (event.EventAttributes) {
                if (event.EventAttributes.label) {
                    label = event.EventAttributes.label;
                }

                if (event.EventAttributes.value) {
                    value = parseInt(event.EventAttributes.value, 10);

                    // Test for NaN
                    if (value != value) {
                        value = null;
                    }
                }

                if (event.EventAttributes.category) {
                    category = event.EventAttributes.category;
                }
            }

            if (event.CustomFlags) {
                var googleCategory = event.CustomFlags[CATEGORY],
                    googleLabel = event.CustomFlags[LABEL],
                    googleValue = parseInt(event.CustomFlags[VALUE], 10);

                if (googleCategory) {
                    category = googleCategory;
                }

                if (googleLabel) {
                    label = googleLabel;
                }

                // Ensure not NaN
                if (googleValue == googleValue) {
                    value = googleValue;
                }
            }

            if (forwarderSettings.classicMode == 'True') {
                _gaq.push(['_trackEvent',
                    category,
                    event.EventName,
                    label,
                    value]);
            }
            else {
                ga(createCmd('send'),
                    customFlags && customFlags[HITTYPE] ? customFlags[HITTYPE] : 'event',
                    category,
                    event.EventName,
                    label,
                    value,
                    gaOptionalParameters
                );

                sendOptionalUserTimingMessage(event, gaOptionalParameters);
            }
        }

        function sendOptionalUserTimingMessage(event, gaOptionalParameters) {
            // only if there is a custom flag of Google.UserTiming should a user timing message be sent
            if (event.CustomFlags && event.CustomFlags[USERTIMING] && typeof(event.CustomFlags[USERTIMING]) === 'number') {
                var userTimingObject = {
                    hitType: 'timing',
                    timingVar: event.EventName,
                    timingValue: event.CustomFlags[USERTIMING],
                    timingCategory: event.CustomFlags[CATEGORY] || getEventTypeName(event.EventCategory),
                    timingLabel: event.CustomFlags[LABEL] || null,
                };

                for (var key in gaOptionalParameters) {
                    if (gaOptionalParameters.hasOwnProperty(key)) {
                        userTimingObject[key] = gaOptionalParameters[key];
                    }
                }

                ga(createCmd('send'), userTimingObject);
            }
        }

        function initForwarder(settings, service, testMode, tid, userAttributes, userIdentities, appVersion, appName, customFlags) {
            try {
                forwarderSettings = settings;
                reportingService = service;

                if (!tid) {
                    trackerId = createTrackerId();
                }
                else {
                    trackerId = tid;
                }

                if (forwarderSettings.classicMode == 'True') {
                    window._gaq = window._gaq || [];

                    if(testMode !== true) {
                        window._gaq.push(['_setAccount', forwarderSettings.apiKey]);

                        if (forwarderSettings.useLocalhostCookie == 'True') {
                            window._gaq.push(['_setDomainName', 'none']);
                        }

                        (function() {
                            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                            if (forwarderSettings.useDisplayFeatures == 'True') {
                                ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
                            } else {
                                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                            }
                            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                        })();
                    }
                }
                else {
                    if(testMode !== true) {
                        (function(i, s, o, g, r, a, m) {
                            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function() {
                                (i[r].q = i[r].q || []).push(arguments);
                            }, i[r].l = 1 * new Date(); a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
                        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                    }

                    var gaOptionalParameters = {
                        trackingId:forwarderSettings.apiKey,
                        name: trackerId
                    };

                    if (forwarderSettings.useLocalhostCookie == 'True') {
                        gaOptionalParameters.cookieDomain = 'none';
                    }

                    if (forwarderSettings.clientIdentificationType === 'AMP') {
                        gaOptionalParameters.useAmpClientId = true;
                    }

                    ga('create', gaOptionalParameters);

                    applyContentGroups(customFlags, gaOptionalParameters);

                    if (forwarderSettings.useDisplayFeatures == 'True') {
                        ga(createCmd('require'), 'displayfeatures');
                    }

                    if (forwarderSettings.useSecure == 'True') {
                        ga(createCmd('set'), 'forceSSL', true);
                    }

                    if (forwarderSettings.customDimensions) {
                        var customDimensions = JSON.parse(forwarderSettings.customDimensions.replace(/&quot;/g, '\"'));
                        customDimensions.forEach(function(dimension) {
                            if (dimension.maptype === 'EventAttributeClass.Name') {
                                addTypeToMapping(eventLevelMap, 'customDimensions', dimension);
                            } else if (dimension.maptype === 'UserAttributeClass.Name') {
                                addTypeToMapping(userLevelMap, 'customDimensions', dimension);
                            } else if (dimension.maptype === 'ProductAttributeSelector.Name') {
                                addTypeToMapping(productLevelMap, 'customDimensions', dimension);
                            }
                        });
                    }

                    if (forwarderSettings.customMetrics) {
                        var customMetrics = JSON.parse(forwarderSettings.customMetrics.replace(/&quot;/g, '\"'));
                        customMetrics.forEach(function(metric) {
                            if (metric.maptype === 'EventAttributeClass.Name') {
                                addTypeToMapping(eventLevelMap, 'customMetrics', metric);
                            } else if (metric.maptype === 'UserAttributeClass.Name') {
                                addTypeToMapping(userLevelMap, 'customMetrics', metric);
                            } else if (metric.maptype === 'ProductAttributeSelector.Name') {
                                addTypeToMapping(productLevelMap, 'customMetrics', metric);
                            }
                        });
                    }
                }

                isInitialized = true;

                if (window.mParticle.getVersion().split('.')[0] === '2') {
                    onUserIdentified(mParticle.Identity.getCurrentUser());
                }

                return 'Successfully initialized: ' + name;
            }
            catch (e) {
                return 'Failed to initialize: ' + name;
            }
        }

        function applyContentGroups(customFlags, gaOptionalParameters) {
            if (customFlags) {
                var contentGroupNumber = customFlags[CONTENTGROUPNUMBER];
                var contentGroupValue = customFlags[CONTENTGROUPVALUE];
                // This is being deprecated because it only allows an individual content group to be set. We also will only allow event level custom flags to simplify the API and docs
                if (contentGroupNumber && contentGroupValue) {
                    console.warn('Setting `Google.CGNumber` and `Google.CGValue` is being deprecated on 3/1/2021.  Please set content groups for each event via the custom Flag `Google.CG#`. See https://docs.mparticle.com/integrations/google-analytics/event/');
                    ga(createCmd('set'), 'contentGroup'.concat(contentGroupNumber), contentGroupValue);
                }

                if (gaOptionalParameters) {
                    if (customFlags.hasOwnProperty(CONTENTGROUP1)) {
                        gaOptionalParameters.contentGroup1 = customFlags[CONTENTGROUP1];
                    }
                    if (customFlags.hasOwnProperty(CONTENTGROUP2)) {
                        gaOptionalParameters.contentGroup2 = customFlags[CONTENTGROUP2];
                    }
                    if (customFlags.hasOwnProperty(CONTENTGROUP3)) {
                        gaOptionalParameters.contentGroup3 = customFlags[CONTENTGROUP3];
                    }
                    if (customFlags.hasOwnProperty(CONTENTGROUP4)) {
                        gaOptionalParameters.contentGroup4 = customFlags[CONTENTGROUP4];
                    }
                    if (customFlags.hasOwnProperty(CONTENTGROUP5)) {
                        gaOptionalParameters.contentGroup5 = customFlags[CONTENTGROUP5];
                    }
                }
            }
        }

        function addTypeToMapping(map, type, mapVal) {
            var formattedMapVal = formatDimensionOrMetric(mapVal.value);
            if (!map[type][mapVal.map]) {
                map[type][mapVal.map] = [formattedMapVal];
                return;
            }

            if (!map[type][mapVal.map].indexOf(mapVal.value) >= 0) {
                map[type][mapVal.map].push(formattedMapVal);
            }
        }

        this.init = initForwarder;
        this.process = processEvent;
        this.setUserIdentity = setUserIdentity;
        this.onUserIdentified = onUserIdentified;
    };

    function getId() {
        return moduleId;
    }

    function isObject(val) {
        return val != null && typeof val === 'object' && Array.isArray(val) === false;
    }

    function register(config) {
        if (!config) {
            console.log('You must pass a config object to register the kit ' + name);
            return;
        }

        if (!isObject(config)) {
            console.log('\'config\' must be an object. You passed in a ' + typeof config);
            return;
        }

        if (isObject(config.kits)) {
            config.kits[name] = {
                constructor: constructor
            };
        } else {
            config.kits = {};
            config.kits[name] = {
                constructor: constructor
            };
        }
        console.log('Successfully registered ' + name + ' to your mParticle configuration');
    }

    if (typeof window !== 'undefined') {
        if (window && window.mParticle && window.mParticle.addForwarder) {
            window.mParticle.addForwarder({
                name: name,
                constructor: constructor,
                getId: getId
            });
        }
    }

    var GoogleAnalyticsEventForwarder = {
        register: register,
        getVersion: function() {
            return version;
        }
    };
var GoogleAnalyticsEventForwarder_1 = GoogleAnalyticsEventForwarder.register;
var GoogleAnalyticsEventForwarder_2 = GoogleAnalyticsEventForwarder.getVersion;

exports.default = GoogleAnalyticsEventForwarder;
exports.getVersion = GoogleAnalyticsEventForwarder_2;
exports.register = GoogleAnalyticsEventForwarder_1;

},{}],"../../node_modules/@mparticle/web-intercom-kit/dist/IntercomEventForwarder.common.js":[function(require,module,exports) {
Object.defineProperty(exports, '__esModule', { value: true });

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

var isobject = /*#__PURE__*/Object.freeze({
  'default': isObject
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var isobject$1 = getCjsExportFromNamespace(isobject);

//
//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

    

    var name = 'IntercomEventForwarder',
        moduleId = 18,
        MessageType = {
            SessionStart: 1,
            SessionEnd  : 2,
            PageView    : 3,
            PageEvent   : 4,
            CrashReport : 5,
            OptOut      : 6,
            Commerce    : 16
        };

    function createObject(key, value) {
        var obj  = {};
        obj[key] = value;

        return obj;
    }

    var constructor = function () {
        var self              = this,
            isInitialized     = false,
            forwarderSettings = null,
            reportingService  = null;


        self.name = name;


        function initForwarder(settings, service, testMode) {
            forwarderSettings = settings;
            reportingService  = service;

            try {

                if(!testMode) {
                    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update');}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;                    s.src='https://widget.intercom.io/widget/{app_id}';
                    var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
                }

                bootIntercom();
                isInitialized = true;
                return 'Successfully initialized: ' + name;
            }
            catch (e) {
                return 'Can\'t initialize forwarder: ' + name + ': ' + e;
            }
        }

        function bootIntercom() {
            var appid = forwarderSettings.appid;
            if(!appid) {
                return 'Can\'t boot forwarder: ' + name + ', appid is not defined';
            }

            var obj      = createObject('app_id', appid),
                widgetId = forwarderSettings.widgetid || '#IntercomDefaultWidget';

            obj.widget   = createObject('activator', widgetId);


            try {
                window.Intercom('boot', obj);
            }
            catch (e) {
                return 'Can\'t initialize forwarder: ' + name + ': ' + e;
            }
            return 'Successfully booted: ' + name;
        }


        function processEvent(event) {
            var reportEvent = false;

            if (!isInitialized) {
                return 'Can\'t send to forwarder: ' + name + ', not initialized';
            }

            try {
                if (event.EventDataType == MessageType.PageEvent ||
                    event.EventDataType == MessageType.PageView) {

                    reportEvent = true;
                    logEvent(event);

                    if(reportingService) {
                        reportingService(self, event);
                    }
                }
                return 'Successfully sent to forwarder: ' + name;
            }
            catch (e) {
                return 'Can\'t send to forwarder: ' + name + ' ' + e;
            }
        }

        function logEvent(event) {
            if (!isInitialized) {
                return 'Can\'t log event on forwarder: ' + name + ', not initialized';
            }

            if(!event.EventName) {
                return 'Can\'t log event on forwarder: ' + name + ', no event name';
            }

            event.EventAttributes = event.EventAttributes || {};

            try {
                window.Intercom('trackEvent',
                    event.EventName,
                    event.EventAttributes);
            }
            catch (e) {
                return 'Can\'t log event on forwarder: ' + name + ': ' + e;
            }
            return 'Successfully logged event from forwarder: ' + name;
        }

        function setUserAttribute(key, value) {
            if (!isInitialized) {
                return 'Can\'t set user identity on forwarder: ' + name + ', not initialized';
            }

            var attr = createObject(key, value);

            try {
                window.Intercom('update', attr);
            }
            catch (e) {
                return 'Can\'t set user attribute on forwarder: ' + name + ': ' + e;
            }
            return 'Successfully called update on forwarder: ' + name;
        }

        function setUserIdentity(id, type) {

            if (!isInitialized) {
                return 'Can\'t call setUserIdentity on forwarder: ' + name + ', not initialized';
            }

            if(!id) {
                return 'Can\'t call setUserIdentity on forwarder: ' + name + ', without id or email';
            }

            var key = '';

            if(window.mParticle.IdentityType.CustomerId === type) {
                key = 'user_id';
            }
            else if(window.mParticle.IdentityType.Email === type) {
                key = 'email';
            }
            else {
                return;
            }

            var obj = createObject(key, id);

            try {
                window.Intercom('update', obj);
            }
            catch(e) {
                return 'Can\'t call identify on forwarder: ' + name + ': ' + e;
            }
            return 'Successfully called update on forwarder: ' + name;
        }

        this.init             = initForwarder;
        this.process          = processEvent;
        this.setUserAttribute = setUserAttribute;
        this.setUserIdentity  = setUserIdentity;
    };

    function getId() {
        return moduleId;
    }

    function register(config) {
        if (!config) {
            window.console.log('You must pass a config object to register the kit ' + name);
            return;
        }

        if (!isobject$1(config)) {
            window.console.log('\'config\' must be an object. You passed in a ' + typeof config);
            return;
        }

        if (isobject$1(config.kits)) {
            config.kits[name] = {
                constructor: constructor
            };
        } else {
            config.kits = {};
            config.kits[name] = {
                constructor: constructor
            };
        }
        window.console.log('Successfully registered ' + name + ' to your mParticle configuration');
    }

    if (window && window.mParticle && window.mParticle.addForwarder) {
        window.mParticle.addForwarder({
            name: name,
            constructor: constructor,
            getId: getId
        });
    }

    var IntercomEventForwarder = {
        register: register
    };
var IntercomEventForwarder_1 = IntercomEventForwarder.register;

exports.default = IntercomEventForwarder;
exports.register = IntercomEventForwarder_1;

},{}],"../../node_modules/@mparticle/web-media-sdk/dist/mparticle-media.common.js":[function(require,module,exports) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// This will live in a declaration file in core sdk
// once we set that up.
var MessageType;
(function (MessageType) {
    MessageType[MessageType["PageEvent"] = 4] = "PageEvent";
    MessageType[MessageType["Media"] = 20] = "Media";
})(MessageType || (MessageType = {}));
var EventType;
(function (EventType) {
    EventType[EventType["Media"] = 9] = "Media";
})(EventType || (EventType = {}));
var MediaEventType;
(function (MediaEventType) {
    MediaEventType[MediaEventType["Play"] = 23] = "Play";
    MediaEventType[MediaEventType["Pause"] = 24] = "Pause";
    MediaEventType[MediaEventType["ContentEnd"] = 25] = "ContentEnd";
    MediaEventType[MediaEventType["SessionStart"] = 30] = "SessionStart";
    MediaEventType[MediaEventType["SessionEnd"] = 31] = "SessionEnd";
    MediaEventType[MediaEventType["SeekStart"] = 32] = "SeekStart";
    MediaEventType[MediaEventType["SeekEnd"] = 33] = "SeekEnd";
    MediaEventType[MediaEventType["BufferStart"] = 34] = "BufferStart";
    MediaEventType[MediaEventType["BufferEnd"] = 35] = "BufferEnd";
    MediaEventType[MediaEventType["UpdatePlayheadPosition"] = 36] = "UpdatePlayheadPosition";
    MediaEventType[MediaEventType["AdClick"] = 37] = "AdClick";
    MediaEventType[MediaEventType["AdBreakStart"] = 38] = "AdBreakStart";
    MediaEventType[MediaEventType["AdBreakEnd"] = 39] = "AdBreakEnd";
    MediaEventType[MediaEventType["AdStart"] = 40] = "AdStart";
    MediaEventType[MediaEventType["AdEnd"] = 41] = "AdEnd";
    MediaEventType[MediaEventType["AdSkip"] = 42] = "AdSkip";
    MediaEventType[MediaEventType["SegmentStart"] = 43] = "SegmentStart";
    MediaEventType[MediaEventType["SegmentEnd"] = 44] = "SegmentEnd";
    MediaEventType[MediaEventType["SegmentSkip"] = 45] = "SegmentSkip";
    MediaEventType[MediaEventType["UpdateQoS"] = 46] = "UpdateQoS";
    MediaEventType[MediaEventType["SessionSummary"] = 47] = "SessionSummary";
    MediaEventType[MediaEventType["SegmentSummary"] = 48] = "SegmentSummary";
    MediaEventType[MediaEventType["AdSummary"] = 49] = "AdSummary";
})(MediaEventType || (MediaEventType = {}));
var MediaEventName = {
    Play: 'Play',
    Pause: 'Pause',
    ContentEnd: 'Media Content End',
    SessionStart: 'Media Session Start',
    SessionEnd: 'Media Session End',
    SeekStart: 'Seek Start',
    SeekEnd: 'Seek End',
    BufferStart: 'Buffer Start',
    BufferEnd: 'Buffer End',
    UpdatePlayheadPosition: 'Update Playhead Position',
    AdClick: 'Ad Click',
    AdBreakStart: 'Ad Break Start',
    AdBreakEnd: 'Ad Break End',
    AdStart: 'Ad Start',
    AdEnd: 'Ad End',
    AdSkip: 'Ad Skip',
    SegmentStart: 'Segment Start',
    SegmentEnd: 'Segment End',
    SegmentSkip: 'Segment Skip',
    UpdateQoS: 'Update QoS',
    SessionSummary: 'Media Session Summary',
    SegmentSummary: 'Media Segment Summary',
    AdSummary: 'Media Ad Summary',
};
var MediaContentType;
(function (MediaContentType) {
    MediaContentType["Video"] = "Video";
    MediaContentType["Audio"] = "Audio";
})(MediaContentType || (MediaContentType = {}));
var MediaStreamType;
(function (MediaStreamType) {
    MediaStreamType["LiveStream"] = "LiveStream";
    MediaStreamType["OnDemand"] = "OnDemand";
    MediaStreamType["Linear"] = "Linear";
    MediaStreamType["Podcast"] = "Podcast";
    MediaStreamType["Audiobook"] = "Audiobook";
})(MediaStreamType || (MediaStreamType = {}));
var ValidMediaAttributeKeys = {
    mediaSessionId: 'media_session_id',
    playheadPosition: 'playhead_position',
    id: 'id',
    //MediaConent
    contentTitle: 'content_title',
    contentId: 'content_id',
    duration: 'content_duration',
    streamType: 'stream_type',
    contentType: 'content_type',
    //Seek
    seekPosition: 'seek_position',
    //Buffer
    bufferDuration: 'buffer_duration',
    bufferPercent: 'buffer_percent',
    bufferPosition: 'buffer_position',
    //QoS
    qosBitrate: 'qos_bitrate',
    qosFramesPerSecond: 'qos_fps',
    qosStartupTime: 'qos_startup_time',
    qosDroppedFrames: 'qos_dropped_frames',
    //MediaAd
    adTitle: 'ad_content_title',
    adDuration: 'ad_content_duration',
    adId: 'ad_content_id',
    adAdvertiserId: 'ad_content_advertiser',
    adCampaign: 'ad_content_campaign',
    adCreative: 'ad_content_creative',
    adPlacement: 'ad_content_placement',
    adPosition: 'ad_content_position',
    adSiteId: 'ad_content_site_id',
    //MediaAdBreak
    adBreakTitle: 'ad_break_title',
    adBreakDuration: 'ad_break_duration',
    adBreakPlaybackTime: 'ad_break_playback_time',
    adBreakId: 'ad_break_id',
    //Segment
    segmentTitle: 'segment_title',
    segmentIndex: 'segment_index',
    segmentDuration: 'segment_duration',
    // Session Summary Attributes
    mediaSessionIdKey: 'media_session_id',
    startTimestampKey: 'media_session_start_time',
    endTimestampKey: 'media_session_end_time',
    contentIdKey: 'content_id',
    contentTitleKey: 'content_title',
    mediaTimeSpentKey: 'media_time_spent',
    contentTimeSpentKey: 'media_content_time_spent',
    contentCompleteKey: 'media_content_complete',
    totalSegmentsKey: 'media_session_segment_total',
    totalAdTimeSpentKey: 'media_total_ad_time_spent',
    adTimeSpentRateKey: 'media_ad_time_spent_rate',
    totalAdsKey: 'media_session_ad_total',
    adIDsKey: 'media_session_ad_objects',
    // Ad Summary Attributes
    adBreakIdKey: 'ad_break_id',
    adContentIdKey: 'ad_content_id',
    adContentStartTimestampKey: 'ad_content_start_time',
    adContentEndTimestampKey: 'ad_content_end_time',
    adContentTitleKey: 'ad_content_title',
    adContentSkippedKey: 'ad_skipped',
    adContentCompletedKey: 'ad_completed',
    // Segment Summary Attributes
    segmentIndexKey: 'segment_index',
    segmentTitleKey: 'segment_title',
    segmentStartTimestampKey: 'segment_start_time',
    segmentEndTimestampKey: 'segment_end_time',
    segmentTimeSpentKey: 'media_segment_time_spent',
    segmentSkippedKey: 'segment_skipped',
    segmentCompletedKey: 'segment_completed',
};

var uuid = function () {
    // Thanks to StackOverflow user Briguy37
    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
var getNameFromType = function (type) {
    return MediaEventName[MediaEventType[type]];
};

/**
 * Represents a Base event for mParticle Core
 */
var BaseEvent = /** @class */ (function () {
    /**
     *
     * @param name The name of the event
     * @param eventType an Event Type that corresponds to [EventType](https://github.com/mParticle/mparticle-web-sdk/blob/master/src/types.js) in Core SDK
     * @param messageType A message type that corresponds to MessageType
     */
    function BaseEvent(name, eventType, messageType) {
        this.name = name;
        this.eventType = eventType;
        this.messageType = messageType;
    }
    return BaseEvent;
}());
/**
 * Represents a single media event. Generally you won't call this class directly. The Media SDK calls this class internally when you invoke methods on [[MediaSession]].
 *
 * ## Custom Attributes
 * By default, a `MediaEvent` will have certain required attributes,
 * such as `custom_media_id` and `custom_media_title`, etc. However,
 * if you need to log something custom, such as `content_season_number`
 * or `player_name`, this can be included in the `customAttributes` object .
 *
 * These `customAttributes` are attributes unique to the media event
 * but can be passed through the `MediaSession` via the various log
 * functions as an `options` parameter.
 */
var MediaEvent = /** @class */ (function (_super) {
    __extends(MediaEvent, _super);
    /**
     * Constructor for Media Event
     * @param type Type of action being performed, i.e. play, pause, seek, etc.
     * @param contentTitle Title of the Media Content
     * @param contentId Unique Identifier for the Media Content
     * @param duration Length of time for the Media Content
     * @param contentType Content Type. i.e. video vs audio
     * @param streamType Stream Type i.e. live vs on demand
     * @param mediaSessionID Session ID from media Session
     * @param customAttributes A dictionary of custom attributes
     * @returns An instance of a Media Event
     */
    function MediaEvent(eventType, contentTitle, contentId, duration, contentType, streamType, mediaSessionID, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, getNameFromType(eventType), eventType, MessageType.Media) || this;
        _this.eventType = eventType;
        _this.contentTitle = contentTitle;
        _this.contentId = contentId;
        _this.duration = duration;
        _this.contentType = contentType;
        _this.streamType = streamType;
        _this.mediaSessionID = mediaSessionID;
        _this.options = options;
        _this.id = uuid();
        /**
         * @hidden Returns custom attributes
         */
        _this.getCustomAttributes = function () {
            return _this.options.customAttributes;
        };
        /**
         * @hidden Returns session related event attributes
         */
        _this.getSessionAttributes = function () {
            var sessionAttributes = {
                content_title: _this.contentTitle,
                content_duration: _this.duration,
                content_id: _this.contentId,
                content_type: MediaContentType[_this.contentType],
                stream_type: MediaStreamType[_this.streamType],
                media_session_id: _this.mediaSessionID,
            };
            if (typeof _this.playheadPosition === 'number') {
                sessionAttributes[ValidMediaAttributeKeys.playheadPosition] = _this.playheadPosition;
            }
            return sessionAttributes;
        };
        /**
         * @hidden Representation of the Media Event as a Custom Event
         */
        _this.getEventAttributes = function () {
            var eventAttributes = {};
            if (_this.seekPosition) {
                eventAttributes[ValidMediaAttributeKeys.seekPosition] = _this.seekPosition;
            }
            if (_this.bufferDuration) {
                eventAttributes[ValidMediaAttributeKeys.bufferDuration] = _this.bufferDuration;
            }
            if (_this.bufferPercent) {
                eventAttributes[ValidMediaAttributeKeys.bufferPercent] = _this.bufferPercent;
            }
            if (_this.bufferPosition) {
                eventAttributes[ValidMediaAttributeKeys.bufferPosition] = _this.bufferPosition;
            }
            // QoS
            if (_this.qos) {
                if (typeof _this.qos.bitRate === 'number') {
                    eventAttributes[ValidMediaAttributeKeys.qosBitrate] = _this.qos.bitRate;
                }
                if (typeof _this.qos.fps === 'number') {
                    eventAttributes[ValidMediaAttributeKeys.qosFramesPerSecond] = _this.qos.fps;
                }
                if (typeof _this.qos.startupTime === 'number') {
                    eventAttributes[ValidMediaAttributeKeys.qosStartupTime] = _this.qos.startupTime;
                }
                if (typeof _this.qos.droppedFrames === 'number') {
                    eventAttributes[ValidMediaAttributeKeys.qosDroppedFrames] = _this.qos.droppedFrames;
                }
            }
            // Ad Content
            if (_this.adContent) {
                if (_this.adContent.title) {
                    eventAttributes[ValidMediaAttributeKeys.adTitle] = _this.adContent.title;
                }
                if (_this.adContent.id) {
                    eventAttributes[ValidMediaAttributeKeys.adId] = _this.adContent.id;
                }
                if (_this.adContent.advertiser) {
                    eventAttributes[ValidMediaAttributeKeys.adAdvertiserId] = _this.adContent.advertiser;
                }
                if (_this.adContent.siteid) {
                    eventAttributes[ValidMediaAttributeKeys.adSiteId] = _this.adContent.siteid;
                }
                if (typeof _this.adContent.placement === 'string') {
                    eventAttributes[ValidMediaAttributeKeys.adPlacement] = _this.adContent.placement;
                }
                if (typeof _this.adContent.position === 'number') {
                    eventAttributes[ValidMediaAttributeKeys.adPosition] = _this.adContent.position;
                }
                if (_this.adContent.duration) {
                    eventAttributes[ValidMediaAttributeKeys.adDuration] = _this.adContent.duration;
                }
                if (_this.adContent.creative) {
                    eventAttributes[ValidMediaAttributeKeys.adCreative] = _this.adContent.creative;
                }
                if (_this.adContent.campaign) {
                    eventAttributes[ValidMediaAttributeKeys.adCampaign] = _this.adContent.campaign;
                }
            }
            // Ad Break
            if (_this.adBreak) {
                if (_this.adBreak.id) {
                    eventAttributes[ValidMediaAttributeKeys.adBreakId] = _this.adBreak.id;
                }
                if (_this.adBreak.title) {
                    eventAttributes[ValidMediaAttributeKeys.adBreakTitle] = _this.adBreak.title;
                }
                if (_this.adBreak.duration) {
                    eventAttributes[ValidMediaAttributeKeys.adBreakDuration] = _this.adBreak.duration;
                }
            }
            // Segments
            if (_this.segment) {
                if (_this.segment.title) {
                    eventAttributes[ValidMediaAttributeKeys.segmentTitle] = _this.segment.title;
                }
                if (_this.segment.index) {
                    eventAttributes[ValidMediaAttributeKeys.segmentIndex] = _this.segment.index;
                }
                if (_this.segment.duration) {
                    eventAttributes[ValidMediaAttributeKeys.segmentDuration] = _this.segment.duration;
                }
            }
            return eventAttributes;
        };
        /**
         * Returns a dictionary of attributes
         * @returns Object
         */
        _this.getAttributes = function () {
            return __assign(__assign(__assign({}, _this.getSessionAttributes()), _this.getEventAttributes()), _this.getCustomAttributes());
        };
        /**
         * Representation of the Media Event as a Page Event for the core SDK
         * @returns Object
         */
        _this.toPageEvent = function () {
            return {
                name: _this.name,
                eventType: EventType.Media,
                messageType: MessageType.PageEvent,
                data: _this.getAttributes(),
            };
        };
        /**
         * @hidden Representation of the Media Event for the server model
         */
        _this.toEventAPIObject = function () {
            return {
                // Core Event Attributes
                EventName: _this.name,
                EventCategory: _this.eventType,
                EventDataType: _this.messageType,
                AdContent: _this.adContent,
                AdBreak: _this.adBreak,
                Segment: _this.segment,
                SeekPosition: _this.seekPosition,
                BufferDuration: _this.bufferDuration,
                BufferPercent: _this.bufferPercent,
                BufferPosition: _this.bufferPosition,
                PlayheadPosition: _this.playheadPosition,
                QoS: _this.qos,
                ContentTitle: _this.contentTitle,
                ContentId: _this.contentId,
                Duration: _this.duration,
                ContentType: MediaContentType[_this.contentType],
                StreamType: MediaStreamType[_this.streamType],
                EventAttributes: _this.options.customAttributes,
            };
        };
        _this.playheadPosition = options === null || options === void 0 ? void 0 : options.currentPlayheadPosition;
        _this.customAttributes = options === null || options === void 0 ? void 0 : options.customAttributes;
        return _this;
    }
    return MediaEvent;
}(BaseEvent));

/**
 * The MediaSession class is the primary class that will be used to engage with the mParticle Media SDK.
 *
 * # Usage
 * ## MediaSession Instance
 *
 * ```javascript
 * const mediaSession = new MediaSession(
 *   mParticle,                    // mParticle SDK Instance
 *   '1234567',                    // Custom media ID
 *   'Funny Internet cat video',   // Custom media Title
 *   120000,                       // Duration in milliseconds
 *   'Video',                      // Content Type (Video or Audio)
 *   'OnDemand'                    // Stream Type (OnDemand, Live, etc.)
 *   true,                         // Log Page Event Toggle (true/false)
 *   true,                         // Log Media Event Toggle (true/false)
 *   {                             // (optional) Custom Attributes object used for each media event within the Media Session
 *     mediaSessionAttribute1: 'value1',
 *     mediaSessionAttribute2: 'value2'
 *   };
 * )
 * ```
 *
 * ## Logging Events
 *
 * Once initiated, a [[MediaSession]] provides various log methods
 * that will trigger a [[MediaEvent]].
 *
 * ```javascript
 * mediaSession.logMediaSessionStart();
 * mediaSession.logPlay();
 * ```
 *
 * ## Custom Attributes
 * By default, a `MediaEvent` will have certain required attributes,
 * such as `custom_media_id` and `custom_media_title`, etc. However,
 * if you require to log something custom, such as `content_season_number`
 * or `player_name`, this can be added to `customAttributes`.
 *
 * These `customAttributes` are attributes unique to the media event
 * but can be passed through the `MediaSession` via the various log
 * functions as an `options` parameter.
 *
 * ```javascript
 * const customAttributes = {
 *     content_season: 3,
 *     content_episode: 26,
 *     content_episode_name: 'The Best of Both Worlds',
 * };
 *
 * mediaSession.logPlay({ options: currentAttributes })
 * ```
 */
var MediaSession = /** @class */ (function () {
    /**
     * Initializes the Media Session object. This does not start a session, you can do so by calling `logMediaSessionStart`.
     * @param mparticleInstance Your mParticle global object
     * @param contentId A unique identifier for your media content
     * @param title The title of your media content
     * @param duration The length of time for the complete media content (not including ads or breaks)
     * @param contentType A descriptor for the type of content, i.e. Audio or Video
     * @param streamType A descriptor for the type of stream, i.e. live or on demand
     * @param logPageEvent A flag that toggles sending mParticle Events to Core SDK
     * @param logMediaEvent A flag that toggles sending Media Events to Core SDK
     * @param mediaSessionAttributes (optional) A set of custom attributes to attach to all media Events created by a Session
     */
    function MediaSession(mparticleInstance, contentId, title, duration, contentType, streamType, logPageEvent, logMediaEvent, mediaSessionAttributes) {
        if (logPageEvent === void 0) { logPageEvent = false; }
        if (logMediaEvent === void 0) { logMediaEvent = true; }
        this.mparticleInstance = mparticleInstance;
        this.contentId = contentId;
        this.title = title;
        this.duration = duration;
        this.contentType = contentType;
        this.streamType = streamType;
        this.logPageEvent = logPageEvent;
        this.logMediaEvent = logMediaEvent;
        this.mediaSessionAttributes = mediaSessionAttributes;
        this._sessionId = '';
        this.currentQoS = {
            startupTime: 0,
            fps: 0,
            bitRate: 0,
            droppedFrames: 0,
        };
        this.customAttributes = {};
        this.mediaSessionStartTimestamp = Date.now(); //Timestamp created on logMediaSessionStart event
        this.mediaSessionEndTimestamp = Date.now(); //Timestamp updated when any event is loggged
        this.storedPlaybackTime = 0; //On Pause calculate playback time and clear currentPlaybackTime
        this.mediaContentCompleteLimit = 100; //Percentage of content that must be progressed through to mark as completed
        this.mediaContentComplete = false; //Updates to true triggered by logMediaContentEnd, 0 or false if complete milestone not reached.
        this.mediaSessionSegmentTotal = 0; //number incremented with each logSegmentStart
        this.mediaTotalAdTimeSpent = 0; //total second sum of ad break time spent
        this.mediaSessionAdTotal = 0; //number of ads played in the media session - increment on logAdStart
        this.mediaSessionAdObjects = []; //array of unique identifiers for ads played in the media session - append ad_content_ID on logAdStart
        this.sessionSummarySent = false; // Ensures we only send the summary event once
        this.listenerCallback = function () { };
        this.mediaSessionStartTimestamp = Date.now();
    }
    Object.defineProperty(MediaSession.prototype, "sessionId", {
        get: function () {
            return this._sessionId;
        },
        enumerable: false,
        configurable: true
    });
    MediaSession.prototype.mediaTimeSpent = function () {
        return this.mediaSessionEndTimestamp - this.mediaSessionStartTimestamp;
    };
    MediaSession.prototype.mediaContentTimeSpent = function () {
        if (this.currentPlaybackStartTimestamp) {
            return (this.storedPlaybackTime +
                (Date.now() - this.currentPlaybackStartTimestamp));
        }
        else {
            return this.storedPlaybackTime;
        }
    };
    MediaSession.prototype.mediaAdTimeSpentRate = function () {
        return ((this.mediaTotalAdTimeSpent / this.mediaContentTimeSpent()) * 100);
    };
    /**
     * Creates a base Media Event
     * @param eventType
     * @param customAttributes
     */
    MediaSession.prototype.createMediaEvent = function (eventType, options) {
        if (options === void 0) { options = {}; }
        // Set event option based on options or current state
        this.currentPlayheadPosition =
            (options === null || options === void 0 ? void 0 : options.currentPlayheadPosition) || this.currentPlayheadPosition;
        // Merge Session Attributes with any other optional Event Attributes.
        // Event-Level Custom Attributes will override Session Custom Attributes if there is a collison.
        this.customAttributes = __assign(__assign({}, this.mediaSessionAttributes), ((options === null || options === void 0 ? void 0 : options.customAttributes) || {}));
        options = {
            currentPlayheadPosition: this.currentPlayheadPosition,
            customAttributes: this.customAttributes,
        };
        return new MediaEvent(eventType, this.title, this.contentId, this.duration, this.contentType, this.streamType, this.sessionId, options);
    };
    /**
     * Sends MediaEvent to CoreSDK depending on if [logMediaEvent] or [logPageEvent] are set
     * @param event MediaEvent
     */
    MediaSession.prototype.logEvent = function (event) {
        this.mediaSessionEndTimestamp = Date.now();
        if (this.mediaContentCompleteLimit !== 100) {
            if (this.duration &&
                this.currentPlayheadPosition &&
                this.currentPlayheadPosition / this.duration >=
                    this.mediaContentCompleteLimit / 100) {
                this.mediaContentComplete = true;
            }
        }
        this.mediaEventListener(event);
        if (this.logMediaEvent) {
            this.mparticleInstance.logBaseEvent(event);
        }
        if (this.logPageEvent) {
            if (event.eventType !== MediaEventType.UpdatePlayheadPosition) {
                var mpEvent = event.toPageEvent();
                this.mparticleInstance.logBaseEvent(mpEvent);
            }
        }
    };
    /**
     * Returns QoS attributes as a flat object
     */
    MediaSession.prototype.getQoSAttributes = function () {
        var result = {};
        if (this.currentQoS.bitRate) {
            result.qos_bitrate = this.currentQoS.bitRate;
        }
        if (this.currentQoS.startupTime) {
            result.qos_startup_time = this.currentQoS.startupTime;
        }
        if (this.currentQoS.fps) {
            result.qos_fps = this.currentQoS.fps;
        }
        if (this.currentQoS.droppedFrames) {
            result.qos_dropped_frames = this.currentQoS.droppedFrames;
        }
        return result;
    };
    /**
     * Returns session attributes as a flat object
     */
    MediaSession.prototype.getAttributes = function () {
        var attributes = {
            content_title: this.title,
            content_duration: this.duration,
            content_id: this.contentId,
            content_type: MediaContentType[this.contentType],
            stream_type: MediaStreamType[this.streamType],
            media_session_id: this.sessionId,
        };
        if (this.currentPlayheadPosition) {
            attributes['playhead_position'] = this.currentPlayheadPosition;
        }
        return attributes;
    };
    /**
     * Starts your media session. Should be triggered before any prerolls or ads
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logMediaSessionStart = function (options) {
        this._sessionId = uuid();
        this.mediaSessionStartTimestamp = Date.now();
        var event = this.createMediaEvent(MediaEventType.SessionStart, options);
        this.logEvent(event);
    };
    /**
     * Ends your media session. Should be triggered after all ads and content have been completed
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logMediaSessionEnd = function (options) {
        var event = this.createMediaEvent(MediaEventType.SessionEnd, options);
        this.logEvent(event);
        this.logSessionSummary();
    };
    /**
     * Logs when your media content has ended, usually before a post-roll ad.
     * Must be fired between MediaSessionStart and MediaSessionEnd
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logMediaContentEnd = function (options) {
        this.mediaContentComplete = true;
        var event = this.createMediaEvent(MediaEventType.ContentEnd, options);
        this.logEvent(event);
    };
    /**
     * Logs when an Ad Break pod has started
     * @param adBreakContent An object representing an [[AdBreak]] (collection of ads)
     * @param options Optional Custom Attributes
     * @category Advertising
     */
    MediaSession.prototype.logAdBreakStart = function (adBreakContent, options) {
        this.adBreak = adBreakContent;
        var event = this.createMediaEvent(MediaEventType.AdBreakStart, options);
        event.adBreak = adBreakContent;
        this.logEvent(event);
    };
    /**
     * Logs when an [[AdBreak]] pod has ended
     * @param options Optional Custom Attributes
     * @category Advertising
     */
    MediaSession.prototype.logAdBreakEnd = function (options) {
        var event = this.createMediaEvent(MediaEventType.AdBreakEnd, options);
        event.adBreak = this.adBreak;
        this.logEvent(event);
        this.adBreak = undefined;
    };
    /**
     * Logs when a single ad plays
     * @param adContent An object representing a single Ad
     * @param options Optional Custom Attributes
     * @category Advertising
     */
    MediaSession.prototype.logAdStart = function (adContent, options) {
        this.mediaSessionAdTotal += 1;
        this.mediaSessionAdObjects.push(adContent.id);
        this.adContent = adContent;
        this.adContent.adStartTimestamp = Date.now();
        var event = this.createMediaEvent(MediaEventType.AdStart, options);
        event.adContent = adContent;
        this.logEvent(event);
    };
    /**
     * Logs when a single ad ends
     * @param options Optional Custom Attributes
     * @category Advertising
     */
    MediaSession.prototype.logAdEnd = function (options) {
        var _a;
        if ((_a = this.adContent) === null || _a === void 0 ? void 0 : _a.adStartTimestamp) {
            this.adContent.adEndTimestamp = Date.now();
            this.adContent.adCompleted = true;
            this.adContent.adSkipped = false;
            this.mediaTotalAdTimeSpent +=
                this.adContent.adEndTimestamp -
                    this.adContent.adStartTimestamp;
        }
        var event = this.createMediaEvent(MediaEventType.AdEnd, options);
        event.adContent = this.adContent;
        this.logEvent(event);
        this.logAdSummary();
    };
    /**
     * Logs when a single ad is skipped by a visitor
     * @param options Optional Custom Attributes
     * @category Advertising
     */
    MediaSession.prototype.logAdSkip = function (options) {
        var _a;
        if ((_a = this.adContent) === null || _a === void 0 ? void 0 : _a.adStartTimestamp) {
            this.adContent.adEndTimestamp = Date.now();
            this.adContent.adSkipped = true;
            this.adContent.adCompleted = false;
            this.mediaTotalAdTimeSpent +=
                this.adContent.adEndTimestamp -
                    this.adContent.adStartTimestamp;
        }
        var event = this.createMediaEvent(MediaEventType.AdSkip, options);
        event.adContent = this.adContent;
        this.logEvent(event);
        this.logAdSummary();
    };
    /**
     * Logs when a single ad is clicked on by a visitor
     * @param options Optional Custom Attributes
     * @category Advertising
     */
    MediaSession.prototype.logAdClick = function (adContent, options) {
        this.adContent = adContent;
        var event = this.createMediaEvent(MediaEventType.AdClick, options);
        event.adContent = this.adContent;
        this.logEvent(event);
    };
    /**
     * Logs the start of a buffering event
     * @param bufferDuration The duration of a buffering event
     * @param bufferPercent The percent that has been buffered
     * @param bufferPosition The playhead position of the buffering event
     * @param options Optional Custom Attributes
     * @category Buffering
     */
    MediaSession.prototype.logBufferStart = function (bufferDuration, bufferPercent, bufferPosition, options) {
        var event = this.createMediaEvent(MediaEventType.BufferStart, options);
        event.bufferDuration = bufferDuration;
        event.bufferPercent = bufferPercent;
        event.bufferPosition = bufferPosition;
        this.logEvent(event);
    };
    /**
     * Logs the end of a buffering event
     * @param bufferDuration The duration of a buffering event
     * @param bufferPercent The percent that has been buffered
     * @param bufferPosition The playhead position of the buffering event
     * @param options Optional Custom Attributes
     * @category Buffering
     */
    MediaSession.prototype.logBufferEnd = function (bufferDuration, bufferPercent, bufferPosition, options) {
        var event = this.createMediaEvent(MediaEventType.BufferEnd, options);
        event.bufferDuration = bufferDuration;
        event.bufferPercent = bufferPercent;
        event.bufferPosition = bufferPosition;
        this.logEvent(event);
    };
    /**
     * Logs a play event
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logPlay = function (options) {
        if (!this.currentPlaybackStartTimestamp) {
            this.currentPlaybackStartTimestamp = Date.now();
        }
        var event = this.createMediaEvent(MediaEventType.Play, options);
        this.logEvent(event);
    };
    /**
     * Logs a pause event
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logPause = function (options) {
        if (this.currentPlaybackStartTimestamp) {
            this.storedPlaybackTime =
                this.storedPlaybackTime +
                    (Date.now() - this.currentPlaybackStartTimestamp);
            this.currentPlaybackStartTimestamp = undefined;
        }
        var event = this.createMediaEvent(MediaEventType.Pause, options);
        this.logEvent(event);
    };
    /**
     * Logs the start of a Segment or Chapter
     * @param segment An object representing a segment or chapter of content
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logSegmentStart = function (segment, options) {
        this.mediaSessionSegmentTotal += 1;
        segment.segmentStartTimestamp = Date.now();
        this.segment = segment;
        var event = this.createMediaEvent(MediaEventType.SegmentStart, options);
        event.segment = segment;
        this.logEvent(event);
    };
    /**
     * Logs the end of a Segment or Chapter
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logSegmentEnd = function (options) {
        var _a;
        if ((_a = this.segment) === null || _a === void 0 ? void 0 : _a.segmentStartTimestamp) {
            this.segment.segmentEndTimestamp = Date.now();
            this.segment.segmentCompleted = true;
            this.segment.segmentSkipped = false;
        }
        var event = this.createMediaEvent(MediaEventType.SegmentEnd, options);
        event.segment = this.segment;
        this.logEvent(event);
        this.logSegmentSummary();
    };
    /**
     * Logs when a visitor skips a Segment or Chapter
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logSegmentSkip = function (options) {
        var _a;
        if ((_a = this.segment) === null || _a === void 0 ? void 0 : _a.segmentStartTimestamp) {
            this.segment.segmentEndTimestamp = Date.now();
            this.segment.segmentSkipped = true;
            this.segment.segmentCompleted = false;
        }
        var event = this.createMediaEvent(MediaEventType.SegmentSkip, options);
        event.segment = this.segment;
        this.logEvent(event);
        this.logSegmentSummary();
    };
    /**
     * Logs when a visitor starts seeking
     * @param seekPosition the desired playhead position
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logSeekStart = function (seekPosition, options) {
        var event = this.createMediaEvent(MediaEventType.SeekStart, options);
        event.seekPosition = seekPosition;
        this.logEvent(event);
    };
    /**
     * Logs when a visitor stops seeking
     * @param seekPosition the desired playhead position
     * @param options Optional Custom Attributes
     * @category Media
     */
    MediaSession.prototype.logSeekEnd = function (seekPosition, options) {
        var event = this.createMediaEvent(MediaEventType.SeekEnd, options);
        event.seekPosition = seekPosition;
        this.logEvent(event);
    };
    /**
     * Logs when the playhead position is updated
     * @param playheadPosition The updated playhead position
     * @category Media
     */
    MediaSession.prototype.logPlayheadPosition = function (playheadPosition) {
        this.currentPlayheadPosition = playheadPosition;
        var event = this.createMediaEvent(MediaEventType.UpdatePlayheadPosition);
        event.playheadPosition = playheadPosition;
        this.logEvent(event);
    };
    /**
     * Logs an update in the Quality of Service
     * @param qos An object representing QoS
     * @param options Optional Custom Attributes
     * @category Quality of Service
     */
    MediaSession.prototype.logQoS = function (qos, options) {
        this.currentQoS = __assign(__assign({}, this.currentQoS), qos);
        var event = this.createMediaEvent(MediaEventType.UpdateQoS, options);
        event.qos = __assign({}, this.currentQoS);
        this.logEvent(event);
    };
    /**
     * Creates a Custom Page Event which can then be passed into
     * Core SDK as an event
     *
     * ```typescript
     * const customMPEvent = MediaSession.createPageEvent(
     *     'My Custom Event',
     * .   {
     *        "custom-property": "custom-value"
     *     }
     * );
     *
     * mParticle.logEvent(customMPEvent);
     * ```
     *
     * returns a Custom Page Event
     * @param eventName The name of your custom event
     * @param attributes An Attribute Key/Value pair
     */
    MediaSession.prototype.createPageEvent = function (eventName, attributes) {
        return {
            name: eventName,
            eventType: EventType.Media,
            messageType: MessageType.PageEvent,
            data: __assign(__assign(__assign({}, this.getAttributes()), this.getQoSAttributes()), attributes),
        };
    };
    Object.defineProperty(MediaSession.prototype, "mediaEventListener", {
        /**
         * Subscribes your Media Session to an array of [[MediaEventType]] and fires a
         * callback when they are triggered
         *
         * ```typescript
         * const mediaSession = new MediaSession(
         *     mParticle,
         *     title = "Media Title"
         *     contentId = "123"
         *     duration = 1000
         *     streamType = StreamType.LiveStream
         *     contentType = ContentType.Video
         *
         *     logPageEvents = false              //optional, defaults to false anyway
         *     logMediaEvents = false             //optional, defaults to false anyway
         *     sessionCustomEvents = {}           //optional, defaults to empty object
         * );
         *
         * const myCallback = (event: MediaEvent): void => {
         *     // Some custom callback method defined by user
         *     // Should only trigger when play or pause is fired
         *     if (
         *         event.type == MediaEventType.Play ||
         *         event.type == MediaEventType.Pause
         *     ) {
         *         const mpEvent = mediaEvent.toPageEvent();
         *         mParticle.getInstance().logEvent(mpEvent);
         *     }
         * }
         *
         * mediaSession.mediaEventListener(myCallback);
         *
         * ```
         * @param eventTypes An Array of MediaEventTypes that are being subscribed to
         * @param callback A callback function
         */
        get: function () {
            return this.listenerCallback;
        },
        set: function (callback) {
            this.listenerCallback = callback;
        },
        enumerable: false,
        configurable: true
    });
    MediaSession.prototype.logSessionSummary = function () {
        if (!this.sessionSummarySent) {
            if (!this.mediaSessionEndTimestamp) {
                this.mediaSessionEndTimestamp = Date.now();
            }
            // tslint:disable-next-line: no-any
            var customAttributes = {};
            customAttributes[ValidMediaAttributeKeys.mediaSessionIdKey] = this.sessionId;
            customAttributes[ValidMediaAttributeKeys.startTimestampKey] = this.mediaSessionStartTimestamp;
            customAttributes[ValidMediaAttributeKeys.endTimestampKey] = this.mediaSessionEndTimestamp;
            customAttributes[ValidMediaAttributeKeys.contentIdKey] = this.contentId;
            customAttributes[ValidMediaAttributeKeys.contentTitleKey] = this.title;
            customAttributes[ValidMediaAttributeKeys.mediaTimeSpentKey] = this.mediaTimeSpent();
            customAttributes[ValidMediaAttributeKeys.contentTimeSpentKey] = this.mediaContentTimeSpent();
            customAttributes[ValidMediaAttributeKeys.contentCompleteKey] = this.mediaContentComplete;
            customAttributes[ValidMediaAttributeKeys.totalSegmentsKey] = this.mediaSessionSegmentTotal;
            customAttributes[ValidMediaAttributeKeys.totalAdTimeSpentKey] = this.mediaTotalAdTimeSpent;
            customAttributes[ValidMediaAttributeKeys.adTimeSpentRateKey] = this.mediaAdTimeSpentRate();
            customAttributes[ValidMediaAttributeKeys.totalAdsKey] = this.mediaSessionAdTotal;
            customAttributes[ValidMediaAttributeKeys.adIDsKey] = this.mediaSessionAdObjects;
            var options = {
                currentPlayheadPosition: this.currentPlayheadPosition,
                customAttributes: customAttributes,
            };
            var summaryEvent = this.createMediaEvent(MediaEventType.SessionSummary, options);
            this.logEvent(summaryEvent);
            this.sessionSummarySent = true;
        }
    };
    MediaSession.prototype.logSegmentSummary = function () {
        var _a;
        if ((_a = this.segment) === null || _a === void 0 ? void 0 : _a.segmentStartTimestamp) {
            if (!this.segment.segmentEndTimestamp) {
                this.segment.segmentEndTimestamp = Date.now();
            }
            // tslint:disable-next-line: no-any
            var customAttributes = {};
            customAttributes[ValidMediaAttributeKeys.mediaSessionIdKey] = this.sessionId;
            customAttributes[ValidMediaAttributeKeys.contentId] = this.contentId;
            customAttributes[ValidMediaAttributeKeys.segmentIndexKey] = this.segment.index;
            customAttributes[ValidMediaAttributeKeys.segmentTitleKey] = this.segment.title;
            customAttributes[ValidMediaAttributeKeys.segmentStartTimestampKey] = this.segment.segmentStartTimestamp;
            customAttributes[ValidMediaAttributeKeys.segmentEndTimestampKey] = this.segment.segmentEndTimestamp;
            customAttributes[ValidMediaAttributeKeys.segmentTimeSpentKey] =
                this.segment.segmentEndTimestamp -
                    this.segment.segmentStartTimestamp;
            customAttributes[ValidMediaAttributeKeys.segmentSkippedKey] = this.segment.segmentSkipped;
            customAttributes[ValidMediaAttributeKeys.segmentCompletedKey] = this.segment.segmentCompleted;
            var options = {
                currentPlayheadPosition: this.currentPlayheadPosition,
                customAttributes: customAttributes,
            };
            var summaryEvent = this.createMediaEvent(MediaEventType.SegmentSummary, options);
            this.logEvent(summaryEvent);
        }
        this.segment = undefined;
    };
    MediaSession.prototype.logAdSummary = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        if (this.adContent) {
            if (this.adContent.adStartTimestamp &&
                !this.adContent.adEndTimestamp) {
                this.adContent.adEndTimestamp = Date.now();
                this.mediaTotalAdTimeSpent +=
                    this.adContent.adEndTimestamp -
                        this.adContent.adStartTimestamp;
            }
            // tslint:disable-next-line: no-any
            var customAttributes = {};
            customAttributes[ValidMediaAttributeKeys.mediaSessionIdKey] = this.sessionId;
            customAttributes[ValidMediaAttributeKeys.adBreakIdKey] = (_a = this.adBreak) === null || _a === void 0 ? void 0 : _a.id;
            customAttributes[ValidMediaAttributeKeys.adContentIdKey] = (_b = this.adContent) === null || _b === void 0 ? void 0 : _b.id;
            customAttributes[ValidMediaAttributeKeys.adContentStartTimestampKey] = (_c = this.adContent) === null || _c === void 0 ? void 0 : _c.adStartTimestamp;
            customAttributes[ValidMediaAttributeKeys.adContentEndTimestampKey] = (_d = this.adContent) === null || _d === void 0 ? void 0 : _d.adEndTimestamp;
            customAttributes[ValidMediaAttributeKeys.adContentTitleKey] = (_e = this.adContent) === null || _e === void 0 ? void 0 : _e.title;
            customAttributes[ValidMediaAttributeKeys.adContentSkippedKey] = (_f = this.adContent) === null || _f === void 0 ? void 0 : _f.adSkipped;
            customAttributes[ValidMediaAttributeKeys.adContentCompletedKey] = (_g = this.adContent) === null || _g === void 0 ? void 0 : _g.adCompleted;
            var options = {
                currentPlayheadPosition: this.currentPlayheadPosition,
                customAttributes: customAttributes,
            };
            var summaryEvent = this.createMediaEvent(MediaEventType.AdSummary, options);
            this.logEvent(summaryEvent);
        }
        this.adContent = undefined;
    };
    return MediaSession;
}());

module.exports = MediaSession;

},{}],"www.vandenborre.be.demo.js":[function(require,module,exports) {
"use strict";

var _webSdk = _interopRequireDefault(require("@mparticle/web-sdk"));

var _webAppboyKit = _interopRequireDefault(require("@mparticle/web-appboy-kit"));

var _webGoogleAnalyticsKit = _interopRequireDefault(require("@mparticle/web-google-analytics-kit"));

var _webIntercomKit = _interopRequireDefault(require("@mparticle/web-intercom-kit"));

var _webMediaSdk = _interopRequireDefault(require("@mparticle/web-media-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var WEBKEY = localStorage.mpKey || "us2-5844b462fde9e846af3c4ed52516e61a"; // Configure mParticle as needed for your project

var mParticleConfig = {
  isDevelopmentMode: true,
  dataPlan: {
    planId: "vb_fr",
    planVersion: 1
  },
  identityCallback: function identityCallback(e) {
    e.getUser();
  }
}; // Initialize mParticle

_webSdk.default.init('us2-5844b462fde9e846af3c4ed52516e61a', mParticleConfig);

var host = "www.vandenborre.be";
var sub_nav_class = "js-level-2-container level-2-container";
var super_nav_class = "box level-1-content js-level-1-content";
var product_class = "col-md-4 col-sm-4 col-xs-12  js-product-container product-container js-gtm-product-container margin-top-10-md margin-btm-10-md";
var curr_nav_class = "breadcrumbs js-breadcrumbs hidden-print  w-100";
var item_name_class = "col-xs-12 product-name";
var item_img_class = "col-xs-12 product-image";
var item_attr_class = "col-xs-12 product-attributes";
var item_price_class = "col-xs-12 product-price  has-characteristics";
var item_purchase_class = "col-xs-12 product-button-atc hidden-print";
var super_class = "margin-top-30-md";
var category_base_class = "accordion-image-grid accordion--mobile col-xs-12 col-sm-6 col-md-4 margin-btm-40-md margin-btm-20-sm";
var category_class = "accordion-header h2-title";
var subcategory_class = "margin-btm-5";
var home_nav_class = "box level-1-content js-level-1-content ";
var video_base_class = "plyr plyr--full-ui plyr--video plyr--html5 plyr--fullscreen-enabled";
var btn1_class = "plyr__controls__item plyr__control";
var personalise_class = "margin-btm-10 box curved display-block";
var background_colour = "#ffffff!important";
var button_colour = "#e62828";
var customerid = "98760824";
var email = "demo0824@mailinator.com";
var mobile = "+32488123454";
var user_profile = {};

var loginDisplay = function loginDisplay(btn) {
  var loggedInAs = _webSdk.default.Identity.getCurrentUser() ? _webSdk.default.Identity.getCurrentUser().getUserIdentities().userIdentities.email : null; //console.log(loggedInAs + " ::: " + btn.innerText);

  btn.innerText = loggedInAs ? 'Logout: Jackie (' + email + ')' : 'Log In (' + email + ')';
  loggedInAs ? btn.dataset.loggedInAs = loggedInAs : delete btn.dataset.loggedInAs;
};

function mp_login() {
  return _mp_login.apply(this, arguments);
}

function _mp_login() {
  _mp_login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _ref3,
        _ref3$email,
        email,
        _ref3$customerid,
        customerid,
        btn,
        identityRequest,
        callback,
        _args3 = arguments;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, _ref3$email = _ref3.email, email = _ref3$email === void 0 ? email : _ref3$email, _ref3$customerid = _ref3.customerid, customerid = _ref3$customerid === void 0 ? customerid : _ref3$customerid;
            btn = _args3.length > 1 ? _args3[1] : undefined;
            identityRequest = {
              userIdentities: {
                customerid: "".concat(customerid),
                email: "".concat(email),
                mobile_number: "".concat(mobile)
              }
            };

            callback = function callback(e) {
              if (e.getUser()) {
                var a = e.getUser();
                e.getPreviousUser();
                console.log("Login MPID: " + _webSdk.default.Identity.getCurrentUser().getMPID());
                var mPcookies = Object.keys(localStorage).filter(function (propertyName) {
                  return propertyName.indexOf("mprtcl") === 0;
                });
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

                var marketing_consent = _webSdk.default.Consent.createGDPRConsent(true, // Consented
                Date.now(), // Timestamp
                "marketing_agreement_v4", // Document
                "London", // Location
                "DAS:" + das // Hardware ID
                );

                var analytics_consent = _webSdk.default.Consent.createGDPRConsent(true, // Consented
                Date.now(), // Timestamp
                "analytics_agreement_v2", // Document
                "London", // Location
                "DAS:" + das // Hardware ID
                );

                var consentState = _webSdk.default.Consent.createConsentState();

                consentState.addGDPRConsentState("Marketing", marketing_consent);
                consentState.addGDPRConsentState("Analytics", analytics_consent);
                a.setConsentState(consentState);
                a.setUserAttribute("$FirstName", "Jackie");
                a.setUserAttribute("$LastName", "Chan");
                a.setUserAttribute("$Mobile", mobile);
                a.setUserAttribute("$Country", "Belgium");
                a.setUserAttribute("$City", "Brussels");
                a.setUserAttribute("Region", "Anderlecht");
                loginDisplay(btn); //personalise_banner();

                _webSdk.default.logEvent('Login', _webSdk.default.EventType.Other, {
                  "userid": _webSdk.default.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid,
                  "contact": _webSdk.default.Identity.getCurrentUser().getUserIdentities().userIdentities.email
                });
              } else {
                var t = window.mParticle.Identity.HTTPCodes;

                switch (e.httpCode) {
                  case t.noHttpCoverage:
                  case t.activeIdentityRequest:
                  case 429:
                    break;

                  case t.validationIssue:
                  case 400:
                    console.log(e.body);
                }
              }
            };

            _context3.next = 6;
            return _webSdk.default.Identity.login(identityRequest, callback);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _mp_login.apply(this, arguments);
}

function mp_logout(_x) {
  return _mp_logout.apply(this, arguments);
}

function _mp_logout() {
  _mp_logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(btn) {
    var callback;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            callback = function callback(result) {
              loginDisplay(btn); //document.evaluate('//*[contains(@class, "b4 bj")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).textContent = "Sign In";

              if (result.getUser()) {}
            };

            _webSdk.default.logEvent('Logout', _webSdk.default.EventType.Other, {
              "userid": _webSdk.default.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid,
              "email": _webSdk.default.Identity.getCurrentUser().getUserIdentities().userIdentities.email
            });

            _webSdk.default.Identity.logout({}, callback);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _mp_logout.apply(this, arguments);
}

function request_token() {
  return _request_token.apply(this, arguments);
}

function _request_token() {
  _request_token = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var e, t;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            e = {
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                client_id: "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE",
                client_secret: "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA",
                audience: "https://api.mparticle.com",
                grant_type: "client_credentials"
              }),
              mode: "cors",
              method: "POST"
            };
            _context5.next = 3;
            return fetch("https://" + host + "/oauth/token", e);

          case 3:
            _context5.next = 5;
            return _context5.sent.json();

          case 5:
            t = _context5.sent;
            localStorage.access_token = t.access_token, localStorage.token_expiration = Date.now() + 1e3 * (t.expires_in - 60);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _request_token.apply(this, arguments);
}

function request_user_profile(_x2) {
  return _request_user_profile.apply(this, arguments);
}

function _request_user_profile() {
  _request_user_profile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
    var t, a;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("User Profile MPID: " + e);
            _context6.t0 = localStorage.access_token && "" != localStorage.access_token && localStorage.token_expiration && "" != localStorage.token_expiration && !(localStorage.token_expiration < Date.now());

            if (_context6.t0) {
              _context6.next = 5;
              break;
            }

            _context6.next = 5;
            return request_token();

          case 5:
            t = "https://" + host + "/userprofile/v1/5000011/167/205/" + e + "?fields=user_identities,user_attributes,audience_memberships,attribution";
            e = {
              headers: new Headers({
                Authorization: "Bearer " + localStorage.access_token
              }),
              method: "GET"
            };
            _context6.next = 9;
            return fetch(t, e);

          case 9:
            _context6.next = 11;
            return _context6.sent.json();

          case 11:
            a = _context6.sent;
            _context6.next = 14;
            return a;

          case 14:
            user_profile = _context6.sent;

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _request_user_profile.apply(this, arguments);
}

function gtag_report_conversion(url) {
  var callback = function callback() {
    if (typeof url != 'undefined') {
      window.location = url;
    }
  };

  gtag('event', 'conversion', {
    'send_to': 'AW-380364769/l30VCO_Q3pADEOHPr7UB',
    'event_callback': callback
  });
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function fetch_o_xpath(parent_object, child_filter) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "obj";
  var attribute_name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  switch (type) {
    case "obj":
      return document.evaluate('.//*[contains(@class, "' + child_filter + '")]', parent_object, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    case "text":
      return document.evaluate('.//*[contains(@class, "' + child_filter + '")]', parent_object, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;

    case "link":
      return document.evaluate('.//*[contains(@class, "' + child_filter + '")]', parent_object, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;

    case "attribute":
      return document.evaluate('.//*[contains(@class, "' + child_filter + '")]', parent_object, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute(attribute_name);

    default:
      return document.evaluate('.//*[contains(@class, "' + child_filter + '")]', parent_object, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
}

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'AW-380364769');

function hyperlink_events() {
  //const targetNode = document.evaluate('//*[contains(@class, "' + popup_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  var targetNode = document.body;
  var b = {};
  var prev_index = 0;
  var b2 = false;
  var config = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
  };

  var callback = function callback(mutationsList, observer) {
    var _iterator = _createForOfIteratorHelper(mutationsList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var mutation = _step.value;

        //if (mutation.target.className.indexOf("box level-1-content js-level-1-content") > -1) {console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);}
        //if (mutation.type == "childList" && !b_switch && document.getElementsByClassName("WebItemBtnTitle").length > 0) {
        if (mutation.type == "childList" && mutation.target.className.indexOf(sub_nav_class) > -1) {
          var s_supercategory;

          (function () {
            console.log("Sub Nav Mutation: " + mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
            var curr_index = mutation.target.childNodes[0].className.match(/js-ajax-nav-([0-9]+)\ flex/)[1];

            if (!(curr_index in b)) {
              b[curr_index] = false;
            }

            if (curr_index != prev_index) {
              b[prev_index] = false;
            }

            var a_category_nodes = document.evaluate('//*[contains(@class, "view-all margin-top") and contains(@data-gtm-mod, "navigation")]', mutation.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var s_link = a_category_nodes.snapshotItem(0).href.match(/https:\/\/[^\/]+\/[^\/]+\/([^\/]+)/);
            s_supercategory = "Generic";

            if (s_link.length > 0) {
              var node_category = document.evaluate('//*[contains(@class, "' + home_nav_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
              var node_category_link = document.evaluate('//*[contains(@href, "' + s_link[1] + '") and contains(@data-gtm-mod, "navigation") and @data-icon]', node_category, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

              if (node_category_link.snapshotLength > 0) {
                s_supercategory = node_category_link.snapshotItem(0).innerText;
              } else {
                console.log("++++++++++Error Link+++++++++\n" + s_link[1] + " : " + document.getElementsByClassName(category_class).length);
              }
            }

            var o_links = mutation.target.getElementsByTagName("a");

            if (!b[curr_index]) {
              //console.log("++++++++++View_Category+++++++++\n" + s_supercategory + " : " + curr_index);
              for (var j = 0; j < o_links.length; j++) {
                (function (j) {
                  o_links[j].addEventListener('click', function (evt) {
                    _webSdk.default.logEvent('View_Category', _webSdk.default.EventType.Navigation, {
                      "Super_Category": s_supercategory,
                      "Category": o_links[j].innerText,
                      "Link": o_links[j].href
                    });
                  }, false);
                })(j);
              }

              b[curr_index] = true;
              prev_index = curr_index;
            }
          })();
        } //return;

      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var observer = new MutationObserver(callback);

  var callback2 = function callback2(mutationsList, observer) {
    var _iterator2 = _createForOfIteratorHelper(mutationsList),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var mutation = _step2.value;

        //if (mutation.target.className.indexOf("box level-1-content js-level-1-content") > -1) {console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);}
        if (mutation.type == "attributes" && mutation.target.className.indexOf(super_nav_class) > -1 && !b2) {
          console.log("General Mutation: " + mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
          var a_supercategory_base = document.evaluate('//*[contains(@class, "' + super_nav_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

          if (a_supercategory_base.snapshotLength > 0) {
            var o_curr_supernav = a_supercategory_base.snapshotItem(0);
            var a_superlinks = o_curr_supernav.getElementsByTagName("a");

            for (var j = 0; j < a_superlinks.length; j++) {
              (function (j) {
                a_superlinks[j].addEventListener('click', function (evt) {
                  _webSdk.default.logEvent('View_Category', _webSdk.default.EventType.Navigation, {
                    "Super_Category": a_superlinks[j].innerText,
                    "Link": a_superlinks[j].href
                  });
                });
              })(j);
            }
          }

          b2 = true;
        }

        return;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };

  var observer2 = new MutationObserver(callback2);

  if (targetNode) {
    observer.observe(targetNode, config);
    observer2.observe(targetNode, config);
  }

  console.log("Observer Starts!");
}

function mP_eCommerce_ViewDetail(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, s_action) {
  var product = _webSdk.default.eCommerce.createProduct(s_name, // Name
  s_sku, // SKU
  f_price, // Price
  i_quantity, //Quantity
  null, // Variant
  s_category, // Category
  s_brand, // Brand
  null, // Position
  null, //Coupon
  o_prod_attr // attributes
  );

  var transactionAttributes = {};
  var customAttributes = {};
  var customFlags = {};

  if (s_action == "viewdetails") {
    _webSdk.default.eCommerce.logProductAction(_webSdk.default.ProductActionType.ViewDetail, product, customAttributes, customFlags, transactionAttributes);
  } else if (s_action == "add2cart") {
    transactionAttributes = {
      Id: 'vd-' + uuidv4(),
      Revenue: f_price,
      Tax: f_price * f_tax
    };
    customAttributes = o_order_attr;

    _webSdk.default.eCommerce.logProductAction(_webSdk.default.ProductActionType.AddToCart, product, customAttributes, customFlags, transactionAttributes);
  }

  _webSdk.default.upload();
}

function mP_commerce_purchase_bind(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, s_coupon, o_prod_attr, o_order_attr, s_action) {
  var product = _webSdk.default.eCommerce.createProduct(s_name, // Name
  s_sku, // SKU
  f_price, // Price
  i_quantity, //Quantity
  null, // Variant
  s_category, // Category
  s_brand, // Brand
  null, // Position
  s_coupon, //Coupon
  o_prod_attr // attributes
  );

  var transactionAttributes = {
    Id: 'vd-' + uuidv4(),
    Revenue: f_price,
    Tax: f_price * f_tax
  };
  var customAttributes = o_order_attr;
  var customFlags = {};

  if (s_action == "cart") {
    _webSdk.default.eCommerce.logProductAction(_webSdk.default.ProductActionType.Purchase, product, customAttributes, customFlags, transactionAttributes);
  } else if (s_action == "wish") {
    _webSdk.default.eCommerce.logProductAction(_webSdk.default.ProductActionType.AddToWishlist, product, customAttributes, customFlags, transactionAttributes);
  }

  _webSdk.default.upload();
}

function mp_init() {
  var toggleLogin = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(evt) {
      var btn;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              btn = evt.currentTarget;

              if (!btn.dataset.loggedInAs) {
                _context2.next = 6;
                break;
              }

              mp_logout(btn);
              console.log("+++ Logout +++");
              _context2.next = 10;
              break;

            case 6:
              gtag_report_conversion();
              _context2.next = 9;
              return mp_login({
                customerid: customerid,
                email: email
              }, btn);

            case 9:
              setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var s_personalisation, s_email, o_personalise_base;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return request_user_profile(_webSdk.default.Identity.getCurrentUser().getMPID());

                      case 2:
                        if ("user_attributes" in user_profile && "recommended_Product" in user_profile.user_attributes && user_profile.user_attributes["recommended_Product"]) {
                          s_personalisation = user_profile.user_attributes["recommended_Product"];
                          s_email = user_profile.user_identities[1].value;
                          o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

                          if (o_personalise_base.snapshotLength > 0) {
                            o_personalise_base.snapshotItem(0).getElementsByTagName("img")[0].src = "https://demo.mp.com/img/" + s_personalisation.replaceAll(" ", "_").toLowerCase() + "_7935552.jpeg";

                            _webSdk.default.logEvent('Display_Personalisation', _webSdk.default.EventType.Other, {
                              "Personalisation_Type": "Web_GTM",
                              "Personalisation_Content": s_personalisation,
                              "Customer_Email": s_email
                            });
                          }
                        }

                        console.log(user_profile);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })), 1000);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function toggleLogin(_x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var loginBtn = document.createElement('button');
  loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 28px; width: 170px;position: fixed; right: 0px; top: 15px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour;
  loginDisplay(loginBtn);
  loginBtn.addEventListener('click', toggleLogin);
  document.body.appendChild(loginBtn); //Broom to clear mP data in localStorage

  var tmp = document.createElement('div');
  tmp.innerHTML = '<div style="position:fixed;bottom:0px;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
  document.body.appendChild(tmp.children[0]);
  var a_product_base = document.evaluate('//*[contains(@class, "' + product_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i_item = 0; i_item < a_product_base.snapshotLength; i_item++) {
    (function (i_item) {
      try {
        var curr_item = a_product_base.snapshotItem(i_item);
        var view_product_name = document.evaluate('.//*[contains(@class, "' + item_name_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var view_product_img = document.evaluate('.//*[@class="' + item_img_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var view_product_attr = document.evaluate('.//*[@class="' + item_attr_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var view_product_price = document.evaluate('.//*[@class="' + item_price_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var purchase_product_item = document.evaluate('.//*[@class="' + item_purchase_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var _o_curr_nav = document.getElementsByClassName(curr_nav_class)[0];

        var _a_categories = _o_curr_nav.getElementsByTagName("li");

        var s_subcategory = _a_categories[_a_categories.length - 1].innerText;
        var _s_category = _a_categories[_a_categories.length - 2].innerText;
        var _s_supercategory = _a_categories[_a_categories.length - 3].innerText;
        var start_date = new Date().toISOString().split("T")[0] + "T00:00:00+00:00";
        var s_name = view_product_name.snapshotItem(0) ? view_product_name.snapshotItem(0).getElementsByTagName("h3")[0].title : "Generic Product Item";
        var s_brand = s_name.split(" ")[0];
        var s_sku = curr_item.getAttribute("data-productid");
        var f_price = parseFloat(document.evaluate('.//*[contains(@class, "' + item_price_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText.split(/\s/)[1].replace(",", "."));
        var f_tax = 0.21;
        var i_quantity = 1;
        var s_coupon = null;
        var s_action = "cart";
        var a_warranties = [{
          "id": "STD",
          "name": "2 years legal warranty",
          "price": "0",
          "length": "24"
        }, {
          "id": "VBL",
          "name": "Vanden Borre Life",
          "price": "12.99",
          "length": "24"
        }, {
          "id": "MSP",
          "name": "Multimedia Service Pack",
          "price": "6.99",
          "length": "24"
        }, {
          "id": "SPW",
          "name": "Service Plus Warranty",
          "price": "12.00",
          "length": "24"
        }, {
          "id": "DRW",
          "name": "Direct Replacement Warranty",
          "price": "5.99",
          "length": "24"
        }, {
          "id": "MSI",
          "name": "Multimedia or smartphone insurance",
          "price": "2.99",
          "length": "24"
        }];
        var a_stores = [{
          "name": "Brussels-Westland",
          "id": "026"
        }, {
          "name": "Drogenbos",
          "id": "002"
        }, {
          "name": "Brussels-Ixelles",
          "id": "001"
        }, {
          "name": "Brussels-City 2",
          "id": "007"
        }, {
          "name": "Brussels-Meiser",
          "id": "010"
        }]; //let i_ind = Math.floor(Math.random() * 6);

        var i_ind = 0;
        var i_store = Math.floor(Math.random() * 5);
        var o_prod_attr = {
          "Super_Category": _s_supercategory,
          "Category": _s_category,
          "Sub_Category": s_subcategory,
          "Product_Warranty": parseInt(start_date.split("-")[0]) + 2 + start_date.substring(4, 10) + "--" + a_warranties[i_ind].id + "--" + s_name.split(" ").slice(0, 2).toString().replaceAll(",", " "),
          "Warranty_Name": a_warranties[i_ind].name
        };
        o_prod_attr[a_warranties[i_ind].id + "_Start_Date"] = start_date;
        o_prod_attr[a_warranties[i_ind].id + "_Length"] = a_warranties[i_ind].length;
        o_prod_attr[a_warranties[i_ind].id + "_End_Date"] = parseInt(start_date.split("-")[0]) + 2 + start_date.substring(4);
        var o_order_attr = {
          "Store_Name": a_stores[i_store].name,
          "Store_Id": a_stores[i_store].id,
          "Payment_Method": "Credit Card"
        };

        if (view_product_name.snapshotLength > 0) {
          s_action = "add2cart";
          view_product_name.snapshotItem(0).addEventListener('click', function (evt) {
            o_prod_attr.Link = view_product_name.snapshotItem(0).getElementsByTagName("a")[0].href;
            mP_eCommerce_ViewDetail(s_name, s_sku, _s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, "add2cart");
          }, false);
        }

        if (view_product_img.snapshotLength > 0) {
          s_action = "viewdetails";
          view_product_img.snapshotItem(0).addEventListener('click', function (evt) {
            o_prod_attr.Link = view_product_img.snapshotItem(0).getElementsByTagName("a")[0].href;
            ;
            mP_eCommerce_ViewDetail(s_name, s_sku, _s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, "viewdetails");
          }, false);
        }

        if (view_product_attr.snapshotLength > 0) {
          s_action = "add2cart";
          view_product_attr.snapshotItem(0).addEventListener('click', function (evt) {
            o_prod_attr.Link = view_product_attr.snapshotItem(0).getElementsByTagName("a")[0].href;
            ;
            mP_eCommerce_ViewDetail(s_name, s_sku, _s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, "add2cart");
          }, false);
        }

        if (purchase_product_item.snapshotLength > 0) {
          purchase_product_item.snapshotItem(0).addEventListener('click', function (evt) {
            mP_commerce_purchase_bind(s_name, s_sku, _s_category, f_price, f_tax, i_quantity, s_brand, s_coupon, o_prod_attr, o_order_attr, "cart");
          }, false);
        }
      } catch (e) {
        console.log("Index: " + i_item + "\n" + e);
      }
    })(i_item);
  }

  var a_category_base = document.evaluate('//*[contains(@class, "' + category_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var o_curr_nav = document.getElementsByClassName(curr_nav_class)[0];
  var a_categories;

  if (o_curr_nav) {
    a_categories = o_curr_nav.getElementsByTagName("li");
  }

  ;
  var s_category = "Generic";
  var s_supercategory = "Generic";

  if (a_categories && a_categories.length == 2) {
    s_supercategory = a_categories[a_categories.length - 1].innerText;
  } else if (a_categories && a_categories.length == 3) {
    s_category = a_categories[a_categories.length - 1].innerText;
    s_supercategory = a_categories[a_categories.length - 2].innerText;
  }

  for (var j_item = 0; j_item < a_category_base.snapshotLength; j_item++) {
    (function (j_item) {
      try {
        var curr_item = a_category_base.snapshotItem(j_item);
        var a_links = curr_item.getElementsByTagName("a");

        for (var j = 0; j < a_links.length; j++) {
          (function (j, curr_item) {
            if (a_categories.length == 2) {
              var a_category = document.evaluate('.//*[contains(@class, "' + category_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

              if (a_category.snapshotLength > 0) {
                s_category = a_category.snapshotItem(0).innerText;
              }

              if (a_links[j].className != "link" || j == a_links.length - 1) {
                a_links[j].addEventListener('click', function (evt) {
                  _webSdk.default.logEvent('View_Category', _webSdk.default.EventType.Navigation, {
                    "Super_Category": s_supercategory,
                    "Category": document.evaluate('.//*[contains(@class, "' + category_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText,
                    "Link": a_links[j].href
                  });
                });
              } else {
                a_links[j].addEventListener('click', function (evt) {
                  _webSdk.default.logEvent('View_Category', _webSdk.default.EventType.Navigation, {
                    "Super_Category": s_supercategory,
                    "Category": document.evaluate('.//*[contains(@class, "' + category_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText,
                    "Sub_Category": a_links[j].title,
                    "Link": a_links[j].href
                  });
                });
              }
            } else if (a_categories.length == 3) {
              a_links[j].addEventListener('click', function (evt) {
                _webSdk.default.logEvent('View_Category', _webSdk.default.EventType.Navigation, {
                  "Super_Category": s_supercategory,
                  "Category": s_category,
                  "Sub_Category": a_links[j].title,
                  "Link": a_links[j].href
                });
              });
            }
          })(j, curr_item);
        }
      } catch (e) {
        console.log("Index: " + j_item + "\n" + e);
      }
    })(j_item);
  }

  var mediaSession;
  var a_videos = document.getElementsByTagName("video");

  var _loop = function _loop(j) {
    if (a_videos[j].hasAttribute("tabindex")) {
      b_play = false;
      b_stop = false;
      b_session = false;
      mediaTitle = "Promotion Introduction";

      if (a_videos[j].parentElement.parentElement.parentElement.getElementsByClassName("ytp-title-link yt-uix-sessionlink").length > 0) {
        mediaTitle = a_videos[j].parentElement.parentElement.parentElement.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0].innerText;
      }

      mediaSession = new _webMediaSdk.default(_webSdk.default, // mParticle SDK Instance
      a_videos[j].src.split("/") > 0 ? a_videos[j].src.split("/")[a_videos[j].src.split("/").length - 1] : a_videos[j].tabindex, // Custom media ID
      mediaTitle, // Custom media Title
      a_videos[j].duration, // Duration in milliseconds
      'Video', // Content Type (Video or Audio)
      'OnDemand', // Stream Type (OnDemand, Live, etc.)
      true, // Log Page Event Toggle (true/false)
      true // Log Media Event Toggle (true/false)
      );
      mediaSession.mediaContentCompleteLimit = 0.9;
      a_videos[j].addEventListener('playing', function (event) {
        if (!b_play) {
          mediaSession.duration = a_videos[j].duration;
          var options = {
            customAttributes: {
              content_genre: 'UX Designer'
            },
            currentPlayheadPosition: a_videos[j].currentTime
          };

          if (!b_session) {
            mediaSession.logMediaSessionStart(options);
            b_session = true;
          }

          mediaSession.logPlay(options);
          b_play = true;
          b_stop = false;
        }
      });
      a_videos[j].addEventListener('pause', function (event) {
        if (!b_stop) {
          var options = {
            customAttributes: {
              content_genre: 'UX Designer'
            },
            currentPlayheadPosition: a_videos[j].currentTime
          };
          mediaSession.logPause(options);
          b_play = false;
        }
      });
      a_videos[j].addEventListener('ended', function (event) {
        var options = {
          customAttributes: {
            content_genre: 'UX Designer'
          },
          currentPlayheadPosition: a_videos[j].currentTime
        }; //mediaSession.logMediaContentEnd();

        mediaSession.logMediaSessionEnd(options);
        b_stop = true;
        b_play = false;
        b_session = false;
      });
    }
  };

  for (var j = 0; j < a_videos.length; j++) {
    var b_play;
    var b_stop;
    var b_session;
    var mediaTitle;

    _loop(j);
  }

  var worker = new Worker('https://' + host + '/service-worker.js');
  appboy.registerAppboyPushMessages();
  console.log("Event Listeners Added!");
}

function fire_campaignEvent() {
  var curr_location = decodeURI(window.location.href);
  var a_match = curr_location.match(/^https:\/\/www\.vandenborre\.be\/fr\?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);

  if (a_match && a_match.length > 0) {
    _webSdk.default.logEvent('Land_Campaign', _webSdk.default.EventType.Unknown, {
      "Landing_URL": window.location.href,
      "Subject": a_match[1],
      "Campaign_Name": a_match[2],
      "Campaign_Medium": a_match[3],
      "Publisher": a_match[4]
    });
  }

  var a_utm_match = curr_location.match(/^https:\/\/www\.vandenborre\.be\/fr\?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);

  if (a_utm_match && a_utm_match.length > 0) {
    _webSdk.default.logEvent('Land_Campaign', _webSdk.default.EventType.Unknown, {
      "Landing_URL": window.location.href,
      "Subject": a_utm_match[2],
      "Campaign_Name": a_utm_match[4],
      "Campaign_Medium": a_utm_match[1],
      "Publisher": a_utm_match[3]
    });
  }
}

function personalise_banner() {
  console.log("+++++Personalise+++++");

  if ("user_attributes" in user_profile && "recommended_Product" in user_profile.user_attributes && user_profile.user_attributes["recommended_Product"]) {
    var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (o_personalise_base.snapshotLength > 0) {
      var s_personalisation = user_profile.user_attributes["recommended_Product"];
      var s_email = user_profile.user_identities[1].value;
      var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      if (o_personalise_base.snapshotLength > 0) {
        o_personalise_base.snapshotItem(0).getElementsByTagName("img")[0].src = "https://demo.mp.com/img/" + s_personalisation.replaceAll(" ", "_").toLowerCase() + "_7935552.jpeg";

        _webSdk.default.logEvent('Deliver_Personalisation', _webSdk.default.EventType.Other, {
          "Personalisation_Type": "Web_GTM",
          "Personalisation_Content": s_personalisation,
          "Customer_Email": s_email
        });
      }

      console.log("++++++Personlisation Delivered!+++++");
    }
  }
} //if (!b_init) { window.addEventListener('load', mp_init(), true); }


document.addEventListener('DOMContentLoaded', fire_campaignEvent(), false);
setTimeout(function () {
  mp_init();
  hyperlink_events();
}, 1000);
},{"@mparticle/web-sdk":"../../node_modules/@mparticle/web-sdk/dist/mparticle.esm.js","@mparticle/web-appboy-kit":"../../node_modules/@mparticle/web-appboy-kit/dist/AppboyKit.common.js","@mparticle/web-google-analytics-kit":"../../node_modules/@mparticle/web-google-analytics-kit/dist/GoogleAnalyticsEventForwarder.common.js","@mparticle/web-intercom-kit":"../../node_modules/@mparticle/web-intercom-kit/dist/IntercomEventForwarder.common.js","@mparticle/web-media-sdk":"../../node_modules/@mparticle/web-media-sdk/dist/mparticle-media.common.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","www.vandenborre.be.demo.js"], null)
//# sourceMappingURL=/www.vandenborre.be.demo.js.map