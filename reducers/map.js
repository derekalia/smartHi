import {
    MAP_SUCCESS,
    MAP_ERROR,
} from '../actions/index.js';

const initialState = {
    mapItems: [],
}

export default function MapReducer(state, action) {

    switch (action.type) {

        case MAP_SUCCESS:

            newState = Object.assign({}, state);
            newState.mapItems = action.mapItems;
            return newState;

        //    
        // BatsFix. Add actions later 
        //
        default:
            return state ? state : initialState;
    }
}
