export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOFF_SUCCESS = 'LOGOFF_SUCCESS';

import {LoginUserWorker} from './fireBase.js';

export async function LoginUser(userName,password) {
    return LoginUserWorker(userName,password).catch(function(error){
        return {error:error};
    });
}

export function LoginAction(data) {
        console.log("logging on a user"+data.name);
        return ({ 
            type: LOGIN_SUCCESS, 
            name: data.name, 
            userToken: data.token , 
            userId: data.userId, 
        });
}

export function LogoffAction() {
    return {
        type: LOGOFF_SUCCESS,
    }
}
