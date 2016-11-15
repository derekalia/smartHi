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
        GetProducerImpl(product.pid).then((producer)=>{
            product.producer = producer;
            productAttributes |= PRODUCER;
            if (productAttributes == requiredAttributes) {
                onProduct(product);
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


LoginImpl("test@yahoo.com","test12").then(()=>{
    //GetProductImpl('1',(product)=>{
    //    console.log(product);
    //});
    GetActivityProductsImpl('hike',(products)=> {
        console.log(products);
    });
});

