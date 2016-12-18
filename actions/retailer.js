import {SWITCH_SCENE} from './navigation.js';

export const RETAILER_SUCCESS = 'RETAILER_SUCCESS';

import {RetailerProfileSceneId,RetailerSceneId,UpdateRetailerSceneId} from '../common/const.js';

import {GetRetailerImpl,RetailerLoginImpl} from './fireBase.js';

export function RetailerLogin(userName,userPassword,onLogin) {
    RetailerLoginImpl(userName,userPassword,onLogin);
}

export function GetRetailer(retailerId,onRetailer) {
    return GetRetailerImpl(retailerId,onRetailer);
}

export function UpdateRetailer(retailerData,onFinish) {
    console.log('UpdateRetailer: Not implemented yet');
    onFinish(null);
}

export function GoRetailerAction(retailerId) {
   return({
        type:SWITCH_SCENE,
        sceneId: RetailerSceneId,
        itemId: retailerId,
   });
}

export function GoUpdateRetailerAction(retailerId) {
    return({
        type:SWITCH_SCENE,
        sceneId: UpdateRetailerSceneId,
        itemId: retailerId,
    });
}

export function RetailerLoginAction(retailer) {
    return async function(dispatch, getState) {
        dispatch({
            type:RETAILER_SUCCESS,
            retailer: retailer,
        });

        dispatch({
            type:SWITCH_SCENE,
            sceneId: RetailerProfileSceneId,
            itemId:retailer.id, 
        });
    }
}


