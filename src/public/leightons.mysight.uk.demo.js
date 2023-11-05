// Import each library
import mParticle from '@mparticle/web-sdk';
import appboyKit from '@mparticle/web-appboy-kit';
import googleanalyticsKit from '@mparticle/web-google-analytics-kit';
import intercomKit from '@mparticle/web-intercom-kit';
import MediaSession from '@mparticle/web-media-sdk';

var WEBKEY = localStorage.mpKey || "us2-5844b462fde9e846af3c4ed52516e61a";
//var WEBKEY = "us2-27e27269f26d824a9955e3af6195b24b";

var curr_location = decodeURI(window.location.href);
var a_match = curr_location.match(/^https:\/\/leightons\.mysight\.uk\/\?.*?devid=(.+)&login=(.+)&mid=(.+)&cid=(.+)&curr_category=(.+)$/);
var curr_deviceid;
var curr_mpid;
var curr_cid;
var b_login;
var curr_category;

if (a_match && a_match.length > 0) {
    curr_deviceid = a_match[1];
    b_login = a_match[2];
    curr_mpid = a_match[3];
    curr_cid = a_match[4];
    curr_category = a_match[5];
    sessionStorage.setItem("Booking - Category", curr_category);
}

// Configure mParticle as needed for your project
var mParticleConfig = {
    isDevelopmentMode: true,
    deviceId: curr_deviceid,
    dataPlan: {
        planId: "dp_example",
        planVersion: 1
    },
    identityCallback: function(e) {
        e.getUser()
    }
};

if (b_login == "true") {

    mParticleConfig.identifyRequest = { 
        userIdentities: {
            customerid: curr_cid
        }
    };
   
}

//console.log(mParticleConfig);
// Initialize mParticle
mParticle.init('us2-5844b462fde9e846af3c4ed52516e61a', mParticleConfig);
if (b_login == "false") {
    
    mParticle.Store.mpid = curr_mpid;
    
}


var host = "leightons.mysight.uk";

var store_load_class = "LeftColumn-sc-lhlvqn cJMuLq";
var store_class = "Container-sc-1iga9k0 hrUoVm";
var store_button_class = "StyledButton-sc-1ner6c0 hCHhyQ BookNowButton-sc-1haice3 dyFMxI";
var appointment_type_button_class = "StyledButton-sc-1ner6c0 hCHhyQ StyledNextButton-sc-1fguxkk dMHClA";
var appointment_type_class = "StyledButton-sc-ujfpwp dkjTtw StyledAppointmentType-sc-2tt2u0 fqXVgD";
var appointment_book_button_class = "StyledButton-sc-1ner6c0 hCHhyQ StyledNextButton-sc-1fguxkk dMHClA";
var dd_selection_class = "DayComponent-sc-18z363n kjVmlj";
var mm_yy_selection_class = "BodyCopy-sc-17abj2q cWpiIO Date-sc-1lyy46p fvGYtC";
var time_selection_class = "StyledButton-sc-ujfpwp dkjTtw StyledSelectionButton-sc-1kmlmob euAmGN";
var staff_selection_class = "StyledButton-sc-ujfpwp dkjTtw OptomSelectionButton-sc-1tjlwiz DZlGR";
var staff_class = "BodyCopyMedium-sc-l488sm gboULJ";

var background_colour = "#fff!important";
var button_colour = "#93007d";

var customerid = "98761212";
var email = "demo1212@mailinator.com";
var mobile = "+447788661212";
var user_profile = {};

const Month_Num = {
    'JANUARY': '01',
    'FEBRUARY': '02',
    'MARCH': '03',
    'APRIL': '04',
    'MAY': '05',
    'JUNE': '06',
    'JULY': '07',
    'AUGUST': '08',
    'SEPTEMBER': '09',
    'OCTOBER': '10',
    'NOVEMBER': '11',
    'DECEMBER': '12'
};

