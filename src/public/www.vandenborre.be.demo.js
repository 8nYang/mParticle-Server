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
        planId: "vb_fr",
        planVersion: 1
    },
    identityCallback: function(e) {
        e.getUser()
    }
};


// Initialize mParticle
mParticle.init('us2-5844b462fde9e846af3c4ed52516e61a', mParticleConfig);

var host = "www.vandenborre.be";

var sub_nav_class = "js-level-2-container level-2-container";
var super_nav_class = "box level-1-content js-level-1-content";
var product_class = "col-md-4 col-sm-4 col-xs-12  js-product-container product-container js-gtm-product-container margin-top-10-md margin-btm-10-md";

var curr_nav_class = "breadcrumbs js-breadcrumbs hidden-print  w-100";
var item_name_class = "col-xs-12 product-name";
var item_img_class = "col-xs-12 product-image";
var item_attr_class = "col-xs-12 product-attributes";
var item_price_class = "col-xs-12 product-price  has-characteristics";
var item_purchase_class = "col-xs-12 product-button-atc hidden-print";

var super_class = "margin-top-30-md";
var category_base_class = "accordion-image-grid accordion--mobile col-xs-12 col-sm-6 col-md-4 margin-btm-40-md margin-btm-20-sm";
var category_class = "accordion-header h2-title";
var subcategory_class = "margin-btm-5";
var home_nav_class = "box level-1-content js-level-1-content ";

var video_base_class = "plyr plyr--full-ui plyr--video plyr--html5 plyr--fullscreen-enabled";
var btn1_class = "plyr__controls__item plyr__control";

var personalise_class = "margin-btm-10 box curved display-block"

var background_colour = "#ffffff!important";
var button_colour = "#e62828";

