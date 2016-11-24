import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
    NOTIFY_BUSY,
    NOTIFY_DONE,
    LOGOFF_SUCCESS,
} from '../actions/index.js';

import {HomeSceneId,HomeTabId,
        SearchSceneId,SearchTabId,
        ReviewStartSceneId,ReviewTabId,
        ProfileSceneId,ProfileTabId
} from '../common/const.js';

const initialState = {
    homeTab: {
        sceneId: HomeSceneId,
        item: null,
        itemId: null,
    },
    searchTab: {
        sceneId: SearchSceneId,
        item: null,
        itemId: null,
    },
    reviewTab: {
        sceneId: ReviewStartSceneId,
        item: null,
        itemId: null,
    },
    profileTab: {
        sceneId: ProfileSceneId,
        item: null,
        itemId: null,
    },
    tabId: HomeTabId, // current tab id.
    // 
    // Following are used for notification
    //
    showMessage: false, 
    showBusy:    false,
    message:     'no message',
}

export default function NavigationReducer(state, action) {
    switch (action.type) {
        case LOGOFF_SUCCESS:
            //
            // Setting scene for a new tab
            //
            newState = Object.assign({}, state);
            newState.tabId    = HomeTabId; 
            newState[newState.tabId] = {sceneId: HomeSceneId, item: null};
            return newState;

           
        case SWITCH_TAB:
            newState = Object.assign({}, state);
            if (newState.tabId != action.tabId) {
                // 
                // If switching tabs simply change active tab id.
                //  
                newState.tabId = action.tabId;
            }
            else {
                //
                // Setting the same tab again indicates the user
                // intends to reset the tab.
                //
                switch(action.tabId) {
                    case HomeTabId: newState.homeTab = {sceneId:HomeSceneId,item: null, itemId: null}; break;
                    case SearchTabId: newState.homeTab = {sceneId:SearchSceneId,item:null, itemId: null}; break;
                    case ReviewTabId: newState.reviewTab = {sceneId:ReviewStartSceneId, item:null, itemId: null}; break;
                    case ProfileTabId: newState.profileTab = {sceneId:ProfileSceneId, item: null, itemId: null}; break;
                }
            }
            return newState;

        case SWITCH_SCENE:
            //
            // Setting scene for the current tab
            //
            newState = Object.assign({}, state);
            newState[newState.tabId] = {sceneId: action.sceneId, item: action.item, itemId: action.itemId};

            return newState;

        case SWITCH_TAB_SCENE:
            //
            // Setting scene for a new tab
            //
            newState = Object.assign({}, state);
            newState.tabId    = action.tabId;
            newState[newState.tabId] = {sceneId: action.sceneId, item: action.item};
            return newState;

        case NOTIFY_BUSY:
            newState = Object.assign({}, state);
            newState.showBusy = true;
            return newState;

        case NOTIFY_DONE:
            newState = Object.assign({}, state);
            newState.showBusy = false;
            if (action.message != null) {
                newState.message = action.message;
                newState.showMessage = true;
            }
            else {
                newState.message = null;
                newState.showMessage = false;
            }
            return newState;

        default:
            return state ? state : initialState;
    }
}
