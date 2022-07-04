/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message, Steps, Form, Input, InputNumber, Upload, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "../assets/css/makeAnOfferStyle.css"
import { Option } from 'antd/lib/mentions';
import { store } from '../services/offersService';
import { Alert } from 'antd';





const { Step } = Steps;
const steps = [
  {
    title: 'First',
    content: "1",
  },
  {
    title: 'Second',
    content: '2',
  },
  {
    title: 'Last',
    content: '3',
  },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });


function MakeAnOfferComponent(props) {

    const {t} = useTranslation();

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    //variables states --- Global
    const [title,setTitle]                  = useState("");
    const [description, setDescription]     = useState("");
    const [price, setPrice]                 = useState(0);
    const [country,setCountry]              = useState("");
    const [city, setCity]                   = useState("");

    const [location,setLocation]            = useState("");
    const [type,setType]                    = useState("");
    const [category,setCategory]            = useState("");
    const [details,setDetails]              = useState("");
    const [builtIn, setBuiltIn]             = useState(0);
    const [garage, setGarage]               = useState(0);
    const [area, setArea]                   = useState(0);
    const [agentFees, setAgentFees]         = useState(0);
    


    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const [offerSuccess,setOfferSuccess]    = useState("");


    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      // submitting FORM
    const submitForm = async (e) =>{
        message.success('Processing complete!')
        //console.log(title);
        //console.log(fileList)

        const data = {

            "title"         : title,
            "description"   : description,
            "price"         : price,
            "country"       : country,
            "city"          : city,
            "location"      : location,
            "type"          : type,
            "category"      : category,
            "details"       : details,
            "builtIn"       : builtIn,
            "garage"        : garage,
            "area"          : area,
            "agentFees"     : agentFees,
            "pictures"      : fileList
        }

        console.log(data);

        await store(data).then( response =>{
            
            setOfferSuccess(t("profile.offerAdded"));
        }).catch(error =>{
            console.log(error);
        })

    }

    const validateMessages = {
        required: t("validation.required"),
        types: {
          email: t("validation.types.email"),
          number: t("validation.types.number"),
        },
        number: {
          range: t("validation.number.range"),
        },
      };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    
    setFileList(newFileList)
};

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        {t("profile.upload")}
      </div>
    </div>
  );


    return (
        <div>

            <Steps current={current}>

                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
            </Steps>

                <div className="ha-msg-area">
                    {
                        offerSuccess &&
                        <Alert message={offerSuccess} type='success' showIcon />
                    }
                </div>

                {
                    (steps[current].content === "1") &&
                    <div className="steps-content">

                        <div className='ha-general-info-container'>
                
                            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>

                                <Form.Item
                                    name="title"
                                    label={t("profile.title")}
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input onChange={(e)=>{setTitle(e.target.value)}} />
                                </Form.Item>

                                <Form.Item 
                                    name="description" 
                                    label={t("profile.description")}
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
                                    >
                                    <Input.TextArea onChange={(e)=>{setDescription(e.target.value)}} />
                                </Form.Item>

                                <Form.Item
                                    name="price"
                                    label={t("profile.price")}
                                    rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        max: 1000000,
                                        required: true,
                                    },
                                    ]}
                                >
                                        <InputNumber onChange={(e)=>setPrice(e)} />
                                    </Form.Item>

                                    <Form.Item
                                        name="country"
                                        label={t("profile.country")}
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
                                    >
                                        <Input onChange={(e)=>{setCountry(e.target.value)}} />
                                    </Form.Item>

                                    <Form.Item
                                        name="city"
                                        label={t("profile.city")}
                                        rules={[
                                        {
                                            required: true,
                                        },
                                        ]}
                                    >
                                        <Input onChange={(e)=>{setCity(e.target.value)}} />
                                    </Form.Item>
                        
                    
                            </Form>

                        </div>
                    </div>
                }

                {
                    (steps[current].content === "2") &&
                    <div className="steps-content">

                        <div className='ha-general-info-container'>
                        
                            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>

                                <Form.Item
                                    name="location"
                                    label={t("profile.location")}
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input onChange={(e)=>{setLocation(e.target.value)}} />
                                </Form.Item>

                                <Form.Item
                                    name="type"
                                    label={t("profile.type")}
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                        <Select style={{ width: 120 }} onChange={(value)=>{setType(value)}}>
                                            <Select.Option value="rent">{t("profile.rent")}</Select.Option>
                                            <Select.Option value="sell">{t("profile.sell")}</Select.Option> 
                                            <Select.Option value="mortgage">{t("profile.mortgage")}</Select.Option>                                    
                                        </Select>
                                </Form.Item>

                                <Form.Item
                                    name="category"
                                    label={t("profile.category")}
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                        <Select  style={{ width: 120 }} onChange={(e)=>{setCategory(e)}}>
                                            <Option value="residential">{t("profile.residential")}</Option>
                                            <Option value="educational">{t("profile.educational")}</Option> 
                                            <Option value="assembly">{t("profile.assembly")}</Option>                                    
                                            <Option value="business">{t("profile.business")}</Option>                                    
                                            <Option value="mercantile">{t("profile.mercantile")}</Option>                                    
                                            <Option value="industrial">{t("profile.industrial")}</Option>                                    
                                            <Option value="storage">{t("profile.storage")}</Option>                                    
                                        </Select>
                                </Form.Item>

                                <Form.Item 
                                    name="details" 
                                    label={t("profile.details")}
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
                                    >
                                    <Input.TextArea onChange={(e)=>{setDetails(e.target.value)}} />
                                </Form.Item>

                                <Form.Item
                                    name="builtIn"
                                    label={t("profile.builtIn")}
                                    rules={[
                                    {
                                        type: 'number',
                                        min: 1800,
                                        max: new Date().getFullYear(),
                                        required: true,
                                    },
                                    ]}
                                >
                                        <InputNumber onChange={(e)=> setBuiltIn(e)} />
                                </Form.Item>

                                <Form.Item
                                    name="garage"
                                    label={t("profile.garage")}
                                    rules={[
                                    {
                                        type: 'number',
                                        min: 1,
                                        max: 100000,
                                        required: true,
                                    },
                                    ]}
                                >
                                        <InputNumber onChange={(e)=> setGarage(e)} />
                                </Form.Item>

                                <Form.Item
                                    name="area"
                                    label={t("profile.area")}
                                    rules={[
                                    {
                                        type: 'number',
                                        min: 1,
                                        max: 100000,
                                        required: true,
                                    },
                                    ]}
                                >
                                        <InputNumber onChange={(e)=> setArea(e)} />
                                </Form.Item>

                                <Form.Item
                                    name="agentFees"
                                    label={t("profile.agentFees")}
                                    rules={[
                                    {
                                        type: 'number',
                                        min: 1,
                                        max: 100000,
                                        required: true,
                                    },
                                    ]}
                                >
                                        <InputNumber onChange={(e)=> setAgentFees(e)} />
                                </Form.Item>



                                </Form>

                        </div>
                    </div>
                }

                {
                    (steps[current].content === "3") &&
                    <div className="steps-content">
                        <div className='ha-general-info-container'>
                        <>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img
                                alt="example"
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage}
                                />
                            </Modal>
                            </>
                        </div>
                    </div>
                }

                


                <div className="steps-action">
                    {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                    )}
                    {current === steps.length - 1 && (
                    <Button type="primary" onClick={submitForm}>
                        Done
                    </Button>
                    )}
                    {current > 0 && (
                    <Button
                        style={{
                        margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                    )}
                </div>
            
        </div>
    );
}

export default MakeAnOfferComponent;

