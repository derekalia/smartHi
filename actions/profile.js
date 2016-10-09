import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR   = 'PROFILE_ERROR';

import {LicenseeSceneId,ProcessorSceneId, ProfileSceneId,HomeTabId,} from '../common/const.js';
import {GetUserProfile} from './data.js';
import {NotifyBusy,NotifyDone} from './navigation.js';

export function GetProfileAction(userId) {
    return function(dispatch, getState) {
        var user = GetUserProfile(userId);
        dispatch({
            type:SWITCH_SCENE,
            sceneId: ProfileSceneId,
            item: user,
        });
    }
}

export function ResetPasswordAction() {
   return function(dispatch, getState) {
        NotifyBusy(dispatch);
        NotifyDone(dispatch,null);
   }
}
