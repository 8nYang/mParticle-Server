// Import each library
import mParticle from '@mparticle/web-sdk';
import appboyKit from '@mparticle/web-appboy-kit';
import googleanalyticsKit from '@mparticle/web-google-analytics-kit';
import intercomKit from '@mparticle/web-intercom-kit';
import MediaSession from '@mparticle/web-media-sdk';

var WEBKEY = localStorage.mpKey || "us2-0fa58b8b0225074ba03bab2a9297acad";

// Configure mParticle as needed for your project
const mParticleConfig = {
    //useCookieStorage: true,
    //cookieDomain: "www.tennistv.com;www.atptour.com",
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

var host = "www.tennistv.com";

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

var customerid = "98760916";
var email = "demo0916@mailinator.com";
var mobile = "+447890123456";
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
    
    var a_section_base = document.evaluate('.//*[contains(@class, "' + section_class + '") and name() = "section"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var i_section_len = 15;
    var b_section = Array(i_section_len).fill(false);
    for (var i_section = 0; i_section < a_section_base.snapshotLength; i_section++) {
        (function(i_section, b_section) {
            if (!b_section[i_section]) {
                
                var curr_section = a_section_base.snapshotItem(i_section);
                var s_section = "OneFootball News";
                var regex_gallery = /gallery/;
                var regex_viedo = /videoGallery/;
                var regex_upcoming = /upcomingMatches/;
                var regex_nav = /entityNavigation/;
                var section_class = curr_section.className;
                
                switch (true) {
                    case regex_gallery.test(section_class):
                        s_section = curr_section.getElementsByClassName(section_title_class)[0].innerText.split("\n")[0];
                        var a_topNews_base = document.evaluate('.//*[contains(@class, "' + topNews_class + '")]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        //console.log(i_section + " : " + b_section[i_section] + " -- " + a_topNews_base.snapshotLength)
                        for (var i_item = 0; i_item < a_topNews_base.snapshotLength; i_item++) {
                            (function(i_item, s_section) {
                                try {            
                                    var curr_item = a_topNews_base.snapshotItem(i_item);
                                    var a_links = curr_item.getElementsByClassName(topNews_link_class);
                                    if (a_links.length > 0) {
                                        var o_link = a_links[0];
                                        let s_newsTitle = "News Title";
                                        let s_newsPublisher = "OneFootball";
                                        let s_newsDatetime = (new Date().toISOString()).split("T")[0]+"T00:00:00+00:00";
                                        s_newsTitle = o_link.getElementsByClassName(topNews_title_class)[0].innerText;
                                        s_newsPublisher = o_link.getElementsByClassName(topNews_publisher_class)[0].innerText;
                                        s_newsDatetime = o_link.getElementsByTagName("time")[0].dateTime.replace("Z", "+00:00");
                                        o_link.addEventListener('click', (evt)=>{
                                            mParticle.logEvent(
                                                'View_Detail',
                                                mParticle.EventType.Navigation,
                                                {
                                                    "Section": s_section,
                                                    "News_Title": s_newsTitle,
                                                    "News_Source": s_newsPublisher,
                                                    "News_DateTime": s_newsDatetime,
                                                    "News_Link": o_link.href
                                                }
                                            );
                                        });
                                    
                                    }
    
                                } catch (e) {
                                    console.log(s_section + " Index: " + i_item + "\n" + e);
                                }            
                            })(i_item, s_section);

                        }
                        break;
                    case regex_upcoming.test(section_class):
                        s_section = "Upcoming Match";
                        var a_upcoming_base = document.evaluate('.//*[contains(@class, "' + upcoming_card_class + '") and name() = "a"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        for (var i_item = 0; i_item < a_upcoming_base.snapshotLength; i_item++) {
                            (function(i_item, s_section) {
                                try {
                                    var curr_item = a_upcoming_base.snapshotItem(i_item);
                                    var a_teams = curr_item.getElementsByClassName(teamname_class);
                                    var s_teams = a_teams[0].innerText.trim() + " : " + a_teams[1].innerText.trim();
                                    var s_gameDatetime = curr_item.getElementsByTagName("time").length > 0?curr_item.getElementsByTagName("time")[0].dateTime.replace("Z", "+00:00"):document.evaluate('.//*[contains(@class, "simple-match-card__match-content") and name() = "div"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText.trim();
                                    var s_gamePublisher = curr_item.getElementsByClassName(game_publisher_class)[0].innerText.trim();
                                    var s_viewType = curr_item.getElementsByClassName(game_footer_class)[0].childNodes[1].innerText.trim();
                                    curr_item.addEventListener('click', (evt)=>{
                                        mParticle.logEvent(
                                            'View_Detail',
                                            mParticle.EventType.Navigation,
                                            {
                                                "Section": s_section,
                                                "Match_Teams": s_teams,
                                                "Match_DateTime": s_gameDatetime,
                                                "Match_Publisher": s_gamePublisher,
                                                "View_Type": s_viewType,
                                                "Match_Link": curr_item.href
                                            }
                                        );
                                    });
                                } catch (e) {
                                    console.log(s_section + " Index: " + i_item + "\n" + e);
                                }
                                
                            })(i_item, s_section);
                        }
                        break;
                    case regex_viedo.test(section_class):
                        s_section = "Match Videos";
                        try {
                            
                            s_section = curr_section.getElementsByClassName(section_title_class)[0].innerText.split("\n")[0];
                            var a_video_base = document.evaluate('.//*[contains(@class, "' + video_item_class + '") and name() = "a"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            for (var i_item = 0; i_item < a_video_base.snapshotLength; i_item++) {
                                (function(i_item, s_section) {
                                    var curr_item = a_video_base.snapshotItem(i_item);
                                    var s_video_title = curr_item.getElementsByClassName(video_title_class)[0].innerText.trim();
                                    var s_video_duration = curr_item.getElementsByClassName(video_duration_class)[0].innerText.trim();
                                    var s_video_provider = curr_item.getElementsByClassName(video_footer_class)[0].innerText.trim();
                                    curr_item.addEventListener('click', (evt)=>{
                                        mParticle.logEvent(
                                            'View_Detail',
                                            mParticle.EventType.Navigation,
                                            {
                                                "Section": s_section,
                                                "Video_Title": s_video_title,
                                                "Video_Duration": s_video_duration,
                                                "Video_Provider": s_video_provider,
                                                "Video_Link": curr_item.href
                                            }
                                        );
                                    });
                                })(i_item, s_section);
                            }
                            
                        } catch (e) {
                            console.log(s_section + " Index: " + i_item + "\n" + e);
                        }
                        break;
                    case regex_nav.test(section_class):
                        s_section = "OneFootball Navigation";
                        try {
                            s_section = curr_section.getElementsByClassName(nav_title_class)[0].innerText.toLocaleLowerCase();
                            s_section = s_section.indexOf("competition") > -1?"Popular Competitions":"Most Followed Teams";
                            var a_nav_base = document.evaluate('.//*[contains(@class, "' + nav_link_class + '") and name() = "a"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            for (var i_item = 0; i_item < a_nav_base.snapshotLength; i_item++) {
                                (function(i_item, s_section) {
                                    var curr_item = a_nav_base.snapshotItem(i_item);
                                    var s_nav_title = curr_item.getElementsByClassName(nav_link_title)[0].innerText.trim();
                                    curr_item.addEventListener('click', (evt)=>{
                                        mParticle.logEvent(
                                            'View_Detail',
                                            mParticle.EventType.Navigation,
                                            {
                                                "Section": s_section,
                                                "Navigation_Title": s_nav_title,
                                                "Navigation_Link": curr_item.href
                                            }
                                        );
                                    });
                                })(i_item, s_section);
                            }
                        } catch (e) {
                            console.log(s_section + " Index: " + i_item + "\n" + e);
                        }
                        break;
                    
                }
                b_section[i_section] = true;
            }
        })(i_section, b_section);
    }
    
    
    const targetNode = document.body;
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            //console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type + "\n" + b_section);
            if ((mutation.type == "childList" && mutation.target.tagName.indexOf("OF-XPA-LAYOUT-HOME") > -1) || (mutation.type == "characterData")) {
                //console.log("Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type + "\n" + b_section);
                if (mutation.type == "characterData") { b_section = Array(i_section_len).fill(false); }
                var a_section_base = document.evaluate('.//*[contains(@class, "' + section_class + '") and name() = "section"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var i_section = 0; i_section < a_section_base.snapshotLength; i_section++) {
                    (function(i_section, b_section) {
                        if (!b_section[i_section]) {            
                            var curr_section = a_section_base.snapshotItem(i_section);
                            var s_section = "OneFootball News";
                            var regex_gallery = /gallery/;
                            var regex_viedo = /videoGallery/;
                            var regex_upcoming = /upcomingMatches/;
                            var regex_nav = /entityNavigation/;
                            var section_class = curr_section.className;
                
                            switch (true) {
                                case regex_gallery.test(section_class):
                                    s_section = curr_section.getElementsByClassName(section_title_class)[0].innerText.split("\n")[0];
                                    var a_topNews_base = document.evaluate('.//*[contains(@class, "' + topNews_class + '")]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                    //console.log(i_section + " : " + b_section[i_section] + " -- " + a_topNews_base.snapshotLength)
                                    for (var i_item = 0; i_item < a_topNews_base.snapshotLength; i_item++) {
                                        (function(i_item, s_section) {
                                            try {            
                                                var curr_item = a_topNews_base.snapshotItem(i_item);
                                                var a_links = curr_item.getElementsByClassName(topNews_link_class);
                                                if (a_links.length > 0) {
                                                    var o_link = a_links[0];
                                                    let s_newsTitle = "News Title";
                                                    let s_newsPublisher = "OneFootball";
                                                    let s_newsDatetime = (new Date().toISOString()).split("T")[0]+"T00:00:00+00:00";
                                                    s_newsTitle = o_link.getElementsByClassName(topNews_title_class)[0].innerText;
                                                    s_newsPublisher = o_link.getElementsByClassName(topNews_publisher_class)[0].innerText;
                                                    s_newsDatetime = o_link.getElementsByTagName("time")[0].dateTime.replace("Z", "+00:00");
                                                    o_link.addEventListener('click', (evt)=>{
                                                        mParticle.logEvent(
                                                            'View_Detail',
                                                            mParticle.EventType.Navigation,
                                                            {
                                                                "Section": s_section,
                                                                "News_Title": s_newsTitle,
                                                                "News_Source": s_newsPublisher,
                                                                "News_DateTime": s_newsDatetime,
                                                                "News_Link": o_link.href
                                                            }
                                                        );
                                                    });
                                    
                                                }
    
                                            } catch (e) {
                                                console.log(s_section + " Index: " + i_item + "\n" + e);
                                            }            
                                        })(i_item, s_section);

                                    }
                                    break;
                                case regex_upcoming.test(section_class):
                                    s_section = "Upcoming Match";
                                    var a_upcoming_base = document.evaluate('.//*[contains(@class, "' + upcoming_card_class + '") and name() = "a"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                    for (var i_item = 0; i_item < a_upcoming_base.snapshotLength; i_item++) {
                                        (function(i_item, s_section) {
                                            try {
                                                var curr_item = a_upcoming_base.snapshotItem(i_item);
                                                var a_teams = curr_item.getElementsByClassName(teamname_class);
                                                var s_teams = a_teams[0].innerText.trim() + " : " + a_teams[1].innerText.trim();
                                                //var s_gameDatetime = curr_item.getElementsByTagName("time").length > 0?curr_item.getElementsByTagName("time")[0].dateTime.replace("Z", "+00:00"):curr_item.getElementsByClassName("simple-match-card__info-message")[0].innerText.trim();
                                                var s_gameDatetime = curr_item.getElementsByTagName("time").length > 0?curr_item.getElementsByTagName("time")[0].dateTime.replace("Z", "+00:00"):document.evaluate('.//*[contains(@class, "simple-match-card__match-content") and name() = "div"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerText.trim();
                                                var s_gamePublisher = curr_item.getElementsByClassName(game_publisher_class)[0].innerText.trim();
                                                var s_viewType = curr_item.getElementsByClassName(game_footer_class)[0].childNodes[1].innerText.trim();
                                                curr_item.addEventListener('click', (evt)=>{
                                                    mParticle.logEvent(
                                                        'View_Detail',
                                                        mParticle.EventType.Navigation,
                                                        {
                                                            "Section": s_section,
                                                            "Match_Teams": s_teams,
                                                            "Match_DateTime": s_gameDatetime,
                                                            "Match_Publisher": s_gamePublisher,
                                                            "View_Type": s_viewType,
                                                            "Match_Link": curr_item.href
                                                        }
                                                    );
                                                });
                                            } catch (e) {
                                                console.log(s_section + " Index: " + i_item + "\n" + e);
                                            }
                                
                                        })(i_item, s_section);
                                    }
                                    break;
                                case regex_viedo.test(section_class):
                                    s_section = "Match Videos";
                                    try {
                            
                                        s_section = curr_section.getElementsByClassName(section_title_class)[0].innerText.split("\n")[0];
                                        var a_video_base = document.evaluate('.//*[contains(@class, "' + video_item_class + '") and name() = "a"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                        for (var i_item = 0; i_item < a_video_base.snapshotLength; i_item++) {
                                            (function(i_item, s_section) {
                                                var curr_item = a_video_base.snapshotItem(i_item);
                                                var s_video_title = curr_item.getElementsByClassName(video_title_class)[0].innerText.trim();
                                                var s_video_duration = curr_item.getElementsByClassName(video_duration_class)[0].innerText.trim();
                                                var s_video_provider = curr_item.getElementsByClassName(video_footer_class)[0].innerText.trim();
                                                curr_item.addEventListener('click', (evt)=>{
                                                    mParticle.logEvent(
                                                        'View_Detail',
                                                        mParticle.EventType.Navigation,
                                                        {
                                                            "Section": s_section,
                                                            "Video_Title": s_video_title,
                                                            "Video_Duration": s_video_duration,
                                                            "Video_Provider": s_video_provider,
                                                            "Video_Link": curr_item.href
                                                        }
                                                    );
                                                });
                                            })(i_item, s_section);
                                        }
                            
                                    } catch (e) {
                                        console.log(s_section + " Index: " + i_item + "\n" + e);
                                    }
                                    break;
                                case regex_nav.test(section_class):
                                    s_section = "OneFootball Navigation";
                                    try {
                                        s_section = curr_section.getElementsByClassName(nav_title_class)[0].innerText.toLocaleLowerCase();
                                        s_section = s_section.indexOf("competition") > -1?"Popular Competitions":"Most Followed Teams";
                                        var a_nav_base = document.evaluate('.//*[contains(@class, "' + nav_link_class + '") and name() = "a"]', curr_section, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                        for (var i_item = 0; i_item < a_nav_base.snapshotLength; i_item++) {
                                            (function(i_item, s_section) {
                                                var curr_item = a_nav_base.snapshotItem(i_item);
                                                var s_nav_title = curr_item.getElementsByClassName(nav_link_title)[0].innerText.trim();
                                                curr_item.addEventListener('click', (evt)=>{
                                                    mParticle.logEvent(
                                                        'View_Detail',
                                                        mParticle.EventType.Navigation,
                                                        {
                                                            "Section": s_section,
                                                            "Navigation_Title": s_nav_title,
                                                            "Navigation_Link": curr_item.href
                                                        }
                                                    );
                                                });
                                            })(i_item, s_section);
                                        }
                                    } catch (e) {
                                        console.log(s_section + " Index: " + i_item + "\n" + e);
                                    }
                                    break;
                    
                            }
                            b_section[i_section] = true;
                        }
                    })(i_section, b_section);
                }
            }
            return;
        }
    };

    const observer = new MutationObserver(callback);
    
    if(targetNode) { 
        observer.observe(targetNode, config);
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
    loginBtn.style.cssText = 'z-index:1081; cursor:pointer; font-size: 13px; height: 48px; width: 180px;position: fixed; right: 15px; top: 15px; border: none; padding: 5px 5px; background: ' + background_colour + '; color: ' + button_colour;
    loginDisplay(loginBtn);
    loginBtn.addEventListener('click', toggleLogin);
    document.body.appendChild(loginBtn);

    //Broom to clear mP data in localStorage
    var tmp = document.createElement('div');
    tmp.innerHTML = '<div style="position:fixed;bottom:0px;right:0;padding:10px;cursor:pointer;z-index:999;" onclick="for(var removeKeys=[],i=0;i<localStorage.length;i++)localStorage.key(i).match(/^mprtcl/)&&removeKeys.push(localStorage.key(i));removeKeys.forEach(e=>localStorage.removeItem(e));window.location=window.location;">🧹</div>';
    document.body.appendChild(tmp.children[0]);
    
    //Add hyper link click events
    hyperlink_events();
    
    //Track video play activities
    const targetNode = document.body;
    var b_jwplayer = false;
    var b_purchase_event = false;
    var config = { childList: true, subtree: true, characterData: true, attributes: true };
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type == "childList" && !mutation.target.className && mutation.target.tagName == "OF-XPA-LAYOUT-VIDEO") {
                b_jwplayer = false;
            }
            //console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
            //mutation.type == "attributes" && mutation.target.className.indexOf("jw-flag-cast-available") > -1
            if (mutation.type == "attributes" && mutation.target.tagName.indexOf("VIDEO") > -1 && mutation.target.className.indexOf("jw-video") > -1) {
                let a_videos = document.evaluate('.//*[@aria-label = "Video Player" and contains(@class, "jwplayer") and name() = "div"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                //console.log("General Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type + "\n" + a_videos.snapshotItem(0).id);
                if (a_videos.snapshotLength > 0) {
                    if (!b_jwplayer) {
                        var o_player = jwplayer(a_videos.snapshotItem(0).id);
                        var o_id_match = window.location.href.match(/^.+?-(\d+)$/);
                        var s_media_id, s_media_title, s_media_provider;
                        if (o_id_match && o_id_match.length > 0) {
                            s_media_id = o_id_match[1];
                        } else {
                            s_media_id = "NaN";
                        }
                        var o_media_title = document.getElementsByClassName("title__container");
                        if (o_media_title.length > 0) {
                            s_media_title = o_media_title[0].innerText;
                        } else {
                            s_media_title = "Unknown";
                        }
                        var o_media_provider = document.getElementsByClassName("news-provider__title");
                        if (o_media_provider.length > 0) {
                            s_media_provider = o_media_provider[0].innerText;
                        } else {
                            s_media_provider = "OneFootball"
                        }
                        var b_session = false;
                        var b_play = false;
                        var b_stop = false;
                        var mediaSession;
                        mediaSession = new MediaSession(
                            mParticle,                   // mParticle SDK Instance
                            s_media_id,              // Custom media ID
                            s_media_title,                   // Custom media Title
                            o_player.getDuration(),        // Duration in milliseconds
                            'Video',                     // Content Type (Video or Audio)
                            'OnDemand',                  // Stream Type (OnDemand, Live, etc.)
                            true,                        // Log Page Event Toggle (true/false)
                            true                         // Log Media Event Toggle (true/false)
                        );
                        const options = {
                            customAttributes: {
                                News_Provider: s_media_provider
                            },
                            currentPlayheadPosition: o_player.getCurrentTime(),
                        };
        
                        o_player.on('play', function(e) {
                            if (!b_play) {
                                mediaSession.duration = o_player.getDuration();
                                options.currentPlayheadPosition = o_player.getCurrentTime();
                                if (!b_session) { mediaSession.logMediaSessionStart(options); b_session = true; }
                                b_play = true;
                                b_stop = false;
                                mediaSession.logPlay(options);
                            }
                        });
                    
                        o_player.on('pause', function(e) {
                            if (!b_stop) {
                                mediaSession.duration = o_player.getDuration();
                                options.currentPlayheadPosition = o_player.getCurrentTime();
                                mediaSession.logPause(options);
                                b_play = false;
                            }
                        });
                        
                        o_player.on('complete', function(e) {
                            //mediaSession.mediaContentCompleteLimit = 100;
                            mediaSession.duration = o_player.getDuration();
                            options.currentPlayheadPosition = o_player.getCurrentTime();
                            mediaSession.logPause(options);
                            mediaSession.logMediaSessionEnd(options);
                            b_stop = true;
                            b_play = false;
                            b_session = false; 
                        });
                        
                        b_jwplayer = true;
                    }
                }
                return;
            }
        }
    };
    const observer_video = new MutationObserver(callback);
    
    if(targetNode) { 
        observer_video.observe(targetNode, config);
    }
    
    
    const callback_match = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            //console.log("Match Mutation: "+ mutation.target.tagName + " --- " + mutation.target.className + " --- " + mutation.type);
            if (mutation.type == "childList" && mutation.target.tagName == "DIV" && mutation.target.className == "ott-hero-gallery__teams") {
                if (!b_purchase_event) {
                    //Game Purchasing
                    var o_purchase_btn_base = document.evaluate('.//*[contains(@class, "' + livegame_purchase_btn_class + '") and name() = "a"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (o_purchase_btn_base.snapshotLength > 0) {
                        var o_purchase_btn = o_purchase_btn_base.snapshotItem(0);
                        try {
                            var s_livegame_provider = "OneFootball";
                            var s_livegame_teams = "OneFootball";
                            var s_livegame_competition = "OneFootball";
                            var s_livegame_datetime = "OneFootball";
                            s_livegame_provider = document.getElementsByClassName(livegame_provider_class)[0].innerText.trim();
                            s_livegame_competition = document.getElementsByClassName(livegame_competition_class)[0].innerText.trim();
                            s_livegame_datetime = document.getElementsByClassName(livegame_datetime_class)[0].dateTime.replace("Z", "+00:00");
                            s_livegame_teams = document.getElementsByClassName(livegame_teams_class)[0].innerText.split("\n\n")[0].trim() + " : " + document.getElementsByClassName(livegame_teams_class)[0].innerText.split("\n\n")[1].trim();
        
                            let s_name = s_livegame_competition + " --- " + s_livegame_teams;
                            let s_brand = s_livegame_provider;
                            let s_category = s_livegame_competition;
                            let s_sku = window.location.href.split("/")[5];
                            let f_price = 3.79;
                            let f_taxrate = 0.20;
                            let i_quantity = 1;
                            let s_coupon = null;
                            let s_action = "cart";
        
                            let o_prod_attr = {
                                "Competition": s_livegame_competition,
                                "DateTime": s_livegame_datetime,
                                "Provider": s_livegame_provider,
                                "Teams": s_livegame_teams
                            };
                            let o_order_attr = {
                                "Service_Provider": s_livegame_provider,
                                "Payment_Method": "Credit Card"
                            };
        
                            o_purchase_btn.addEventListener('click', (evt)=>{
                                mP_commerce_purchase_bind(s_name, s_sku, s_category, f_price, f_taxrate, i_quantity, s_brand, s_coupon, o_prod_attr, o_order_attr, "cart");
                            }, false);
                        } catch (e) {
                            console.log("Live Game Purchase Event Failed: " + "\n" + e);
                        }  
        
                    }
                    b_purchase_event = true;
                }
            }
        }
    };
    const observer_match = new MutationObserver(callback_match);
    
    if(targetNode) { 
        observer_match.observe(targetNode, config);
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
