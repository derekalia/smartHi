import * as firebase from 'firebase';

const RETAILERS = 1;
const PRODUCER  = 2;
const FOLLOWERS = 4;
const FOLLOWING = 8;
const REVIEWS   = 16;
const USERS     = 32;
const PRODUCTS  = 64;

// Initialize Firebase
var fireBaseConfig = {
    apiKey: "AIzaSyCz6KvTHqjN5lwSTtQQ8Vm4ebtyjJWh1N0",
    authDomain: "smarthi-c688d.firebaseapp.com",
    databaseURL: "https://smarthi-c688d.firebaseio.com",
    storageBucket: "smarthi-c688d.appspot.com",
};

const app = firebase.initializeApp(fireBaseConfig);

function GetProducer(producerId) {
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

function GetUserList(uid) {
    var users = [];
    var usersCount = uid.length;
    var ref = firebase.database().ref('users');

    return new Promise(function(resolve,reject) {
        for (var i=0; i < uid.length; i++) {
            ref.child(uid[i]).once('value')
            .then(function(snapshot){
                console.log("got user" + snapshot.val());
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

export function LoginUserImpl(userName,password,onLoginUser) {
    return firebase.auth().signInWithEmailAndPassword(userName, password)
    .then((result)=> {
        // return uid of the user.
        console.log("calling back on user logged on");
        onLoginUser(result.uid,null); 
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
            console.log("calling back1");
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

export function GetRetailerImpl(retailerId,onRetailer) {
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


