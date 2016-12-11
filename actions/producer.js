import { SWITCH_SCENE } from './navigation.js';

export const PRODUCER_SUCCESS = 'PRODUCER_SUCCESS';

import {ProducerProfileSceneId,ProducerSceneId} from '../common/const.js';
import {ProducerLoginImpl,GetProducerImpl} from './fireBase.js';

export function GetProducer(producerId,onProducer) {
    return GetProducerImpl(producerId,onProducer);
}

export function ProducerLogin(userName,userPassword,onLogin) {
    ProducerLoginImpl(userName,userPassword,onLogin);
}

export function GoProducerAction(producerId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: ProducerSceneId,
        itemId: producerId,
    });
}

export function ProducerLoginAction(producer) {
    return async function(dispatch, getState) {
        dispatch({
            type:PRODUCER_SUCCESS,
            producer:producer,
        });

        dispatch({
            type:SWITCH_SCENE,
            sceneId: ProducerProfileSceneId,
            itemId: producer.id,
        });
   }
}
