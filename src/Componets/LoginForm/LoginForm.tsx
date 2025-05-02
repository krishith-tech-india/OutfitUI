import { Form, Button, Input, notification,  NotificationArgsProps } from "antd";
import {  Link , useNavigate} from "react-router-dom";
import { useAuthenticateMutation } from "@src/redux/reducers/api/authApi";
import { loggedInUser } from "@src/helpers/loggedInUser";

type notificationType = "success" | "error";
type NotificationPlacement = NotificationArgsProps['placement'];

function LoginForm(){
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const [authenticate,{isLoading}] = useAuthenticateMutation();
    
    const openNotification = (type: notificationType, placement: NotificationPlacement) =>{
        api[type.toLowerCase()]({
            message: type ==="success" ? "Login Successfully!" : "Login Faild!",
            description: type === "success" ? "Your are Login Successfully!" : "Invalid credentials. Please try again.",
            type,
            placement

        })
    }
    const onLogin = async (value:any)=>{
        try {
            const data = {
                emailOrPhone: value.emailOrPhone,
                password: value.password,
            }
          
            const response = await authenticate(data).unwrap();
            
            if(response.data){
                openNotification('success', 'bottomRight');
                form.resetFields();
                navigate("/dashboard");
                loggedInUser.setUser(response.data);
            }

        } catch (error) {
            openNotification('error', 'bottomRight')
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
                    <Button type="primary" htmlType="submit" className="w-full" color="pink" variant="solid" loading={isLoading}>
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