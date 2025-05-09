import LoginForm from "../../Componets/LoginForm/LoginForm";


export function Login() {
    return <>
            <div className="bg-[url(../src/assets/Bg-loginpage.png)] bg-no-repeat bg-cover bg-center min-h-screen w-full  flex justify-center items-center h-full">
            
                <div className="px-5 h-[380px] border-transparent bg-black/45 rounded-2xl lg:w-1/3  md:w-1/2 sm:w-1/2  ">
                        <div className="text-4xl text-white text-center my-10 font-bold">
                            Login
                        </div>
                        <div className="flex justify-center items-center">
                             <LoginForm/>
                        </div>
                </div>
            </div>
    </>
}

