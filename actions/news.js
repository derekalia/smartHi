import {GetLatestNews} from './data.js';

export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_ERROR   = 'NEWS_ERROR';

export function GetNewsAction() {
    return function(dispatch, getState) {
        // BatsFix. Fetch latest data then dispatch 
        var latest = GetLatestNews();

        // Then dispatch latest news data
        dispatch({
            type: NEWS_SUCCESS,
            latest: latest,
		});
    }
}
