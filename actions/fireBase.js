import * as firebase from 'firebase';

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
    var isArray = Array.isArray(itemList);
    var itemsCount = isArray?itemList.length:itemList.keys().length;
    var ref = firebase.database().ref(itemPath);
    return new Promise(function(resolve,reject) {
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

export function GetProfileImpl(userId,onProfile) {
    var profile = null;
    var profileAttributes = 0;
    var requiredAttributes = PRODUCER|RETAILERS|PRODUCTS|REVIEW_PRODUCTS|FOLLOWERS|FOLLOWING;
    var ref = firebase.database().ref('users/'+userId);
    return ref.once('value')
    .then(function(snapshot){
         profile = snapshot.val();
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

export function LoginUserImpl(userName,password,onLoginUser) {
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

export function GetLatestNewsImpl(onLatestNews) {
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

export function GetActivityProductsImpl(activityType,onActivityProducts) {
    var ref = firebase.database().ref('products');
    return ref.orderByKey().limitToFirst(10).once('value')
    .then(function(snapshot){
        var products = snapshot.val();
        onActivityProducts(products);
    });
}


export function GetProductImpl(productId,onProduct) {
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

export function GetRetailerImpl(retailerId,onRetailer) {
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

export function GetProducerImpl(producerId,onProducer) {
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
               onProducer(producer);
        });
        
        GetItemList(producer.follower,'users').then((followers)=>{
            producer.followers = followers;
            producerAttributes |= FOLLOWERS;
            if (producerAttributes == requiredAttributes) {
                onProducer(producer);
            }
        });
        GetItemList(producer.following,'users').then((following)=>{
            producer.following = following;
            producerAttributes |= FOLLOWING;
            if (producerAttributes == requiredAttributes) {
                onProducer(producer);
            }
        });
    });
}

export function RetailerLoginImpl(userName,userPassword,onLogin) {
    // BatsFix. For now use 1.
    var retailerId = '1';
    GetRetailerImpl(retailerId,onLogin);
}
export function ProducerLoginImpl(userName,userPassword,onLogin) {
    // BatsFix. For now use 1.
    var producerId = '1';
    GetProducerImpl(producerId,onLogin);
}
