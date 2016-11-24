import {SWITCH_SCENE} from './navigation.js';

import {LicenseeSceneId,RetailerSceneId,HomeTabId,} from '../common/const.js';
import {GetRetailerImpl,RetailerLoginImpl} from './fireBase.js';

import {NotifyBusy,NotifyDone} from './navigation.js';

export const RETAILER_SUCCESS = 'RETAILER_SUCCESS';
export const RETAILER_ERROR   = 'RETAILER_ERROR';

export function GetRetailer(retailerId,onRetailer) {
    return GetRetailerImpl(retailerId,onRetailer);
}

export function GoRetailerAction(retailerId) {
   return({
        type:SWITCH_SCENE,
        sceneId: RetailerSceneId,
        itemId: retailerId,
   });
}

export function RetailerLogin(userName,userPassword,onLogin) {
    RetailerLoginImpl(userName,userPassword,onLogin);
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

export function UpdateRetailerAction(retailerId,name,description,image) {
    return function (dispatch, getState) {
        //Call update producer action here.
        //Then notify the user that the producer data was
        //updated.
        NotifyBusy(dispatch);
        NotifyDone(dispatch,"Updated retailer successfully");
    }
}
