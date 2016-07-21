export const LOGIN_PROCESS = 'LOGIN_PROCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR   = 'LOGIN_ERROR';
export const LOGON_USER    = 'LOGON_USER';

export function LoginAction(userCredentials) {
    return function (dispatch, getState) {
        // Notify that login is in process
        dispatch({
			type: LOGIN_PROCESS,
			message: "logging on ....",
		});
        // Contact the server to verify user credentials.
        var data = JSON.stringify({ 'name': userCredentials.name, 'password': userCredentials.password });
        // Boilerplate code to post data to the server
        fetch('http://127.0.0.1:3000/login', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: data }).
            then((response) => response.json()).
            then((responseData) => {
                console.log("response was [" + JSON.stringify(responseData) + "]");
                if (responseData.status == "success") {
                    dispatch({
						type: LOGIN_SUCCESS,
						name: userCredentials.name,
					});
                }
                else {
                    dispatch({
						type: LOGIN_ERROR,
						message: responseData.message,
					});
                }
			}).catch((error) => {
                console.log("login failed"+error.toString());
                dispatch({
						type: LOGIN_ERROR,
						message: "Unable to contact the login server",
			    });
            }).done();
    }
}

export function LogoffAction() {
    return {
        type: LOGOFF,
        message: "logoff message",
    }
}
