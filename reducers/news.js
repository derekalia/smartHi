import {
    NEWS_SUCCESS,
    NEWS_ERROR,
} from '../actions/index.js';

// BatsFix. Make it true initial state.
const initialState = {
staffPick:
{   id:'0',
    name:'Forged XLS',
    description:'Forged XLS excellent quality',
    price: 39.99,
    rating: 3.5,
    quality: 3,
    flavor: 4,
    potency:5,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',
    activity:['mm','mars','pick'],
    effect:[{name:'yummy',strength:90},{name:'sleep',strength:50},{name:'stamina',strength:60}]},

trending:
{   id:'1',
    name:'Forged SML',
    description:'Forged SML excellent',
    price: 25.00,
    rating: 3.5,
    quality: 4,
    flavor: 4,
    potency:4,
    thc: 30,
    cbd: 35,
    thca: 55,
    rid:['0','1','2','3'],
    pid:'0',
    activity:['mm','mars','pick'],
    effect:[{name:'wake',strength:90},{name:'run',strength:80},{name:'stamina',strength:60}]},
}

export default function NewsReducer(state, action) {

    switch (action.type) {

        case NEWS_SUCCESS:

            // In redux, it uses the reference of an object to decide
            // whether two objects are different. So to make the new 
            // state appear different from the old state, we need a
            // new copy! This could become an issue if the state needs
            // to maintain a high number of items. 
            //

            // BatsFix. Because server data fields mismatch, only update the name
            // for now.
            newState = Object.assign({}, state);
            newState.staffPick = Object.assign({}, newState.staffPick);
            newState.staffPick.name = action.staffPick.Title;
            newState.trending = Object.assign({}, newState.trending);
            newState.trending.name = action.trending.Title;

            return newState;

        default:
            return state ? state : initialState;
    }
}
