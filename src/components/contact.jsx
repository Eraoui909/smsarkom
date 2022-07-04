/* eslint-disable import/no-anonymous-default-export */
import '../assets/css/contact.css'
import { Button, Form, Input, InputNumber, Spin } from 'antd';
import { useTranslation } from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { sendMessage } from '../services/contactService';
import { Alert } from 'antd';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export default () => {

    const { t } = useTranslation();

    const [username , setUserName ] = useState("");
    const [ email , setEmail ]      = useState("");
    const [ subject , setSubject ]  = useState("");
    const [ message , setMessage ]  = useState("");
    const [usernameError , setUserNameError ] = useState("");
    const [ emailError , setEmailError ]      = useState("");
    const [ subjectError , setSubjectError ]  = useState("");
    const [ messageError , setMessageError ]  = useState("");

    const [ messageSent , setMessageSent ]  = useState("");


    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();



    const onFinish = async (values) => {
        //console.log(values);
        setLoading(true);

        await sendMessage(values).then( response  => {
            //console.log(response)
            setMessageSent("Le message envoyer avec succee")
            setLoading(false);
            form.resetFields();
        }).catch(error =>{

            let errors = error.response.data.errors;
            if( errors.subject !== undefined ){
                setSubjectError(errors.subject)
            }
            if( errors.message !== undefined ){
                setMessageError(errors.message)
            }
            if( errors.full_name !== undefined ){
                setUserNameError(errors.full_name)
            }
            if( errors.email !== undefined ){
                setEmailError(errors.email)
            }
            setLoading(false);
        })
    };

    return (
        <>

            <div className="ha-contact-container">

                <div className="ha-contact-form">

                    { usernameError && <Alert  message={usernameError} type="error" showIcon />}
                    { emailError && <Alert  message={emailError} type="error" showIcon />}
                    { subjectError && <Alert  message={subjectError} type="error" showIcon />}
                    { messageError && <Alert  message={messageError} type="error" showIcon />}
                    { messageSent && <Alert  message={messageSent} type="success" showIcon />}



                    <Form form={form} {...layout} className="ha-contact-form-form" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name="full_name"
                            label={t("contact.name")}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={t("contact.email")}
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="subject"
                            label={t("contact.subject")}
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            label={t("contact.message")}
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item className="ha-btn-container" wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

                            
                        <Spin spinning={loading} delay={500}>
                            <Button className="ha-contact-btn" type="primary" htmlType="submit">
                                    <span>{t("contact.send")}</span>
                                    <span>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </span>
                            </Button>
                        </Spin>


                        </Form.Item>
                    </Form>

                </div>

            </div>

        </>
    )
}