import SignupForm from "@src/Componets/SIGNUP/SignupForm";



 function Signup() {
    return <>
            <div className="bg-[url(../src/assets/Bg-loginpage.png)] bg-no-repeat bg-cover w-full flex justify-center items-center h-full">
            
                <div className="px-5 h-[420px] border-transparent bg-black/45 rounded-2xl lg:w-1/3  md:w-1/2 sm:w-1/2 ">
                        <div className="text-4xl text-white text-center my-10 font-bold">
                            Sign Up
                        </div>
                        <div className="flex justify-center items-center">
                             <SignupForm/>
                        </div>
                </div>
            </div>
    </>
}

export default Signup;