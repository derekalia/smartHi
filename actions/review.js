import { SWITCH_SCENE } from './navigation.js';

import { 
    CameraSceneId,
    RateQueueSceneId,
    ProductInfoSceneId,
    ProductRateSceneId,
    RetailerRateSceneId,
    ProductReviewSceneId,
}   from '../common/const.js';

export function UploadProductScan() {
    console.log('UploadProductScan:Not implemented yet');
}

export function RateProduct() {
    console.log('RateProduct:Not implemented yet');
}

export function RateRetailer() {
    console.log('RateRetailer:Not implemented yet');
}

export function GoCameraAction() {
    return ({
        type: SWITCH_SCENE,
        sceneId: CameraSceneId,
    });
}

export function GoRateQueueAction() {
    return ({
        type:SWITCH_SCENE,
        itemId: null,
        sceneId:RateQueueSceneId,
    });
}

export function GoProductInfoAction(productInfo) {
    // BatsFix. Question here is what does productInfo have?
    return ({
        type:SWITCH_SCENE,
        itemId: productInfo,
        sceneId:ProductInfoSceneId,
    });
}

export function GoProductRateAction(productId) {
    return ({
            type: SWITCH_SCENE,
            itemId:  productId,
            sceneId: ProductRateSceneId,
    });
}

export function GoRetailerRateAction(productId) {
    return ({
            type: SWITCH_SCENE,
            itemId:  retailerId,
            sceneId: RetailerRateSceneId,
    });
}

export function GoProductReviewAction(reviewId) {
    return ({
            type: SWITCH_SCENE,
            itemId: reviewId,
            sceneId: ProductReviewSceneId,
    });
}

