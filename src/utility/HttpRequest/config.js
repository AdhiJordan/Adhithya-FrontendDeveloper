import DEV from './../../config/dev';
import STAGING from './../../config/staging';
import PRODUCTION from './../../config/prod';
import {getEnv} from './utility';

let CONFIG;
let ENV = getEnv();

switch(ENV) {
    case "development":
        CONFIG = DEV;
        break;
    case "staging":
        CONFIG = STAGING;
        break;
    case "production":
        CONFIG = PRODUCTION;
        break;
    default:
        CONFIG = DEV;
}


export const GLOBAL_CONFIG = {
    // Add common config values here
    ...CONFIG.constants
};
