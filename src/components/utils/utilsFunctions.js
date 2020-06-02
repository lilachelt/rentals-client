const buildUrlWithQuery = (url, object) => {
    const queryString = Object.keys(object).map(key => key + '=' + object[key]).join('&');
    return url+='?'+queryString;
}


export default {buildUrlWithQuery};