'use client'
import Link from "next/link"
import React, {useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import axios  from "axios"
import toast from "react-hot-toast"


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login Successfull", response.data)
            toast.success("Login Successfull")
            router.push("/profile")
            
        } catch (error: any) {
           console.log("Login Failed", error.message)
           toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length >0 && user.password.length >0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4 text-3xl">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input className="p-1.5 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-300 text-black"
                type="email" 
                id="email" 
                value={user.email}
                onChange={(e) => setUser({...user, email:e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input className="p-1.5 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-300 text-black"
                type="password" 
                id="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password:e.target.value})}
                placeholder="password"
            />
            <button onClick={onLogin} className="bg-white text-black font-medium py-2 px-4 border-gray-300 rounded-lg">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link className="p-4" href='/signup'>Visit Signup Page</Link>
        </div>
    )
}