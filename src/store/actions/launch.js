import {
    getLaunchListDetails,
    getLaunchByFiltersQueryList,
} from '../middleware/launch';

export function getLaunchList() {
    return getLaunchListDetails();
}

export function getLaunchByFiltersQuery(params) {
    return getLaunchByFiltersQueryList(params);
}

export function getQueryURL(url) {
    return {
        type: 'GET_QUERY_URL',
        payload: url,
    };
}

export function resetAll() {
    return {
        type: 'RESET_ALL',
    };
}

export function getLaunchId(id) {
    return {
        type: 'GET_USER_ID',
        payload: id,
    };
}
