export async function parseFetch(url, method = 'get', headers = '', data = '') {
    let options = {};
    if (method) {
        options.method = method;
    }
    if (headers) {
        options.headers = headers;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    let res = await fetch(url, options);
    let pRes = await res.json();
    return pRes;
}