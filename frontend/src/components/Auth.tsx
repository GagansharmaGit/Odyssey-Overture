import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({type}:{type : "signin" | "signup"}) =>{
    const navigate = useNavigate();
    const [postInputs, setPostInputs ] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
            const jwt = response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        } catch (error) {
            //alert 

        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className=" text-5xl font-extrabold">
                            {type === "signin" ? "Login to your Account" : "Create an Account"}
                        </div>

                        <div className="text-slate-500 flex justify-center pt-1">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                         <Link className="pl-2 underline font-bold text-slate-500" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                        </div>
                    </div>
                    <div className="py-4">
                        {type === "signup" ? <InputFields lable="Name" placeholder="Enter Name" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <InputFields lable="Username" placeholder="example@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }} />
                        <InputFields lable="Password" type={"password"} placeholder="******" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                        focus:ring-gray-300 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                        dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
                        dark:border-gray-700">{type === "signup" ? "sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface InputFieldsTypes {
    lable:string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>) => void;
    type?:string
}
const InputFields =( {lable,placeholder,onChange,type} : InputFieldsTypes)=>{
    return <div>
        <div className="py-2">
            <label className="block mb-2 text-sm font-extrabold text-black">{lable}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    </div>
}
