import { useEffect, useRef, useState } from 'react'
import '../assets/css/navbar.css'
import {logoUrlInverse,logoUrl, navigation} from "../constants/global";
import {Link} from "react-router-dom";

export default ({logo,...props}) => {

    const [state, setState] = useState(false)
    const navRef = useRef()



    useEffect(() => {

        const body = document.body

        // Disable scrolling
        if (state) body.classList.add("disable-scrolling")
        // Enable scrolling
        else body.classList.remove("disable-scrolling")

        // Sticky strick
        window.onscroll = () => {
            if (window.scrollY > 80) navRef.current.classList.add("sticky-nav-secondary")
            else navRef.current.classList.remove("sticky-nav-secondary")
        }
    }, [state])

    return (
        <div {...props}>
            <nav ref={navRef}  className="nav-secondary">
                <div className="nav-container">
                    <div className="brand">
                        <a href="javascript:void(0)">
                            <img
                                src={(logo==="home"?logoUrl:logoUrlInverse)}
                                width={100}
                                height={50}
                                alt="smsarkom Logo"
                            />
                        </a>
                        <div className="menu-btn">
                            <button
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`nav-items-container ${ state ? 'show-nav-secondary' : 'hide-nav-secondary'}`}>
                        <div className="nav-items-primary">
                            <ul>
                                <li className="login-link">
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="signup-link">
                                    <Link to="/register">
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="nav-items-secondary">
                            <ul>
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                            <li key={idx}>
                                                <Link to={item.path}>
                                                    { item.title }
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}