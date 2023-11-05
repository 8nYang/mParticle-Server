const { parse } = require("csv-parse");
const fs = require('fs');
const path = require('path');

var flights = {}
var flight_search = {}
var airport_code = {}

var eJ_flight_price = {
    "Unit_Price": 0.1,
    "Extra Legroom": [0.3, 0.4],
    "Up Front": [0.2, 0.3, 0.4],
    "Standard": [0.0],
    "Standard Plus": [0.3, 0.4],
    "Essentials": [0.5, 0.6],
    "Large Cabin Bag":[0.12, 0.25],
    "15kg Hold Bag": [0.25, 0.35, 0.55],
    "23kg Hold Bag": [0.45, 0.65],
    "26kg Hold Bag": [0.4, 0.6],
    "Discount": [0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.2, 0.25, 0.3, 0.35],
    "Inspire_Me_Type": "I don't mind|City explorer|Adventure and the great outdoors|Family holiday|Foodies|Going solo|Honeymoons and romance|Inspired by movies and TV|Instagram hotspots|Music and festivals|Off the beaten track|Sand sun and swim|Snow and slopes (and a little apres)",
    "Inspire_Me_Trip": "Anytime|Summer-23|Autumn-23|Winter-23",
    "Inspire_Me_Time": "One-Way|7d-Return|14d-Return|Weekend-Return"
}

fs.createReadStream("/Users/hsyang/Downloads/eCommerce - webApp/mP-Media/src/public/mp/flights-details.txt")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        flights[row[0]] = {};
        flights[row[0]]['F-IATA'] = row[1]
        flights[row[0]]['F-City'] = row[2]
        flights[row[0]]['F-Country'] = row[3]
        flights[row[0]]['F-Terminal'] = row[4]
        flights[row[0]]['F-Time'] = row[5]
        flights[row[0]]['T-IATA'] = row[6]
        flights[row[0]]['T-City'] = row[7]
        flights[row[0]]['T-Country'] = row[8]
        flights[row[0]]['T-Terminal'] = row[9]
        flights[row[0]]['T-Time'] = row[10]
        flights[row[0]]['Distance'] = row[11]
        flights[row[0]]['Duration'] = row[12]
        
        airport_code[row[2]] = row[1]
        
        if (typeof flight_search[row[2]] == "undefined") {
            flight_search[row[2]] = {}
            if (typeof flight_search[row[2]][row[7]] == "undefined") {
                flight_search[row[2]][row[7]] = {}
            }
        } else {
            if (typeof flight_search[row[2]][row[7]] == "undefined") {
                flight_search[row[2]][row[7]] = {}
            }
        }
        flight_search[row[2]][row[7]][row[5]] = row[0]
    })
    .on("error", function (error) {
        console.log(error.message);
    })
    .on("end", function () {
        console.log("Done");
    });

module.exports = {
    flights: flights,
    flight_search: flight_search,
    airport_code: airport_code,
    eJ_flight_price: eJ_flight_price
}