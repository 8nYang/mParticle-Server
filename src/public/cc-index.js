let cart =[]
var cur_mpid=""
var user_profile={}

document.addEventListener('DOMContentLoaded',()=>{

  let webKeyText = document.getElementById('web-key')
  webKeyText.value = WEBKEY

  // Web Key Management
  document.getElementById('update-web-key').addEventListener("submit",(e)=>{
    e.preventDefault()
    localStorage.mpKey = e.target[0].value
    WEBKEY = e.value
    location.reload()
  })

  // Clear cookies
  document.getElementById('clear-cookies').addEventListener("click",()=>{
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.includes("mprtcl-")){localStorage.removeItem(key)}
    }
  })

  // Clear Test Users
  document.getElementById('clear-test-users').addEventListener("click",()=>{
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.includes("mpTestUser_")){localStorage.removeItem(key)}
    }
  })

  // Login
  document.getElementById('form-1').addEventListener('submit',(e)=>{
    e.preventDefault()
    //declare user identities
    var identityRequest = {
      userIdentities: {
        //customerid: `${e.target[0].value}-Test${e.target[1].value[2]}`,
        //email: `${e.target[0].value}-Test${e.target[1].value[2]}@mp.com`
        mobile_number: `${e.target[0].flag?e.target[0].value:''}`,
        customerid: `${e.target[1].flag?e.target[1].value:''}`,
        email: `${e.target[2].flag?e.target[2].value:''}`
      }
    }
    let callback = (result) => {
      console.log("MPID: ",result.body.mpid," UserIdenty: ",result.getUser().getUserIdentities().userIdentities)
      if (result.getUser()) {
         //IDSync request succeeded, mutate attributes or query for the MPID as needed
        const currentMParticleUser = result.getUser();
        console.log("Current User: ",currentMParticleUser)
        console.log("Current User GDPR Consent: ", currentMParticleUser.getConsentState())
        const previousMParticleUser = result.getPreviousUser();
        console.log("Previous User: ",previousMParticleUser)
        request_user_profile(currentMParticleUser.getMPID())
        //updateUserIdentites(result.getUser())
        return;
      }

      const codes = window.mParticle.Identity.HTTPCodes;
      switch (result.httpCode) {
        case codes.noHttpCoverage: // retry the IDSync request break;
        case codes.activeIdentityRequest:
        case 429:
            //inspect your implementation if this occurs frequency
            //otherwise retry the IDSync request
          break;
        case codes.validationIssue:
        case 400:
          console.log(result.body);
            // inspect result.body to determine why the request failed
            // this typically means an implementation issue
          break;
        default:
       }
     };
    mParticle.Identity.login(identityRequest,callback)
  })

  // Logout
  document.getElementById('logout').addEventListener('click',()=>{
    let callback = (result) => {
      if (result.getUser()) {
        resetUserIdentities(result.getUser())
        user_profile = {}
      }
    }
    mParticle.Identity.logout({},callback)
  })

  //Add User Attribute
  document.getElementById('ua-add').addEventListener('click',(e)=>{
    let keyHTML = document.getElementById('ua-key')
    let valueHTML = document.getElementById('ua-value')
    var currentUser = mParticle.Identity.getCurrentUser()
    currentUser.setUserAttribute(keyHTML.value,valueHTML.value)
    updateUserIdentities(currentUser)
  })

  //Product  Action
  document.getElementById('add-to-cart').addEventListener('submit',(e)=>{
    e.preventDefault()
    var product = mParticle.eCommerce.createProduct(
      e.target[0].value,  // Name
      "-387000",  // SKU
      (parseFloat(e.target[1].value,10)).toFixed(2),   // Price
      parseInt(e.target[3].value), //Quantity
      null, // Variant
      e.target[2].value, // Category
      "KFC", // Brand
      null, // Position
      e.target[4].value, //Coupon
      {   
        "Sub_Category": "For Sharing",
        "Purchasable": "True",
        "Customised": "False"
      }
      // attributes
    );
    //console.log("Coupon: "+e.target[4].value);
    if (["Delivery", "Carhop"].indexOf(e.target[5].value) > -1) {
      var product2 = mParticle.eCommerce.createProduct(
        e.target[5].value,  // Name
        e.target[5].value == "Carhop"?"900000-2":"900000-1",  // SKU
        9.00,   // Price
        1, //Quantity
        null, // Variant
        "Service", // Category
        "KFC", // Brand
        null, // Position
        null, //Coupon
        {   
          "Sub_Category": e.target[5].value,
          "Purchasable": "True",
        }
        // attributes
      );
    }
    if (e.target[12].value  == "AddToCart"){
      cart.push(product)
      if (product2) {cart.push(product2)}
      let productDOM = document.createElement("div");
      productDOM.id = product.Sku
      console.log(product)
      productDOM.innerHTML = `
        {</br>
          &nbsp;&nbsp;&nbsp;&nbsp;Name: ${product.Name},</br>
          &nbsp;&nbsp;&nbsp;&nbsp;Price: ${product.Price},</br>
          &nbsp;&nbsp;&nbsp;&nbsp;Quantity: ${parseInt(product.Quantity,10)},</br>
        }</br>
      `;
      if (product2) {
        productDOM.innerHTML += `
          {</br>
            &nbsp;&nbsp;&nbsp;&nbsp;Name: ${product2.Name},</br>
            &nbsp;&nbsp;&nbsp;&nbsp;Price: ${product2.Price},</br>
            &nbsp;&nbsp;&nbsp;&nbsp;Quantity: ${parseInt(product2.Quantity,10)},</br>
          }</br>
        `;
      }
      let removeFromCart = document.createElement('button')
      removeFromCart.type = 'button'
      removeFromCart.className = 'remove-from-cart'
      removeFromCart.innerHTML = 'Remove'
      removeFromCart.id = product.Sku
      removeFromCart.addEventListener('click',(e)=>{
        remove(e)
      })
      productDOM.appendChild(removeFromCart)
      document.getElementById('cart').appendChild(productDOM)
    }
    var customFlags = {
      'DoubleClick.Counter': 'standard',
      'Facebook.EventSourceURL': 'https://demo.mp.com/'
    }
    if (e.target[12].value != "Impression"){
      var customAttributes = {
        "Payment_Type" : document.getElementById('payment').options[document.getElementById('payment').selectedIndex].value,
        "Serve_Category": document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value,
        "Store_ID": document.getElementById('Store_ID').value,
        "Store_Name": document.getElementById('outlet').options[document.getElementById('outlet').selectedIndex].value
      }; // if not passing any custom attributes, pass null
      if (document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value == "Carhop") {
        customAttributes.Car_Plate_Number = document.getElementById('car_no').value,
        customAttributes.Car_Colour = document.getElementById('car_colour').value,
        customAttributes.Car_Maker = document.getElementById('car_maker').value
      }
      mParticle.eCommerce.logProductAction(mParticle.ProductActionType[e.target[12].value], product2?[product, product2]:product, customAttributes, customFlags)
    }
    else {
      var impression = mParticle.eCommerce.createImpression('Suggested Products List', product);
      mParticle.eCommerce.logImpression(impression)
    }

  })

  //removeFromCart
  function remove(e){
    let id = e.target.id
    let removeThis = cart.find(product=>product.Sku == id)
    document.getElementById(id).remove();
    var customFlags = {
      'DoubleClick.Counter': 'standard',
      'Facebook.EventSourceURL': 'https://demo.mp.com/'
    }
    mParticle.eCommerce.logProductAction(mParticle.ProductActionType.RemoveFromCart, removeThis, {}, customFlags)
    cart = cart.filter((product)=>product.Sku !== id)
  }

  //Log Purchase Event
  document.getElementById('purchase-event').addEventListener('click',(e)=>{

    let totalPrice = 0
    var couponCode = null
    cart.forEach(product=>{
        totalPrice=totalPrice + parseFloat(product.Price,10) * parseInt(product.Quantity,10)
        couponCode = product.CouponCode?product.CouponCode:couponCode
        //console.log("Coupou: " + product.CouponCode)
    })

    var transactionAttributes = {
        Id: `CC-${Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000}`,
        Revenue: couponCode?parseFloat(totalPrice,10).toFixed(2) * 0.8:parseFloat(totalPrice,10).toFixed(2),
        Tax: couponCode?(parseFloat(totalPrice,10)*0.05).toFixed(2) * 0.8:(parseFloat(totalPrice,10)*0.05).toFixed(2),
        CouponCode: couponCode //coupon
    };

    if (!(cart.length===0)){
      var customAttributes = {
        "Payment_Type" : document.getElementById('payment').options[document.getElementById('payment').selectedIndex].value,
        "Serve_Category": document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value,
        "Store_ID": document.getElementById('Store_ID').value,
        "Store_Name": document.getElementById('outlet').options[document.getElementById('outlet').selectedIndex].value,
        "Order_Platform": "Call Centre"
      }; // if not passing any custom attributes, pass null
      if (document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].value == "Carhop") {
        customAttributes.Car_Plate_Number = document.getElementById('car_no').value,
        customAttributes.Car_Colour = document.getElementById('car_colour').value,
        customAttributes.Car_Maker = document.getElementById('car_maker').value
      }
      // ADD CUSTOM FLAGS
      var customFlags = {
        'Facebook.EventSourceURL': "https://demo.mp.com/"
      }
      console.log("Coupon: " + couponCode)
      mParticle.eCommerce.logProductAction(
          mParticle.ProductActionType.Purchase,
          cart,
          customAttributes,
          customFlags,
          transactionAttributes);
      cart = []
      document.getElementById('cart').innerHTML = `<h2>Cart:</h2>`
    };
  })

  //Log Generic Event
  /*document.getElementById('search-event').addEventListener('click',(e)=>{
    mParticle.logEvent(
      'search',
      mParticle.EventType.Search,
      {
        "genderGroup": "men",
        "productGroup": "Clothing",
        "productType": "Blazers",
        "brand": "Gant"
      },
      {'Facebook.EventSourceUrl': "https://demo.mp.com/" }
    );
  })

  //Log Page View
  document.getElementById('page-view-event').addEventListener('click',(e)=>{
    mParticle.logEvent('view', mParticle.EventType.Navigation,
      {
        "genderGroup": "women",
        "productGroup": "Face + Body",
        "productType": "Fragrances",
        "brand": "Cantu"
      },
      {'Facebook.EventSourceUrl': "https://demo.mp.com/" }
    )
  })*/

})

