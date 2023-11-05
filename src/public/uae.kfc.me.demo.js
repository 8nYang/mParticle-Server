// Import each library
import mParticle from '@mparticle/web-sdk';
import appboyKit from '@mparticle/web-appboy-kit';
import googleanalyticsKit from '@mparticle/web-google-analytics-kit';
import intercomKit from '@mparticle/web-intercom-kit';
import MediaSession from '@mparticle/web-media-sdk';

var WEBKEY = localStorage.mpKey || "us2-5844b462fde9e846af3c4ed52516e61a";

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

var host = "uae.kfc.me";

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

var background_colour = "#000000!important";
var button_colour = "#e1ff57";

var customerid = "98760101";
var email = "demo0101@mailinator.com";
var mobile = "+971529870101";
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
            a.setUserAttribute("$Country", "United Arab Emirates");
            a.setUserAttribute("$City", "Dubai");
            
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
    
    //const targetNode = document.evaluate('//*[contains(@class, "' + base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    /*const targetNode = document.body;
    
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            //console.log("Target: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);   
            //console.log("++++++Switch Before Event+++++ : " + b_switch + " --- " + document.getElementById("homePageWrapper"));    
            //if (mutation.type == "childList" && !b_switch && document.getElementsByClassName("WebItemBtnTitle").length > 0) {
            if (mutation.type == "attributes" && !b_switch && document.getElementsByClassName("WebItemBtnTitle").length > 0) {
                console.log("Target: "+ document.getElementById("homePageWrapper").childElementCount + " " + mutation.target.id + " " + mutation.type);
                //personalise_banner();
                var o_item_base = document.getElementsByClassName("WebItemBtnTitle");
                for (let j = 0; j < o_item_base.length; j++) {
                    if (o_item_base[j]) {
                        if (o_item_base[j].href) {
                            let item_id = o_item_base[j].href.match(/[^(]+\((\d+)\).*$/)[1];
                            o_item_base[j].addEventListener('click', (evt)=>{
                                view_detail(item_id);
                            });
                        }
                    }
                }
                b_switch = true;
                //console.log("++++++Switch After Event+++++ : " + b_switch);
            }
            if (mutation.type == "attributes" && !b_add2cart_switch && document.getElementsByClassName("deal_cartbtn").length > 0) {
                console.log("Target: "+ document.getElementsByClassName("deal_cartbtn").length + " " + mutation.target.id + " " + mutation.target.type);
                //personalise_banner();
                var o_item_base = document.getElementsByClassName("deal_cartbtn");
                for (let j = 0; j < o_item_base.length; j++) {
                    if (o_item_base[j]) {
                        let item_id = "-" + window.location.hash.split("-")[1];
                        o_item_base[j].addEventListener('click', (evt)=>{
                            purchase(item_id);
                        });
                    }
                }
                if (document.getElementById("container_inner").style.display != 'none') { b_add2cart_switch = true }
                //console.log("++++++Switch After Event+++++ : " + b_switch);
            }
            return;
        }
    };

    const observer = new MutationObserver(callback);
    if(targetNode) { observer.observe(document, config); }*/
    
    var o_add2cart_base = document.evaluate('//*[contains(@class, "ProductTile_addToCart__")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    
    
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
            Id: '1fb-' + uuidv4(),
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
        Id: '1fb-' + uuidv4(),
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
                var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (o_personalise_base.snapshotLength > 0) {
                    o_personalise_base.snapshotItem(0).getElementsByTagName("source")[0].srcset="https://demo.mp.com/" + user_profile.user_attributes["last View Category"].toLowerCase().replace(" ", "_") + ".png";
                }
                console.log(user_profile)
            }, 1000);
        
        }
    }

    var loginBtn = document.createElement('button');
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 28px; width: 170px;position: fixed; right: 0px; top: 20px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour;
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    
    /*var o_category_base = document.getElementById("catNavPrimary");
    for (let i = 0; i < o_category_base.childElementCount; i++) {
        if (o_category_base.children[i]) {
            o_category_base.children[i].addEventListener('click', (evt)=>{
                curr_sub_category = evt.target.innerText;
                b_switch = false;
                b_add2cart_switch = false;
                mParticle.logEvent(
                    'View_Category',
                    mParticle.EventType.Navigation,
                    {
                        "Category": "Meal",
                        "Sub_Category": evt.target.innerText,
                        "Link": "https://uae.kfc.me/#/menu/" + document.cr_acts[i].args.itm.ID + "/"
                    }
                );
            });
        }
    }*/
    
    var o_category_base = document.getElementsByClassName("MediaGrid_blockItem__2_SMO");
        for (let i = 0; i < o_category_base.length; i++) {
            if (o_category_base[i]) {
                o_category_base[i].addEventListener('click', (evt)=>{
                    curr_sub_category = evt.target.innerText;
                    b_switch = false;
                    b_add2cart_switch = false;
                    mParticle.logEvent(
                        'View_Category',
                        mParticle.EventType.Navigation,
                        {
                            "Category": "Meal",
                            "Sub_Category": evt.target.innerText,
                            "Link": evt.target.href
                        }
                    );
                });
            }
        }
    
    var worker = new Worker('https://uae.kfc.me/mp-service-worker.js');
    appboy.registerAppboyPushMessages();
    
    console.log("Event Listeners Added!");

}

