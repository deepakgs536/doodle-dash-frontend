import { InputComp } from "@/components/inputComp";
import { PersonAddIcon, RightArrowIcon } from "../../public"
import {Card, CardHeader, CardBody} from "@heroui/react" ;
import { ButtonComp } from "@/components/buttonComp";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/store/authStore";
import { showToast } from "@/components/toastComp";
import axios from "axios";

export const SignUpPage = () => {

    const navigate = useNavigate() ;

    const { signUpData, handleSignUpChange } = useAuthStore();


    const fields: { label: string; type: "username" | "email" | "password"; name: "username" | "email" | "password" | "confirmPassword"}[] = [
    { label: "Username", type: "username" , name : "username" },
    { label: "Email", type: "email" , name : "email" },
    { label: "Password", type: "password" , name : "password" },
    { label: "Confirm Password", type: "password" , name : "confirmPassword" }
    ];

    const handleSubmit = async() => {
        try {
            const { username, email, password, confirmPassword } = signUpData;

            if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
                showToast("error", "All fields are required");
                return;
            }

            if (password.length < 6) {
                showToast("error", "Password must be at least 6 characters long");
                return;
            }

            if (password !== confirmPassword) {
                showToast("error", "Passwords do not match");
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                username: username.trim(),
                email: email.trim(),
                password: password.trim(),
            });

            localStorage.setItem("token" , response.data.accessToken)
            localStorage.setItem("_id", response.data._id);
            localStorage.setItem("username", response.data.username);

            showToast("success", response?.data?.message || "Signup successful");

            navigate("/dashboard");

            } catch (error: any) {
            showToast("error", error.response?.data?.message || "Sign up failed");
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
                    <span className="text-[#7b738c] font-normal mt-[6px]">Sign up to continue your creative journey</span>
                </CardHeader>
                <CardBody className="overflow-visible">
                    <div className="flex flex-col gap-3">
                    {fields.map(field => (
                        <InputComp
                            key={field.type}
                            name={field.name}
                            label={field.label}
                            value={signUpData[field.type]}  // ✅ TS-safe lookup
                            onChange={handleSignUpChange}
                            isRequired={true}
                            size="md"
                            radius="md"
                            type={field.type}
                        />
                    ))}
                    </div>
                    <ButtonComp 
                    label="Sign Up" variant="solid"
                    mainClass="rounded-xl text-[18px] font-medium mt-5"
                    startContent={<PersonAddIcon className="mr-0.5 w-4.5 h-4.5 fill-white" />}
                    onClick={handleSubmit}
                    />
                    {/* <div className="flex text-[#7b738c] text-[14px] font-normal">
                        <Divider className="my-4 w-auto"/>
                        Or continue with
                        <Divider className="my-4 w-auto"/>
                    </div> */}
                    <div className="text-center text-[14px] font-normal text-[#7b738c] mt-4">
                        Already have an account?<span className="text-[#a551fb] font-medium  hover:cursor-pointer" onClick={() => navigate("/signIn")}> Sign in instead</span>
                    </div>
                </CardBody>
            </Card>
        </div>
        </div>
    )
}