var loginDisplay = function(btn) {

    var loggedInAs = mParticle.Identity.getCurrentUser() ? mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid : null;
    //console.log(loggedInAs + " ::: " + btn.innerText);
    btn.innerText = loggedInAs ? ('Logout: Jackie (' + email + ')') : ('Login: (' + email + ')');
    loggedInAs ? (btn.dataset.loggedInAs = loggedInAs) : (delete btn.dataset.loggedInAs);  
}

async function mp_login({ email = email, customerid = customerid } = {}, btn) {
    
    var identityRequest = {
        userIdentities: {
            customerid: `${customerid}`,
            email: `${email}`,
            mobile_number: `${mobile}`
        }
    };

    let callback = (e) => {
        if (e.getUser()) {
            const a = e.getUser();
            e.getPreviousUser();
            console.log("Login MPID: " + mParticle.Identity.getCurrentUser().getMPID());
            
            let mPcookies = Object.keys(localStorage).filter((propertyName)=>{return propertyName.indexOf("mprtcl") === 0;});
            let das = ""
            mPcookies.forEach((cookie)=>{
              if(localStorage[cookie] && localStorage[cookie].includes("|")){
                if(localStorage[cookie].split("|").find((e)=>{return e.includes("dt")}).split(":")[1] == `'${WEBKEY}'`){
                  das = localStorage[cookie].split("|").find((e)=>{return e.includes("das")}).split(":")[1].replace(/'/g,"")
                  return
                }
              }
            })
            
            var marketing_consent = mParticle.Consent.createGDPRConsent(
                true, // Consented
                Date.now(), // Timestamp
                "marketing_agreement_v4", // Document
                "London", // Location
                "DAS:"+das // Hardware ID
            );

            var analytics_consent = mParticle.Consent.createGDPRConsent(
                true, // Consented
                Date.now(), // Timestamp
                "analytics_agreement_v2", // Document
                "London", // Location
                "DAS:"+das // Hardware ID
            );
            var consentState = mParticle.Consent.createConsentState();
            consentState.addGDPRConsentState("Marketing", marketing_consent);
            consentState.addGDPRConsentState("Analytics", analytics_consent);
            a.setConsentState(consentState);

            a.setUserAttribute("$FirstName", "Jackie");
            a.setUserAttribute("$LastName", "Chan");
            a.setUserAttribute("$Mobile", mobile);
            a.setUserAttribute("$Country", "United Kingdom");
            a.setUserAttribute("$City", "London");
            
            loginDisplay(btn);
            //personalise_banner();
            mParticle.logEvent(
                'Login',
                mParticle.EventType.Other,
                {
                    "userid": mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid,
                    "contact": mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.email
                }
            );
        } else {
            var t = window.mParticle.Identity.HTTPCodes;
            switch (e.httpCode) {
                case t.noHttpCoverage:
                case t.activeIdentityRequest:
                case 429:
                    break;
                case t.validationIssue:
                case 400:
                    console.log(e.body)
            }
        }
    };
    await mParticle.Identity.login(identityRequest, callback);  
}

async function mp_logout(btn) {
    
    let callback = (result) => {
        loginDisplay(btn);
        if (result.getUser()) {
            console.log("New User After Logout: " + JSON.stringify(result.getUser()));
        }
        console.log("Logout Completed");
    };
    
    mParticle.logEvent(
        'Logout',
        mParticle.EventType.Other,
        {
            "userid": mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid,
            "email": mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.email
        }
    );
    await mParticle.Identity.logout({}, callback);
    
}

async function request_token() {
    var e = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            //client_id: "vCIPMjYkRO8WMeSsLOvIq01ALNnZVZFU",
            //client_secret: "L90P7mme9Wz36HDmu1r7OtRMSd5_NoieuR_ZsU8aG5ZJ6f2zETPxcsr64JxyStx8",
            client_id: "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE",
            client_secret: "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA",
            audience: "https://api.mparticle.com",
            grant_type: "client_credentials"
        }),
        mode: "cors",
        method: "POST"
    };
    var t = await (await fetch("https://" + host + "/oauth/token", e)).json();
    localStorage.access_token = t.access_token, localStorage.token_expiration = Date.now() + 1e3 * (t.expires_in - 60)
}

