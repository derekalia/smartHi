import {
    SEARCH_SUCCESS,
    SEARCH_ERROR,
} from '../actions/index.js';

const initialState = {
    start: 0,
    act: ['walking','hiking','eating'],
    eff: ['sleepy','happy','active'],
    products: [],
}

export default function SearchReducer(state, action) {

    switch(action.type) {
       
       case SEARCH_SUCCESS:
        
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
            newState.products = action.products; 
            return newState;
        
       //    
       // BatsFix. Add actions later 
       //
       default:
            return state?state:initialState;
    }
}
