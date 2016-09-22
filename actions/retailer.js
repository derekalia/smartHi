import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
    MODAL_SUCCESS,
} from './navigation.js';

import {LicenseeSceneId,RetailerSceneId,HomeTabId,} from '../common/const.js';
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

export function LicenseeLoginAction(name,password) {
    return function(dispatch, getState) {
        //BatsFix. For now assume producer login always succeeds
        var retailerId = '0';

        // Indicate dialog success.
        dispatch({
            type: MODAL_SUCCESS,
        });
        
        // Pass true to get full info on a retailer.
        var retailer = GetRetailer(retailerId,true);
        dispatch({
            type:RETAILER_SUCCESS,
            retailer: retailer,
        });

        // Finally switch screen
        dispatch({
            type:SWITCH_SCENE,
            sceneId: LicenseeSceneId,
        });
   }
}
