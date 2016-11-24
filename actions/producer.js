import {
    SWITCH_SCENE,
} from './navigation.js';

import {ProcessorSceneId,ProducerSceneId,HomeTabId} from '../common/const.js';
import {ProducerLoginImpl,GetProducerImpl} from './fireBase.js';

export function GetProducer(producerId,onProducer) {
    return GetProducerImpl(producerId,onProducer);
}

export function GoProducerAction(producerId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: ProducerSceneId,
        itemId: producerId,
    });
}

export function ProducerLogin(userName,userPassword,onLogin) {
    ProducerLoginImpl(userName,userPassword,onLogin);
}

export function ProducerLoginAction(producer) {
    return async function(dispatch, getState) {
        dispatch({
            type:PRODUCER_SUCCESS,
            producer:producer,
        });

        dispatch({
            type:SWITCH_SCENE,
            sceneId: ProcessorSceneId,
            itemId: producer.id,
        });
   }
}

import {NotifyBusy,NotifyDone,} from './navigation.js';

export const PRODUCER_SUCCESS = 'PRODUCER_SUCCESS';
export const PRODUCER_ERROR   = 'PRODUCER_ERROR';

export function UpdateProducerAction(producerId) {
    return function (dispatch, getState) {
        //Call update producer action here.
        //Then notify the user that the producer data was
        //updated.
        NotifyBusy(dispatch);
        NotifyDone(dispatch,"Updated successfully");
    }
}


