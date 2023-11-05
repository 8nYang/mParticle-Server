// Import each library
import mParticle from '@mparticle/web-sdk';
import appboyKit from '@mparticle/web-appboy-kit';
import googleanalyticsKit from '@mparticle/web-google-analytics-kit';
import intercomKit from '@mparticle/web-intercom-kit';
import MediaSession from '@mparticle/web-media-sdk';

var WEBKEY = localStorage.mpKey || "us2-5844b462fde9e846af3c4ed52516e61a";
//var WEBKEY = "us2-27e27269f26d824a9955e3af6195b24b";
// Configure mParticle as needed for your project
const mParticleConfig = {
    isDevelopmentMode: true,
    dataPlan: {
        planId: "dp_example",
        planVersion: 1
    },
    identityCallback: function(e) {
        e.getUser()
    }
};


// Initialize mParticle
mParticle.init('us2-5844b462fde9e846af3c4ed52516e61a', mParticleConfig);

var host = "get.vertofx.com";

var nav_class = "nav";
var page_class = "header-right__buttons";
var cta_class = "cta-item";

var background_colour = "#359EB!important";
var button_colour = "#359EB";

var customerid = "98760620";
var email = "demo0620@mailinator.com";
var mobile = "+447890120620";
var curr_category = "VertoFX";
var user_profile = {};

