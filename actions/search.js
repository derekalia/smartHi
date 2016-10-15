import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, SearchSceneId, ProductFrameId, RetailerFrameId, MapFrameId, UserFrameId,} from '../common/const.js';
import {SearchProducts,SearchRetailers,SearchUsers} from './data.js';

export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function StartSearchAction(searchTerm,filters,frameId) {
    // should really be a dispatch function. BatsFix
    return async function(dispatch,getState) {
        if (frameId == ProductFrameId) {
            var products =await SearchProducts(searchTerm);
            console.log("found products count " + products.length);
            dispatch({
                type: SEARCH_SUCCESS,
                products: products,
                frameId: frameId,
            });
        }
        else
        if (frameId == RetailerFrameId) {
            var retailers =await SearchRetailers(searchTerm);
            dispatch({
                type: SEARCH_SUCCESS,
                retailers: retailers,
                frameId: frameId,
            });
        }
        else
        if (frameId == MapFrameId) {
            var retailers =await SearchRetailers(searchTerm);
            dispatch({
                type: SEARCH_SUCCESS,
                retailers: retailers,
                frameId: frameId,
            });
        }
        else
        if (frameId == UserFrameId) {
            var users =await SearchUsers(searchTerm);
            dispatch({
                type: SEARCH_SUCCESS,
                users: users,
                frameId: frameId,
            });
        }
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
