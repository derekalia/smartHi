import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
} from '../actions/index.js';

const initialState = {
    user: {loggedIn:false, name: ""},
    message: "" 
}

export default function UserReducer(state, action) {

    switch(action.type) {

       case LOGIN_SUCCESS:
            // BatsFix. this creates a copy of the state object
            // In redux, it uses the reference of an object to decide
            // whether two objects are different. So to make the new 
            // state appear different from the old state, we need a
            // new copy! This could become an issue if the state needs
            // to maintain a high number of items. 
            //
            newState               = Object.assign({},state);
            // BatsFix then modify the item needed in the new
            // state. 
            newState.user.loggedIn = true; 
            newState.user.name     = action.name; 
            return newState;

       case LOGIN_ERROR:

            newState               = Object.assign({},state);
            newState.message       = action.message; 
            return newState;

       case REGISTER_SUCCESS:
            // BatsFix. this creates a copy of the state object
            // In redux, it uses the reference of an object to decide
            // whether two objects are different. So to make the new 
            // state appear different from the old state, we need a
            // new copy! This could become an issue if the state needs
            // to maintain a high number of items. 
            //
            newState               = Object.assign({},state);
            // BatsFix then modify the item needed in the new
            // state. 
            newState.user.loggedIn = true; 
            newState.user.name     = action.name; 
            return newState;

       case REGISTER_ERROR:

            newState               = Object.assign({},state);
            newState.message       = action.message; 
            return newState;

       default:
            return state?state:initialState;
    }
}
