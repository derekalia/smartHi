const Firebase=require('firebase');

// Initialize Firebase
var fireBaseConfig = {
    apiKey: "AIzaSyCz6KvTHqjN5lwSTtQQ8Vm4ebtyjJWh1N0",
    authDomain: "smarthi-c688d.firebaseapp.com",
    databaseURL: "https://smarthi-c688d.firebaseio.com",
    storageBucket: "smarthi-c688d.appspot.com",
};
const firebase = Firebase.initializeApp(fireBaseConfig);

function LoginImpl(userName,password) {
    return firebase.auth().signInWithEmailAndPassword(userName, password)
    .then((result)=> {
        // return uid of the user.
        console.log(result.uid);
        return result.uid;
    })
    .catch(function(error) {
        console.log(error);
        throw  "User name is bad or password is invalid"; 
    });
}

function GetUserImpl(userId) {
    var ref = firebase.database().ref("users/"+userId);
    return ref.once('value')
    .then(function(snapshot){
        return snapshot.val();
    });
}

function GetLatestImpl() {
    var ref = firebase.database().ref('products/0');
    return ref.once('value')
    .then(function(snapshot){
        return snapshot.val();
    })
}

function GetProducerItem(producerId) {
    var ref = firebase.database().ref('producers/'+producerId);
    return ref.once('value')
    .then(function(snapshot){
        var producer = snapshot.val();
        return producer;
    });
}


function GetRetailerList(rid) {
    var retailers = [];
    var retailersCount = rid.length;
    var ref = firebase.database().ref('retailers');
    return new Promise(function(resolve,reject) {
        for (var i=0; i < rid.length; i++) {
            ref.child(rid[i]).once('value')
            .then(function(snapshot){
                retailers.push(snapshot.val());
                if (retailers.length == retailersCount) {
                    resolve(retailers);
                }
            });
        }
    });
}

const RETAILERS = 1;
const PRODUCER  = 2;
const FOLLOWERS = 4;
const FOLLOWING = 8;
const REVIEWS   = 16;
const PRODUCTS  = 32;

function GetProductImpl(productId,onProduct) {
    var product = null;
    //  BatsFix. this function returns only when required attributes match
    var productAttributes  = 0; 
    var requiredAttributes = RETAILERS|PRODUCER;

    var ref = firebase.database().ref('products/'+productId);
    return ref.once('value')
    .then(function(snapshot){
        product = snapshot.val();
        GetRetailerList(product.rid).then((retailers)=>{
           product.retailers = retailers;
           productAttributes |= RETAILERS;
           if (productAttributes == requiredAttributes) 
               onProduct(product);
        });
        GetProducer(product.pid).then((producer)=>{
            product.producer = producer;
            productAttributes |= PRODUCER;
            if (productAttributes == requiredAttributes) {
                onProduct(product);
            }
        });
    });
}

function GetUserList(uid) {
    var users = [];
    var usersCount = uid.length;
    var ref = firebase.database().ref('users');

    return new Promise(function(resolve,reject) {
        for (var i=0; i < uid.length; i++) {
            ref.child(uid[i]).once('value')
            .then(function(snapshot){
                users.push(snapshot.val());
                if (users.length == usersCount) {
                    resolve(users);
                }
            });
        }
    });
}

function GetProductList(pid) {
    var products = [];
    var productsCount = pid.length;

    var ref = firebase.database().ref('products');
    return new Promise(function(resolve,reject) {
        for (var i=0; i < pid.length; i++) {
            ref.child(pid[i]).once('value')
            .then(function(snapshot){
                products.push(snapshot.val());
                if (products.length == productsCount) {
                    resolve(products);
                }
            });
        }
    });
}

function GetRetailerImpl(retailerId,onRetailer) {
    var retailer = null;
    //  BatsFix. this function returns only when required attributes match
    var retailerAttributes  = 0; 
    var requiredAttributes = PRODUCTS|FOLLOWERS;

    var ref = firebase.database().ref('retailers/'+retailerId);
    return ref.once('value')
    .then(function(snapshot){
        retailer = snapshot.val();
        GetProductList(retailer.pid).then((products)=>{
           retailer.products = products;
           retailerAttributes |= PRODUCTS;
           if (retailerAttributes == requiredAttributes) 
               onRetailer(retailer);
        });
        
        GetUserList(retailer.follower).then((followers)=>{
            retailer.followers = followers;
            retailerAttributes |= FOLLOWERS;
            if (retailerAttributes == requiredAttributes) {
                onRetailer(retailer);
            }
        });
        
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

function GetProducerImpl(producerId,onProducer) {
    var producer = null;
    //  BatsFix. this function returns only when required attributes match
    var producerAttributes  = 0; 
    var requiredAttributes = PRODUCTS|FOLLOWERS|FOLLOWING;

    var ref = firebase.database().ref('producers/'+producerId);
    return ref.once('value')
    .then(function(snapshot){
        producer = snapshot.val();
        GetProductList(producer.pid).then((products)=>{
           producer.products = products;
           producerAttributes |= PRODUCTS;
           if (producerAttributes == requiredAttributes) 
               onProducer(producer);
        });
        
        GetUserList(producer.follower).then((followers)=>{
            producer.followers = followers;
            producerAttributes |= FOLLOWERS;
            if (producerAttributes == requiredAttributes) {
                onProducer(producer);
            }
        });
        GetUserList(producer.following).then((following)=>{
            producer.following = following;
            producerAttributes |= FOLLOWING;
            if (producerAttributes == requiredAttributes) {
                onProducer(producer);
            }
        });
    });
}


LoginImpl("test@yahoo.com","test12").then(()=>{
    //GetProductImpl('1',(product)=>{
    //    console.log(product);
    //});
    //GetActivityProductsImpl('hike',(products)=> {
    //    console.log(products);
    //});
    //GetRetailerImpl('1',(retailer)=> {
    //    console.log(retailer);
    //});
    GetProducerImpl('1',(producer)=> {
        console.log(producer);
    });
});

