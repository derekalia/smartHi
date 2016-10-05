export const SWITCH_TAB       = 'SWITCH_TAB';
export const SWITCH_SCENE     = 'SWITCH_SCENE';
export const SWITCH_FRAME     = 'SWITCH_FRAME';
export const SWITCH_TAB_SCENE = 'SWITCH_TAB_SCENE';

export const MODAL_SUCCESS = 'MODAL_SUCCESS';
export const MODAL_ERROR   = 'MODAL_ERROR';
export const MODAL_RESET   = 'MODAL_RESET';

export function ResetModalAction() {
    return({
        type: MODAL_RESET,
    });
}

// Import const ids.
import {HomeTabId,SearchTabId,ReviewTabId,ProfileTabId} from '../common/const.js';
import {HomeSceneId,SearchSceneId,ReviewStartSceneId,ProfileSceneId} from '../common/const.js';

export function SwitchTabAction(tabId) {
    return({
        type: SWITCH_TAB,
        tabId: tabId,
    });
}

export function SwitchSceneAction(sceneId) {
    return({
        type: SWITCH_SCENE,
        sceneId: sceneId,
    });
}

export function SwitchFrameAction(frameId) {
    return({
        type: SWITCH_FRAME,
        frameId: frameId,
    });
}

export function SwitchTabSceneAction(tabId, sceneId) {
    return({
        type: SWITCH_TAB_SCENE,
        sceneId: sceneId,
        tabId: tabId,
    });
}
