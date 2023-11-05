var express = require('express');
var buy_coin = express.Router();
var mParticle = require('mparticle');

//https://demo.mp.com/mp/buy_coin?customerid=98760603&token=220672716078290600703
//mParticle Workshop ---> easyJet ---> Custom Feed ---> eRes System
var config = new mParticle.Configuration(
    'us2-df5e5532f3db7f4b8365fb6fa1e3ad6a',
    'h0KGtAfdvVB-OFaeyV9zAnQNXXUjybgOTEQetk_lmbqOWgFetL4jfSpDJvWSz_mq');
var apiClient = new mParticle.ApiClient()
apiClient.basePath = 'https://s2s.us2.mparticle.com/v2'
var api = new mParticle.EventsApi(config, apiClient);

function random_choice(a_src) {
    var sel = Math.floor(Math.random() * a_src.length)
    return [a_src[sel], sel];
}

function weighted_random_choice(data) {
    let total = 0;
    for (let i = 0; i < data.length; ++i) {
        total += data[i][1];
    }
    // Total in hand, we can now pick a random value akin to our
    // random index from before.
    const threshold = Math.random() * total;
    
    total = 0;
    for (let i = 0; i < data.length - 1; ++i) {
        // Add the weight to our running total.
        total += data[i][1];

        // If this value falls within the threshold, we're done!
        if (total >= threshold) {
            return [data[i][0], i];
        }
    }

    // Wouldn't you know it, we needed the very last entry!
    return [data[data.length - 1][0], data.length - 1];
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

buy_coin.get('/', function(req, res) {
    
    var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
    batch.context = { 
        "data_plan": {
            "plan_id": "dp_example",
            "plan_version": 1
        }
    }
    var user_identities = new mParticle.UserIdentities();
    
    if ('customerid' in req.query) {
        user_identities.customerid = req.query['customerid']
    }
    batch.user_identities = user_identities;
    batch.mp_deviceid = "87d2ebaa-e956-407e-a1e6-f05f871bf4e6"
    
    let d_games = {
        "LL": "Lightning Link",
        "MF": "Mighty Fu",
        "CM": "Cashman",
        "HV": "Heart of Vegas"
    };
    
    let a_lw_coins = [
        [["4.75M", 4750000], 0.375],
        [["4.25M", 4250000], 0.33],
        [["5.25M", 5250000], 0.12],
        [["6.75M", 6750000], 0.07],
        [["8M", 8000000], 0.03],
        [["6M", 6000000], 0.044]
    ];
    
    let a_lw_extra = [
        [["Orbs", "RARE"], 0.32],
        [["Stellar", 15000], 0.30],
        [["Orbs", "UNCOMMON"], 0.30],
        [["Ligtning Boost", "10Mins"], 0.02],
        [["Stellar", 20000], 0.03],
        [["Orbs", "EPIC"], 0.01]
    ];

    let a_coins = [
        ["600% MORE", 110000000, 99.99],
        ["GOOD VALUE", 320000, 1.99],
        ["400% MORE", 38000000, 49.99],
        ["300% MORE", 13000000, 19.99],
        ["65% MORE", 1300000, 4.99],
        ["150% MORE", 4000000, 9.99],
        ["GREAT VALUE", 1000000, 2.99]
    ];
    
    let a_stellars = [
        ["700% MORE", 1000000, 99.99],
        ["GOOD VALUE", 2500, 1.99],
        ["460% MORE", 350000, 49.99],
        ["300% MORe", 100000, 19.99],
        ["60% MORE", 10000, 4.99],
        ["140% MORE", 30000, 9.99],
        ["GREAT VALUE", 4000, 2.99]
    ];
    
    var type = 'type' in req.query?req.query['type']:random_choice(["Coin", "Stellar", "Wheel"])[0];
    var game = 'game' in req.query?req.query['game']:random_choice(Object.keys(d_games))[0];
    var pm_product = new mParticle.Product();
    
    if (type == "Coin") {
        var [product_set, sel] = random_choice(a_coins);
        //console.log("Product Set: " + product_set)
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
    
    var body = [batch]
    var callback = function(error, data, response) {
        if (error) {
            res.send('Error: ' + error);
        } else {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify({
                'Game': d_games[game],
                'Payment_Amount': product_action.total_amount,
                'Purchase_Item': type == "Stellar"?"Stellars": "Coins",
                'Purchase_Amount': type == "Stellar"?pm_product.custom_attributes['Stellars_Amount']:pm_product.custom_attributes['Coins_Amount']
            }, null, 4));
        }
    };

    api.bulkUploadEvents(body, callback);

});

module.exports = buy_coin;
