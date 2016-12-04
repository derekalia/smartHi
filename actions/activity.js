import {ActivitySceneId} from '../common/const.js';
import {SWITCH_SCENE} from './navigation.js';
import {GetActivityProductsImpl} from './fireBase.js';

export function GetActivityProducts(activityType,onActivityProducts) {
    GetActivityProductsImpl(activityType,onActivityProducts);
}

export function GetActivityAction(activityType) {
    return ({
			type: SWITCH_SCENE,
			sceneId: ActivitySceneId,
            itemId: activityType,
    });
}
