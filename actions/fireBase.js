const firebase=require('firebase');

const RETAILERS = 1;
const PRODUCER  = 2;
const FOLLOWERS = 4;
const FOLLOWING = 8;
const REVIEWS   = 16;
const USERS     = 32;
const PRODUCTS  = 64;
const REVIEW_PRODUCTS = 128;

// Initialize Firebase
var fireBaseConfig = {
    apiKey: "AIzaSyCz6KvTHqjN5lwSTtQQ8Vm4ebtyjJWh1N0",
    authDomain: "smarthi-c688d.firebaseapp.com",
    databaseURL: "https://smarthi-c688d.firebaseio.com",
    storageBucket: "smarthi-c688d.appspot.com",
};

const app = firebase.initializeApp(fireBaseConfig);

function GetItem(itemPath) {
    var ref = firebase.database().ref(itemPath);
    return ref.once('value')
    .then(function(snapshot){
        var item = snapshot.val();
        return item;
    });
}

//
// Gets all itemList array elements or all child properties of itemList.
//
function GetItemList(itemList,itemPath) {
    var items = [];
    var ref = firebase.database().ref(itemPath);
    return new Promise(function(resolve,reject) {
        if (itemList == null) {
            // Return an empty array if incoming list is null
            resolve(items);
        }
        var isArray = Array.isArray(itemList);
        var itemsCount = isArray?itemList.length:itemList.keys().length;

        if (itemsCount == 0) {
            resolve(items);
        }

        for (var key in itemList) {
            if (isArray) {
                childPath = itemList[key]
            }
            else {
                childPath = key;
            }
            ref.child(childPath).once('value')
            .then(function(snapshot){
                items.push(snapshot.val());
                if (items.length == itemsCount) {
                    resolve(items);
                }
            });
        }
    });
}

function ChangeUserNameImpl(userId,userName,onFinish) {
    var ref = firebase.database().ref('users/'+userId);
    ref.update({'name':userName},(error)=>{
        onFinish(error); 
    })
    .catch(function(error) {
        console.log("ChangeUserNameImpl:error");
        console.log(error);
        onFinish(" " + error); 
    });
}
module.exports.ChangeUserNameImpl = ChangeUserNameImpl;

function GetProfileImpl(userId,onProfile) {
    var profile = null;
    var profileAttributes = 0;
    var requiredAttributes = PRODUCER|RETAILERS|PRODUCTS|REVIEW_PRODUCTS|FOLLOWERS|FOLLOWING;
    var ref = firebase.database().ref('users/'+userId);
    return ref.once('value')
    .then(function(snapshot){
        profile = snapshot.val();
         
        if (profile.pid == null) { profile.pid = [] };
        if (profile.rid == null) { profile.rid = [] };
        if (profile.fpid == null) { profile.fpid = [] };
        if (profile.rpid == null) { profile.rpid = [] };
        if (profile.pid == null) { profile.pid = [] };
        if (profile.follower == null) { profile.follower = [] };
        if (profile.following == null) { profile.following = [] };
        
        // Get favorite producers list
        GetItemList(profile.pid,'producers').then((producers)=>{
            profile.producers = producers;
            profileAttributes |= PRODUCER;
            if (profileAttributes == requiredAttributes) {
                onProfile(profile,null);
            }
        });
        // Get favorite retailer list
        GetItemList(profile.rid,'retailers').then((retailers)=>{
            profile.retailers = retailers;
            profileAttributes |= RETAILERS;
            if (profileAttributes == requiredAttributes) {
                onProfile(profile,null);
            }
        });
        // Get favorite product list
        GetItemList(profile.fpid,'products').then((products)=>{
            profile.products = products;
            profileAttributes |= PRODUCTS;
            if (profileAttributes == requiredAttributes) {
                onProfile(profile,null);
            }
        });
        // Get rate queue product list
        GetItemList(profile.rpid,'products').then((products)=>{
            profile.reviewProducts = products;
            profileAttributes |= REVIEW_PRODUCTS;
            if (profileAttributes == requiredAttributes) {
                onProfile(profile,null);
            }
        });
        // Get follower list
        GetItemList(profile.follower,'users').then((followers)=>{
            profile.followers = followers;
            profileAttributes |= FOLLOWERS;
            if (profileAttributes == requiredAttributes) {
                onProfile(profile,null);
            }
        });
        // Get following list
        GetItemList(profile.following,'users').then((following)=>{
            profile.following = following;
            profileAttributes |= FOLLOWING;
            if (profileAttributes == requiredAttributes) {
                onProfile(profile,null);
            }
        });
    });
}

