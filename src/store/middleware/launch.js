import {
    getLaunchDetails,
    getLaunchByFiltersQueryDetails,
} from '../../utility/HttpRequest/ApiUrlMapping';

export function getLaunchListDetails() {
    return function (dispatch) {
        return getLaunchDetails()
            .then((res) => {
                console.log('---->', res);
                dispatch({
                    type: 'GET_LAUNCH_SUCCESS',
                    payload: res.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_LAUNCH_FAILURE',
                    payload: error,
                });
            });
    };
}

export function getLaunchByFiltersQueryList(params) {
    return function (dispatch) {
        return getLaunchByFiltersQueryDetails(params)
            .then((res) => {
                dispatch({
                    type: 'GET_LAUNCH_FILTER_QUERY_SUCCESS',
                    payload: res.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_LAUNCH_FILTER_QUERY_FAILURE',
                    payload: error,
                });
            });
    };
}
