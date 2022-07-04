/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk, faLock, faClose } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/loginStyle.css'
import {logoUrlInverse} from "../constants/global";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useState} from "react";
import {loginUser} from '../services/userService'
import Swal from "sweetalert2";
import { Alert, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const login = () =>{

    const { t } = useTranslation();

    const [email,setEmail] = useState("");
    const [emailError,setEmailError] = useState("");
    const [password,setPassword] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [loginErrorHook,setLoginError] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate  = useNavigate();




    const login = async (e) =>{

        e.preventDefault();

        let test = true;

        if(email.trim() === ""){
            setEmailError(t("errors.email_required"));
            test = false;
        }else{
            setEmailError("")
            test = true;
        }

        if(password.trim() === ""){
            setPasswordError(t("errors.password_required"));
            test = false;
        }else if (password.length <= 6){
            setPasswordError(t("errors.pass_length"));
            test = false;
        } else{
            setPasswordError("")
            test = true;
        }

        if (test){

            let myData = {
                "email" : email,
                "password" : password
            }

            setLoading(true);


            await loginUser(myData).then(response => {
                
                let user  = response.data.user;
                let token  = response.data.token;

                localStorage.setItem("full_name", user.full_name)
                localStorage.setItem("email", user.email)
                localStorage.setItem("token", token)

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: t("login.login_success"),
                    showConfirmButton: false,
                    timer: 1500
                  })
                setLoading(false);
                setTimeout(
                    () =>{
                        navigate("/profile");
                    },
                1000)
            }).catch(error => {

                if (error.response) {
                    if( error.response.status === 422){
                        //console.log(error.response.data)
                        let loginError = error.response.data.errors;

                        if(loginError !==  undefined){
                            (loginError.email != null)? setEmailError(loginError.email):setEmailError("");
                            (loginError.password != null)? setPasswordError(loginError.password):setPasswordError("");
                            (error.response.data.error_login != null)? setLoginError(error.response.data.error_login[0]):setLoginError("");
                        }
                        if(error.response.data.error_login !==  undefined){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data.error_login,
                            })
                        }
                        
                    }
                    setLoading(false);

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("request ERROR (userService - login) = "+error.request);
                    setLoading(true);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("ERROR (userService - login) = "+ error.message);
                    setLoading(true);
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
                            

                            <Spin spinning={loading} delay={500}>
                                <button className="btn-primary-default ha-btn" >
                                    {t("submit")}
                                </button>
                            </Spin>

                            <Link to="/register" className="ha-form-link" >{t("login.register_qst")}</Link>
                        </div>

                    </div>
                </form>


            </div>
        </>
    )
}

export default login;