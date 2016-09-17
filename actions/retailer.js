import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {RetailerSceneId,HomeTabId,} from '../common/const.js';
import {GetRetailer} from './data.js';

export const RETAILER_SUCCESS = 'RETAILER_SUCCESS';
export const RETAILER_ERROR   = 'RETAILER_ERROR';

export function GetRetailerAction(retailerId) {

    return function (dispatch, getState) {
        var retailer = GetRetailer(retailerId);

        dispatch({
            type:SWITCH_TAB_SCENE,
            tabId: HomeTabId,
            sceneId: RetailerSceneId,
            item: retailer,
        });
    }
}
