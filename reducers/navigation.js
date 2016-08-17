import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
    SWITCH_FRAME,
} from '../actions/index.js';

import {HomeSceneId,HomeTabId,ProductFrameId} from '../common/const.js';

const initialState = {
    tabId    : HomeTabId, 
    sceneId  : HomeSceneId,
    frameId  : ProductFrameId,
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

            return newState;

        case SWITCH_FRAME:
            console.log("switching frame to "+action.frameId);           
            newState = Object.assign({}, state);
            newState.frameId = action.frameId;

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

            newState.tabId  = action.tabId;
            // This flips the switch so that tab update happens
            newState.switchTab = newState.switchTab == 0 ? 1: 0;
            return newState;
        default:
            return state ? state : initialState;
    }
}
