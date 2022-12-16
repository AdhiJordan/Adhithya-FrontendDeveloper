import axios from 'axios';
import { getEnv } from './utility';
import { getBaseUrl } from './constantsMapping';

let setHeader = (url, data, type, baseUrl) => {
    return new Promise(function (resolve, reject) {
        const opts = {
            method: type,
            path: url,
            service: 'execute-api',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('tokenId')}`,
            },
            body: data ? JSON.stringify(data) : '',
        };
        if (type === 'GET' || type === 'POST' || type === 'PUT') {
            opts.headers['Content-Type'] = 'application/json';
        }
    });
};

let doGet = (url, params) => {
    if (getEnv === 'test') {
    } else {
        let response = new Promise(function (resolve, reject) {
            axios
                .get(url)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log('err', err.response.data);
                    reject(err.response.data);
                });
        });
        return response;
    }
};

const doCommonAxiosCall = (url, method, data) => {
    const response = new Promise(function (resolve, reject) {
        setHeader(url, data, method).then((request) => {
            return doAxiosCall(url, method, request, resolve, reject, data);
        });
    });
    return response;
    // if (getEnv() === "test") {

    // } else {

    // }
};

const doAxiosCall = (url, method, request, resolve, reject, data) => {
    return axios({
        method,
        url: `${url}`,
        data,
        headers: request.headers,
    })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: doGet,
};
