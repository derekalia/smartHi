import { SWITCH_SCENE } from './navigation.js';

import { 
    CameraSceneId,
    RateQueueSceneId,
    ProductInfoSceneId,
    RateProductSceneId,
    RateRetailerSceneId,
    ProductReviewSceneId,
}   from '../common/const.js';

import {GetRateQueueImpl} from './fireBase.js';

export function GetRateQueue(userId,onRateQueue) {
    GetRateQueueImpl(userId,onRateQueue);
}

export function UploadProductScan() {
    console.log('UploadProductScan:Not implemented yet');
}

export function RateProduct(ratingData,onFinish) {
    console.log('RateProduct:Not implemented yet');
    console.log(ratingData);
    onFinish(null);
}

export function RateRetailer(ratingData,onFinish) {
    console.log('RateRetailer:Not implemented yet');
    console.log(ratingData);
    onFinish(null);
}

export function GoCameraAction() {
    return ({
        type: SWITCH_SCENE,
        sceneId: CameraSceneId,
    });
}

//
// BatsFix. Is this even necessary?
//
export function GoProductInfoAction(productInfo) {
    // BatsFix. Question here is what does productInfo have?
    return ({
        type:SWITCH_SCENE,
        itemId: productInfo,
        sceneId:ProductInfoSceneId,
    });
}

export function GoRateQueueAction() {
    return ({
        type:SWITCH_SCENE,
        itemId: null,
        sceneId:RateQueueSceneId,
    });
}

export function GoRateProductAction(productId) {
    return ({
            type: SWITCH_SCENE,
            itemId:  productId,
            sceneId: RateProductSceneId,
    });
}

export function GoRateRetailerAction(retailerId) {
    return ({
            type: SWITCH_SCENE,
            itemId:  retailerId,
            sceneId: RateRetailerSceneId,
    });
}

export function GoProductReviewAction(reviewId) {
    return ({
            type: SWITCH_SCENE,
            itemId: reviewId,
            sceneId: ProductReviewSceneId,
    });
}

