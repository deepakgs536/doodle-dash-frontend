import { InputComp } from "@/components/inputComp";
import { LoginIcon, RightArrowIcon } from "../../public"
import {Card, CardHeader, CardBody} from "@heroui/react" ;
import { ButtonComp } from "@/components/buttonComp";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/store/authStore";
import { showToast } from "@/components/toastComp";
import axios from "axios";

type SignInPageProps = {
  setToken: (token: string | null) => void;
};

export const SignInPage = ({ setToken }: SignInPageProps) => {

    const navigate = useNavigate() ;

    const { signInData, handleSignInChange } = useAuthStore();

    const fields: { label: string; type: "email" | "password"; 
                    name : "username" | "email" | "password" | "confirmPassword"}[] = [
    { label: "Email", type: "email" , name : "email" },
    { label: "Password", type: "password" , name : "password" },
    ];
    
    const handleSubmit = async() => {
        try {
            const { email, password } = signInData;

            if (!email.trim() || !password.trim()) {
                showToast("error", "All fields are required");
                return false;
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
                email: email.trim(),
                password: password.trim(),
            });

            const { accessToken, user, message } = response.data;

            showToast("success", message);
            
            localStorage.setItem("token", accessToken);
            localStorage.setItem("_id", user._id);
            localStorage.setItem("username", user.username);

            setToken(accessToken);

            navigate("/dashboard")

            } catch (error: any) {
            showToast("error", error.response?.data?.message || "Sign in failed");
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[80%] md:w-[60%] lg:w-[40%]">
            <div className="flex items-center gap-2 hover:cursor-pointer mb-3" onClick={() => navigate("/")}>
                <RightArrowIcon className="w-4 h-4 fill-[#7b738c] rotate-180"/>
                <span className="text-[14px] text-[#7b738c] font-normal">Back to DoodleDashh</span>
            </div>
            <Card className="p-6">
                <CardHeader className="flex flex-col text-center">
                    <span className="text-[24px] font-bold mt-[6px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">Welcome Back</span>
                    <span className="text-[#7b738c] font-normal mt-[6px]">Sign in to continue your creative journey</span>
                </CardHeader>
                <CardBody className="overflow-visible">
                    <div className="flex flex-col gap-3">
                    {fields.map(field => (
                        <InputComp
                            key={field.type}
                            label={field.label}
                            name={field.name}
                            value={signInData[field.name as keyof typeof signInData]}
                            onChange={handleSignInChange}
                            isRequired={true}
                            size="md"
                            radius="md"
                            type={field.type}
                        />
                    ))}
                    </div>
                    <div className="mt-2 text-right text-[#a551fb] text-[14px] font-medium  hover:cursor-pointer">
                        Forget password?
                    </div>
                    <ButtonComp 
                    label="Sign In" variant="solid" 
                    mainClass="rounded-xl text-[18px] font-medium mt-5"
                    startContent={<LoginIcon className="mr-0.5 w-4.5 h-4.5 fill-white" />}
                    onClick={handleSubmit}
                    />
                    {/* <div className="flex text-[#7b738c] text-[14px] font-normal">
                        <Divider className="my-4 w-auto"/>
                        Or continue with
                        <Divider className="my-4 w-auto"/>
                    </div> */}
                    <div className="text-center text-[14px] font-normal text-[#7b738c] mt-4">
                        Don't have an account?<span className="text-[#a551fb] font-medium  hover:cursor-pointer" onClick={() => navigate("/signUp")}> Sign up for free</span>
                    </div>
                </CardBody>
            </Card>
        </div>
        </div>
    )
}