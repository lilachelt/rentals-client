import axios from 'axios';

const requestService = (url, params, headers) => {
    const urlRequest = url;
    const paramsRequest = params;

    const get = () => {
      return axios.get(urlRequest,paramsRequest);
    };

    //TODO
    const post = () => {
        return axios.post(urlRequest, paramsRequest, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }});
    };

    const update = () => {
        return axios.put(urlRequest,paramsRequest);
    };
    
    const remove = () => {
        return axios.delete(urlRequest,paramsRequest);
    };

    return { get, post , update , remove };
}

export default requestService;