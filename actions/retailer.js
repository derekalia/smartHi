import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

import {LicenseeSceneId,RetailerSceneId,HomeTabId,} from '../common/const.js';
import {GetRetailer} from './data.js';
import {NotifyBusy,NotifyDone} from './navigation.js';

export const RETAILER_SUCCESS = 'RETAILER_SUCCESS';
export const RETAILER_ERROR   = 'RETAILER_ERROR';

export function GetRetailerAction(retailerId) {

    return async function (dispatch, getState) {
        NotifyBusy(dispatch);
        try {
            var retailer =  await GetRetailer(retailerId);
            dispatch({
                type:SWITCH_SCENE,
                sceneId: RetailerSceneId,
                item: retailer,
            });
            NotifyDone(dispatch,null);
        }
        catch(error) {
            console.log("GetRetailerAction:"+error);
            NotifyDone(dispatch,"GetRetailer failed");
        }
    }
}

export function LicenseeLoginAction(name,password) {
    return async function(dispatch, getState) {
        NotifyBusy(dispatch);
        try {
            //BatsFix. For now assume producer login always succeeds
            var retailerId = '1';
           
            // Pass true to get full info on a retailer.
            var retailer = await GetRetailer(retailerId,true);
            dispatch({
                type:RETAILER_SUCCESS,
                retailer: retailer,
            });
            // Finally switch screen
            dispatch({
                type:SWITCH_SCENE,
                sceneId: LicenseeSceneId,
            });
            NotifyDone(dispatch, null);
        }
        catch(error) {
            NotifyDone(dispatch,"LicenseeLogin failed");
        }
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
