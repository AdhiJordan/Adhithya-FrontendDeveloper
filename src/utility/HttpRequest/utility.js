export function getEnv() {
    if (window.origin === '') {
        return 'development';
    } else if (window.origin === '') {
        return 'staging';
    } else {
        return 'development';
    }
    //return process.env.hasOwnProperty('REACT_APP_ENV')  && process.env.NODE_ENV ? process.env.NODE_ENV : 'staging';
}
