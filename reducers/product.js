import {
    PRODUCT_SUCCESS,
    PRODUCT_ERROR,
} from '../actions/index.js';

const initialState = {
    act: ['hike','study','work','read','movie', 'sleep', 'eat', 'sex', 'social', 'wake-up', 'adventure'],
    eff: ['sleepy','energetic','euphoric','focused ','aroused','psychedelic','giggly','happy','hungry','relaxed','talkative'],
    type: ['rosin','vaporizer','edible','flower','dab ','joint','topical','co2','bho','dab','tincture'],
    category: ['sativa','indica','hybrid'],
    symptoms: ['cramps','depression','fatigue','glycoma','insomnia','headaches','inflammation','appetite','spams','nausea','pain','seizures','stress'],
    producers: [],
}

export default function ProductReducer(state, action) {

    switch(action.type) {
       
       case PRODUCT_SUCCESS:
        
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
            newState.producers = action.producers; 
            newState.act       = action.act; 
            newState.eff       = action.eff; 
            newState.type      = action.type;
            newState.category  = action.category;
            newState.symptoms  = action.symptoms;
            return newState;
        
       //    
       // BatsFix. Add actions later 
       //
       default:
            return state?state:initialState;
    }
}