var customerid = "98760824";
var email = "demo0824@mailinator.com";
var mobile = "+32488123454";
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
            a.setUserAttribute("$Country", "Belgium");
            a.setUserAttribute("$City", "Brussels");
            a.setUserAttribute("Region", "Anderlecht")
            
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
    
    //const targetNode = document.evaluate('//*[contains(@class, "' + popup_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    const targetNode = document.body;
    var b = {};
    var prev_index = 0;
    var b2 = false;
    
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            //if (mutation.target.className.indexOf("box level-1-content js-level-1-content") > -1) {console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);}
            //if (mutation.type == "childList" && !b_switch && document.getElementsByClassName("WebItemBtnTitle").length > 0) {
            if (mutation.type == "childList" && mutation.target.className.indexOf(sub_nav_class) > -1) {
                console.log("Sub Nav Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
                let curr_index = mutation.target.childNodes[0].className.match(/js-ajax-nav-([0-9]+)\ flex/)[1];
                if (!(curr_index in b)) {
                    b[curr_index] = false;
                }
                if (curr_index != prev_index) {b[prev_index] = false;}
                let a_category_nodes = document.evaluate('//*[contains(@class, "view-all margin-top") and contains(@data-gtm-mod, "navigation")]', mutation.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                let s_link = a_category_nodes.snapshotItem(0).href.match(/https:\/\/[^\/]+\/[^\/]+\/([^\/]+)/);
                var s_supercategory = "Generic";
                if (s_link.length > 0) {
                    let node_category = document.evaluate('//*[contains(@class, "' + home_nav_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
                    let node_category_link = document.evaluate('//*[contains(@href, "' + s_link[1] + '") and contains(@data-gtm-mod, "navigation") and @data-icon]', node_category, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (node_category_link.snapshotLength > 0) {
                        s_supercategory = node_category_link.snapshotItem(0).innerText;
                    } else {
                        console.log("++++++++++Error Link+++++++++\n" + s_link[1] + " : " + document.getElementsByClassName(category_class).length);
                    }
                    
                }
                
                let o_links = mutation.target.getElementsByTagName("a");
                if (!b[curr_index]) {
                    //console.log("++++++++++View_Category+++++++++\n" + s_supercategory + " : " + curr_index);
                    for (let j=0; j<o_links.length; j++) {
                        (function(j) {
                            o_links[j].addEventListener('click', (evt)=>{
                                mParticle.logEvent(
                                    'View_Category',
                                    mParticle.EventType.Navigation,
                                    {
                                        "Super_Category": s_supercategory,
                                        "Category": o_links[j].innerText,
                                        "Link": o_links[j].href
                                    }
                                );
                            }, false);
                        })(j);
                    }
                    
                    b[curr_index] = true;
                    prev_index = curr_index;
                }
            }
            
            //return;
        }
    };

    const observer = new MutationObserver(callback);
    
    const callback2 = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            //if (mutation.target.className.indexOf("box level-1-content js-level-1-content") > -1) {console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);}
            if (mutation.type == "attributes" && mutation.target.className.indexOf(super_nav_class) > -1 && !b2) {
                
                console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
                var a_supercategory_base = document.evaluate('//*[contains(@class, "' + super_nav_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (a_supercategory_base.snapshotLength > 0) {
                    var o_curr_supernav = a_supercategory_base.snapshotItem(0);
                    var a_superlinks = o_curr_supernav.getElementsByTagName("a");
                    for (let j=0; j < a_superlinks.length; j++) {
                        (function(j) {
                            a_superlinks[j].addEventListener('click', (evt)=>{
                                mParticle.logEvent(
                                    'View_Category',
                                    mParticle.EventType.Navigation,
                                    {
                                        "Super_Category": a_superlinks[j].innerText,
                                        "Link": a_superlinks[j].href
                                    }
                                );
                            });
                        })(j);
                    }
                }
                b2 = true;
            }
            return;
        }
    };
    
    const observer2 = new MutationObserver(callback2);
    
    if(targetNode) { 
        observer.observe(targetNode, config);
        observer2.observe(targetNode, config); 
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
            Id: 'vd-' + uuidv4(),
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
        Id: 'vd-' + uuidv4(),
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
                    var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
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
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 28px; width: 170px;position: fixed; right: 0px; top: 15px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour;
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0px;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    var a_product_base = document.evaluate('//*[contains(@class, "' + product_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i_item = 0; i_item < a_product_base.snapshotLength; i_item++) {
        (function(i_item) {
            try {            
                var curr_item = a_product_base.snapshotItem(i_item);
            
                var view_product_name = document.evaluate('.//*[contains(@class, "' + item_name_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var view_product_img = document.evaluate('.//*[@class="' + item_img_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var view_product_attr = document.evaluate('.//*[@class="' + item_attr_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var view_product_price = document.evaluate('.//*[@class="' + item_price_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var purchase_product_item = document.evaluate('.//*[@class="' + item_purchase_class + '"]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 
                let o_curr_nav = document.getElementsByClassName(curr_nav_class)[0];
                let a_categories = o_curr_nav.getElementsByTagName("li");
                let s_subcategory = a_categories[a_categories.length - 1].innerText;
                let s_category = a_categories[a_categories.length - 2].innerText;
                let s_supercategory = a_categories[a_categories.length - 3].innerText;
                let start_date = (new Date().toISOString()).split("T")[0]+"T00:00:00+00:00";
                let s_name = view_product_name.snapshotItem(0)?view_product_name.snapshotItem(0).getElementsByTagName("h3")[0].title:"Generic Product Item";
                let s_brand = s_name.split(" ")[0];
                let s_sku = curr_item.getAttribute("data-productid");
                let f_price = parseFloat(document.evaluate('.//*[contains(@class, "' + item_price_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText.split(/\s/)[1].replace(",", "."));
                let f_tax = 0.21;
                let i_quantity = 1;
                let s_coupon = null;
                let s_action = "cart";
                let a_warranties = [
                    {"id": "STD", "name": "2 years legal warranty", "price": "0", "length": "24"},
                    {"id": "VBL", "name": "Vanden Borre Life", "price": "12.99", "length": "24"},
                    {"id": "MSP", "name": "Multimedia Service Pack", "price": "6.99", "length": "24"},
                    {"id": "SPW", "name": "Service Plus Warranty", "price": "12.00", "length": "24"},
                    {"id": "DRW", "name": "Direct Replacement Warranty", "price": "5.99", "length": "24"},
                    {"id": "MSI", "name": "Multimedia or smartphone insurance", "price": "2.99", "length": "24"}
                ];
                let a_stores = [
                    {"name": "Brussels-Westland", "id": "026"},
                    {"name": "Drogenbos", "id": "002"},
                    {"name": "Brussels-Ixelles", "id": "001"},
                    {"name": "Brussels-City 2", "id": "007"},
                    {"name": "Brussels-Meiser", "id": "010"}
                ];
                //let i_ind = Math.floor(Math.random() * 6);
                let i_ind = 0;
                let i_store = Math.floor(Math.random() * 5);
                let o_prod_attr = {
                    "Super_Category": s_supercategory,
                    "Category": s_category,
                    "Sub_Category": s_subcategory,
                    "Product_Warranty": (parseInt(start_date.split("-")[0]) + 2) + start_date.substring(4,10) + "--" + a_warranties[i_ind].id + "--" + (s_name.split(" ").slice(0, 2)).toString().replaceAll(",", " "),
                    "Warranty_Name": a_warranties[i_ind].name
                };
                o_prod_attr[a_warranties[i_ind].id + "_Start_Date"] = start_date;
                o_prod_attr[a_warranties[i_ind].id + "_Length"] = a_warranties[i_ind].length;
                o_prod_attr[a_warranties[i_ind].id + "_End_Date"] = (parseInt(start_date.split("-")[0]) + 2) + start_date.substring(4);
                
                let o_order_attr = {
                    "Store_Name": a_stores[i_store].name,
                    "Store_Id": a_stores[i_store].id,
                    "Payment_Method": "Credit Card"
                };
                
                if (view_product_name.snapshotLength > 0) {
                    s_action = "add2cart";
                    view_product_name.snapshotItem(0).addEventListener('click', (evt)=>{
                        o_prod_attr.Link = view_product_name.snapshotItem(0).getElementsByTagName("a")[0].href;
                        mP_eCommerce_ViewDetail(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, "add2cart");
                    }, false);
                }
                if (view_product_img.snapshotLength > 0) {
                    s_action = "viewdetails";
                    view_product_img.snapshotItem(0).addEventListener('click', (evt)=>{
                        o_prod_attr.Link = view_product_img.snapshotItem(0).getElementsByTagName("a")[0].href;;
                        mP_eCommerce_ViewDetail(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, "viewdetails");
                    }, false);
                }
                if (view_product_attr.snapshotLength > 0) {
                    s_action = "add2cart";
                    view_product_attr.snapshotItem(0).addEventListener('click', (evt)=>{
                        o_prod_attr.Link = view_product_attr.snapshotItem(0).getElementsByTagName("a")[0].href;;
                        mP_eCommerce_ViewDetail(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, o_prod_attr, o_order_attr, "add2cart");
                    }, false);
                }
                if (purchase_product_item.snapshotLength > 0) {
                    purchase_product_item.snapshotItem(0).addEventListener('click', (evt)=>{
                        mP_commerce_purchase_bind(s_name, s_sku, s_category, f_price, f_tax, i_quantity, s_brand, s_coupon, o_prod_attr, o_order_attr, "cart");
                    }, false);
                }
            } catch (e) {
                console.log("Index: " + i_item + "\n" + e);
            }            
        })(i_item);
        
    }
    
    var a_category_base = document.evaluate('//*[contains(@class, "' + category_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var o_curr_nav = document.getElementsByClassName(curr_nav_class)[0];
    var a_categories
    if (o_curr_nav) {a_categories = o_curr_nav.getElementsByTagName("li")};
    var s_category = "Generic";
    var s_supercategory = "Generic";
    if (a_categories && a_categories.length == 2) {
        s_supercategory = a_categories[a_categories.length - 1].innerText;
    } else if (a_categories && a_categories.length == 3) {
        s_category = a_categories[a_categories.length - 1].innerText;
        s_supercategory = a_categories[a_categories.length - 2].innerText;
    }
    
    
    for (var j_item = 0; j_item < a_category_base.snapshotLength; j_item++) {
        (function(j_item) {
            try {            
                var curr_item = a_category_base.snapshotItem(j_item);
                
                var a_links = curr_item.getElementsByTagName("a");
                
                for (let j=0; j < a_links.length; j++) {
                    (function(j, curr_item) {
                        if (a_categories.length == 2) {
                        
                            let a_category = document.evaluate('.//*[contains(@class, "' + category_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            if (a_category.snapshotLength > 0) {
                                s_category = a_category.snapshotItem(0).innerText;
                            }

                        
                            if (a_links[j].className != "link" || j == a_links.length - 1) {
                                a_links[j].addEventListener('click', (evt)=>{
                                    mParticle.logEvent(
                                        'View_Category',
                                        mParticle.EventType.Navigation,
                                        {
                                            "Super_Category": s_supercategory,
                                            "Category": document.evaluate('.//*[contains(@class, "' + category_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText,
                                            "Link": a_links[j].href
                                        }
                                    );
                                });
                            } else {           
                                a_links[j].addEventListener('click', (evt)=>{
                                    mParticle.logEvent(
                                        'View_Category',
                                        mParticle.EventType.Navigation,
                                        {
                                            "Super_Category": s_supercategory,
                                            "Category": document.evaluate('.//*[contains(@class, "' + category_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText,
                                            "Sub_Category": a_links[j].title,
                                            "Link": a_links[j].href
                                        }
                                    );
                                });
                            }
                        } else if (a_categories.length == 3) {
                        
                            a_links[j].addEventListener('click', (evt)=>{
                                mParticle.logEvent(
                                    'View_Category',
                                    mParticle.EventType.Navigation,
                                    {
                                        "Super_Category": s_supercategory,
                                        "Category": s_category,
                                        "Sub_Category": a_links[j].title,
                                        "Link": a_links[j].href
                                    }
                                );
                            });

                        }
                    })(j, curr_item);
                }
                
            } catch (e) {
                console.log("Index: " + j_item + "\n" + e);
            }            
        })(j_item);
        
    }
    
    
    var mediaSession;
    let a_videos = document.getElementsByTagName("video");
    for (let j=0; j<a_videos.length; j++) {
        if (a_videos[j].hasAttribute("tabindex")) {
            var b_play = false;
            var b_stop = false
            var b_session = false;
            var mediaTitle = "Promotion Introduction";
            if (a_videos[j].parentElement.parentElement.parentElement.getElementsByClassName("ytp-title-link yt-uix-sessionlink").length > 0) { 
                mediaTitle = a_videos[j].parentElement.parentElement.parentElement.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0].innerText;
            }
            mediaSession = new MediaSession(
                mParticle,                   // mParticle SDK Instance
                a_videos[j].src.split("/") > 0?a_videos[j].src.split("/")[a_videos[j].src.split("/").length -1]:a_videos[j].tabindex,              // Custom media ID
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

    
    var worker = new Worker('https://' + host + '/service-worker.js');
    appboy.registerAppboyPushMessages();
    
    console.log("Event Listeners Added!");

}

function fire_campaignEvent() {
    
    var curr_location = decodeURI(window.location.href);
    var a_match = curr_location.match(/^https:\/\/www\.vandenborre\.be\/fr\?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
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
    
    var a_utm_match = curr_location.match(/^https:\/\/www\.vandenborre\.be\/fr\?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);
    
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
        var o_personalise_base = document.evaluate('//*[contains(@class, "' + personalise_class + '") and @data-gtm-action = "dossier homepage - 3 - small"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
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
setTimeout(function() {mp_init();hyperlink_events();}, 1000);
