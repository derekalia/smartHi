export const SWITCH_TAB       = 'SWITCH_TAB';
export const SWITCH_SCENE     = 'SWITCH_SCENE';
export const SWITCH_TAB_SCENE = 'SWITCH_TAB_SCENE';

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
export function SwitchTabSceneAction(tabId, sceneId) {
    return({
        type: SWITCH_TAB_SCENE,
        sceneId: sceneId,
        tabId: tabId,
    });
}
