/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {logoutUser} from '../services/userService'

function logout(props) {

    const navigate = useNavigate();

    useEffect(()=>{

        logoutUser();

        navigate("/");

    },[1])

    return (
        null
    );
}

export default logout;