function updateUserIdentities(user){
  let identities = user.getUserIdentities().userIdentities
  let consentState = user.getConsentState()
  let table = document.getElementById('current-user')
  let table2 = document.getElementById('user-profile')
  let mPcookies = Object.keys(localStorage).filter((propertyName)=>{return propertyName.indexOf("mprtcl") === 0;});
  let mpid = user.getMPID()
  cur_mpid = mpid
  let das = ""
  mPcookies.forEach((cookie)=>{
    if(localStorage[cookie] && localStorage[cookie].includes("|")){
      if(localStorage[cookie].split("|").find((e)=>{return e.includes("dt")}).split(":")[1] == `'${WEBKEY}'`){
        das = localStorage[cookie].split("|").find((e)=>{return e.includes("das")}).split(":")[1].replace(/'/g,"")
        return
      }
    }
  })
  if (Object.keys(user_profile).length === 0) {
    table.children[0].children[0].children[1].innerText = mpid
    table.children[0].children[1].children[1].innerText = identities.customerid ? identities.customerid : ""//Customer ID
    table.children[0].children[2].children[1].innerText = identities.email ? identities.email : ""//Email
    table.children[0].children[3].children[1].innerText = identities.mobile_number ? identities.mobile_number : "" //Mobile
  } else {
    console.log("+++++Reading from Profile API+++++");
    let ui = Object.fromEntries(new Map(user_profile.user_identities.map(object => {return [object.type, object.value]})))
    table.children[0].children[0].children[1].innerText = user_profile.mpid
    table.children[0].children[1].children[1].innerText = ui.customer_id ? ui.customer_id : ""//Customer ID
    table.children[0].children[2].children[1].innerText = ui.email ? ui.email : ""//Email
    table.children[0].children[3].children[1].innerText = ui.mobile_number ? ui.mobile_number : "" //Mobile
    table2.children[0].children[1].children[0].innerText = user_profile.user_attributes["$FirstName"]?user_profile.user_attributes["$FirstName"]:""
    table2.children[0].children[1].children[1].innerText = user_profile.user_attributes["$LastName"]?user_profile.user_attributes["$LastName"]:""
    table2.children[0].children[1].children[2].innerText = user_profile.user_attributes["no."]?user_profile.user_attributes["no."]:""
    table2.children[0].children[1].children[3].innerText = user_profile.user_attributes["building"]?user_profile.user_attributes["building"]:""
    table2.children[0].children[1].children[4].innerText = user_profile.user_attributes["region"]?user_profile.user_attributes["region"]:""
    table2.children[0].children[1].children[5].innerText = user_profile.user_attributes["$Mobile"]?user_profile.user_attributes["$Mobile"]:""
    table2.children[0].children[3].children[0].innerText = user_profile.user_attributes["cltv"]?user_profile.user_attributes["cltv"]:""
    table2.children[0].children[3].children[1].innerText = user_profile.user_attributes["average Order Value"]?(parseFloat(user_profile.user_attributes["average Order Value"],10)).toFixed(2):"0"
    table2.children[0].children[3].children[2].innerText = user_profile.user_attributes["# Orders"]?user_profile.user_attributes["# Orders"]:"0"
    table2.children[0].children[3].children[3].innerText = user_profile.user_attributes["# Orders via Call Centre"]?user_profile.user_attributes["# Orders via Call Centre"]:"0"
    table2.children[0].children[3].children[4].innerText = user_profile.user_attributes["# Delivery"]?user_profile.user_attributes["# Delivery"]:"0"
    table2.children[0].children[3].children[5].innerText = user_profile.user_attributes["# Carhop"]?user_profile.user_attributes["# Carhop"]:"0"
    table2.children[0].children[5].children[0].innerText = user_profile.user_attributes["last Order Time"]?user_profile.user_attributes["last Order Time"].split(".")[0]:""
    table2.children[0].children[5].children[1].innerText = user_profile.user_attributes["last Order Meal"]?user_profile.user_attributes["last Order Meal"]:""
    table2.children[0].children[5].children[2].innerText = user_profile.user_attributes["last Order Store"]?user_profile.user_attributes["last Order Store"]:""
    table2.children[0].children[5].children[3].innerText = user_profile.user_attributes["last Order Serving Method"]?user_profile.user_attributes["last Order Serving Method"]:""
    table2.children[0].children[5].children[4].innerText = user_profile.user_attributes["last Order Value"]?user_profile.user_attributes["last Order Value"]:"0"
    table2.children[0].children[5].children[5].innerText = user_profile.user_attributes["last Payment Method"]?user_profile.user_attributes["last Payment Method"]:""
    table2.children[0].children[7].children[0].innerText = user_profile.user_attributes["preferred Meal"]?user_profile.user_attributes["preferred Meal"]:""
    table2.children[0].children[7].children[1].innerText = user_profile.user_attributes["preferred Store"]?user_profile.user_attributes["preferred Store"]:""
    table2.children[0].children[7].children[2].innerText = user_profile.user_attributes["preferred Order Serving Method"]?user_profile.user_attributes["preferred Order Serving Method"]:""
    table2.children[0].children[7].children[3].innerText = user_profile.user_attributes["preferred Payment Method"]?user_profile.user_attributes["preferred Payment Method"]:""
    table2.children[0].children[7].children[4].innerText = user_profile.user_attributes["next_Best_Offer"]?user_profile.user_attributes["next_Best_Offer"]:""
    table2.children[0].children[7].children[5].innerText = user_profile.user_attributes["# Coupon Claims"]?user_profile.user_attributes["# Coupon Claims"]:""
  }
  //table.children[0].children[5].children[1].innerText = consentState ? consentState.getCCPAConsentState().Consented : "None Yet"
  //localStorage[`mpTestUser_${mpid}`] = `cid:${identities.customerid ? identities.customerid : ""}|email:${identities.email ? identities.email : ""}|das:${das}|consented:${consentState ? consentState.getCCPAConsentState().Consented : ""}`
  localStorage[`mpTestUser_${mpid}`] = `cid:${identities.customerid ? identities.customerid : ""}|email:${identities.email ? identities.email : ""}|das:${das}`
  let userAttributes = document.getElementById('user-attributes')
  userAttributes.innerText = ""
  let mpUA = user.getAllUserAttributes()
  for (let [key, value] of Object.entries(mpUA)) {
    let row = document.createElement('tr')
    row.innerHTML = `<tr>
      <td>${key} :<td>
      <td>${value}<td>
    <tr>`
    let removeUA = document.createElement('input')
    removeUA.type = 'button'
    removeUA.className = 'remove-attribute'
    removeUA.value = 'Remove'
    removeUA.id = key
    removeUA.addEventListener('click',(e)=>{
      user.removeUserAttribute(key);
      location.reload()
    })
    row.appendChild(removeUA)
    userAttributes.appendChild(row)
  }
  updatePreviousUsersTable()
  //updateUserAudienceMembershipTable(user_profile)
}

//Show previous users
let updatePreviousUsersTable = ()=> {
  let table = document.getElementById('previous-users')
  table.innerHTML = ""
  let objArr = []
  for (const [key, value] of Object.entries(localStorage)) {
    if (key.includes("mpTestUser_")){
      let customerInfo = value.split("|")
      let obj = {
        mpid: key.split("mpTestUser_")[1],
        cid: customerInfo[0].split(':')[1] == "" ? "n/a" : customerInfo[0].split(':')[1],
        email: customerInfo[1].split(':')[1] == "" ? "n/a" : customerInfo[1].split(':')[1],
        das: customerInfo[2].split(':')[1] == "" ? "n/a" : customerInfo[2].split(':')[1]
      }
      objArr.push(obj)
    }
  }
  objArr.sort((a,b)=>{return (a.cid < b.cid) ? -1 : (a.cid > b.cid) ? 1 : 0;}).forEach(obj=>{
    let row = document.createElement('tr')
    let mpid = document.createElement('td')
    mpid.innerText = obj.mpid
    let cid = document.createElement('td')
    cid.innerText = obj.cid
    let email = document.createElement('td')
    email.innerText = obj.email
    let das = document.createElement('td')
    das.innerText = obj.das
    row.appendChild(mpid)
    row.appendChild(cid)
    row.appendChild(email)
    row.appendChild(das)
    table.appendChild(row)
  })
}

function updateUserAudienceMembershipTable(user_profile) {
  let table = document.getElementById('user-audiences-body')
  table.innerHTML = ""
  let objArr = []
  for (let i=0; i < user_profile.audience_memberships.length; i++) {
    let row = document.createElement('tr')
    let audience_id = document.createElement('td')
    audience_id.innerText = user_profile.audience_memberships[i].audience_id
    let audience_name = document.createElement('td')
    audience_name.innerText =  user_profile.audience_memberships[i].audience_name
    row.appendChild(audience_id)
    row.appendChild(audience_name)
    table.appendChild(row)
  }
}

const request_token = async () => {
    
    var cache= {}
    
    const url = 'https://demo.mp.com/oauth/token'
    const data = { 
        //'client_id': "ek5YNb8bmI4XnLz4wpnkVMEQyrfxAxlc",
        'client_id': "wawVx2Ejl0K2FUo79pyr6CQWyRmEuXSE",
        //'client_secret': "9-LG8fYG9NwtzS58MGDbLZuhT4MkSx1Zf5V_l7C9qpz29GyJnfrLYfXT37GlFC1i",
        'client_secret': "zK57_GIo6de0UHThW7iVEac3d6od4pRVDD0GbAcuaEpRZtlBTeXw0bxYf4KIhhvA",
        'audience': 'https://api.mparticle.com',
        'grant_type': 'client_credentials'
    }

    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: 'cors',
        method: "POST"
    }
    
    var response = await fetch(url, options)
    cache = await response.json()
    localStorage.access_token = cache.access_token
    localStorage.token_expiration = Date.now() + (cache.expires_in - 60) * 1000
    
}

