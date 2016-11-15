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
