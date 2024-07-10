import { baseUrlAxios } from "@/axiosConfig";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserRegistration {
    username: string;
    lastname: string;
    password: string;
    reEnterPassword: string;
}


// interface UserType {
//     username: string;
//     lastname?: string; // Optional since 'unique' is not 'required'
//     password: string;
//     role?: string; // Optional with default value
//     verification: string;
// }

export default function Register() {
    const [userRegistration, setUserRegistration] = useState<UserRegistration>({
        username: "",
        lastname: "",
        password: "",
        reEnterPassword: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setSubmitError("")
        }, 5000);
    }, [submitError])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!userRegistration.username) newErrors.username = "Foydalanuvchi ismi kiritilishi shart";
        if (!userRegistration.lastname) newErrors.lastname = "Familiya kiritilishi shart";
        if (!userRegistration.password) newErrors.password = "Parol kiritilishi shart";
        if (userRegistration.password !== userRegistration.reEnterPassword)
            newErrors.reEnterPassword = "Parollar mos kelmaydi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const { username, lastname, password } = userRegistration;

            const userData = await baseUrlAxios.post("/auth/register", { username, lastname, password, })

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
                <div className="w-full h-screen flex flex-col mt-10">
                    <div className=" mb-[54px] mx-auto">
                        <h1 className="text-center text-[#1F41BB] text-[30px] font-bold">Ro'yxatdan o'tish</h1>
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
                                value={userRegistration.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p className="text-red-500 text-[14px]">{errors.username}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastname" hidden></label>
                            <input
                                className="focus:outline-[#1F41BB] rounded-[10px] bg-[#F1F4FF] p-[20px] placeholder:text-[#626262] w-full"
                                id="lastname"
                                name="lastname"
                                type="text"
                                placeholder="Familiyangiz"
                                value={userRegistration.lastname}
                                onChange={handleChange}
                            />
                            {errors.lastname && <p className="text-red-500 text-[14px]">{errors.lastname}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" hidden></label>
                            <input
                                className="focus:outline-[#1F41BB] rounded-[10px] bg-[#F1F4FF] p-[20px] placeholder:text-[#626262] w-full"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Parol"
                                value={userRegistration.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-[14px]">{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="reEnterPassword" hidden></label>
                            <input
                                className="focus:outline-[#1F41BB] rounded-[10px] bg-[#F1F4FF] p-[20px] placeholder:text-[#626262] w-full"
                                id="reEnterPassword"
                                name="reEnterPassword"
                                type="password"
                                placeholder="Parolni qayta kiriting"
                                value={userRegistration.reEnterPassword}
                                onChange={handleChange}
                            />
                            {errors.reEnterPassword && <p className="text-red-500 text-[14px]">{errors.reEnterPassword}</p>}
                        </div>
                        {submitError && <p className="text-red-500 text-[14px]">{submitError}</p>}
                        <div className="mt-[30px]">
                            <span className="flex gap-1 text-[#626262] mb-[15px] ml-2">
                                Akauntingiz bormi?
                                <Link to={"/login"} className="text-[#000] font-medium">
                                    Tizimga kirish
                                </Link>
                            </span>
                            <button className="w-full bg-[#1F41BB] py-[15px] rounded-[10px] text-[20px] text-[#fff] font-semibold">Ro'yxatdan o'tish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}