import {Navigate, Route} from "react-router-dom";
import { logged } from "./services/userService";


const ProtectedRouteLogin = ({redirectTo,children}) =>{

    if( logged() ){
        return <Navigate to={redirectTo} replace />
    }else{
        return children;
    }
}

const ProtectedRoute = ({redirectTo,children}) =>{

    if( !logged() ){
        return <Navigate to={redirectTo} replace />
    }else{
        return children;
    }
}



export { 
    ProtectedRouteLogin,
    ProtectedRoute
};