var b_switch = false;

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
            email: `${email}`
            //mobile_number: `${mobile}`
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
        //document.evaluate('//*[contains(@class, "b4 bj")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).textContent = "Sign In";
        if (result.getUser()) {

        }
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
        },
        t = await (await fetch("https://" + host + "/oauth/token", e)).json();
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
    
    // Page Views
    var o_nav_base = document.evaluate('.//*[contains(@class, "' + nav_class + '") and @id = "navigation"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (o_nav_base.snapshotLength > 0) {
        let a_navs = o_nav_base.snapshotItem(0).getElementsByTagName("a");
        for (var i_item = 0; i_item < a_navs.length; i_item++) {
            (function(i_item) {
                a_navs[i_item].addEventListener('click', (evt)=>{
                    mParticle.logPageView(
                        evt.target.innerText,
                        {
                            "Page": evt.target.innerText,
                            "Url": evt.target.href
                        },
                        {
                            "Google.Page": evt.target.href,
                            "Google.Title": evt.target.innerText
                        }
                    );
                });
            })(i_item);
        }
    }
    
    // Book an Appointment or Find a Branch
    var o_link_base = document.evaluate('.//*[contains(@class, "' + page_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (o_link_base.snapshotLength > 0) {
        let a_links = o_link_base.snapshotItem(0).getElementsByTagName("a");
        for (var i_item = 0; i_item < a_links.length; i_item++) {
            (function(i_item) {
                a_links[i_item].addEventListener('click', (evt)=>{
                    mParticle.logPageView(
                        evt.target.innerText,
                        {
                            "Page": evt.target.innerText,
                            "Url": evt.target.href
                        },
                        {
                            "Google.Page": evt.target.href,
                            "Google.Title": evt.target.innerText
                        }
                    );
                });
            })(i_item);
        }
    }
    
    var o_cta_base = document.evaluate('.//*[contains(@class, "' + cta_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (o_cta_base.snapshotLength > 0 && window.location.pathname == "/book-an-appointment") {      
        for (var j_item = 0; j_item < o_cta_base.snapshotLength; j_item++) {
            
            let curr_item = o_cta_base.snapshotItem(j_item);
            curr_category = curr_item.getElementsByTagName("h3")[0].innerText;
            (function(curr_category) {
                curr_item.addEventListener('click', (evt)=>{
                    event = evt || window.event;
                    var target = evt.target || evt.srcElement;
                    var new_url;

                    while (target) {
                      if (target instanceof HTMLAnchorElement) {
                          if (window.location.hostname != evt.target.hostname) {
                              let curr_deviceid = mParticle.getDeviceId();
                              let curr_mpid = mParticle.Identity.getCurrentUser().getMPID();
                              let curr_cid = mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.customerid;
                              let b_login = mParticle.Identity.getCurrentUser().isLoggedIn();
                              let s_crossdomain_params = "devid=" + curr_deviceid + "&login=" + b_login + "&mid=" + curr_mpid + "&cid=" + curr_cid + "&curr_category=" + curr_category;
                              target.href = target.href.indexOf("?") > -1?target.href + "&" + s_crossdomain_params:target.href + "?" + s_crossdomain_params;
                              new_url = target.href;
                          }
                      }
                      target = target.parentNode;
                    }
                    console.log(j_item + " : " + curr_category + " : " + new_url);
                    mParticle.logEvent(
                        'Book_Appointment',
                        mParticle.EventType.Other,
                        {
                            "Booking_Step": "0. Start",
                            "Booking_Category": curr_category,
                            "Booking_Url": new_url,
                            "Step_Time": (new Date().toISOString()).replace(/\.\d{3}Z/, "+00:00")
                        }
                    );
                });
                //curr_item.onclick = function() {return false};
            })(curr_category);
        }
    }
    
    
    /*var o_photo_base = document.evaluate('//*[contains(@class, "' + photo_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (o_photo_base.snapshotLength > 0) {
        const targetNode = o_photo_base.snapshotItem(0);
    
        var config = { childList: true, subtree: true, characterData: true, attributes: true };
        const callback = function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                if (mutation.type == 'attributes' && mutation.target.className == photo_active_class) {
                    console.log("Target: "+ mutation.target.className + " " + mutation.type);
                    var s_subcategory = "";
                    var o_nav_base = document.evaluate('//*[contains(@class, "' + nav_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (o_nav_base.snapshotLength > 0) {
                        s_subcategory = o_nav_base.snapshotItem(0).getElementsByClassName(nav_active_class)[0].innerText;
                    }
                    mutation.target.addEventListener('click', (evt)=>{
                        s_category = window.location.href.split("/").at(-1).replaceAll("-", " ");
                        mParticle.logEvent(
                            'view_photo',
                            mParticle.EventType.Other,
                            {
                                "Category": capitalizeWords(s_category.split(" ")).join(" ") + " -> " + s_subcategory,
                                "Url": evt.target.closest("a").href
                            }
                        );
                    });
                    return;
                }
            }
        };

        const observer = new MutationObserver(callback);
        if(targetNode) { observer.observe(targetNode, config); }
    }*/
    
    console.log("Observer Starts!");
    
}

function mp_init() {

    var toggleLogin = async function(evt) {
        var btn = evt.currentTarget;
        if (btn.dataset.loggedInAs) {
            mp_logout(btn);
            console.log("+++ Logout +++")
               
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
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 48px; width: 180px;position: fixed; right: 5px; top: 20px; border: none; padding: 5px; background-color: ' + background_colour + '; color: ' + button_colour + '; opacity: .9;';
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
    console.log("Location: " + curr_location);
    var a_match = curr_location.match(/^https:\/\/www\.verto\.com\/\?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
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
    
    var a_utm_match = curr_location.match(/^https:\/\/get\.vertofx\.com\/.+?\/\?utm_campaign=([^&]+)&utm_source=([^&]+)&utm_medium=([^&]+)&utm_content=([^&]+)/);
    //console.log("UTM Matching: " + a_utm_match.length);
    if (a_utm_match && a_utm_match.length > 0) {
        mParticle.logEvent(
            'Land_Campaign',
            mParticle.EventType.Unknown,
            {
                "Landing_URL": window.location.href,
                "Subject": a_utm_match[4],
                "Campaign_Name": a_utm_match[1],
                "Campaign_Medium": a_utm_match[3],
                "Publisher": a_utm_match[2]
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

