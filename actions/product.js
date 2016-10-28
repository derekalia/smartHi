import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {UpdateProductSceneId,ProductSceneId,HomeTabId,} from '../common/const.js';
import {GetProduct} from './data.js';

import {NotifyBusy,NotifyDone,} from './navigation.js';

export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export function GetProductAction(productId, switchTab) {
    return ({ 
        type:SWITCH_SCENE,
        sceneId: ProductSceneId,
        itemId: productId,
    });
}

export function UpdateProductAction(productId) {
    return function(dispatch,getState) {
        //Update product.
        //Notify user that update was successful.
        NotifyBusy(dispatch);
        NotifyDone(dispatch,"Updated product");
    }
}

export function GoUpdateProductAction(productId,producerId) {
    return async function(dispatch,getState) {
        NotifyBusy(dispatch);
        try {
            var product = 
                 {   id:'-1',
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
                product = await GetProduct(productId);
            }
            dispatch({
                type:SWITCH_SCENE,
                sceneId: UpdateProductSceneId,
                item: product,
           });
           NotifyDone(dispatch,null);
        }
        catch(error) {
            console.log("GoUpdateProductAction:"+error);
            NotifyDone(dispatch,"UpdateProductAction failed");
        }
    }
}
