export const SWITCH_TAB       = 'SWITCH_TAB';
export const SWITCH_SCENE     = 'SWITCH_SCENE';
export const SWITCH_TAB_SCENE = 'SWITCH_TAB_SCENE';

export function SwitchTabAction(tabName) {
    return({
        type: SWITCH_TAB,
        tabName: tabName,
    });
}
export function SwitchSceneAction(sceneName) {
    return({
        type: SWITCH_SCENE,
        sceneName: sceneName,
    });
}
export function SwitchTabSceneAction(tabName, sceneName) {
    return({
        type: SWITCH_TAB_SCENE,
        sceneName: sceneName,
        tabName: tabName,
    });
}
