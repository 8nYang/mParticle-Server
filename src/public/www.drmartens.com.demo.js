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
mParticle.init('us2-347606d5f640dd47bb2296fca9773232', mParticleConfig);
var WEBKEY = localStorage.mpKey || "us2-347606d5f640dd47bb2296fca9773232";
var host = "www.drmartens.com";
var domain = "United Kingdom";
var account = "Europe";

var item_class = "product__list__item__thumbnail thumbnail atb-product-wrapper";
var price_class = "current-price special-price bfx-price";
var add2_class = "quickAddToBagSelection__size-content";
var add2_btn_class = "bodyCopy1 js-prod-ATB";
var add2cart_btn_class = "bodyCopy1 js-prod-ATB stock_inStock ";
var add2wish_btn_class = "bodyCopy1 js-prod-ATB stock_outOfStock ";
var category_class = "breadcrumb max-width-1920";
var nav_top_base_class = "auto nav__links--primary nav__links--primary-has__sub js-enquire-has-sub";
var nav_top_link_class = "yCmsComponent nav__link js_nav__link main-nav-link";
var nav_2nd_base_class = "navigation_type1_column column-order";
var nav_2nd_item_parent_class = " level1-shop-all nav__link-shopall js__link-shopall level-one-option";
var nav_2nd_item_class = "title nav-level-2 level-one-option";
var item_sku_class = "colorValue bodyCopy1";
var item_name_class = "product-main-info__name";
var size_oos_class = "stock-outStock product-size";

var background_colour = "#000000!important";
var button_colour = "white";

var customerid = "98760911";
var email = "demo0911@mailinator.com";
var mobile = "+447890120911";
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
            email: `${email}`
        }
    };

    let callback = (e) => {
        if (e.getUser()) {
            const a = e.getUser();
            e.getPreviousUser();
            console.log("Login MPID: " + mParticle.Identity.getCurrentUser().getMPID());
            loginDisplay(btn);
            a.setUserAttribute("$FirstName", "James");
            a.setUserAttribute("$LastName", "Bond");
            a.setUserAttribute("$Mobile", mobile);
            
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
        document.evaluate('//*[contains(@class, "b4 bj")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).textContent = "Sign In";
        if (result.getUser()) {

        }
    };
    
    user_profile = {};
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
    var t = "https://" + host + "/userprofile/v1/5000011/167/262/" + e + "?fields=user_identities,user_attributes,audience_memberships",
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

function mP_eCommerce_ViewDetail(curr_item) {
    
    var o_link = curr_item.getElementsByTagName("a")[0].href;
    var o_name = curr_item.getElementsByTagName("a")[0].title;
    var f_price = (parseFloat(fetch_o_xpath(curr_item, price_class, "text").split("£")[1])).toFixed(2);
    var o_category_base = document.evaluate('//*[contains(@class, "' + category_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var s_category = o_category_base.snapshotItem(0).baseURI.replace(/^https:(.+?)en_gb\/(.+?)\/c\/.+/, "$2");
    var s_category = s_category?s_category:"all";
    var product = mParticle.eCommerce.createProduct(
        o_name,  // Name
        o_link.split("/").pop(),  // SKU
        f_price,   // Price
        null, //Quantity
        null, // Variant
        s_category, // Category
        'Dr. Martens', // Brand
        null, // Position
        null, //Coupon
        {
            "Silhouette": o_name.split(" ")[0] + " " + o_name.split(" ")[o_name.split(" ").length - 1]
        }  // attributes
    );

    var transactionAttributes = {
        //Id: 'dil-' + uuidv4(),
        Id: null,
        Revenue: f_price,
        Tax: f_price * 0.2
    };

    var customAttributes = {
    };

    var customFlags = {};

    mParticle.eCommerce.logProductAction(mParticle.ProductActionType.ViewDetail, product, customAttributes, customFlags, transactionAttributes);
    mParticle.upload();
}

function mP_commerce_quick_bind(curr_item, size, action) {
    
    var o_link = curr_item.getElementsByTagName("a")[0].href;
    var o_name = curr_item.getElementsByTagName("a")[0].title;
    var f_price = (parseFloat(fetch_o_xpath(curr_item, price_class, "text").split("£")[1])).toFixed(2);
    var o_category_base = document.evaluate('//*[contains(@class, "' + category_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var s_category = o_category_base.snapshotItem(0).baseURI.replace(/^https:(.+?)en_gb\/(.+?)\/c\/.+/, "$2");
    var s_category = s_category?s_category:"all";
    var product = mParticle.eCommerce.createProduct(
        o_name,  // Name
        o_link.split("/").pop(),  // SKU
        f_price,   // Price
        1, //Quantity
        null, // Variant
        s_category, // Category
        'Dr. Martens', // Brand
        null, // Position
        null, //Coupon
        {
            'size': size
        }  // attributes
    );

    var transactionAttributes = {
        //Id: 'dil-' + uuidv4(),
        Id: null,
        Revenue: f_price,
        Tax: f_price * 0.2
    };

    var customAttributes = {};

    var customFlags = {};

    if (action == "cart") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, product, customAttributes, customFlags, transactionAttributes);
    } else if (action == "wish") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.AddToWishlist, product, customAttributes, customFlags, transactionAttributes);
    }
    mParticle.upload();
}

