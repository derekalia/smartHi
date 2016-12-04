import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, SearchSceneId} from '../common/const.js';
import {SearchImpl} from './fireBase.js';

export function SearchProducts(searchTerm, onSearchResult) {
    console.log('SearchProducts:' + searchTerm);
    SearchImpl('product',searchTerm,onSearchResult);
}

export function SearchRetailers(searchTerm, onSearchResult) {
    console.log('SearchRetailers:'+searchTerm);
    SearchImpl('retailer',searchTerm,onSearchResult);
}

export function SearchUsers(searchTerm, onSearchResult) {
    console.log('SearchUsers:'+searchTerm);
    SearchImpl('user',searchTerm,onSearchResult);
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
