import { Form, Button, Input, notification,  NotificationArgsProps } from "antd";
import { useState } from "react";
import {  Link , Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

type notificationType = "success" | "error";
type NotificationPlacement = NotificationArgsProps['placement'];

function LoginForm(){
    const navigate = useNavigate()
    const [login, setLogin] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const openNotificatioon = (type: notificationType, placement: NotificationPlacement) =>{
        api[type.toLowerCase()]({
            message: type ==="success" ? "Login Successfully!" : "Login Faild!",
            description: type === "success" ? "Your are Login Successfully!" : "Invalid credentials. Please try again.",
            type,
            placement

        })
    }
    const onLogin = async (value:any)=>{
      
         setLogin(true);
        try {
            let data = {
                emailOrPhone: value.emailOrPhone,
                password: value.password,
            }
            let url = "https://api.krishivaweb.com/api/User/authenticate"
          
            const response = await axios.post(url, data);
           
            openNotificatioon('success', 'bottomRight');
            form.resetFields();
            navigate("/dashboard")
        } catch (error) {
            openNotificatioon('error', 'bottomRight')
        }
        finally{
            setLogin(false)
        }
    }
    return (
        <>
         <Form className="sm:w-full md:w-full lg:w-3/4" size="large" onFinish={(value)=>onLogin(value)} form={form} >
                 <Form.Item name="emailOrPhone" 
                 rules={[
                    {
                        required: true,
                        message: "Please Enter Your email or phoneNo!"
                    },

                    {
                        validator:(_, value)=>{
                            if (!value) return Promise.resolve();

                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const phoneRegex = /^\d{10,15}$/; // Indian 10-digit mobile

                        if (emailRegex.test(value) || phoneRegex.test(value)) {
                        return Promise.resolve();
                        }
                        return Promise.reject(
                        "Enter a valid email address or phone number"
                        );
                        }
                    }
                 ]}
                 >
                    <Input type="text" placeholder="Enter Your Email OR Mobile-No" maxLength={50} />
                </Form.Item>

                <Form.Item name="password" 
                rules={[{
                    required: true,
                    message: "Please Enter Your otp!" 
                }]}
                >
                    <Input  placeholder="Enter Your OTP" type="number"   />
                </Form.Item>
                <div className="mb-3 text-white text-xs mx-1">
                    <span>Resend OTP!</span>
                </div>
                <Form.Item>
                    {contextHolder}
                    <Button type="primary" htmlType="submit" className="w-full" color="pink" variant="solid" loading={login}>
                    Submit
                 </Button>
                </Form.Item>
                <div className=" text-white text-xs text-center">
                    <span>Don't Have an account? <Link to="/signup">Sign Up</Link> </span>
                </div>
            </Form>
        </>
    )
}

export default LoginForm;