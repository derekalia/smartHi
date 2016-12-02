import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, SearchSceneId, ProductFrameId, RetailerFrameId, MapFrameId, UserFrameId,} from '../common/const.js';
import {SearchImpl} from './fireBase.js';

export function SearchProducts(searchTerm, onSearchResult) {
    console.log('SearchProducts:' + searchTerm);
    SearchImpl('product',searchTerm,onSearchResult);
}

export function SearchRetailersImpl(searchTerm, onSearchResult) {
}

export function SearchUsersImpl(searchTerm, onSearchResult) {
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
