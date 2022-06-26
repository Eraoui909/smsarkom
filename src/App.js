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
            <Route path="/login"  element={<Login />}  />
            <Route path="/register"  element={<Register />}  />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>


    </div>
  );
}

export default App;