function LoginUserImpl(userName,password,onLoginUser) {
    return firebase.auth().signInWithEmailAndPassword(userName, password)
    .then((result)=> {
        GetProfileImpl(result.uid,onLoginUser);
    })
    .catch(function(error) {
        console.log("LoginUserImpl:error");
        console.log(error);
        onLoginUser(null,"User name or password invalid"); 
    });
}

function CreateProfileImpl(userId,userName,onCreateProfile) {
    var profile =  
    {   id: userId,
        name:userName,
        address:'Seattle, WA',
        score:'0',
        follower:[],
        following:[],
        fpid:[],
        pid:[],
        rid:[],
        rpid:[],
    }
    var ref = firebase.database().ref("users");
    ref.child(userId).set(profile,(error)=>{
        if (error == null ) {
            GetProfileImpl(userId,onCreateProfile);     
        }
        else {
            onCreateProfile(null,error);
        }
    })
    .catch(function(error) {
        console.log("CreateProfileImpl:error");
        console.log(error);
        onCreateProfile(null," " + error);
    });
}

function CreateUserImpl(userEmail,userName,password,onCreateUser) {
    return firebase.auth().createUserWithEmailAndPassword(userEmail, password)
    .then((result)=> {
        // Now need to create new user profile.
        CreateProfileImpl(result.uid,userName,onCreateUser);
    })
    .catch(function(error) {
        console.log("CreateUserImpl:error");
        console.log(error);
        onCreateUser(null," "+error); 
    });
}

function GetLatestNewsImpl(onLatestNews) {
    var products = [];
    var ref = firebase.database().ref("products/0");
    ref.once("value")
    .then(function(snapshot) {
        products.push(snapshot.val());
        if (products.length == 2) {
            onLatestNews(products,null);
        }
    });
    var ref2 = firebase.database().ref("products/1");
    ref.once("value")
    .then(function(snapshot) {
        products.push(snapshot.val());
        if (products.length == 2) {
            onLatestNews(products,null);
        }
    })
    .catch((error)=> {
        console.log("GetLatestNewsImpl:error");
        console.log(error);
        onLatestNews(null,"Failed to get latest news");
    });
}

function GetActivityProductsImpl(activityType,onActivityProducts) {
    var ref = firebase.database().ref('products');
    return ref.orderByKey().limitToFirst(10).once('value')
    .then(function(snapshot){
        var products = snapshot.val();
        onActivityProducts(products);
    });
}


function GetProductImpl(productId,onProduct) {
    //  BatsFix. this function returns only when required attributes match
    var product = null;
    var productAttributes  = 0; 
    var requiredAttributes = RETAILERS|PRODUCER;

    var ref = firebase.database().ref('products/'+productId);
    return ref.once('value')
    .then(function(snapshot){
        product = snapshot.val();
        GetItemList(product.rid,'retailers').then((retailers)=>{
           product.retailers = retailers;
           productAttributes |= RETAILERS;
           if (productAttributes == requiredAttributes) 
               onProduct(product);
        });
        GetItem('producers/'+product.pid).then((producer)=>{
            product.producer = producer;
            productAttributes |= PRODUCER;
            if (productAttributes == requiredAttributes) {
                onProduct(product);
            }
        });
    });
}

