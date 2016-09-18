import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR   = 'PROFILE_ERROR';

import {ProfileSceneId,HomeTabId,} from '../common/const.js';
import {GetUserProfile} from './data.js';

export function GetProfileAction(userId) {
    return function(dispatch, getState) {
        var user = GetUserProfile();
        dispatch({
            type:SWITCH_TAB_SCENE,
            tabId: HomeTabId,
            sceneId: ProfileSceneId,
            item: user,
        });
    }
}

