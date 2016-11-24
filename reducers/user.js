import {
    PROFILE_SUCCESS,
    LOGIN_SUCCESS,
    LOGOFF_SUCCESS,
    LOGIN_ERROR,
    LOGIN_PROCESS,
    REGISTER_PROCESS,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    RATE_QUEUE_SUCCESS,
} from '../actions/index.js';

const initialState = {
    user: { loggedIn: false, 
            name: "",
            userId: null,
    },
    profile : null,
    rateQueue: [],
}

export default function UserReducer(state, action) {

    switch (action.type) {
        // Rate queue should have products user has queued
        // for rating. Is this supposed to work for offline scenario?
        // BatsFix.
        //
        case RATE_QUEUE_SUCCESS:
            newState = Object.assign({}, state);
            newState.rateQueue = action.rateQueue;
            return newState;

        case PROFILE_SUCCESS:
            newState = Object.assign({}, state);
            newState.profile = action.profile;
            return newState;

        case LOGIN_SUCCESS:
            //
            // In redux, it uses the reference of an object to decide
            // whether two objects are different. So to make the new 
            // state appear different from the old state, we need a
            // new copy! This could become an issue if the state needs
            // to maintain a high number of items. 
            //
            newState = Object.assign({}, state);
            // Then modify the item needed in the new
            // state. 
            newState.user.loggedIn = true;
            newState.user.name        = action.profile.name;
            newState.user.userId      = action.profile.id;
            newState.profile          = action.profile;
            console.log("set the new profile now");

            // BatsFix. Following need to be returned with logon token etc.
            return newState;

        case LOGOFF_SUCCESS:
            newState = Object.assign({}, state);
            // Then modify the item needed in the new
            // state. 
            newState.user.loggedIn    = false;
           
            // BatsFix. Following need to be returned with logon token etc.
            return newState;


        case LOGIN_ERROR:
            newState = Object.assign({}, state);
            newState.message = action.message;
            return newState;

        case LOGIN_PROCESS:
            newState = Object.assign({}, state);
            newState.message = action.message;
            return newState;

        case REGISTER_PROCESS:
            newState = Object.assign({}, state);
            newState.message = action.message;
            return newState;

        case REGISTER_SUCCESS:
            newState = Object.assign({}, state);
            newState.user.name = action.name;
            return newState;

        case REGISTER_ERROR:

            newState = Object.assign({}, state);
            newState.message = action.message;
            return newState;

        default:
            return state ? state : initialState;
    }
}
