import { useForm } from "react-hook-form";
import { TRegisterFormData, registerSchema } from "./types/registerform";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import FormError from "../../../components/errors/form_error/FormError";
import './Register.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../context/auth/authContextHook";


const RegisterPage = () => {
    const {
        handleSubmit,
        register,
        watch,
        reset,
        formState: {errors, touchedFields, isValid}
    } = useForm<TRegisterFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            password: "",
            passwordConfirm: ""
        },
        resolver: zodResolver(registerSchema)
    })

    const navigate = useNavigate()
    const {register: registerUser, registerLoading} = useAuth()
    
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    


    const onSubmit = handleSubmit(async (data: TRegisterFormData) => {

        console.log("Register data", data);
        try {
            const result = await registerUser(data)
            
            console.log("Register result: ", result);
            reset()
            navigate("/")
            
        } catch (error) {
            console.log(error);
            
        }
    })

    const [
        firstName,
        lastName,
        password,
        passwordConfirm,
        phoneNumber
    ] = watch(["firstName", "lastName", "password", "passwordConfirm","phoneNumber"])

    
    
    return (
        <div className="register">

            {/* SECTION LEFT */}
            <div className="section--left">
                <div className="head">
                    <div className="logo">Nexa</div>
                    <div className="container">
                        <div>Already a Member?</div>
                        <NavLink className="btn" to="/">Log In</NavLink>
                    </div>
                </div>
                <div className="body">
                    <div className="top">
                        <div className="title">Welcome to Nexa</div>
                        <div className="subtitle">Make friends and join communities</div>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className={`field firstName ${firstName ? "filled" : ""}`}>
                            <input
                            {...register("firstName")}
                            id="firstName" 
                            type="text" />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        {errors.firstName && <FormError message={errors.firstName.message as string} /> }
                        
                        <div className={`field lastName ${lastName ? "filled" : ""}`}>
                            <input
                            {...register("lastName")}
                            id="lastName" 
                            type="text" />

                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        {errors.lastName && <FormError message={errors.lastName.message as string} />}
                        <div className={`field phone ${phoneNumber ? "filled" : ""}`}>
                            <input 
                            {...register("phoneNumber")} 
                            id="phoneNumber" type="text" 
                            />
                            <label htmlFor="phoneNumber">Phone number</label>
                        </div>
                        {touchedFields.phoneNumber && errors.phoneNumber ? <FormError message={errors.phoneNumber.message as string} /> : null }
                        
                    
                        <div className={`field password ${password ? "filled" : ""}`}>
                            <input
                            {...register("password")} 
                            
                            type={ showPassword ? "text" : "password"} id="password" />
                            <label htmlFor="password">Password</label>
                            <button type="button" className="btn--pass" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? 
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>

                                    :

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                }

                            </button>
                        </div>
                        <div className={`field passwordConfirm ${passwordConfirm ? "filled": ""}`}>
                            <input
                            {...register("passwordConfirm")} 
                            
                            type={showPasswordConfirm ? "text" : "password"} id="passwordConfirm"/>
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <button type="button" className="btn--pass" 
                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                                {
                                    showPasswordConfirm ? 
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>

                                    :

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                }

                            </button>
                        </div>
                        {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message as string} />}
                        <input disabled={!isValid} type="submit" className="btn" value={ registerLoading ? "Loading..." : "Register"} />
                        
                    </form>
                </div>
            </div>
            <div className="section--right">
                <div className="logo">Nexa</div>
            </div>
        </div>
    )
}



export default RegisterPage;