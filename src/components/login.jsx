import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faLock, faClose } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/loginStyle.css'
import {logoUrlInverse} from "../constants/global";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useState} from "react";
import {loginUser} from '../services/userService'
import Swal from "sweetalert2";

export default () =>{

    const { t } = useTranslation();

    const [email,setEmail] = useState("");
    const [emailError,setEmailError] = useState("");
    const [password,setPassword] = useState("");
    const [passwordError,setPasswordError] = useState("");

    const login = async (e) =>{

        e.preventDefault();


        if(email.trim() === ""){
            setEmailError(t("errors.email_required"));
        }else{
            setEmailError("")
        }

        if(password.trim() === ""){
            setPasswordError(t("errors.password_required"));
        }else if (password.length <= 6){
            setPasswordError(t("errors.pass_length"));
        } else{
            setPasswordError("")
        }

        if (1){

            let myData = {
                "email" : email,
                "password" : password
            }

            await loginUser(myData).then(response => {
                console.log("response = "+response.data);


            }).catch(error => {

                if (error.response) {
                    if( error.response.status === 422){
                        console.log(error.response.data)
                        let loginError = error.response.data.errors;

                        (loginError.email != null)? setEmailError(loginError.email):setEmailError("");
                        (loginError.password != null)? setPasswordError(loginError.password):setPasswordError("");

                        if(emailError) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: emailError,
                            })
                        }else if(passwordError) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: passwordError,
                            })
                        }

                        if(error.response.data.error_login[0] !== null) {
                            console.log(error.response.data.error_login[0]);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data.error_login[0],
                            })
                        }
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("request ERROR (userService - login) = "+error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("ERROR (userService - login) = "+ error.message);
                }
                //console.log(error.config);
            });
        }



    }

    return (
        <>
            <div className="ha-form-container">

                <Link to="/home" >
                    <FontAwesomeIcon icon={faClose} className="ha-close-btn" />
                </Link>



                <form
                    onSubmit={login}
                    className="form-container">



                    <div className="ha-form">

                        <center>
                            <img
                                src={logoUrlInverse}
                                width={120}
                                height={50}
                                alt="smsarkom LOGO"
                            />
                        </center>


                        <div className="email-primary">
                            <label htmlFor="email">
                                {t("login.email")}
                            </label>
                            <div className="email-container">
                                <FontAwesomeIcon icon={faMailBulk} className="email-icon" />

                                <input
                                    type="email"
                                    placeholder={t("login.email")}
                                    id="email"
                                    className="email-input"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <center>
                                {emailError &&
                                <span className="ha-error-msg" >{emailError}</span>
                                }
                            </center>
                        </div>

                        <div className="pass-primary">
                            <label htmlFor="password">
                                {t("login.password")}
                            </label>
                            <div className="pass-container">

                                <FontAwesomeIcon icon={faLock} className="pass-icon" />
                                <input
                                    type="password"
                                    placeholder={t("login.password")}
                                    id="password"
                                    className="pass-input"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <center>
                                {passwordError &&
                                <span className="ha-error-msg" >{passwordError}</span>
                                }
                            </center>
                        </div>

                        <div className="ha-login-bottom">
                            <button className="btn-primary-default ha-btn" >
                                {t("submit")}
                            </button>

                            <Link to="/register" className="ha-form-link" >{t("login.register_qst")}</Link>
                        </div>

                    </div>
                </form>


            </div>
        </>
    )
}