import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, SearchSceneId, ProductFrameId, RetailerFrameId, MapFrameId, UserFrameId,} from '../common/const.js';
import {SearchProducts,SearchRetailers,SearchUsers} from './fireBase.js';

export function StartSearchAction(searchTerm,frameId,onSearchResult) {
    if (frameId == ProductFrameId) {
        SearchProducts(searchTerm,onSearchResult);
    }
    else
    if (frameId == RetailerFrameId) {
        SearchRetailers(searchTerm,onSearchResult);
    }
    else
    if (frameId == MapFrameId) {
        SearchRetailers(searchTerm,onSearchResult);
    }
    else
    if (frameId == UserFrameId) {
        SearchUsers(searchTerm,onSearchResult);
    }
}

export function GoSearchAction(searchTerm) {
    return function (dispatch, getState) {
        dispatch({
			type: SWITCH_TAB,
			tabId: SearchTabId,
		});
        dispatch({
			type: SWITCH_SCENE,
			sceneId: SearchSceneId,
		});
    }
}
