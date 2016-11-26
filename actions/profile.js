import {SWITCH_SCENE} from './navigation.js';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR   = 'PROFILE_ERROR';

import {LicenseeSceneId,ProcessorSceneId, ProfileSceneId,HomeTabId,} from '../common/const.js';
import {GetProfileImpl,ChangeUserNameImpl,} from './fireBase.js';

export function GetProfile(userId,onProfile) {
    GetProfileImpl(userId,onProfile);
}

export function GetProfileAction(userId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: ProfileSceneId,
        itemId: userId,
    });
}

export function ChangeUserName(userId,userName,onFinish) {
    ChangeUserNameImpl(userId,userName,onFinish);
}

export function ChangeUserEmail(userId,userEmail,onFinish) {
    onFinish(null);
}

export function ResetUserPassword(userId,password,password2,onFinish) {
    onFinish(null);
}
