import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export function GetProductAction(searchTerm) {
    // should really be a dispatch function. BatsFix. When server comes
    // back returns this.
    return function (dispatch, getState) {
        // Fetch product data first.
        
        // Then dispatch product data
        dispatch({
            type: PRODUCT_SUCCESS,
            producers: ['HerbyGood Maker', 'Herby Maker', 'SmokeHouse Maker', 'Serendipity Producer'],
            act: ['walking', 'eating', 'relaxing'],
            eff: ['sleepy', 'active', 'happy'],
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneName: 'ProductScene',
		});
    }
}
