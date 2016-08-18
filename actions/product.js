import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ProductSceneId,SearchTabId,} from '../common/const.js';
import {GetProduct} from './data.js';

export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export function GetProductAction(productId, switchTab) {
    return function (dispatch, getState) {
        // BatsFix. Fetch product data first.
        product =  GetProduct(productId);
        dispatch({
            type: PRODUCT_SUCCESS,
            product: product,
		});

        if (switchTab) {
            dispatch({
                type:SWITCH_TAB_SCENE,
                tabId: SearchTabId,
                sceneId: ProductSceneId,
           });
        }
        else
        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneId: ProductSceneId,
		});
    }
}
