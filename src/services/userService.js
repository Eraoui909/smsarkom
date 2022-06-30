import http from './httpService'
import config from '../config.json'

const store =  (data) => {

    return   http.post(config.apiEndPoint + "/auth/register", data);
}

const loginUser =  (data) => {

    return   http.post(config.apiEndPoint + "/auth/login", data);
}

const fetchUsers = async () =>{

    const promise = await http.get(config.apiEndPoint + "/auth/users");
    promise.then(res => {
        const persons = res.data;
        console.log(persons)
    })
}

export {
    store,
    fetchUsers,
    loginUser
}