function GetRetailerImpl(retailerId,onRetailer) {
    var retailer = null;
    //  BatsFix. this function returns only when required attributes match
    var retailerAttributes  = 0; 
    var requiredAttributes = PRODUCTS|FOLLOWERS|FOLLOWING;

    var ref = firebase.database().ref('retailers/'+retailerId);
    return ref.once('value')
    .then(function(snapshot){
        retailer = snapshot.val();
        GetItemList(retailer.pid,'products').then((products)=>{
           retailer.products = products;
           retailerAttributes |= PRODUCTS;
           if (retailerAttributes == requiredAttributes) 
               onRetailer(retailer);
        });
        
        GetItemList(retailer.follower,'users').then((followers)=>{
            retailer.followers  = followers;
            retailerAttributes |= FOLLOWERS;
            if (retailerAttributes == requiredAttributes) {
                onRetailer(retailer);
            }
        });

        GetItemList(retailer.following,'users').then((following)=>{
            retailer.following  = following;
            retailerAttributes |= FOLLOWING;
            if (retailerAttributes == requiredAttributes) {
                onRetailer(retailer);
            }
        });
    });
}

function GetProducerImpl(producerId,onProducer) {
    var producer = null;
    //  BatsFix. this function returns only when required attributes match
    var producerAttributes  = 0; 
    var requiredAttributes = PRODUCTS|FOLLOWERS|FOLLOWING;

    var ref = firebase.database().ref('producers/'+producerId);
    return ref.once('value')
    .then(function(snapshot){
        producer = snapshot.val();
        GetItemList(producer.pid,'products').then((products)=>{
           producer.products = products;
           producerAttributes |= PRODUCTS;
           if (producerAttributes == requiredAttributes) 
                onProducer(producer,null);
        });
        
        GetItemList(producer.follower,'users').then((followers)=>{
            producer.followers = followers;
            producerAttributes |= FOLLOWERS;
            if (producerAttributes == requiredAttributes) {
                onProducer(producer,null);
            }
        });
        GetItemList(producer.following,'users').then((following)=>{
            producer.following = following;
            producerAttributes |= FOLLOWING;
            if (producerAttributes == requiredAttributes) {
                onProducer(producer,null);
            }
        });
    });
}

function RetailerLoginImpl(userName,userPassword,onLogin) {
    // BatsFix. For now use 1.
    var retailerId = '1';
    GetRetailerImpl(retailerId,onLogin);
}

function ProducerLoginImpl(userName,userPassword,onLogin) {
    // BatsFix. For now use 1.
    var producerId = '1';
    GetProducerImpl(producerId,onLogin);
}

function SearchImpl(searchType,searchTerm,onSearchResult) {
    var ref = firebase.database().ref();
    var searchParameters = {};
    var searchUpdateCount = 0;
    console.log('SearchImpl:');
    switch(searchType) {
        case 'product': 
            console.log('   searchTerm:'+searchTerm);
            searchParameters.productName = searchTerm; 
            break;
        default:
            onSearchResult(null,'Unknown searchType');
            // If unknown type return immediately
            return;
    }
    searchParameters.type = searchType;

    var searchId = ref.child('searchRequest').push(searchParameters).key;
    console.log('   searchId:'+searchId); 
    ref.child('searchResult/'+searchId).on('value',(snap)=>{
        if (snap.val() != null) {
            snap.ref.off();
            snap.ref.remove();
            console.log(snap.val());
            var hits = snap.val().hits;
            //BatsFix. compose the products here. This may
            // change in the future to optimize traffic
            var resultList = [];
            if (hits != null) {
                for (var i=0; i < hits.length;i++) {
                     resultList.push(hits[i]._source); 
                }
            }
            onSearchResult(resultList,null);
        }
    });
}

module.exports.SearchImpl = SearchImpl;

module.exports.GetProductImpl          = GetProductImpl;

module.exports.GetRetailerImpl         = GetRetailerImpl;

module.exports.GetProducerImpl         = GetProducerImpl;

module.exports.GetProfileImpl          = GetProfileImpl;

module.exports.CreateProfileImpl       = CreateProfileImpl;

module.exports.LoginUserImpl           = LoginUserImpl;

module.exports.RetailerLoginImpl       = RetailerLoginImpl;

module.exports.ProducerLoginImpl       = ProducerLoginImpl;

module.exports.CreateUserImpl          = CreateUserImpl;

module.exports.GetLatestNewsImpl       = GetLatestNewsImpl;

module.exports.GetActivityProductsImpl = GetActivityProductsImpl;

