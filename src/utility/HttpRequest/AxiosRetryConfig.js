import {RetryConfig} from 'retry-config';

const retryConfig : RetryConfig = {
    // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
    retry: 3,

    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
    noResponseRetries: 3,

    // Milliseconds to delay at first.  Defaults to 100.
    retryDelay: 100,

    // HTTP methods to automatically retry.  Defaults to:
    // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
    httpMethodsToRetry: ['GET'],

    // The response status codes to retry.  Supports a double
    // array with a list of ranges.  Defaults to:
    // [[100, 199], [429, 429], [500, 599]]
    statusCodeToRetry: [[500, 503]],
    // If you are using a non static instance of Axios you need
    // to pass that instance here (const ax = axios.create())
    // instance: ax,

    // You can set the backoff type.
    // options are 'exponential' (default), 'static' or 'linear'
    backOffType: 'exponential'

    // You can detect when a retry is happening, and figure out how many
    // retry attempts have been made
    // onRetryAttempt: err => {
    //   const cfg = rax.getConfig(err);
    //   console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
    // }
}

export default retryAxiosConfig;