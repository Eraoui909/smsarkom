import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faLock, faClose } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/loginStyle.css'
import {logoUrlInverse} from "../constants/global";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

export default () =>{

    const { t, i18n } = useTranslation();

    return (
        <>
            <div className="ha-form-container">

                <Link to="/home" >
                    <FontAwesomeIcon icon={faClose} className="ha-close-btn" />
                </Link>



                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="form-container">



                    <div className="ha-form">

                        <center>
                            <img
                                src={logoUrlInverse}
                                width={120}
                                height={50}
                                alt="Float UI logo"
                            />
                        </center>


                        <div className="email-primary">
                            <label htmlFor="email">
                                {t("login_email")}
                            </label>
                            <div className="email-container">
                                <FontAwesomeIcon icon={faMailBulk} className="email-icon" />

                                <input
                                    type="email"
                                    placeholder="name@floatui.com"
                                    id="email"
                                    className="email-input"
                                />
                            </div>
                        </div>

                        <div className="pass-primary">
                            <label htmlFor="password">
                                {t("login_password")}
                            </label>
                            <div className="pass-container">

                                <FontAwesomeIcon icon={faLock} className="pass-icon" />
                                <input
                                    type="password"
                                    placeholder="***********"
                                    id="password"
                                    className="pass-input"
                                />
                            </div>
                        </div>

                        <div className="ha-login-bottom">
                            <button className="btn-primary-default ha-btn" >
                                {t("submit")}
                            </button>

                            <Link to="/register" className="ha-form-link" >{t("login_register_qst")}</Link>
                        </div>

                    </div>
                </form>


            </div>
        </>
    )
}