import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    Select,

} from 'antd';
import { useState } from 'react';
import '../assets/css/regsterStyle.css'
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {logoUrlInverse} from "../constants/global";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import Separator from './separator'

export default  () => {

    const { t } = useTranslation();


    const [componentSize, setComponentSize] = useState('default');

    const [formValues, setFormValues] = useState()

    const onFinish = (values) => {
        console.log("Values received:", values);


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
                    >
                        <Input placeholder="Hamza Eraoui" />
                    </Form.Item>

                    <Form.Item name="email"
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

