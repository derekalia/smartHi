import {
    PRODUCER_SUCCESS,
    PRODUCER_ERROR,
} from '../actions/index.js';

const initialState = {
    producerId: 'None',
    products: ['happy','smiley','others']
}

export default function ProductReducer(state, action) {

    switch (action.type) {

        case PRODUCER_SUCCESS:

            // BatsFix. this creates a copy of the state object
            // In redux, it uses the reference of an object to decide
            // whether two objects are different. So to make the new 
            // state appear different from the old state, we need a
            // new copy! This could become an issue if the state needs
            // to maintain a high number of items. 
            //
            newState = Object.assign({}, state);
            // BatsFix then modify the item needed in the new
            // state. 
            newState.producerId = action.producerId;
            newState.products   = action.products;
            return newState;

        //    
        // BatsFix. Add actions later 
        //
        default:
            return state ? state : initialState;
    }
}
