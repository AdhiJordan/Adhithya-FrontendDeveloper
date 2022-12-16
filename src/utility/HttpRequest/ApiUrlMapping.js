import HttpClient from './HttpRequest';

export async function getLaunchDetails() {
    return HttpClient.get(
        `https://api.spacexdata.com/v3/launches/?limit=10&offset=0&order=&start=&end`
    );
}

export async function getLaunchByFiltersQueryDetails(params) {
    let str = params;
    let obj = Object.fromEntries(new URLSearchParams(str));

    if (Number(obj.offset) === 1) {
        return HttpClient.get(
            obj.launch_type
                ? `https://api.spacexdata.com/v3/launches/${obj.launch_type}?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}`
                : `https://api.spacexdata.com/v3/launches/?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}`
        );
    } else if (Number(obj.offset) === 0) {
        return HttpClient.get(
            obj.launch_type
                ? `https://api.spacexdata.com/v3/launches/${obj.launch_type}?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}`
                : `https://api.spacexdata.com/v3/launches/?limit=${obj.limit}&offset=0&order=&launch_success=${obj.launch_success}&start=${obj.launchStartDateFilter}&end=${obj.launchEndDateFilter}`
        );
    } else if (Number(obj.offset) > 0) {
        return HttpClient.get(
            obj.launch_type
                ? `https://api.spacexdata.com/v3/launches/${
                      obj.launch_type
                  }?limit=${obj.limit}&offset=${
                      (Number(obj.offset) - 1) * 10
                  }&order=&launch_success=${obj.launch_success}&start=${
                      obj.launchStartDateFilter
                  }&end=${obj.launchEndDateFilter}`
                : `https://api.spacexdata.com/v3/launches/?limit=${
                      obj.limit
                  }&offset=${
                      (Number(obj.offset) - 1) * 10
                  }&order=&launch_success=${obj.launch_success}&start=${
                      obj.launchStartDateFilter
                  }&end=${obj.launchEndDateFilter}`
        );
    }
}
