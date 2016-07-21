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
    }
}
