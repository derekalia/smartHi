export const SWITCH_TAB       = 'SWITCH_TAB';
export const SWITCH_SCENE     = 'SWITCH_SCENE';
export const SWITCH_FRAME     = 'SWITCH_FRAME';
export const SWITCH_TAB_SCENE = 'SWITCH_TAB_SCENE';

export const MODAL_SUCCESS = 'MODAL_SUCCESS';
export const MODAL_ERROR   = 'MODAL_ERROR';
export const MODAL_RESET   = 'MODAL_RESET';

export const NOTIFY_BUSY     = 'NOTIFY_BUSY';
export const NOTIFY_DONE     = 'NOTIFY_DONE';

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

//
// Notification message actions dispatchers. Notice that action message expires 
// after 2000 milliseconds
// 
export function NotifyBusy(dispatch) {
    dispatch({
        type: NOTIFY_BUSY,
    });
}

export function NotifyDone(dispatch,message) {
    dispatch({
        type: NOTIFY_DONE,
        message: message,
    });
    //
    // If message was sent, hide the message after 
    // timeout
    if (message != null) {
        setTimeout(()=>{
            dispatch({
                type: NOTIFY_DONE,
                message: null,
            })
        },2000);
    }
}

export function ResetModalAction() {
    return({
        type: MODAL_RESET,
    });
}


