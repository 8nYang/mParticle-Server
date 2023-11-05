// Import each library
import mParticle from '@mparticle/web-sdk';
import appboyKit from '@mparticle/web-appboy-kit';
import googleanalyticsKit from '@mparticle/web-google-analytics-kit';
import intercomKit from '@mparticle/web-intercom-kit';
import MediaSession from '@mparticle/web-media-sdk';

var WEBKEY = localStorage.mpKey || "us2-347606d5f640dd47bb2296fca9773232";

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
mParticle.init(WEBKEY, mParticleConfig);

var host = "www.interaction-design.org";

var nav_base_class = "primaryNavigationBar__navigation";
var courses_base_class = "card-wrapper";

var video_base_class = "plyr plyr--full-ui plyr--video plyr--html5 plyr--fullscreen-enabled";
var btn1_class = "plyr__controls__item plyr__control";

var personalise_class = "HeroBanner-module--backgroundWrapper"

var background_colour = "#ffffff!important";
var button_colour = "#009cde";

var customerid = "98761212";
var email = "demo1212@mailinator.com";
var mobile = "+447788661212";
var user_profile = {};

var loginDisplay = function(btn) {

    var loggedInAs = mParticle.Identity.getCurrentUser() ? mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.email : null;
    //console.log(loggedInAs + " ::: " + btn.innerText);
    btn.innerText = loggedInAs ? ('Logout: Lara (' + email + ')') : ('Log In (' + email + ')');
    loggedInAs ? (btn.dataset.loggedInAs = loggedInAs) : (delete btn.dataset.loggedInAs);  
}

async function mp_login({ email = email, customerid = customerid } = {}, btn) {
    
    var identityRequest = {
        userIdentities: {
            customerid: `${customerid}`,
            email: `${email}`
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

            a.setUserAttribute("$FirstName", "Lara");
            a.setUserAttribute("$LastName", "Pulver");
            a.setUserAttribute("$Mobile", mobile);
            a.setUserAttribute("$Country", "United Kingdom");
            a.setUserAttribute("$City", "London");
            
            loginDisplay(btn);
            personalise_banner();
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
    mParticle.Identity.logout({},callback);
    
}

async function request_token() {
    var e = {
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
        },
        t = await (await fetch("https://" + host + "/oauth/token", e)).json();
    localStorage.access_token = t.access_token, localStorage.token_expiration = Date.now() + 1e3 * (t.expires_in - 60)
}

async function request_user_profile(e) {
    
    console.log("User Profile MPID: " + e);
    localStorage.access_token && "" != localStorage.access_token && localStorage.token_expiration && "" != localStorage.token_expiration && !(localStorage.token_expiration < Date.now()) || await request_token();
    var t = "https://" + host + "/userprofile/v1/5000011/167/262/" + e + "?fields=user_identities,user_attributes,audience_memberships,attribution",
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
gtag('config', 'AW-380364769');

function hyperlink_events() {
    
    //const targetNode = document.evaluate('//*[contains(@class, "' + nav_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    const targetNode = document.body;
    
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            //console.log("Target: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);     
            //if (mutation.type == "childList" && !b_switch && document.getElementsByClassName("WebItemBtnTitle").length > 0) {
            if (mutation.type == "attributes" && mutation.target.className.indexOf("NavigationTab-module--active") > -1) {
                console.log("Target: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
                let s_Category = mutation.target.innerText;
                let o_subcategory_base = document.evaluate('//*[contains(@class, "' + nav_base_dropdown_class + '")]', mutation.target.parentElement.parentElement.parentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (o_subcategory_base.snapshotLength > 0) {
                    let o_links = o_subcategory_base.snapshotItem(0).getElementsByTagName("a");
                    for (let j=0; j<o_links.length; j++) {
                        o_links[j].addEventListener('click', (evt)=>{
                            mParticle.logEvent(
                                'View_Category',
                                mParticle.EventType.Navigation,
                                {
                                    "Category": s_Category,
                                    "SubCategory": o_links[j].className.indexOf("Promotion") < 0?o_links[j].innerText:"Promotion",
                                    "Link": o_links[j].href
                                }
                            );
                        });
                    }
                }
            }
            return;
        }
    };

    const observer = new MutationObserver(callback);
    if(targetNode) { observer.observe(document, config); }
    
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
                }
                console.log(user_profile)
            }, 1000);
        
        }
    }

    var loginBtn = document.createElement('button');
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 28px; width: 170px;position: fixed; right: 0px; top: 27px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour;
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    var mediaSession;
    let a_videos = document.getElementsByTagName("video");
    for (let j=0; j<a_videos.length; j++) {
        if (a_videos[j].hasAttribute("id")) {
            var b_play = false;
            var b_stop = false;
            var b_session = false;
            var mediaTitle = "Promotion Introduction";
            if (a_videos[j].parentElement.parentElement.parentElement.getElementsByTagName("h2").length > 0) { 
                mediaTitle = a_videos[j].parentElement.parentElement.parentElement.getElementsByTagName("h2")[0].innerText;
            } else if (document.getElementsByTagName("h1").length > 0) {
                mediaTitle = document.getElementsByTagName("h1")[0].innerText;
            }
            mediaSession = new MediaSession(
                mParticle,                   // mParticle SDK Instance
                a_videos[j].id,              // Custom media ID
                mediaTitle,                   // Custom media Title
                a_videos[j].duration,        // Duration in milliseconds
                'Video',                     // Content Type (Video or Audio)
                'OnDemand',                  // Stream Type (OnDemand, Live, etc.)
                true,                        // Log Page Event Toggle (true/false)
                true                         // Log Media Event Toggle (true/false)
            );
            mediaSession.mediaContentCompleteLimit = 0.9;
            a_videos[j].addEventListener('playing', (event) => {
                if (!b_play) {
                    mediaSession.duration = a_videos[j].duration;
                    const options = {
                        customAttributes: {
                            content_rating: 'epic',
                            content_genre: 'UX Designer'
                        },
                        currentPlayheadPosition: a_videos[j].currentTime,
                    };
                    if (!b_session) { mediaSession.logMediaSessionStart(options); b_session = true; }
                    mediaSession.logPlay(options);
                    b_play = true;
                    b_stop = false;
                }
            });
            
            a_videos[j].addEventListener('pause', (event) => {
                if (!b_stop) {
                    const options = {
                        customAttributes: {
                            content_rating: 'epic',
                            content_genre: 'UX Designer'
                        },
                        currentPlayheadPosition: a_videos[j].currentTime,
                    };
                    mediaSession.logPause(options);
                    b_play = false;
                }
            });
            
            a_videos[j].addEventListener('ended', (event) => {
                
                const options = {
                    customAttributes: {
                        content_rating: 'epic',
                        content_genre: 'UX Designer'
                    },
                    currentPlayheadPosition: a_videos[j].currentTime,
                };
                //mediaSession.logMediaContentEnd();
                mediaSession.logMediaSessionEnd(options);
                b_stop = true;
                b_play = false;
                b_session = false;
                
            });
        }
    }

    
    var o_category_base = document.evaluate('//*[contains(@class, "' + nav_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (o_category_base.snapshotLength > 0) {
        var o_categories = o_category_base.snapshotItem(0).getElementsByTagName("a");
        for (let i=0; i<o_categories.length; i++) {
            o_categories[i].addEventListener('click', (evt)=>{
                mParticle.logEvent(
                    'View_Category',
                    mParticle.EventType.Navigation,
                    {
                        "Category": o_categories[i].innerText,
                        "Link": o_categories[i].href
                    }
                );
            });
        }
    }
    
    var o_courses_base = document.evaluate('//*[contains(@class, "' + courses_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i=0; i<o_courses_base.snapshotLength; i++) {
        o_courses_base.snapshotItem(i).addEventListener('click', (evt)=>{
            mParticle.logEvent(
                'View_Detail',
                mParticle.EventType.Navigation,
                {
                    "Category": o_courses_base.snapshotItem(i).parentElement.parentElement.childNodes[1].id,
                    "Sub_Category": o_courses_base.snapshotItem(i).parentElement.parentElement.childNodes[1].innerText,
                    "Title": o_courses_base.snapshotItem(i).childNodes[1].getAttribute("title"),
                    "Id": o_courses_base.snapshotItem(i).childNodes[1].getAttribute("data-course-id"),
                    "Link": evt.target.href
                }
            );
        });
    }
    
    var worker = new Worker('https://' + host + '/service-worker.js');
    appboy.registerAppboyPushMessages();
    
    console.log("Event Listeners Added!");

}

