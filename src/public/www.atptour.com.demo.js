// Import each library
import mParticle from '@mparticle/web-sdk';
import appboyKit from '@mparticle/web-appboy-kit';
import googleanalyticsKit from '@mparticle/web-google-analytics-kit';
import intercomKit from '@mparticle/web-intercom-kit';
import MediaSession from '@mparticle/web-media-sdk';

var WEBKEY = localStorage.mpKey || "us2-0fa58b8b0225074ba03bab2a9297acad";

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
mParticle.init('us2-0fa58b8b0225074ba03bab2a9297acad', mParticleConfig);

var host = "www.atptour.com";
var domain = "ATP Tour";
var account = "ATP Tour";

var tnment_cal_class = "tourney-result";
var badge_mapping = {
    "1000": "ATP 1000",
    "500": "ATP 500",
    "250": "ATP 250",
    "lvr": "Laver Cup",
    "finals": "ATP Finals",
    "grandslam": "Grand Slam",
    "unitedcup": "United Cup",
    "itf": "ITF"
};

var section_class = "xpa-layout-container";
var section_title_class = "section-header__titles-container";

var topNews_class = "gallery__teaser";
var topNews_link_class = "teaser__link";
var topNews_title_class = "teaser__title";
var topNews_publisher_class = "teaser__publisher-name-text";

var upcoming_card_class = "upcoming-match-card";
var teamname_class = "simple-match-card-team__name";
var game_publisher_class = "simple-match-card__competition-name";
var game_footer_class = "simple-match-card__footer";

var video_item_class = "videos-teaser";
var video_title_class = "videos-teaser__title";
var video_duration_class = "duration-label__text";
var video_footer_class = "videos-teaser__provider";

var nav_title_class = "entity-navigation-scrollable__title";
var nav_link_class = "entity-navigation-link";
var nav_link_title = "entity-navigation-link__title";

var livegame_purchase_btn_class = "of-button of-button--ghost";
var livegame_teams_class = "ott-hero-gallery__teams";
var livegame_provider_class = "ott-hero-gallery__competition";
var livegame_competition_class = "match-info__entry-subtitle";
var livegame_datetime_class = "match-score__kickoff-time";

var video_base_class = "plyr plyr--full-ui plyr--video plyr--html5 plyr--fullscreen-enabled";
var personalise_class = "margin-btm-10 box curved display-block"

var background_colour = "#051224!important";
var button_colour = "#e1ff57";

var customerid = "98761110";
var email = "demo1110@mailinator.com";
var mobile = "+447788661110";
var user_profile = {};

