import {logoUrl} from '../constants/global'
import '../assets/css/headerStyle.css'
import {navigation} from "../constants/global";
import {Link} from "react-router-dom";

export default () => {



    return (
        <div className="hero-dark-container">


            <header className="hero-dark-header">
                <nav className="hero-nav">
                    <a href="javascript:void(0)">
                        <img
                            src={logoUrl}
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <ul className="nav-items">
                        {
                            navigation.map((item, idx) => (
                                <li key={idx}>
                                    <Link to={item.path}>{item.title}</Link>
                                </li>
                            ))
                        }
                        <li>
                            <Link to="/login" className="last-item">
                                Log In
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="hero-dark">
                <div className="hero-details">
                    <h1>
                        One page Template for
                        <span> Digital agency</span>
                    </h1>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                    </p>
                    <div className="hero-btns">
                        <a href="javascript:void(0)" className="btn-primary">
                            Get started
                        </a>
                        <a href="javascript:void(0)" className="btn-secondary">
                            Try it out
                        </a>
                    </div>
                </div>
                <div className="hero-img">
                    <img src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png" />
                </div>
            </section>
        </div>
    )
}



