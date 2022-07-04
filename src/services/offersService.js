import http from './httpService';
import config from '../config.json';

const token = localStorage.getItem("token");

const configParams = {
    headers: { Authorization: `Bearer ${token}` }
};


const store = (data) =>{

    return http.post(config.apiEndPoint+"/offer",data,configParams);
}


export {

    store
}