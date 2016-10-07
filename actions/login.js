export const LOGIN_PROCESS = 'LOGIN_PROCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR   = 'LOGIN_ERROR';

export const REGISTER_PROCESS = 'LOGIN_PROCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR   = 'REGISTER_ERROR';

import {NEWS_SUCCESS}  from './news.js';
import {PROFILE_SUCCESS}  from './profile.js';
import {GetLatestNews,GetUserProfile} from './data.js';
import {NotifyBusy,NotifyDone,} from './navigation.js';

export function LoginAction(userCredentials) {
    return function (dispatch, getState) {
        // Notify that login is in process
        NotifyBusy(dispatch);

        //
        // Fetch data from the server
        // BatsFix. For test purposes we can use NodeApiLogin instead of LcbApiLogin
        //
        //LcbApiLogin(dispatch, userCredentials.name, userCredentials.password);
        DevLogin(dispatch, userCredentials.name, userCredentials.password);

        // Get user profile here.
        var profile = GetUserProfile(0);
        dispatch({
            type: PROFILE_SUCCESS,
            profile: profile,
        });

        // BatsFix. GetLatestNews should be chained with login and user profile
        // functions later on.
        GetLatestNews().then((latestNews)=>{
            dispatch({
                type: NEWS_SUCCESS,
                staffPick: latestNews.staffPick,
                trending: latestNews.trending,
            });
            NotifyDone(dispatch,"Logged On");
        }).done();
    }
}

export function LogoffAction() {
    return {
        type: LOGOFF,
        message: "logoff message",
    }
}

export function RegisterAction(userCredentials) {

    return function (dispatch, getState) {
        // Notify that login is in process
        dispatch({
			type: REGISTER_PROCESS,
			message: "register on ....",
		});

        // Sanitize data before sending to server.
        if (userCredentials.password != userCredentials.password2) {
            dispatch({
                type: REGISTER_ERROR,
                message: "user passwords not matching",
            });
            return;
        }

        //
        // Fetch data from the server here
        //
        LcbApiRegister(dispatch, userCredentials.name, userCredentials.password);
    }
}

function LcbApiLogin(dispatch,email,password) {
    // First encodeURI data
    var data = [];
    data.push(encodeURIComponent('grant_type')       +'=' +encodeURIComponent('password'));
    data.push(encodeURIComponent('username')         +'=' +encodeURIComponent(email));
    data.push(encodeURIComponent('password')         +'=' +encodeURIComponent(password));
    var message = data.join("&");

    // Boilerplate code to post data to the server
    fetch('http://lcbapi.forged.io/connect/Token',
    {
        method: 'POST',
        headers: { 'cache-control': 'no-cache',
                   'content-Type': 'application/x-www-form-urlencoded'
        },
        body: message,
    }).
    then((response) => response.json()).
    then((responseData) => {
        //console.log("accessToken:"+responseData.access_token);
        if (responseData.error == null) {
            dispatch({
                    type: LOGIN_SUCCESS,
                    name: email,
                    tokenType: responseData.token_type,
                    accessToken: responseData.access_token,
            });
        }
        else {
            var error = responseData.error.join(".");
            dispatch({
                type: LOGIN_ERROR,
                message: error,
            });
        }
    }).catch((error) => {
        dispatch({
                type: LOGIN_ERROR,
                message: "Unable to contact the login server",
        });
    }).done();
}

function LcbApiRegister(dispatch,email,password) {
    // First encodeURI data
    var data = [];
    data.push(encodeURIComponent('grant_type')       +'=' +encodeURIComponent('password'));
    data.push(encodeURIComponent('email')            +'=' +encodeURIComponent(email));
    data.push(encodeURIComponent('password')         +'=' +encodeURIComponent(password));
    data.push(encodeURIComponent('confirmPassword')  +'=' +encodeURIComponent(password));
    var message = data.join("&");

    // Boilerplate code to post data to the server
    fetch('http://lcbapi.forged.io/api/User/Register',
    {
        method: 'POST',
        headers: { 'cache-control': 'no-cache',
                   'content-Type': 'application/x-www-form-urlencoded'
        },
        body: message,
    }).
    then((response) => response.json()).
    then((responseData) => {
        if (responseData.error == null) {
            dispatch({
                    type: REGISTER_SUCCESS,
                    name: email,
            });
            // BatsFix. Still need to get the access token.
            LcbApiLogin(dispatch, email, password);
        }
        else {
            var error = responseData.error.join(".");
            dispatch({
                type: REGISTER_ERROR,
                message: error,
            });
        }
    }).catch((error) => {
        dispatch({
                type: REGISTER_ERROR,
                message: "Unable to contact the login server",
        });
    }).done();
}

function DevLogin(dispatch, userName, userPassword) {
  // No need to run an extra script that does nothing!
  // We'll just assume successfull login no matter what!

  if (userName != "")
    dispatch({ type: LOGIN_SUCCESS, name: userName, tokenType: "testTokenType", accessToken: "testAccessToken"});
  else
    dispatch({ type: LOGIN_ERROR, message: "Enter a username!"});
  }
