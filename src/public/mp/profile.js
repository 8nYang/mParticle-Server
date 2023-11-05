'use strict'

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

profile.get('/', async function(req, res) {
    if(req.query['mPID']) {
        var user_profile = await request_user_profile(req.query['wSID'], req.query['mPID']);
        res.send({
            user_profile
         });
     } else {
         res.send({});
     }
    
});

module.exports = profile;