import { combineReducers } from 'redux';
import fetchLaunchDetails from './launchReducer';

const reducer = combineReducers({
    launchDetails: fetchLaunchDetails,
});

export default reducer;
