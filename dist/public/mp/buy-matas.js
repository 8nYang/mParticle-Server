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
})({"public/mp/buy-matas.js":[function(require,module,exports) {
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
},{}]},{},["public/mp/buy-matas.js"], null)
//# sourceMappingURL=/public/mp/buy-matas.js.map