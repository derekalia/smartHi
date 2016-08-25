import {
    PRODUCT_SUCCESS,
    PRODUCT_ERROR,
} from '../actions/index.js';

const initialState = {
    product: {
    id:'0',
    name:'Initial State',
    description:'Initial State',
    price: 0,
    rating: 5,
    ratingCount: 0,
    quality: 5,
    flavor: 5,
    potency:5,
    thc:  50,
    cbd:  50,
    thca: 50,
    retailers: [],
    related: [],
    producer: {},
    symptom:['state','state','state'],
    activity:['state','state','state'],
    effect:[{name:'state',strength:50},{name:'state',strength:50},{name:'state',strength:50}]
    },
}

export default function ProductReducer(state, action) {

    switch (action.type) {

        case PRODUCT_SUCCESS:

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
            newState.product = action.product;
            return newState;

        //    
        // BatsFix. Add actions later 
        //
        default:
            return state ? state : initialState;
    }
}
