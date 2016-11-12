export const NEWS_SUCCESS = 'NEWS_SUCCESS';

import {GetNews} from './data.js';
import {NotifyBusy,NotifyDone,} from './navigation.js';

async function GetNewsActionWorker(dispatch) {
    // Notify busy
    NotifyBusy(dispatch);
    try {
        result = await GetNews();

        dispatch({ 
            type: NEWS_SUCCESS, 
            item: result,
        });

        NotifyDone(dispatch,null);
    } 
    catch(error) {
        console.log("GetNewsActionWorker:");
        console.log(error);
        NotifyDone(dispatch,"Error getting news");
    };
}

export function GetNewsAction() {
    return function (dispatch, getState) {
        GetNewsActionWorker(dispatch);
    }
}
