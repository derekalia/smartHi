import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ProductSceneId} from '../common/const.js';
import {GetProduct} from './data.js';

export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export function GetProductAction(productId) {
    return function (dispatch, getState) {
        // BatsFix. Fetch product data first.
        product =  GetProduct(productId);
        dispatch({
            type: PRODUCT_SUCCESS,
            product: product,
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneId: ProductSceneId,
		});
    }
}
