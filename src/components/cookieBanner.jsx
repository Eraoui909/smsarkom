import '../assets/css/cookieBannerStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'

export default () =>{

    const handleClick = () =>{

        document.querySelector(".banner").className = "hideCookieBanner"
    }

    return (
        <div className="banner">
            <div className="ha-banner">
                <div className="banner__content">
                    <FontAwesomeIcon icon={faCookieBite} className="ha-cookie-icon" />
                    We and selected partners, use cookies or similar technologies as specified in the cookie policy.
                </div>

                <div>
                    <button className="btn-primary-default ha-btn" onClick={handleClick}>
                        Accept
                    </button>
                    <button className="btn-primary-default ha-btn" onClick={handleClick}>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    )
}