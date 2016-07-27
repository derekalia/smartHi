import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, SearchSceneId} from '../common/const.js';

export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function StartSearchAction(searchTerm) {
    // should really be a dispatch function. BatsFix
    return {
        type: SEARCH_SUCCESS,
        products: ['HerbyGood', 'Herby', 'SmokeHouse', 'Serendipity', 'Musty', 'Misty', 'Sunny', 'Bono'],
    };
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
