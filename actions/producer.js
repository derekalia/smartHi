import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

export const PRODUCER_SUCCESS = 'PRODUCER_SUCCESS';
export const PRODUCER_ERROR = 'PRODUCER_ERROR';

export function GetProducerAction(producerId) {

    return function (dispatch, getState) {
        // BatsFix. Fetch producer data first using producerId
        
        // Then dispatch product data
        dispatch({
            type: PRODUCER_SUCCESS,
            producerId: producerId,
            products: ['HerbyGood Makers', 'Smiley', 'SmokeHouse', 'Serendipity'],
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneName: 'ProducerScene',
		});
    }
}