var loginDisplay = function(btn) {

    var loggedInAs = mParticle.Identity.getCurrentUser() ? mParticle.Identity.getCurrentUser().getUserIdentities().userIdentities.email : null;
    //console.log(loggedInAs + " ::: " + btn.innerText);
    btn.innerText = loggedInAs ? ('Logout: Jackie (' + email + ')') : ('Log In (' + email + ')');
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
                "analytics_agreement_v6", // Document
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
            a.setUserAttribute("Favourite_Team", "Brentford");
            a.setUserAttribute("National_Team", "England");
            a.setUserAttribute("Favourite_Competition", "Premier League");
            a.setUserAttribute("Favourite_Player", "Keane Lewis-Potter");
            
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
    
    var a_section_base = document.evaluate('.//*[@class = "tourney-result"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i_section = 0; i_section < a_section_base.snapshotLength; i_section++) {
        (function(i_section) {
            try {            
                var curr_item = a_section_base.snapshotItem(i_section);
                
                const r_tnment_type = /categorystamps_([^\.]+?)\.png/;
                var tnment_type = "ATP";
                var a_match = fetch_o_xpath(curr_item, "tourney-badge-wrapper").getElementsByTagName("img")[0].src.match(r_tnment_type)
                if (a_match) { tnment_type = badge_mapping[a_match[1]]}
                
                var tnment_title= fetch_o_xpath(curr_item, "tourney-title").textContent.trim();
                var tnment_city = fetch_o_xpath(curr_item, "tourney-location").textContent.trim().split(",")[0].trim();
                var tnment_country = fetch_o_xpath(curr_item, "tourney-location").textContent.trim().split(",")[1].trim();
                var tnment_sdate = fetch_o_xpath(curr_item, "tourney-dates").textContent.trim().split(" - ")[0].trim();
                var tnment_edate = fetch_o_xpath(curr_item, "tourney-dates").textContent.trim().split(" - ")[1].trim();
                var tnment_sgl = fetch_o_xpath(curr_item, "item-details").textContent.trim().replaceAll("\n", "").replaceAll(/\ +/g, " ").match(/(SGL\s\d+)\s(DBL\s\d+)/)[1];
                var tnment_dbl = fetch_o_xpath(curr_item, "item-details").textContent.trim().replaceAll("\n", "").replaceAll(/\ +/g, " ").match(/(SGL\s\d+)\s(DBL\s\d+)/)[2];
                var tnment_crt_typ = curr_item.getElementsByClassName("item-details")[1].textContent.trim().replaceAll("\n", "").replaceAll(/\ +/g, " ");
                var tnment_award = curr_item.getElementsByClassName("item-details")[2].textContent.trim().replaceAll("\n", "").replaceAll(/\ +/g, " ");
                var tnment_link = curr_item.getElementsByClassName("tourney-title")[0];
                
                tnment_link.addEventListener('click', (evt)=>{
                    mParticle.logEvent(
                        'Follow_Tournament',
                        mParticle.EventType.Navigation,
                        {
                            "Tournament_Type": tnment_type,
                            "Tournament_Title": tnment_title,
                            "Tournament_City": tnment_city,
                            "Tournament_Country": tnment_country,
                            "Tournament_Start_Date": tnment_sdate,
                            "Tournament_End_Date": tnment_edate,
                            "Tournament_Singles": tnment_sgl,
                            "Tournament_Doubles": tnment_dbl,
                            "Tournament_Court_Type": tnment_crt_typ,
                            "Tournament_Award": tnment_award,
                            "Tournament_Link": tnment_link.href,
                            "Domain": domain,
                            "Account": account
                        }
                    );
                });

            } catch (e) {
                console.log(curr_item + " Index: " + i_section + "\n" + e);
            } 
        })(i_section);
    }
    
    if (decodeURI(window.location.href).match(/tournaments\/[^\/]+?\/[^\/]+?\/overview/)) {
        var curr_tnment = document.getElementsByClassName("player-profile-hero-dash")[0];
        var tnment_title = fetch_o_xpath(curr_tnment, "last-name", "text");
        var tnment_city = fetch_o_xpath(curr_tnment, "hero-date-range", "text").split(", ")[0].trim();
        var tnment_country = fetch_o_xpath(curr_tnment, "hero-date-range", "text").split(", ")[1].trim();
        var a_player_base = document.evaluate('.//*[@class = "action-player" and name() = "div"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i_player = 0; i_player < a_player_base.snapshotLength; i_player++) {
            (function(i_player) {
                try {
                    var curr_item = a_player_base.snapshotItem(i_player);
        
                    var lnk_image = fetch_o_xpath(curr_item, "action-image");
                    var lnk_name = fetch_o_xpath(curr_item, "action-name");
                    var s_plyr_nam = fetch_o_xpath(curr_item, "action-name", "attribute", "ga-label");
        
                    lnk_image.addEventListener('click', (evt)=>{
                        mParticle.logEvent(
                            'Follow_Player',
                            mParticle.EventType.Navigation,
                            {
                                "Tournament_Title": tnment_title,
                                "Tournament_City": tnment_city,
                                "Tournament_Country": tnment_country,
                                "Player_Name": s_plyr_nam,
                                "Player_Link": lnk_image.href,
                                "Domain": domain,
                                "Account": account
                            }
                        );
                    });
                    
                    lnk_name.addEventListener('click', (evt)=>{
                        mParticle.logEvent(
                            'Follow_Player',
                            mParticle.EventType.Navigation,
                            {
                                "Tournament_Title": tnment_title,
                                "Tournament_City": tnment_city,
                                "Tournament_Country": tnment_country,
                                "Player_Name": s_plyr_nam,
                                "Player_Link": lnk_name.href,
                                "Domain": domain,
                                "Account": account
                            }
                        );
                    });
                } catch (e) {
                    console.log("Parsing Tournament Player " + s_plyr_nam + ": " + e);
                }
                
            })(i_player);
        }
    }
    
    console.log("Observer Starts!");
    
}

