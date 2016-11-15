export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOFF_SUCCESS = 'LOGOFF_SUCCESS';

import {LoginUserImpl} from './fireBase.js';

export async function LoginUser(userName,password,onLoginUser) {
    return LoginUserImpl(userName,password,onLoginUser);
}

export function LoginAction(userId) {
        return ({ 
            type:   LOGIN_SUCCESS, 
            userId: userId, 
        });
}

export function LogoffAction() {
    return {
        type: LOGOFF_SUCCESS,
    }
}
