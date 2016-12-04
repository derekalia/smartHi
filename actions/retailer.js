import {SWITCH_SCENE} from './navigation.js';

export const RETAILER_SUCCESS = 'RETAILER_SUCCESS';

import {LicenseeSceneId,RetailerSceneId} from '../common/const.js';

import {GetRetailerImpl,RetailerLoginImpl} from './fireBase.js';

export function RetailerLogin(userName,userPassword,onLogin) {
    RetailerLoginImpl(userName,userPassword,onLogin);
}

export function GetRetailer(retailerId,onRetailer) {
    return GetRetailerImpl(retailerId,onRetailer);
}

export function UpdateRetailer(retailerId,name,description,image) {
    console.log('UpdateRetailer: Not implemented yet');
}

export function GoRetailerAction(retailerId) {
   return({
        type:SWITCH_SCENE,
        sceneId: RetailerSceneId,
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
            sceneId: LicenseeSceneId,
            itemId:retailer.id, 
        });
    }
}