function fire_campaignEvent() {
    
    var curr_location = decodeURI(window.location.href);
    var a_match = curr_location.match(/^https:\/\/www\.interaction-design\.org\/\?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
    if (a_match && a_match.length > 0) {
        mParticle.logEvent(
            'Land_Campaign',
            mParticle.EventType.Unknown,
            {
                "Landing_URL": window.location.pathname + window.location.search,
                "Subject": a_match[1],
                "Campaign_Name": a_match[2],
                "Campaign_Medium": a_match[3],
                "Publisher": a_match[4]
            }
        );
    }
    
    var a_utm_match = curr_location.match(/^https:\/\/www\.interaction-design\.org\/\?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);
    
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
    if("user_attributes" in user_profile && "last View Category" in user_profile.user_attributes && user_profile.user_attributes["last View Category"]) {
        var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (o_personalise_base.snapshotLength > 0) {
            o_personalise_base.snapshotItem(0).getElementsByTagName("source")[0].srcset="https://demo.mp.com/" + user_profile.user_attributes["last View Category"].toLowerCase().replace(" ", "_") + ".png";
            mParticle.logEvent(
                'deliver_personalisation',
                mParticle.EventType.Other,
                {
                    "Subject": user_profile.user_attributes["last View Category"],
                    "Email": user_profile.user_identities[1].value
                }
            );
            console.log("++++++Personlisation Delivered!+++++");
        }
    }
    
}

//if (!b_init) { window.addEventListener('load', mp_init(), true); }
document.addEventListener('DOMContentLoaded', fire_campaignEvent(), false);
setTimeout(function() {mp_init();}, 1000);
