export const LOGIN_SUCCESS ='LOGIN_SUCCESS';
export const LOGIN_ERROR   ='LOGIN_ERROR';
export const LOGON_USER    ='LOGON_USER';

export function LoginAction(userCredentials) {
    // should really be a dispatch function. BatsFix
    // should really send LOGIN_START message because
    // server could take its time returning

    if (userCredentials.name === 'bats' && userCredentials.password ==='1234') {
        return {
            type: LOGIN_SUCCESS,
            name: userCredentials.name,
        };
    }
    else {
        return {
            type: LOGIN_ERROR,
            message: "login password or user name is wrong",
        }
    }
}

export function LogoffAction() {
    return {
        type: LOGOFF,
        message: "logoff message",
    }
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR   = 'REGISTER_ERROR';

export function RegisterAction(userCredentials) {
    //
    // BatsFix. Redux thunk allows us to return a dispatcher function that can be used to dispatch 
    // multiple actions as shown below.
    //
    return function(dispatch,getState) {

        if (userCredentials.password != userCredentials.password2) {
            dispatch( {
                type: REGISTER_ERROR,
                message: "user passwords not matching",
            });
        }
        // 
        // Fetch data from the server here and then dispatch appropriate actions.
        // 
        if (userCredentials.name === 'bats') {
            dispatch( {
                type: REGISTER_ERROR,
                message: "user name already taken",
            });
        }
        else {
            dispatch( {
                type: REGISTER_SUCCESS,
                name: userCredentials.name,
            });
        }
    }
}

export const SEARCH_START    ='SEARCH_START';
export const SEARCH_SUCCESS  ='SEARCH_SUCCESS';
export const SEARCH_ERROR    ='SEARCH_ERROR';

export function StartSearchAction(searchTerm) {
    // should really be a dispatch function. BatsFix
    return {
        type: SEARCH_SUCCESS,
        products: ['HerbyGood','Herby','SmokeHouse','Serendipity','Musty','Misty','Sunny','Bono'], 
    };
}

export const PRODUCT_SUCCESS    ='PRODUCT_SUCCESS';
export const PRODUCT_ERROR      ='PRODUCT_ERROR';

export function GetProductAction(searchTerm) {
    // should really be a dispatch function. BatsFix. When server comes
    // back returns this.
    return {
        type: PRODUCT_SUCCESS,
        producers: ['HerbyGood Maker','Herby Maker','SmokeHouse Maker','Serendipity Producer'], 
        act      : ['walking','eating','relaxing'], 
        eff      : ['sleepy','active','happy'], 
    };
}
