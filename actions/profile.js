import {SWITCH_SCENE} from './navigation.js';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR   = 'PROFILE_ERROR';

import {LicenseeSceneId,ProcessorSceneId, ProfileSceneId,HomeTabId,} from '../common/const.js';
import {GetUserProfileImpl} from './fireBase.js';

export function GetProfile(userId) {

}

export function GetProfileAction(userId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: ProfileSceneId,
        itemId: userId,
    });
}
