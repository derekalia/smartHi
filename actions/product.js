import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {UpdateProductSceneId,ProductSceneId,HomeTabId,} from '../common/const.js';
import {GetProduct} from './data.js';

export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export function GetProductAction(productId, switchTab) {
    return function (dispatch, getState) {
        // BatsFix. Fetch product data first.
        product =  GetProduct(productId);
        dispatch({
            type:SWITCH_TAB_SCENE,
            tabId: HomeTabId,
            sceneId: ProductSceneId,
            item: product,
       });
    }
}
export function UpdateProductAction(productId) {
    return function(dispatch,getState) {
        //Update product.
        //Notify user that update was successful.
        return 'Product Updated Successfully';
    }
}
export function GoUpdateProductAction(productId,producerId) {
    return function(dispatch,getState) {
        var product = 
             {   id:'-11',
                name:'Product Name',
                description:'Product Description',
                price: 0.0,
                rating: 2.0,
                ratingCount: 0,
                quality: 0,
                flavor: 0,
                potency:0,
                thc: 0,
                cbd: 0,
                thca: 0,
                rid:[],
                pid:'0',
                symptom:[],
                activity:[],
                effect:[]};
        
        if (productId != '-1') {
            product = GetProduct(productId);
        }
        console.log("in GoUpdateProductAction product is " + product);
        dispatch({
            type:SWITCH_SCENE,
            sceneId: UpdateProductSceneId,
            item: product,
       });
    }
}
