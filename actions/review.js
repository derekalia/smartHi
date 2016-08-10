import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {RateProductSceneId} from '../common/const.js';
import {GetProduct} from './data.js';

export const RATE_SUCCESS = 'RATE_SUCCESS';
export const RATE_ERROR   = 'RATE_ERROR';

//
// BatsFix. If the product is not found in the database
// this should be doing something else!
//
export function RateProductAction(productId) {
    return function (dispatch, getState) {
        // BatsFix. Fetch product data first.
        product =  GetProduct(productId);
        dispatch({
            type: RATE_SUCCESS,
            product: product,
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneId: RateProductSceneId,
		});
    }
}
