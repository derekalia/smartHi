export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export function RegisterAction(userCredentials) {
    //
    // BatsFix. Redux thunk allows us to return a dispatcher function that can be used to dispatch 
    // multiple actions as shown below.
    //
    return function (dispatch, getState) {

        if (userCredentials.password != userCredentials.password2) {
            dispatch({
                type: REGISTER_ERROR,
                message: "user passwords not matching",
            });
        }
        // 
        // Fetch data from the server here and then dispatch appropriate actions.
        // 

        // First encodeURI data
        var data = [];
        data.push(encodeURIComponent('grant_type')+'=' +encodeURIComponent('password'));
        data.push(encodeURIComponent('Email')  +'=' +encodeURIComponent(userCredentials.name));
        data.push(encodeURIComponent('Password')  +'=' +encodeURIComponent(userCredentials.password));
        data.push(encodeURIComponent('ConfirmPassword')  +'=' +encodeURIComponent(userCredentials.password));
        var message = data.join("&"); 
        console.log("message is ["+message+"]");
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
                console.log("response was [" + JSON.stringify(responseData) + "]");
                if (responseData.status == "success") {
                    dispatch({
				    		type: REGISTER_SUCCESS,
				    		name: userCredentials.name,
					});
                }
                else {
                    dispatch({
						type: REGISTER_ERROR,
						message: responseData.message,
					});
                }
			}).catch((error) => {
                console.log("register failed"+error.toString());
                dispatch({
						type: REGISTER_ERROR,
						message: "Unable to contact the login server",
			    });
            }).done();
        /* 
        if (userCredentials.name === 'bats') {
            dispatch({
                type: REGISTER_ERROR,
                message: "user name already taken",
            });
        }
        else {
            dispatch({
                type: REGISTER_SUCCESS,
                name: userCredentials.name,
            });
        }
        */
    }
}
