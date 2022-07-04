/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    Select,
    Alert
} from 'antd';
import { useState } from 'react';
import '../assets/css/regsterStyle.css'
import { useTranslation } from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {logoUrlInverse} from "../constants/global";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import Separator from './separator'
import {store,fetchUsers} from '../services/userService'
import Swal from "sweetalert2";

const  register =  () => {

    const { t } = useTranslation();

    const [nameError,setNameError]          = useState("");
    const [emailError,setEmailError]        = useState("");
    const [genderError,setGenderError]      = useState("");
    const [cityError,setCityError]          = useState("");
    const [countryError,setCountryError]    = useState("");
    const [birthdayError,setBirthdayError]  = useState("");
    const [passwordError,setPasswordError]  = useState("");

    const [componentSize, setComponentSize] = useState('default');


    const [registered,setRegistered] = useState("");


    const [formValues, setFormValues] = useState()

    const navigate  = useNavigate();


    const onFinish = async (values) => {
        //console.log("Values received:", values);

        const data = {
            "fullname" : values.full_name,
            "email"	   : values.email,
            "password" : values.password,
            "address"  : "test",
            "username" : "test",
            "gender"   : values.gender,
            "type"	   : "test",
            "country"  : values.country_city[0],
            "city"	   : values.country_city[1]
        }

        await store(data).then(response => {
            //console.log("response = "+response.data);
            setRegistered("You are registered with Success")
            setTimeout(
                ()=>{
                    navigate("/login")
                }
            ,1000);
        }).catch(error => {

                if (error.response) {
                    if( error.response.status === 422){
                        console.log(error.response.data.errors)
                            let errors = error.response.data.errors;
                        (errors.fullname != null)?setNameError(errors.fullname):setNameError("");
                        (errors.email != null)?setEmailError(errors.email):setEmailError("");
                        (errors.password != null)?setPasswordError(errors.password):setPasswordError("");
                        (errors.gender != null)?setGenderError(errors.gender):setGenderError("");
                        (errors.country != null)?setCountryError(errors.country):setCountryError("");
                        (errors.city != null)?setCityError(errors.city):setCityError("");
                        (errors.birthday != null)?setBirthdayError(errors.birthday):setBirthdayError("");

                        if((errors.fullname != null)) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.fullname,
                            })
                        }else if(errors.email != null){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.email,
                            })
                        }else if(errors.password != null){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.password,
                            })
                        }else if(errors.gender != null){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.gender,
                            })
                        }else if(errors.country != null){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.country,
                            })
                        }else if((errors.city != null)){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.country,
                            })
                        }else if(errors.birthday != null){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: errors.birthday,
                            })
                        }
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("request ERROR (userService) = "+error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("ERROR (userService) = "+ error.message);
                }
                //console.log(error.config);
            });
    };


    return (


        <div className="ha-register-container">


            <Link to="/home" >
                <FontAwesomeIcon icon={faClose} className="ha-close-btn" />
            </Link>


            <div className="ha-register-form">

                <center class="ha-logo-area">
                    <img
                        src={logoUrlInverse}
                        width={120}
                        height={50}
                        alt="Float UI logo"
                    />
                </center>

                {registered && <center>
                    <Alert message={registered} showIcon type="success" />
                </center>}

                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    size={componentSize}
                    className="ha-custom-form"
                    onFinish={onFinish}
                >


                    <Form.Item
                        name="full_name"
                        label={t("register.full_name")}
                        rules={[
                            {
                                required: true,
                                message: "Your name cannot be empty!",
                                type:"string"
                            },
                        ]}
                        validateStatus={nameError && "error"}
                    >
                        <Input placeholder="your name" />
                    </Form.Item>

                    <Form.Item name="email"
                               validateStatus={emailError && "error"}
                               rules={[
                                {
                                    required: true,
                                    message: "Your email cannot be empty!",
                                    type: "email",

                                },

                    ]}
                               label={t("register.email")}>
                        <Input placeholder="email@email.com" />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label={t("register.gender")}
                        rules={[
                            {
                                required: true,
                                message: "Your gender cannot be empty!",
                            },
                        ]}
                        validateStatus={genderError && "error"}
                    >
                        <Select >
                            <Select.Option  value="male">{t("register.male")}</Select.Option>
                            <Select.Option value="female">{t("register.female")}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="country_city"
                        label={t("register.country_city")}
                        rules={[
                            {
                                required: true,
                                message: "Your country & city cannot be empty!",
                            },
                        ]}
                        validateStatus={cityError && "error"}
                    >
                        <Cascader defaultValue="morocco"
                            options={[
                                {
                                    value: 'morocco',
                                    label: t("register.morocco"),
                                    children: [
                                        {
                                            value: 'fes',
                                            label: t("register.fes"),
                                        },
                                        {
                                            value: 'sefrou',
                                            label: t("register.sefrou"),
                                        },
                                        {
                                            value: 'casablanca',
                                            label: t("register.casablanca"),
                                        },

                                    ],
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label={t("register.birthday")}
                        rules={[
                            {
                                required: true,
                                message: "Your birthday cannot be empty!",
                            },
                        ]}
                        validateStatus={birthdayError && "error"}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={t("register.password")}
                        rules={[
                            {
                                required: true,
                                message: "Your password cannot be empty!",
                            },
                        ]}
                        validateStatus={passwordError && "error"}
                    >
                        <Input.Password

                            placeholder="your password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />

                    </Form.Item>

                    <Button type="primary" htmlType="submit" shape="round"  className="ha-register-btn" >{t("submit")}</Button>

                </Form>

                <Separator />

                <div className="ha-go-to-login">
                    <Link to={"/login"}>{t("register.iHaveAccount")}</Link>
                </div>

            </div>

        </div>
    );
};


export default register;