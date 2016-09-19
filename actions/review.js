import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {CameraSceneId,ProductInfoSceneId,RateProductSceneId,RateStoreSceneId,ProductReviewSceneId,} from '../common/const.js';
import {UploadProductImage,UploadProductRating,UploadStoreRating,GetProductItem,GetProductReview} from './data.js';

export const IMAGE_SUCCESS        = 'IMAGE_SUCCESS';
export const IMAGE_RESET          = 'IMAGE_RESET';
export const RATE_PRODUCT_SUCCESS = 'RATE_PRODUCT_SUCCESS';
export const RATE_STORE_SUCCESS   = 'RATE_STORE_SUCCESS';

export function UploadProductImageAction() {
    return function (dispatch, getState) {
        var result = UploadProductImage();        
        // BatsFix. If image upload and analysis was successfull do
        if (result != null) {
            // Then dispatch productInfo data
            dispatch({
                type: IMAGE_SUCCESS,
                productInfo: result.productInfo,
                storeInfo: result.storeInfo,
            });

            // Then show product data scene 
            dispatch({
                type: SWITCH_SCENE,
                sceneId: ProductInfoSceneId,
            });
        }
        else {
            // If there was an error analyzing image go directly
            // to rating the product
            dispatch({
                type: IMAGE_RESET,
            });

            dispatch({
                type: SWITCH_SCENE,
                sceneId: RateProductSceneId,
            });
        }
    }
}

export function GetProductReviewAction(pid,userId) {
    // Product item and its review by a particular user
    // are separate objects
    return function(dispatch,getState) {
        console.log("looking for product " + pid);
        var product = GetProductItem(pid);
        console.log("and got for product " + product);
        var review  = GetProductReview(pid,userId);
        dispatch({
            type: SWITCH_SCENE,
            item: {product:product,review:review},
            sceneId: ProductReviewSceneId,
        });
    }
}

export function ConfirmProductInfoAction() {
    return({
        type: SWITCH_SCENE,
        sceneId: RateProductSceneId,
    });
}

export function RateProductAction() {
     return function (dispatch, getState) {
        var result = UploadProductRating();        
        dispatch({
            type: RATE_PRODUCT_SUCCESS,
        });
        dispatch({
            type: SWITCH_SCENE,
            sceneId: RateStoreSceneId,
        });
    }
}

export function RateStoreAction() {
     return function (dispatch, getState) {
        var result = UploadStoreRating();        
        dispatch({
            type: RATE_STORE_SUCCESS,
        });
        dispatch({
            type:SWITCH_SCENE,
            sceneId:CameraSceneId,
        });
    }
}
