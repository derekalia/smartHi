import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ProductSceneId} from '../common/const.js';

export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export function GetProductAction(productId) {
    return function (dispatch, getState) {
        // BatsFix. Fetch product data first.
        
        // Then dispatch product data
        dispatch({
            type: PRODUCT_SUCCESS,
            retailers: [{name:'HerbyGood Maker',id:0}, {name:'Herby Maker',id:1},, {name:'SmokeHouse Maker',id:2}, {name:'Serendipity Producer',id:3}],
            act: ['walking', 'eating', 'relaxing'],
            eff: ['sleepy', 'active', 'happy'],
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneId: ProductSceneId,
		});
    }
}
