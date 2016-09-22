import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
    MODAL_SUCCESS,
} from './navigation.js';

import {ProcessorSceneId,ProducerSceneId,HomeTabId} from '../common/const.js';
import {GetProducer} from './data.js';

export const PRODUCER_SUCCESS = 'PRODUCER_SUCCESS';
export const PRODUCER_ERROR   = 'PRODUCER_ERROR';

export function GetProducerAction(producerId) {

    return function (dispatch, getState) {
        // BatsFix. Fetch producer data first using retailerId
        var producer = GetProducer(producerId);        

        dispatch({
            type:SWITCH_TAB_SCENE,
            tabId: HomeTabId,
            sceneId: ProducerSceneId,
            item: producer,
        });
    }
}

export function ProducerLoginAction(name,password) {
    return function(dispatch, getState) {
        //BatsFix. For now assume producer login always succeeds
        var producerId ='0';

        // Indicate dialog success
        dispatch({
            type: MODAL_SUCCESS,
        });

        // Pass true to get full info on a producer.
        var producer = GetProducer(producerId,true);
        dispatch({
            type:PRODUCER_SUCCESS,
            producer:producer,
        });

        // Finally switch screen
        dispatch({
            type:SWITCH_SCENE,
            sceneId: ProcessorSceneId,
        });
   }
}
