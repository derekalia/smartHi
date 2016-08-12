import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, SearchSceneId, ProductFrameId, RetailerFrameId,} from '../common/const.js';
import {SearchProducts,SearchRetailers} from './data.js';

export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function StartSearchAction(searchTerm,filters,frameId) {
    // should really be a dispatch function. BatsFix
    if (frameId == ProductFrameId) {
        var products = SearchProducts(searchTerm);
        return {
            type: SEARCH_SUCCESS,
            products: products,
            frameId: frameId,
        };
    }
    else
    if (frameId == RetailerFrameId) {
        var retailers = SearchRetailers(searchTerm);
        return {
            type: SEARCH_SUCCESS,
            retailers: retailers,
            frameId: frameId,
        };
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