function mP_eCommerce_ViewDetail(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, s_action) {
    
    var product = mParticle.eCommerce.createProduct(
        s_name,  // Name
        s_sku,  // SKU
        f_price,   // Price
        i_quantity, //Quantity
        null, // Variant
        s_category, // Category
        s_brand, // Brand
        null, // Position
        null, //Coupon
        o_prod_attr  // attributes
    );

    var transactionAttributes = {
    };
    var customAttributes = {};
    var customFlags = {};

    if (s_action == "viewdetails") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.ViewDetail, product, customAttributes, customFlags, transactionAttributes);
    } else if (s_action == "add2cart") {
        transactionAttributes = {
            Id: 'atp-' + uuidv4(),
            Revenue: f_price,
            Tax: f_price * f_tax
        };
        customAttributes = o_order_attr;
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.AddToCart, product, customAttributes, customFlags, transactionAttributes);
    }
    
    mParticle.upload();
}

function mP_commerce_purchase_bind(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, s_coupon, o_prod_attr, o_order_attr, s_action) {
    
    var product = mParticle.eCommerce.createProduct(
        s_name,  // Name
        s_sku,  // SKU
        f_price,   // Price
        i_quantity, //Quantity
        null, // Variant
        s_category, // Category
        s_brand, // Brand
        null, // Position
        s_coupon, //Coupon
        o_prod_attr  // attributes
    );

    var transactionAttributes = {
        Id: 'atp-' + uuidv4(),
        Revenue: f_price,
        Tax: f_price * f_tax
    };

    var customAttributes = o_order_attr;

    var customFlags = {};

    if (s_action == "cart") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, product, customAttributes, customFlags, transactionAttributes);
    } else if (s_action == "wish") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.AddToWishlist, product, customAttributes, customFlags, transactionAttributes);
    }
    mParticle.upload();
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
                if ("user_attributes" in user_profile && "recommended_Product" in user_profile.user_attributes && user_profile.user_attributes["recommended_Product"]) {
                    let s_personalisation = user_profile.user_attributes["recommended_Product"];
                    let s_email = user_profile.user_identities[1].value;
                    var o_personalise_base = document.evaluate('.//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (o_personalise_base.snapshotLength > 0) {
                        o_personalise_base.snapshotItem(0).getElementsByTagName("img")[0].src = "https://demo.mp.com/img/" + s_personalisation.replaceAll(" ", "_").toLowerCase() + "_7935552.jpeg";
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
                }
                console.log(user_profile)
            }, 1000);
        
        }
    }

    var loginBtn = document.createElement('button');
    loginBtn.style.cssText = 'z-index:9999; cursor:pointer; font-size: 13px; height: 48px; width: 180px;position: fixed; right: 15px; top: 1px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour;
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0px;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    //Add hyper link click events
    hyperlink_events();
    
    var worker = new Worker('https://' + host + '/service-worker.js');
    appboy.registerAppboyPushMessages();
    
    console.log("Event Listeners Added!");

}

function fire_campaignEvent() {
    
    var curr_location = decodeURI(window.location.href);
    var a_match = curr_location.match(/^https:\/\/www\.atptour\.com\/en\trounaments?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
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
    
    var a_utm_match = curr_location.match(/^https:\/\/www\.atptour\.com\/en\?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);
    
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

//if (!b_init) { window.addEventListener('load', mp_init(), true); }
document.addEventListener('DOMContentLoaded', fire_campaignEvent(), false);
setTimeout(function() {mp_init();}, 1000);
