import http from './httpService'
import config from '../config.json'


const sendMessage = (data) =>{

    return http.post(config.apiEndPoint+"/contact",data);
}


export {
    sendMessage
}