import {
    PRODUCER_SUCCESS,
    PRODUCER_ERROR,
} from '../actions/index.js';

const initialState = {
    producer:
    {   id:'0',
        name:'Initial State',
        description:'Initial State',
        rating: 5,
        products: [],
    }
}

export default function ProducerReducer(state, action) {

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
            newState.producer = action.producer;
            return newState;

        //    
        // BatsFix. Add actions later 
        //
        default:
            return state ? state : initialState;
    }
}