async function request_user_profile(e) {
    
    console.log("User Profile MPID: " + e);
    localStorage.access_token && "" != localStorage.access_token && localStorage.token_expiration && "" != localStorage.token_expiration && !(localStorage.token_expiration < Date.now()) || await request_token();
    var t = "https://" + host + "/userprofile/v1/5000011/167/205/" + e + "?fields=user_identities,user_attributes,audience_memberships,attribution",
        e = {
            headers: new Headers({
                Authorization: "Bearer " + localStorage.access_token
            }),
            method: "GET"
        },
        a = await (await fetch(t, e)).json();
        user_profile = await a;
}

function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof(url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-380364769/l30VCO_Q3pADEOHPr7UB',
        'event_callback': callback
    });
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function capitalizeWords(arr) {
    return arr.map(element => {
        return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
}

function convert2_24h_time(s_time) {
    
    var hours = Number(s_time.match(/^(\d+)/)[1]);
    var minutes = Number(s_time.match(/:(\d+)/)[1]);
    var AMPM = s_time.match(/([A-Za-z]+)$/)[1];
    if(AMPM == "pm" && hours<12) hours = hours + 12;
    if(AMPM == "am" && hours==12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    
    return sHours + ":" + sMinutes;
}

function fetch_o_xpath(parent_object, child_filter, type = "obj", attribute_name = null) {
    
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
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-4BCNZEL7RR');

function hyperlink_events() {
    
    let targetNode = document.body;
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    
    var curr_type = "N/A";
    var s_booking_time = "N/A";
    var s_staff = "N/A";
    
    var b_store_class = false;
    var b_booking_type = false;
    var b_booking = false;
    
    var o_link_base = document.evaluate('.//*[contains(@class, "' + store_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (o_link_base.snapshotLength > 0 && !b_store_class) {
        for (var i_item = 0; i_item < o_link_base.snapshotLength; i_item++) {
            let curr_item = o_link_base.snapshotItem(i_item);
            let curr_btn = curr_item.getElementsByClassName(store_button_class);

            if (curr_btn.length > 0) {
                let curr_store = curr_item.getElementsByTagName("h5")[0].innerText;
                (function(curr_store) {
                    curr_btn[0].addEventListener('click', (evt)=>{
                        sessionStorage.setItem("Booking - Store", curr_store);
                        mParticle.logEvent(
                            'Book_Appointment',
                            mParticle.EventType.Other,
                            {
                                "Appointment_Step": "1. Choose Store",
                                "Appointment_Category": sessionStorage.getItem("Booking - Category"),
                                "Appointment_Store": curr_store,
                                "Curr_Operation_Time": (new Date().toISOString()).replace(/\.\d{3}Z/, "+00:00")
                            }
                        );
                    });
                })(curr_store);
            }
            b_store_class = true;
        }
    }
    
    const callback = function(mutationsList, observer) {     
        for (let mutation of mutationsList) {
            //console.log(mutation.type + " --- " + mutation.target.className + " --- " + mutation.target.tagName);
            // Select Store
            if (mutation.type == 'childList' && mutation.target.id == 'app') {
                //console.log("Store list loaded: " + mutation.target.className + " --- " + mutation.target.tagName);
                var o_link_base = document.evaluate('.//*[contains(@class, "' + store_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (o_link_base.snapshotLength > 0 && !b_store_class) {
                    for (var i_item = 0; i_item < o_link_base.snapshotLength; i_item++) {
                        let curr_item = o_link_base.snapshotItem(i_item);
                        let curr_btn = curr_item.getElementsByClassName(store_button_class);
            
                        if (curr_btn.length > 0) {
                            let curr_store = curr_item.getElementsByTagName("h5")[0].innerText;
                            (function(curr_store) {
                                curr_btn[0].addEventListener('click', (evt)=>{
                                    sessionStorage.setItem("Booking - Store", curr_store);
                                    mParticle.logEvent(
                                        'Book_Appointment',
                                        mParticle.EventType.Other,
                                        {
                                            "Appointment_Step": "1. Choose Store",
                                            "Appointment_Category": sessionStorage.getItem("Booking - Category"),
                                            "Appointment_Store": curr_store,
                                            "Curr_Operation_Time": (new Date().toISOString()).replace(/\.\d{3}Z/, "+00:00")
                                        }
                                    );
                                });
                            })(curr_store);
                        }
                    }
                    b_store_class = true;
                }
            }
            
            // Select Appointment Type
            if (mutation.type == 'attributes' && mutation.target.className == appointment_type_class) {
                console.log("Type: " + mutation.target.className + " --- " + mutation.target.tagName);
                let o_apptmnt_type_base = document.evaluate('.//*[contains(@class, "' + appointment_type_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (o_apptmnt_type_base.snapshotLength > 0) {
                    let curr_selection = o_apptmnt_type_base.snapshotItem(0);
                    curr_type = curr_selection.firstChild.firstChild.innerText;
                    sessionStorage.setItem("Booking - Type", curr_type);
                }
                
                if (!b_booking_type) {
                    document.getElementsByClassName(appointment_type_button_class)[0].addEventListener('click', (evt)=>{
                        mParticle.logEvent(
                            'Book_Appointment',
                            mParticle.EventType.Other,
                            {
                                "Appointment_Step": "2. Choose Appointment Type",
                                "Appointment_Category": sessionStorage.getItem("Booking - Category"),
                                "Appointment_Store": sessionStorage.getItem("Booking - Store"),
                                "Appointment_Type": sessionStorage.getItem("Booking - Type"),
                                "Curr_Operation_Time": (new Date().toISOString()).replace(/\.\d{3}Z/, "+00:00")
                            }
                        );
                    });
                    b_booking_type = true;
                }
            }

            
            if (mutation.type == 'attributes' && mutation.target.className == appointment_type_button_class && mutation.target.innerText == "BOOK NOW" && !mutation.target.disabled) {
                try {
        
                    let s_dd = document.getElementsByClassName(dd_selection_class)[0].innerText;
                    //let s_mm = Month_Num[document.getElementsByClassName(mm_yy_selection_class)[0].innerText.split(" ")[0].toUpperCase()];
                    let s_mm = document.getElementsByClassName(mm_yy_selection_class)[0].innerText.split(" ")[0].substring(0, 3);
                    let s_yy = document.getElementsByClassName(mm_yy_selection_class)[0].innerText.split(" ")[1];
                    let s_hh_mm_ss = convert2_24h_time(document.getElementsByClassName(time_selection_class)[0].innerText) + ":00";
                    let s_date_time = s_dd + " " + s_mm + " " + s_yy + " " + s_hh_mm_ss;
                    s_booking_time = (new Date(s_date_time).toISOString()).replace(/\.\d{3}Z/, "+00:00");
                    sessionStorage.setItem("Booking - Time", s_booking_time);
        
                    let o_staff_base = document.evaluate('.//*[@class="' + staff_class + '" and @data-test-id = "choose_date_time_appointment_is_with_text"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (o_staff_base.snapshotLength > 0) {
                        s_staff = o_staff_base.snapshotItem(0).innerText.replace(/^.*is\swith\s/, "");
                    } else {
                        s_staff = document.getElementsByClassName(staff_selection_class)[0].innerText;
                    }
                    sessionStorage.setItem("Booking - Staff", s_staff);
        
                } catch (e) {
                    console.log("Fetching booking time: " + e);
                }

                if (!b_booking) {
                    mutation.target.addEventListener('click', (evt)=>{
                        mParticle.logEvent(
                            'Book_Appointment',
                            mParticle.EventType.Other,
                            {
                                "Appointment_Step": "3. Choose Date/Time",
                                "Appointment_Category": sessionStorage.getItem("Booking - Category"),
                                "Appointment_Store": sessionStorage.getItem("Booking - Store"),
                                "Appointment_Type": sessionStorage.getItem("Booking - Type"),
                                "Appointment_Time": sessionStorage.getItem("Booking - Time"),
                                "Appointment_Staff": sessionStorage.getItem("Booking - Staff"),
                                "Curr_Operation_Time": (new Date().toISOString()).replace(/\.\d{3}Z/, "+00:00")
                            }
                        );
                    });
                    b_booking = true;
                }
            }
        }
    };
    
    const observer = new MutationObserver(callback);
    if(targetNode) { observer.observe(targetNode, config); }
    
    console.log("Observer Starts!");
    
}

function mp_init() {

    var toggleLogin = async function(evt) {
        var btn = evt.currentTarget;
        if (btn.dataset.loggedInAs) {
            await mp_logout(btn);
            console.log("+++ Logout +++");
        } else {
            gtag_report_conversion();
            await mp_login({customerid: customerid, email: email}, btn);
            setTimeout(async function() {
                await request_user_profile(mParticle.Identity.getCurrentUser().getMPID());
                var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (o_personalise_base.snapshotLength > 0) {
                    o_personalise_base.snapshotItem(0).getElementsByTagName("source")[0].srcset="https://demo.mp.com/" + user_profile.user_attributes["last View Category"].toLowerCase().replace(" ", "_") + ".png";
                    mParticle.logEvent(
                        'Display_Personalisation',
                        mParticle.EventType.Other,
                        {
                            "Personalisation_Type": "Web_GTM",
                            "Personalisation_Content": s_personalisation,
                            "Customer_Email": s_email
                        }
                    );
                }
                console.log(user_profile)
            }, 1000);
        
        }
    }

    var loginBtn = document.createElement('button');
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 48px; width: 180px;position: fixed; right: 5px; top: 20px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour + '; opacity: .9;';
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    hyperlink_events();
    
    var worker = new Worker('https://' + host + '/service-worker.js');
    appboy.registerAppboyPushMessages();
    
    console.log("Event Listeners Added!");

}

function fire_campaignEvent() {
    
    var curr_location = decodeURI(window.location.href);
    var a_match = curr_location.match(/^https:\/\/www\.leightons\.co\.uk\/fr\?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
    if (a_match && a_match.length > 0) {
        mParticle.logEvent(
            'Land_Campaign',
            mParticle.EventType.Unknown,
            {
                "Landing_URL": window.location.href,
                "Subject": a_match[1],
                "Campaign_Name": a_match[2],
                "Campaign_Medium": a_match[3],
                "Publisher": a_match[4]
            }
        );
    }
    
    var a_utm_match = curr_location.match(/^https:\/\/www\.leightons\.co\.uk\/fr\?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);
    
    if (a_utm_match && a_utm_match.length > 0) {
        mParticle.logEvent(
            'Land_Campaign',
            mParticle.EventType.Unknown,
            {
                "Landing_URL": window.location.href,
                "Subject": a_utm_match[2],
                "Campaign_Name": a_utm_match[4],
                "Campaign_Medium": a_utm_match[1],
                "Publisher": a_utm_match[3]
            }
        );
    }
    
}

function personalise_banner() {
    console.log("+++++Personalise+++++");
    if ("user_attributes" in user_profile && "recommended_Product" in user_profile.user_attributes && user_profile.user_attributes["recommended_Product"]) {
        var o_personalise_base = document.evaluate('.//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (o_personalise_base.snapshotLength > 0) {
            let s_personalisation = user_profile.user_attributes["recommended_Product"];
            let s_email = user_profile.user_identities[1].value;
            var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (o_personalise_base.snapshotLength > 0) {
                o_personalise_base.snapshotItem(0).getElementsByTagName("img")[0].src = "https://demo.mp.com/img/" + s_personalisation.replaceAll(" ", "_").toLowerCase() + "_7935552.jpeg";
                mParticle.logEvent(
                    'Deliver_Personalisation',
                    mParticle.EventType.Other,
                    {
                        "Personalisation_Type": "Web_GTM",
                        "Personalisation_Content": s_personalisation,
                        "Customer_Email": s_email
                    }
                );
            }
            console.log("++++++Personlisation Delivered!+++++");
        }
    }
    
}


//window.addEventListener('load', fire_campaignEvent(), true);
document.addEventListener('DOMContentLoaded', fire_campaignEvent(), false);
setTimeout(function() {mp_init();}, 1000);

