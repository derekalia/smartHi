import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ProducerSceneId} from '../common/const.js';
import {GetProducer} from './data.js';

export const PRODUCER_SUCCESS = 'PRODUCER_SUCCESS';
export const PRODUCER_ERROR   = 'PRODUCER_ERROR';

export function GetProducerAction(producerId) {

    return function (dispatch, getState) {
        // BatsFix. Fetch producer data first using retailerId
        var producer = GetProducer(producerId);        

        // Then dispatch retailer data
        dispatch({
            type: PRODUCER_SUCCESS,
            producer: producer,
		});

        // Then show product data scene 
        dispatch({
			type: SWITCH_SCENE,
			sceneId: ProducerSceneId,
		});
    }
}
