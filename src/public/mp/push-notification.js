var express = require('express');
var push_notification = express.Router();
var mParticle = require('mparticle');
var logger = require('morgan');
const { exec } = require("child_process");


//https://demo.mp.com/mp/push_notification?customerid=31160825&title=Great%20Offer%21&body=You%20Cannot%20Miss%20This%21&app=Matas
var config = new mParticle.Configuration(
    'us2-4a4f4fa3a0464a4492a543888119fe3e',
    'xfgWFOlV_CO2ha65v5QK4Md8WXey1wIlm2N_qVJo6A-1fy0y1XMwFiWQRqCon0us');
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

push_notification.get('/', function(req, res) {
    var s_cmd = "sleep 3;sed -i \"\" -e 's/^.*title.*$/            \"title\": \"" + req.query['title'] + "\"/' -e 's/^.*body.*$/            \"body\": \"" + req.query['body'] + "\",/' \"/Users/hsyang/Downloads/Prospects/Demo iOS App - " + req.query['app'] + "/push.json\";xcrun simctl push booted mParticle.demo-org \"/Users/hsyang/Downloads/Prospects/Demo iOS App - " + req.query['app'] + "/push.json\"";
    //console.log(s_cmd)
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
        }
        
        var user_identities = new mParticle.UserIdentities();
    
        if ('customerid' in req.query) {
            user_identities.customerid = req.query['customerid']
        }
        batch.user_identities = user_identities;
        batch.mp_deviceid = "87d2ebaa-e956-407e-a1e6-f05f871bf4e6"
    
        var s_campaign_id = "2023-" + uuidv4();
        var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.other, 'Push Notification Deliveries');
        event.custom_attributes = {
            "Campaign_Subject": req.query['title'],
            "Campaign_ID": s_campaign_id,
            "Mobile_ID": req.query['customerid'],
            "Notfication_Time": (new Date().toISOString().split(".")[0]+"+00:00")
        };
        
        batch.addEvent(event);
    
        var body = [batch]
        var callback = function(error, data, response) {
            if (error) {
                res.send('Error: ' + error);
            } else {
                res.header("Content-Type",'application/json');
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