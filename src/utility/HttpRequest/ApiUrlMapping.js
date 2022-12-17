import HttpClient from './HttpRequest';

export async function getLaunchDetails() {
    return HttpClient.get(
        process.env.REACT_APP_API_BASE_URL +
            `/?limit=10&offset=0&order=&start=&end=&orbit=`
    );
}

export async function getLaunchByFiltersQueryDetails(params) {
    let str = params;
    let obj = Object.fromEntries(new URLSearchParams(str));

    if (Number(obj.offset) === 1) {
        return HttpClient.get(
            obj.launch_type
                ? process.env.REACT_APP_API_BASE_URL +
                      `/${obj.launch_type}?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}&orbit=${obj.orbit}`
                : process.env.REACT_APP_API_BASE_URL +
                      `/?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}`
        );
    } else if (Number(obj.offset) === 0) {
        return HttpClient.get(
            obj.launch_type
                ? process.env.REACT_APP_API_BASE_URL +
                      `/${obj.launch_type}?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}&orbit=${obj.orbit}`
                : process.env.REACT_APP_API_BASE_URL +
                      `/?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}&orbit=${obj.orbit}`
        );
    } else if (Number(obj.offset) > 0) {
        return HttpClient.get(
            obj.launch_type
                ? process.env.REACT_APP_API_BASE_URL +
                      `/${obj.launch_type}?limit=${obj.limit}&offset=${
                          (Number(obj.offset) - 1) * 10
                      }&order=&launch_success=${obj.launch_success}&start=${
                          obj.launchStartDateFilter
                      }&end=${obj.launchEndDateFilter}&orbit=${obj.orbit}`
                : process.env.REACT_APP_API_BASE_URL +
                      `/?limit=${obj.limit}&offset=${
                          (Number(obj.offset) - 1) * 10
                      }&order=&launch_success=${obj.launch_success}&start=${
                          obj.launchStartDateFilter
                      }&end=${obj.launchEndDateFilter}&orbit=${obj.orbit}`
        );
    }
}
