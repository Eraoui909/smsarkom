import {Navigate, Route} from "react-router-dom";


const ProtectedRoute = ({element: Component,condition, failRedirect, ...rest}) =>{

    return (
        <Route
            {...rest}
            render={ props => {
                if(!condition) return <Navigate to={failRedirect} />;
                return <Component {...props} />;
            }}
        />
    );
}

export default ProtectedRoute;