function mP_commerce_purchase_bind(size, action) {
    
    var s_sku = fetch_o_xpath(document, item_sku_class, "text").replace(/[^0-9]+([0-9]+)/, "$1");
    sku = decodeURI(window.location.href).replace(/^.+\/([0-9]+)$/, "$1");
    var s_name = fetch_o_xpath(document, item_name_class, "text").split("\n")[0];
    var f_price = (parseFloat(fetch_o_xpath(document, item_name_class, "text").split("£")[1])).toFixed(2);
    var o_category_base = document.evaluate('//*[contains(@class, "' + category_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var s_category = o_category_base.snapshotItem(0).innerText.replace(/HOME  (.+)/, "$1").replaceAll(/\s\s/g, ">");
    var s_category = s_category?s_category:"all";
    var product = mParticle.eCommerce.createProduct(
        s_name,  // Name
        s_sku,  // SKU
        f_price,   // Price
        1, //Quantity
        null, // Variant
        s_category, // Category
        'Dr. Martens', // Brand
        null, // Position
        null, //Coupon
        {
            "size": size
        }  // attributes
    );

    var transactionAttributes = {
        //Id: 'dil-' + uuidv4(),
        Id: null,
        Revenue: f_price,
        Tax: f_price * 0.2
    };

    var customAttributes = {};

    var customFlags = {};

    if (action == "cart") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, product, customAttributes, customFlags, transactionAttributes);
    } else if (action == "wish") {
        mParticle.eCommerce.logProductAction(mParticle.ProductActionType.AddToWishlist, product, customAttributes, customFlags, transactionAttributes);
    }
    mParticle.upload();
}


window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'AW-380364769');

