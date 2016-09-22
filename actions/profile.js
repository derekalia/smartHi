import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
    MODAL_SUCCESS,
    MODAL_ERROR,
} from './navigation.js';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR   = 'PROFILE_ERROR';

import {LicenseeSceneId,ProcessorSceneId, ProfileSceneId,HomeTabId,} from '../common/const.js';
import {GetUserProfile} from './data.js';

export function GetProfileAction(userId) {
    return function(dispatch, getState) {
        var user = GetUserProfile(userId);
        dispatch({
            type:SWITCH_TAB_SCENE,
            tabId: HomeTabId,
            sceneId: ProfileSceneId,
            item: user,
        });
    }
}

export function ResetPasswordAction() {
    return function(dispatch, getState) {
        //BatsFix. For now assume reset password always succeeds
        dispatch({
            type: MODAL_SUCCESS,
        });
        dispatch({
            type:SWITCH_SCENE,
            sceneId: LicenseeStoreSceneId,
        });
   }
}
