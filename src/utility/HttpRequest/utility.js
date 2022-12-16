export function getEnv() {
    if (window.origin === '') {
        return 'development';
    } else if (window.origin === '') {
        return 'staging';
    } else if (window.origin === '') {
        return 'production';
    } else {
        return 'development';
    }
    //return process.env.hasOwnProperty('REACT_APP_ENV')  && process.env.NODE_ENV ? process.env.NODE_ENV : 'staging';
}
