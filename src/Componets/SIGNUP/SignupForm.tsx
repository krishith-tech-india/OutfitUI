import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";

function SignupForm(){
    return (
        <>
         <Form className=" sm:w-full md:w-full lg:w-3/4" size="large">
                 <Form.Item>
                    <Input type="text" placeholder="Enter Your Name"/>
                </Form.Item>
                 <Form.Item>
                    <Input type="email" placeholder="Enter Your Email"/>
                </Form.Item>
                <Form.Item>
                    <Input type="number" placeholder="Enter Your Mobile No"/>
                </Form.Item>
                {/* <Form.Item >
                    <Input type="number" placeholder="Enter Your OTP"  />
                </Form.Item>
                <div className="mb-3 text-white text-xs mx-1">
                    <span>Resend OTP!</span>
                </div> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" color="pink" variant="solid">
                    Submit
                 </Button>
                </Form.Item>
                <div className=" text-white text-xs sm:text-xs text-center">
                    <span>You Have an account? <Link to="/">Log in</Link> </span>
                </div>
          </Form>
        </>
    )
}

export default SignupForm;