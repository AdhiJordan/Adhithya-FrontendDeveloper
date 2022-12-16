let initialState = {
    launch: null,
    launchId: null,
    filters: null,
    queryUrl: null,
};

const fetchLaunchDetails = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LAUNCH_SUCCESS':
            return {
                ...state,
                launch: action.payload,
            };
        case 'GET_LAUNCH_FILTER_QUERY_SUCCESS':
            return {
                ...state,
                launch: action.payload,
            };
        case 'GET_LAUNCH_FAILURE':
            return {
                ...state,
                launch: action.payload,
            };
        case 'GET_QUERY_URL':
            return {
                ...state,
                queryUrl: action.payload,
            };
        case 'GET_LAUNCH_ID':
            return {
                ...state,
                launchId: action.payload,
            };

        case 'RESET_ALL':
            return {
                ...state,
                launch: null,
                launchId: null,
                filters: null,
                queryUrl: null,
            };
        default:
            return state;
    }
};

export default fetchLaunchDetails;
