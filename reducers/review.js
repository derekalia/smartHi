import {
    IMAGE_SUCCESS,
    IMAGE_RESET,
} from '../actions/index.js';

const initialState = {
    product: {
    id:'0',
    name:'Initial State',
    description:'Initial Description',
    price: 0,
    rating: 2,
    ratingCount: 0,
    quality: 2,
    flavor: 2,
    potency:2,
    thc:  50,
    cbd:  50,
    thca: 50,
    retailers: [],
    producer: {},
    activity:[],
    symptom:[],
    effect:[{name:'state',strength:50},{name:'state',strength:50},{name:'state',strength:50}]
    },
    retailer: {
    id:'0',
    name:'Initial State',
    description:'Initial State',
    rating: 5,
    ratingCount: 555,
    description: 'Initial State',
    },
}

export default function ReviewReducer(state, action) {

    switch (action.type) {

        case IMAGE_SUCCESS:

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
            newState.product  = action.productInfo;
            newState.retailer = action.storeInfo;
            return newState;

        case IMAGE_RESET:
            newState = Object.assign({}, state);
            newState.product = initialState.product;
            newState.retailer = initialState.retailer;
            return newState;

        //    
        // BatsFix. Add actions later 
        //
        default:
            return state != null ? state : initialState;
    }
}
