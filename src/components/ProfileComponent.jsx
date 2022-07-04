/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Row, Col, Card, Tabs, Form, Input, Button, DatePicker, Select, Cascader} from "antd";
import "../assets/css/profileStyle.css"
import Avatar from 'antd/lib/avatar/avatar';
import { useState, useEffect } from 'react';
import { fetchUser } from '../services/userService';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MakeAnOfferComponent from './MakeAnOfferComponent';
const { TabPane } = Tabs;
const { Meta } = Card;







function ProfileComponent(props) {


    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");

    const {t} = useTranslation();


    useEffect(()=>{

        const {user,token} =fetchUser();
        setUsername(user.username);
        setEmail(user.email);


    },[1])


    return (
        <div className='ha-profile-container'>
             <>
                
             <Row className='ha-custom-grid'>

                <Col span={6} className="ha-profile-left" >
                    <center>
                    <Card className='ha-avatar-card' title={
                        <Avatar src="https://joeschmoe.io/api/v1/random" size={90} />
                    } bordered={false} style={{ width: 300 }}>
                        <p>{username}</p>
                        <p>{email}</p>
                       
                    </Card>
                    </center>
                </Col>

                <Col span={18} className="ha-profile-right" >

                    <Tabs  type="card">
                        <TabPane tab={t("profile.profile")} key="1">
                            <SettingsForm />
                        </TabPane>
                        <TabPane tab={t("profile.offers")} key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={t("profile.makeAnOffer")} key="3">
                            
                            <MakeAnOfferComponent />
                            
                        </TabPane>
                    </Tabs>

                </Col>
            </Row>
            
            </>
        </div>
    );
}


const SettingsForm = () => {

    const { t } = useTranslation();

    const [nameError,setNameError]          = useState("");
    const [emailError,setEmailError]        = useState("");
    const [genderError,setGenderError]      = useState("");
    const [cityError,setCityError]          = useState("");
    const [countryError,setCountryError]    = useState("");
    const [birthdayError,setBirthdayError]  = useState("");
    const [passwordError,setPasswordError]  = useState("");

    const [username,setUsername]            = useState("");
    const [email,setEmail]                  = useState("");
    const [gender,setGender]                = useState("");
    const [city,setCity]                    = useState("");
    const [country,setCountry]              = useState("");
    const [birthday,setBirthday]            = useState("");
    const [password,setPassword]            = useState("");

    const [componentSize, setComponentSize] = useState('default');

    useEffect(()=>{
        
        const {user,token} = fetchUser();

        setUsername(user.username);
        setEmail(user.email);

    },[1])

    const onFinish = (values) => {
        console.log(values);
      };

      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    return (
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="vertical"
                initialValues={{
                    size: componentSize,
                }}
                size={componentSize}
                className="ha-custom-form"
                onFinish={onFinish}
            >


                    <Form.Item
                        name='full_name'
                        label={t("register.full_name")}
                        validateStatus={nameError && "error"}
                        rules={[
                                    {
                                        required: true,
                                        message: "Your name cannot be empty!",
                                        type:"string"
                                    },
                                ]}
                    >
                        <Input placeholder="your name" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} />
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
                        <Input placeholder="email@email.com" value={email} />
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
        </div>
    )
}



export default ProfileComponent;