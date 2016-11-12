import * as firebase from 'firebase';

// Initialize Firebase
var fireBaseConfig = {
    apiKey: "AIzaSyCz6KvTHqjN5lwSTtQQ8Vm4ebtyjJWh1N0",
    authDomain: "smarthi-c688d.firebaseapp.com",
    databaseURL: "https://smarthi-c688d.firebaseio.com",
    storageBucket: "smarthi-c688d.appspot.com",
};
const app = firebase.initializeApp(fireBaseConfig);

export async function LoginUserWorker(userName,password) {
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
