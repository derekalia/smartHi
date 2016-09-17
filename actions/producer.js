import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ProducerSceneId,HomeTabId} from '../common/const.js';
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
