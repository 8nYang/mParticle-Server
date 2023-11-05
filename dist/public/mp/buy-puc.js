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
})({"public/mp/buy-puc.js":[function(require,module,exports) {
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
},{}]},{},["public/mp/buy-puc.js"], null)
//# sourceMappingURL=/public/mp/buy-puc.js.map