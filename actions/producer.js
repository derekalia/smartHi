import {
    SWITCH_SCENE,
} from './navigation.js';

import {ProcessorSceneId,ProducerSceneId,HomeTabId} from '../common/const.js';
import {GetProducerImpl} from './fireBase.js';

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

export function ProducerLoginAction(name,password) {
    return async function(dispatch, getState) {

        NotifyBusy(dispatch);
        try {
            //BatsFix. For now assume producer login always succeeds
            var producerId ='1';

            // Pass true to get full info on a producer.
            var producer = await GetProducer(producerId,true);
            dispatch({
                type:PRODUCER_SUCCESS,
                producer:producer,
            });

            // Finally switch screen
            dispatch({
                type:SWITCH_SCENE,
                sceneId: ProcessorSceneId,
                itemId: "ciuovh084pyfu01339caubi0n",
            });
            NotifyDone(dispatch,null);
        }
        catch(error) {
            console.log("ProducerLoginAction:"+error);
            NotifyDone(dispatch,"Producer Login Error");
        }
   }
}
