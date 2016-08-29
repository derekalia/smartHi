import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {RetailerSceneId} from '../common/const.js';
import {GetRetailer} from './data.js';

export const RETAILER_SUCCESS = 'RETAILER_SUCCESS';
export const RETAILER_ERROR   = 'RETAILER_ERROR';

export function GetRetailerAction(retailerId) {

    return function (dispatch, getState) {
        // BatsFix. Fetch retailer data first using retailerId
        var retailer = GetRetailer(retailerId);

        // Then dispatch retailer data
        dispatch({
            type: RETAILER_SUCCESS,
            retailer: retailer,
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneId: RetailerSceneId,
            item: retailer,
		});
    }
}
