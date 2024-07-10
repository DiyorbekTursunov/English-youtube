import { baseUrlAxios } from "@/axiosConfig";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserCredentials {
    username: string;
    password: string;
}

export default function Login() {
    const [userCredentials, setUserCredentials] = useState<UserCredentials>({ username: "", password: "" });
    const [errors, setErrors] = useState<{ username?: string, password?: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const validate = (): boolean => {
        const newErrors: { username?: string, password?: string } = {};
        if (!userCredentials.username) newErrors.username = "Foydalanuvchi ismi kiritilishi shart";
        if (!userCredentials.password) newErrors.password = "Parol kiritilishi shart";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const { username, password } = userCredentials;

            const userData = await baseUrlAxios.post("/auth/login", { username, password, })

            if (userData.status === 201) {
                localStorage.setItem("verification", JSON.stringify(userData.data.user.verification))
                navigate("/")
            } else {
                setSubmitError(userData.data.message);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setSubmitError(error.response?.data.message || "An unexpected error occurred");
            } else {
                setSubmitError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="w-full h-full bg-[#ffff]">
            <div className='max-w-[500px] mx-auto px-3'>
                <div className="w-full h-full flex flex-col      mt-16">
                    <div className="mb-[54px] mx-auto">
                        <h1 className="text-center text-[#1F41BB] text-[30px] font-bold">Tizimga kirish</h1>
                    </div>
                    <form className="text-[#000] flex flex-col justify-center gap-y-[30px]" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" hidden></label>
                            <input
                                className="focus:outline-[#1F41BB] rounded-[10px] bg-[#F1F4FF] p-[20px] placeholder:text-[#626262] w-full"
                                autoComplete="transaction-amount"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Ismingiz"
                                value={userCredentials.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p className="text-red-500 text-[14px]">{errors.username}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" hidden></label>
                            <input
                                className="focus:outline-[#1F41BB] rounded-[10px] bg-[#F1F4FF] p-[20px] placeholder:text-[#626262] w-full"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Parol"
                                value={userCredentials.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-[14px]">{errors.password}</p>}
                        </div>
                        {submitError && <p className="text-red-500 text-[14px]">{submitError}</p>}
                        <div className="mt-[30px]">
                            <span className="flex gap-1 text-[#626262] mb-[15px] ml-2">
                                Akauntingiz yo'qmi?
                                <Link to={"/register"} className="text-[#000] font-medium">
                                    Ro’yhatdan o’tish
                                </Link>
                            </span>
                            <button className="w-full bg-[#1F41BB] py-[15px] rounded-[10px] text-[20px] text-[#fff] font-semibold">Tizimga kirish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
