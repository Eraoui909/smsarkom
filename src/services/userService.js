import http from './httpService'
import config from '../config.json'

const store =  (data) => {

    return   http.post(config.apiEndPoint + "/auth/register", data);
}

const loginUser =  (data) => {

    return   http.post(config.apiEndPoint + "/auth/login", data);
}

const fetchUser = () =>{

    let user = {};
    let token;

    
    if (localStorage.getItem("token") === null){
        return "empty";
    }

    user.username   = localStorage.getItem("full_name");
    user.email      = localStorage.getItem("email");
    token           = localStorage.getItem("token");

    return {user,token};
}

const logoutUser = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
}

const logged = () =>{
    if (localStorage.getItem("token") === null){
        return false;
    }else{
        return true;
    }
}

export {
    store,
    fetchUser,
    loginUser,
    logoutUser,
    logged
}