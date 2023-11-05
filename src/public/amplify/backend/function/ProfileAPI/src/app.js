/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const fetch = require('node-fetch');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

var s_token = '';
async function request_token() {
    var e = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            //client_id: "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE", //us2 mParticle Workshops
            //client_secret: "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA", //us2 mParticle Workshops
            client_id: "irrAuwex0d7calyRaknpCYE89omlKEDU", //eu1 mParticle Workshops
            client_secret: "tMZaugEg57IyInCMiySuSU0c4UvB60s4C4ir5FH2tjzYScuUMcWaldjmE1rt9Lnn", //eu1 mParticle Workshops
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
    s_token = await request_token();
    //var t = "https://api.mparticle.com/userprofile/v1/5000011/167/" + wSID + "/" + mPID + "?fields=user_identities,user_attributes,audience_memberships,attribution"; //us2 mParticle Workshops
    var t = "https://api.mparticle.com/userprofile/v1/4000268/374/" + wSID + "/" + mPID + "?fields=user_identities,user_attributes,audience_memberships,attribution"; // eu1 mParticle Workshops
    var e = {
        headers: {
            Authorization: "Bearer " + s_token
        },
        method: "GET"
    };
    var user_profile = await (await fetch(t, e)).json();
    return user_profile
}

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/profile', async function(req, res) {
  // Add your code here
  if(req.query['mPID']) {
    var user_profile = await request_user_profile(req.query['wSID'], req.query['mPID']);
    res.send({
      user_profile
    });
  } else {
    res.json({void: 'get call void!', url: req.url});
  }
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
