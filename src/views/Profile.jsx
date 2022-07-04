import React from 'react';
import Footer from '../components/footer';
import Separator from '../components/separator';
import Navbar from "../components/navbar";
import {Row,Col} from "antd"
import ProfileComponent from './../components/ProfileComponent';

function Profile(props) {
    return (
        <>
            
            <Navbar />
            
            <ProfileComponent />

            <Separator />
            <Footer />
        </>
    );
}

export default Profile;