const request_user_profile = async (mpid) => {
    
    if (!localStorage.access_token || localStorage.access_token == "" || 
        !localStorage.token_expiration || localStorage.token_expiration == "" 
        || localStorage.token_expiration < Date.now()) {
        await request_token();
    }
    //console.log("Token: " + localStorage.access_token)
    const orgId = "5000011"
    const accountId = "167"
    const workspaceId = "205"
    var cache = {}
    
    
    const url = `https://demo.mp.com/userprofile/v1/${orgId}/${accountId}/${workspaceId}/${mpid}?fields=user_identities,user_attributes,audience_memberships`

    const options = {
        headers: new Headers({
            "Authorization": `Bearer ${localStorage.access_token}`,
        }),
        method: "GET"
    }
    
    var response = await fetch(url, options)
    cache = await response.json()
    user_profile = await cache
    console.log("User Profile: " + JSON.stringify(user_profile))
    if(!user_profile.errors) {
      updateUserAudienceMembershipTable(user_profile)
      updateUserIdentities(mParticle.Identity.getCurrentUser());
    } else {
      resetUserIdentities(mParticle.Identity.getCurrentUser())
    }
}

function resetUserIdentities(user){
  let table = document.getElementById('current-user')
  let table2 = document.getElementById('user-profile')
  table.children[0].children[0].children[1].innerText = user.getMPID()
  table.children[0].children[1].children[1].innerText = ""
  table.children[0].children[2].children[1].innerText = ""
  table.children[0].children[3].children[1].innerText = ""
  table2.children[0].children[1].children[0].innerText = ""
  table2.children[0].children[1].children[1].innerText = ""
  table2.children[0].children[1].children[2].innerText = ""
  table2.children[0].children[1].children[3].innerText = ""
  table2.children[0].children[1].children[4].innerText = ""
  table2.children[0].children[1].children[5].innerText = ""
  table2.children[0].children[3].children[0].innerText = ""
  table2.children[0].children[3].children[1].innerText = ""
  table2.children[0].children[3].children[2].innerText = ""
  table2.children[0].children[3].children[3].innerText = ""
  table2.children[0].children[3].children[4].innerText = ""
  table2.children[0].children[3].children[5].innerText = ""
  table2.children[0].children[5].children[0].innerText = ""
  table2.children[0].children[5].children[1].innerText = ""
  table2.children[0].children[5].children[2].innerText = ""
  table2.children[0].children[5].children[3].innerText = ""
  table2.children[0].children[5].children[4].innerText = ""
  table2.children[0].children[5].children[5].innerText = ""
  table2.children[0].children[7].children[0].innerText = ""
  table2.children[0].children[7].children[1].innerText = ""
  table2.children[0].children[7].children[2].innerText = ""
  table2.children[0].children[7].children[3].innerText = ""
  table2.children[0].children[7].children[4].innerText = ""
  table2.children[0].children[7].children[5].innerText = ""
}
