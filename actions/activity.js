import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {ActivitySceneId} from '../common/const.js';
import {GetActivityProducts} from './data.js';

export const ACTIVITY_START   = 'ACTIVITY_START';
export const ACTIVITY_SUCCESS = 'ACTIVITY_SUCCESS';
export const ACTIVITY_ERROR   = 'ACTIVITY_ERROR';


export function GetActivityAction(activityType) {
    return {
			type: SWITCH_SCENE,
			sceneId: ActivitySceneId,
            itemId: activityType,
	}
}
