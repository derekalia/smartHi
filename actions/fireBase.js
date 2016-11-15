import * as firebase from 'firebase';

// Initialize Firebase
var fireBaseConfig = {
    apiKey: "AIzaSyCz6KvTHqjN5lwSTtQQ8Vm4ebtyjJWh1N0",
    authDomain: "smarthi-c688d.firebaseapp.com",
    databaseURL: "https://smarthi-c688d.firebaseio.com",
    storageBucket: "smarthi-c688d.appspot.com",
};
const app = firebase.initializeApp(fireBaseConfig);

export async function LoginUserImpl(userName,password,onLoginUser) {
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

export async function GetLatestNewsImpl(onLatestNews) {
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
            console.log("calling back");
            onLatestNews(products,null);
        }
    });
}

export async function GetActivityProductsImpl(activityType,onActivityProducts) {
    var ref = firebase.database().ref('products');
    return ref.orderByKey().limitToFirst(10).once('value')
    .then(function(snapshot){
        var products = snapshot.val();
        onActivityProducts(products);
    });
}

function GetProducerImpl(producerId) {
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
const USERS     = 32;

export async function GetProductImpl(productId,onProduct) {
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
        GetProducerImpl(product.pid).then((producer)=>{
            product.producer = producer;
            productAttributes |= PRODUCER;
            if (productAttributes == requiredAttributes) {
                onProduct(product);
            }
        });
    });
}
