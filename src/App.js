import './App.css';
import LoadingBar from 'react-top-loading-bar'
import {Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import Home from "./views/Home";
import AboutUs from "./views/AboutUs";
import Apartments from "./views/Apartments";
import {Navigate} from "react-router";
import Login from "./views/Login";
import Register from "./views/Register";
import Contact from "./views/Contact";
import Logout from "./components/logout";
import {ProtectedRoute, ProtectedRouteLogin} from './PretectedRoute';
import Profile from './views/Profile';


function App() {

    const [progress, setProgress] = useState(0)


    return (
    <div className="App">

        <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(progress)}
        />
        {/*<button onClick={() => setProgress(progress + 10)}>Add 10%</button>
        <button onClick={() => setProgress(progress + 20)}>Add 20%</button>
        <button >Complete</button>
        <br />*/}

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about"  element={<AboutUs />} />
            <Route path="/apartments"  element={<Apartments />}  />
            <Route path="/login"  element={<ProtectedRouteLogin redirectTo="/" >
                        <Login />
                </ProtectedRouteLogin>} />
            <Route path="/register"  element={<ProtectedRouteLogin redirectTo="/" >
                        <Register />
                </ProtectedRouteLogin>}   />
            <Route path="/contact"  element={<Contact />}  />
            <Route path="/logout"  element={<ProtectedRoute redirectTo="/" >
                        <Logout />
                </ProtectedRoute>}   />
            <Route path="/profile"  element={<ProtectedRoute redirectTo="/login" >
                    <Profile />
            </ProtectedRoute>}   />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>


    </div>
  );
}

export default App;
