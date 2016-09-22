import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ProducerProfileSceneId,ProducerSceneId,HomeTabId} from '../common/const.js';
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
export function UpdateProducerAction(description) {
    //Does something here
}
function LoginProducer(name,password) {
    return '0';
}
export function LoginProducerAction(name,password) {
    return function (dispatch,getState) {
        // First login the producer
        var producerId = LoginProducer(name,password);
        // Pass true to get full info on a producer.
        var producer = GetProducer(producerId,true);
        dispatch({
            type:PRODUCER_SUCCESS,
            producer:producer,
        });
        //
        // Then go to producerProfileScene?
        //
        dispatch({
            type:SWITCH_SCENE,
            sceneId: ProducerProfileSceneId,
        });
    }
}
