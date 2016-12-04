import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {UpdateProductSceneId,ProductSceneId} from '../common/const.js';
import {GetProductImpl} from './fireBase.js';

export function GetProduct(productId,onProduct ) {
    return GetProductImpl(productId,onProduct);
}

export function GoProductAction(productId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: ProductSceneId,
        itemId: productId,
    });
}

export function GoUpdateProductAction(productId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: UpdateProductSceneId,
        item: productId
    });
}
