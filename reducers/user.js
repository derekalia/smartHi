import {
    PROFILE_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_PROCESS,
    REGISTER_PROCESS,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
} from '../actions/index.js';

const initialState = {
    user: { loggedIn: false, 
            name: "",
            tokenType: "",
            accessToken: "",
    },
    profile : {
        id:'9999',
        name:'Unknown',
        address:'Bed Bath and Beyond',
        score:'0',
        products:[], 
        producers: [],
        retailers: [],
        following: [],
        follower: [],
        reviewsProducts: [],
    } 
}

export default function UserReducer(state, action) {

    switch (action.type) {
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
            newState.user.name = action.name;
            newState.user.accessToken = action.accessToken;
            newState.user.tokenType   = action.tokenType;

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
