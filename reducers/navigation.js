import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from '../actions/index.js';

import {HomeSceneId,HomeTabId} from '../common/const.js';

const initialState = {
    tabId    : HomeTabId, 
    sceneId  : HomeSceneId,
    switchScene: 0,
    switchTab: 0,
}

export default function NavigationReducer(state, action) {
    switch (action.type) {
        case SWITCH_TAB:
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
            newState.tabId = action.tabId;
            // This flips the switch so that update happens
            newState.switchTab = newState.switchTab == 0 ? 1: 0;
            console.log("switch tab happening now");
            return newState;

        case SWITCH_SCENE:
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
            newState.sceneId = action.sceneId;
            // This flips the switch so that update happens
            newState.switchScene = newState.switchScene == 0 ? 1: 0;
            console.log("switch scene happening now");
            return newState;

        case SWITCH_TAB_SCENE:
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
            newState.sceneId  = action.sceneId;
            // This flips the switch so that scene update happens
            newState.switchScene = newState.switchScene == 0 ? 1: 0;

            newState.tabId  = action.tabId;
            // This flips the switch so that tab update happens
            newState.switchTab = newState.switchTab == 0 ? 1: 0;
            return newState;

        case SWITCH_TAB_SCENE:
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
            newState.sceneId  = action.sceneId;
            newState.tabId    = action.tabId;
            return newState;

        default:
            return state ? state : initialState;
    }
}
