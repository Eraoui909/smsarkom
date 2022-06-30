import '../assets/css/contact.css'
import { Button, Form, Input, InputNumber } from 'antd';
import { useTranslation } from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";


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


    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <>

            <div className="ha-contact-container">

                <div className="ha-contact-form">

                    <Form {...layout} className="ha-contact-form-form" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name="name"
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
                            <Button className="ha-contact-btn" type="primary" htmlType="submit">
                                <span>{t("contact.send")}</span>
                                <span>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </span>
                            </Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>

        </>
    )
}