function fire_campaignEvent() {
    
    var curr_location = decodeURI(window.location.href);
    var a_match = curr_location.match(/^https:\/\/uae\.kfc\.me\/en\/home\?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
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
    
    var a_utm_match = curr_location.match(/^https:\/\/uae\.kfc\.me\/en\/home\?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);
    
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

function view_detail(item_id) {
    var product = mParticle.eCommerce.createProduct(
        document.cr_acts[item_id].args.itm.Description,  // Name
        document.cr_acts[item_id].args.itm.ID,  // SKU
        parseFloat(document.cr_acts[item_id].args.itm.Price,10),   // Price
        null, //Quantity
        null, // Variant
        "Meal", // Category
        'KFC', // Brand
        null, // Position
        null, //Coupon
        {}  // attributes
    );

    var transactionAttributes = {
        //Id: 'dil-' + uuidv4(),
        Id: null,
        Revenue: document.cr_acts[item_id].args.itm.Price,
        Tax: (parseFloat(document.cr_acts[item_id].args.itm.Price,10) * 0.05).toFixed(2)
    };

    var customAttributes = {};

    var customFlags = {};

    mParticle.eCommerce.logProductAction(mParticle.ProductActionType.ViewDetail, product, customAttributes, customFlags, transactionAttributes);
    mParticle.upload();
}

function purchase(item_id){
    
    var item_name = document.getElementsByClassName("mb_tt_pp")[0].children[0].innerText;
    var item_price = (parseFloat(document.getElementById("productCustomizeTotalDealPrice").innerText, 10));
    
    var product = mParticle.eCommerce.createProduct(
        item_name,  // Name
        item_id,  // SKU
        item_price.toFixed(2),   // Price
        parseInt(document.getElementById("productCustomizeDealQty").innerText, 10), //Quantity
        null, // Variant
        "Meal", // Category
        'KFC', // Brand
        null, // Position
        null, //Coupon
        {
            "Sub_Category": curr_sub_category,
            "Purchasable": "True",
            "Customised": "True"
        }  // attributes
    );
    
    var product_delivery = mParticle.eCommerce.createProduct(
        "Delivery",  // Name
        "900000-1",  // SKU
        9.00,   // Price
        1, //Quantity
        null, // Variant
        "Service", // Category
        'KFC', // Brand
        null, // Position
        null, //Coupon
        {
            "Sub_Category": "Carhop",
            "Purchasable": "True"
        }  // attributes
    );

    var transactionAttributes = {
        //Id: 'dil-' + uuidv4(),
        Id: "web-" + uuidv4(),
        Revenue: (item_price + 9.00).toFixed(2),
        Tax: ((item_price + 9.00) * 0.05).toFixed(2)
    };

    var customAttributes = {
        "Serve_Category": "Delivery",
        "Store_Name": "Nashma - KFC",
        "Store_ID": "1337",
        "Payment_Type": "Apple Pay",
        "Payment_Device": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        "Order_Platform": "Web"
    };

    var customFlags = {};

    mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, [product, product_delivery], customAttributes, customFlags, transactionAttributes);
    mParticle.upload();
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
//setTimeout(function() {mp_init();hyperlink_events()}, 5000);
