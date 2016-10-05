import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
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
    },
    searchTab: {
        sceneId: SearchSceneId,
        item: null,
    },
    reviewTab: {
        sceneId: ReviewStartSceneId,
        item: null,
    },
    profileTab: {
        sceneId: ProfileSceneId,
        item: null,
    },
    tabId: HomeTabId, // current tab id.
}

export default function NavigationReducer(state, action) {
    switch (action.type) {
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
                    case HomeTabId: newState.homeTab.sceneId = HomeSceneId; break;
                    case SearchTabId: newState.homeTab.sceneId = SearchSceneId; break;
                    case ReviewTabId: newState.homeTab.sceneId = ReviewStartSceneId; break;
                    case ProfileTabId: newState.homeTab.sceneId = ProfileSceneId; break;
                }
            }
            return newState;

        case SWITCH_SCENE:
            //
            // Setting scene for the current tab
            //
            newState = Object.assign({}, state);
            newState[newState.tabId] = {sceneId: action.sceneId, item: action.item};

            return newState;

        case SWITCH_TAB_SCENE:
            //
            // Setting scene for a new tab
            //
            newState = Object.assign({}, state);
            newState.tabId    = action.tabId;
            newState[newState.tabId] = {sceneId: action.sceneId, item: action.item};
            return newState;

        default:
            return state ? state : initialState;
    }
}
