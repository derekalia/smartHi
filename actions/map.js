import {
    SWITCH_TAB,
    SWITCH_FRAME,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {SearchTabId, MapFrameId, SearchSceneId} from '../common/const.js';


export const MAP_SUCCESS = 'MAP_SUCCESS';
export const MAP_ERROR   = 'MAP_ERROR';

export function ShowMapAction(mapItem) {
    return function(dispatch, getState) {

        // Then dispatch 
        dispatch({
            type: MAP_SUCCESS,
            item: mapItem,
		});

        // Then dispatch map screen switch
        dispatch({
			type: SWITCH_TAB_SCENE,
			tabId: SearchTabId,
			sceneId: SearchSceneId,
		});

        dispatch({
			type: SWITCH_FRAME,
			frameId: MapFrameId,
		});
    }
}
