export const LOGIN_PROCESS = 'LOGIN_PROCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR   = 'LOGIN_ERROR';

export const REGISTER_PROCESS = 'LOGIN_PROCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR   = 'REGISTER_ERROR';

import gql from 'graphql-tag';
import apolloClient from './apollo.js';

import {PROFILE_SUCCESS}  from './profile.js';
import {GetLatestNews,GetUserProfile} from './data.js';
import {NotifyBusy,NotifyDone,} from './navigation.js';

async function LoginActionWorker(dispatch,userCredentials) {
    const signIn = gql`
      mutation signIn($email:String!,$password:String!) {
          signinUser(email:{email: $email,password:$password}) {
            token,
            user { 
                id,
                name,
                image,
                score,
                follower  {id, name, score, image},
                following {id, name, score, image},
                retailers {id, name, image, rating, ratingCount, address},
                producers {id, name, image, rating, ratingCount},
                products  {id, name, image, rating, ratingCount, image},
            }
          }
     }`;

    // Notify busy
    NotifyBusy(dispatch);
    try {
        // Login
        // DevLogin(dispatch, userCredentials.name, userCredentials.password);
        result = await apolloClient.mutate({mutation:signIn,variables:{email:"someone1@yahoo.com",password:"some"}});

        //console.log(result);
        var token = result.data.signinUser.token;
        var user = result.data.signinUser.user;
        
        // Get user profile here.
        // var profile = GetUserProfile(0);
        // console.log(profile);

        dispatch({
            type: PROFILE_SUCCESS,
            profile: user,
        });

        //BatsFix. Later use the token to access graph.cool
        dispatch({ 
            type: LOGIN_SUCCESS, 
            name: user.name, 
            tokenType: "testTokenType", 
            accessToken: token, 
        });

        NotifyDone(dispatch,null);
    } 
    catch(error) {
        console.log("LoginActionWorker:" + error);
        message = "Error logging on";
        NotifyDone(dispatch,"Error logging on");
    };
}


export function LoginAction(userCredentials) {
    return function (dispatch, getState) {
        LoginActionWorker(dispatch, userCredentials);
    }
}

export function LogoffAction() {
    return {
        type: LOGOFF,
        message: "logoff message",
    }
}

async function RegisterActionWorker(dispatch,userCredentials) {
    // Notify that login is in process
    NotifyBusy(dispatch);

    // Sanitize data before sending to server.
    if (userCredentials.password != userCredentials.password2) {
        NotifyDone(dispatch,"User passwords not matching");
        return;
    }

    try {
        //
        // Fetch data from the server here
        //
        await LcbApiRegister(dispatch, userCredentials.name, userCredentials.password);
        NotifyDone(dispatch,null);
    }
    catch(error) {
        // Always log an internal error
        console.log("LcbApiRegister:" + error);
        NotifyDone(dispatch,"Error registering");
    }
}

export function RegisterAction(userCredentials) {
    return function (dispatch, getState) {
        RegisterActionWorker(dispatch,userCredentials);
    }
}

async function LcbApiLogin(dispatch,email,password) {
    // First encodeURI data
    var data = [];
    data.push(encodeURIComponent('grant_type')       +'=' +encodeURIComponent('password'));
    data.push(encodeURIComponent('username')         +'=' +encodeURIComponent(email));
    data.push(encodeURIComponent('password')         +'=' +encodeURIComponent(password));
    var message = data.join("&");

    // Boilerplate code to post data to the server
    var response = await fetch('http://lcbapi.forged.io/connect/Token',
    {
        method: 'POST',
        headers: { 'cache-control': 'no-cache',
                   'content-Type': 'application/x-www-form-urlencoded'
        },
        body: message,
    });

    var responseData = JSON.parse(response);
    
    // Check if server returned an error
    if (responseData.error != null) {
        throw ("Login error "+responseData.error);
    }

    // Notify that login was successfull.
    dispatch({
            type: LOGIN_SUCCESS,
            name: email,
            tokenType: responseData.token_type,
            accessToken: responseData.access_token,
    });
}

async function LcbApiRegister(dispatch,email,password) {
    // First encodeURI data
    var data = [];
    data.push(encodeURIComponent('grant_type')       +'=' +encodeURIComponent('password'));
    data.push(encodeURIComponent('email')            +'=' +encodeURIComponent(email));
    data.push(encodeURIComponent('password')         +'=' +encodeURIComponent(password));
    data.push(encodeURIComponent('confirmPassword')  +'=' +encodeURIComponent(password));
    var message = data.join("&");

    // Boilerplate code to post data to the server
    var response = await fetch('http://lcbapi.forged.io/api/User/Register',
    {
        method: 'POST',
        headers: { 'cache-control': 'no-cache',
                   'content-Type': 'application/x-www-form-urlencoded'
        },
        body: message,
    });
    var responseData = JSON.parse(response._bodyText);

    // Check if server returned an error
    if (responseData.error != null) {
        var error = responseData.error.join(".");
        throw ("Register error "+error);
    }

    // Notify registration was a success
    if (responseData.error == null) {
        dispatch({
                type: REGISTER_SUCCESS,
                name: email,
        });
    }

    // Still need to get the access token.
    await LcbApiLogin(dispatch, email, password);
}

function DevLogin(dispatch, userName, userPassword) {
  // No need to run an extra script that does nothing!
  // We'll just assume successfull login no matter what!

  if (userName != "")
    dispatch({ type: LOGIN_SUCCESS, name: userName, tokenType: "testTokenType", accessToken: "testAccessToken"});
  else
    dispatch({ type: LOGIN_ERROR, message: "Enter a username!"});
  }