function add2_event() {
    
    const targetNode = document.getElementById("product-list");
    
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            //console.log("Target: "+ mutation.target.className + " " + mutation.type);
            if (mutation.type == 'childList' && mutation.target.className == add2_class) {
                console.log("Target: "+ mutation.target.className + " " + mutation.type);
                var o_btn_base = document.evaluate('//*[contains(@class, "' + add2_btn_class + '")]', mutation.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (o_btn_base.snapshotLength > 0) {
                    for (var i_btn = 0; i_btn < o_btn_base.snapshotLength; i_btn++) {
                        (function(i_btn) {
                            try {            
                                var curr_btn = o_btn_base.snapshotItem(i_btn);
                                var size = curr_btn.innerText;
                                var curr_item = curr_btn.closest("." + item_class.replaceAll(" ", "."));
                                if (curr_btn.className != add2wish_btn_class) {
                                    curr_btn.addEventListener('click', (evt)=>{
                                        mP_commerce_quick_bind(curr_item, size, "cart");
                                    }, false);
                                } else if (curr_btn.className == add2wish_btn_class) {
                                    curr_btn.addEventListener('click', (evt)=>{
                                        mP_commerce_quick_bind(curr_item, size, "wish");
                                    }, false);
                                }
                            } catch (e) {
                                console.log("Index: " + i_btn + "\n" + e);
                            }            
                        })(i_btn);
                    }
                }
                return;
            }
        }
    };

    const observer = new MutationObserver(callback);
    if(targetNode) { observer.observe(targetNode, config); }
    
    var size = "";
    var btn_add2cart_handler = function(){mP_commerce_purchase_bind(size, "cart")};
    const sizeNode = document.getElementById("sizeSelector");
    const sizecallback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            //console.log("Target: "+ mutation.target.className + " " + mutation.type);
            if (mutation.type == 'attributes' && mutation.target.className == "selected") {
                console.log("Target: "+ mutation.target.className + " " + mutation.type);
                size = mutation.target.innerText;    
                var o_btn_add2cart = document.getElementById("addToCartButton");
                //console.log("Size: " + size + "\n" + o_btn_add2cart);
                o_btn_add2cart.removeEventListener('click', btn_add2cart_handler, {once: true, capture: false});
                o_btn_add2cart.addEventListener('click', btn_add2cart_handler, {once: true, capture: false});
                return;
            }
        }
    };
    
    const sizeobserver = new MutationObserver(sizecallback);
    if(sizeNode) { 
        sizeobserver.observe(sizeNode, config);
        var o_oos_base = document.evaluate('//*[contains(@class, "' + size_oos_class + '") and name()="a"]', sizeNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (o_oos_base.snapshotLength > 0) {
            for (var i_oos = 0; i_oos < o_oos_base.snapshotLength; i_oos++) {
                (function(i_oos) {
                    try {            
                        var curr_oos = o_oos_base.snapshotItem(i_oos);
                        var size = curr_oos.innerText;
                        curr_oos.addEventListener('click', (evt)=>{
                            mP_commerce_purchase_bind(size, "wish");
                        }, false);
                    } catch (e) {
                        console.log("Index: " + i_btn + "\n" + e);
                    }            
                })(i_oos);
            }
        }
    }
    
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
                if(user_profile.user_attributes.personalisation) {
                    document.evaluate('//*[contains(@class, "' + personalise_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getElementsByTagName("img")[0].src="https://demo.mp.com/coop_personalisation.webp";
                }
                console.log(user_profile)
            }, 1000);
        
        }
    }

    var loginBtn = document.createElement('button');
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 12px; height: 40px; width: 280px;position: fixed; right: 0px; top: 35px; border: none; padding: 2px 5px; background: ' + background_colour + '; color: ' + button_colour;
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    var o_xpath_base = document.evaluate('//*[contains(@class, "' + item_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //o_xpath_base = document.evaluate('//*[@*[contains(name(), "data-v-2b3c993f")] and @class="item"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i_item = 0; i_item < o_xpath_base.snapshotLength; i_item++) {
        (function(i_item) {
            try {            
                var curr_item = o_xpath_base.snapshotItem(i_item);
            
                //Add to Cart event with add2cart_btn_class
                var view_product_lnk = curr_item.getElementsByTagName("a")[0];
                //console.log('+++ Clicked Btn: ' + i_item, view_product_lnk.title);
                if (view_product_lnk.title) {
                    view_product_lnk.addEventListener('click', (evt)=>{
                        mP_eCommerce_ViewDetail(curr_item);
                    }, false);
                }
            } catch (e) {
                console.log("Index: " + i_item + "\n" + e);
            }            
        })(i_item);
        
    }
    
    add2_event();
    
    //Vew product event with anchor_class
    var o_nav_top_base = document.evaluate('//*[contains(@class, "' + nav_top_base_class + '")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i_nav_top = 0; i_nav_top < o_nav_top_base.snapshotLength; i_nav_top++) {
        (function(i_nav_top) {
            try {
                
                var curr_item = o_nav_top_base.snapshotItem(i_nav_top);
                var curr_link = fetch_o_xpath(curr_item, nav_top_link_class);
                
                if (curr_link) { 
                    var curr_category = curr_link.childNodes[1].href.match(/^https:(.+?)en_gb\/(.+?)\/c\/.+/)?curr_link.childNodes[1].href.replace(/^https:(.+?)en_gb\/(.+?)\/c\/.+/, "$2"):curr_link.childNodes[1].href.replace(/^https:(.+?)en_gb\/(.+?)/, "$2");
                    curr_link.addEventListener('click', (evt)=>{
                        mParticle.logEvent(
                            'View_Category',
                            mParticle.EventType.Navigation,
                            {
                                "Url": curr_link.childNodes[1].href,
                                "Category": curr_category
                            }
                        );
                    }, false);
                    
                    if (i_nav_top < 5) {
                        var o_nav_2nd_base = document.evaluate('.//*[contains(@class, "' + nav_2nd_base_class + '")]', curr_item, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        for (var i_nav_2nd = 0; i_nav_2nd < o_nav_2nd_base.snapshotLength; i_nav_2nd++) {
                            (function(i_nav_2nd, curr_category) {
                                try {
                                    var curr_2nd_item = o_nav_2nd_base.snapshotItem(i_nav_2nd);
                                    var curr_anchors = curr_2nd_item.getElementsByTagName('a');
                                    for (var i_link = 0; i_link < curr_anchors.length; i_link++) {
                                        (function(i_link, curr_category) { 
                                            try {
                                                if (curr_anchors[i_link]) {
                                                    curr_anchors[i_link].addEventListener('click', (evt)=>{
                                                        mParticle.logEvent(
                                                            'View_Category',
                                                            mParticle.EventType.Navigation,
                                                            {
                                                                "Url": curr_anchors[i_link].href,
                                                                "Category": curr_anchors[i_link].href.match(/^https:(.+?)en_gb\/(.+?)\/c\/[^\?]+(\?[^=]+=(.+))?/)?curr_anchors[i_link].href.replace(/^https:(.+?)en_gb\/(.+?)\/c\/[^\?]+(\?[^=]+=(.+))?/, "$2/$4"):curr_category+ "/" + curr_anchors[i_link].innerText
                                                            }
                                                        );
                                                    }, false);
                                                }
                                            } catch (e) {
                                                console.log("Index: " + i_link + " Base " + curr_anchors + "\n" + e);
                                            }
                                        })(i_link);
                                    }
                                } catch (e) {
                                    console.log("Index: " + i_nav_2nd + " Base " + o_nav_2nd_base + "\n" + e);
                                }
                            })(i_nav_2nd);
                        }
                    } else {
                        var curr_anchors = curr_item.getElementsByTagName('a');
                        for (var i_link = 0; i_link < curr_anchors.length; i_link++) {
                            (function(i_link, curr_category) { 
                                try {
                                    if (curr_anchors[i_link]) {
                                        curr_anchors[i_link].addEventListener('click', (evt)=>{
                                            mParticle.logEvent(
                                                'View_Category',
                                                mParticle.EventType.Navigation,
                                                {
                                                    "url": curr_anchors[i_link].href,
                                                    "category": curr_anchors[i_link].href.match(/^https:(.+?)en_gb\/(.+?)/)?curr_anchors[i_link].href.replace(/^https:(.+?)en_gb\/(.+?)/, "$2"):curr_category+ "/" + curr_anchors[i_link].innerText
                                                }
                                            );
                                        }, false);
                                    }
                                } catch (e) {
                                    console.log("Index: " + i_link + " Base " + curr_anchors + "\n" + e);
                                }
                            })(i_link);
                        }
                    }
                }
            } catch (e) {
                console.log("Index: " + i_nav_top + " Base " + o_nav_top_base + "\n" + e);
            }
        })(i_nav_top);
    }
    
    
    
    var worker = new Worker('https://www.drmartens.com/service-worker.js');
    appboy.registerAppboyPushMessages();
    
    console.log("Event Listeners Added!");

}

function fire_campaignEvent() {
    
    var curr_location = decodeURI(window.location.href);
    var a_match = curr_location.match(/^https:\/\/www\.drmartens\.com\/\/uk\/en_gb\/?subject="(.+)"&campaign="(.+)"&medium="(.+)"&publisher="(.+)"/);
    
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
    
    var a_utm_match = curr_location.match(/^https:\/\/www\.drmartens\.com\/\/uk\/en_gb\/?utm_medium=([^&]+)&.+&utm_content=([^&]+)&utm_source=([^&]+)&utm_campaign=([^&]+)&.+/);
    
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

//document.addEventListener('DOMContentLoaded', mp_init(), true);
document.addEventListener('DOMContentLoaded', fire_campaignEvent(), false);
setTimeout(function() {mp_init();}, 1000);

