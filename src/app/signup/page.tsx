'use client'
import Link from "next/link"
import React, {useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function SignupPage() {
    const router  = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username:"",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            await axios.post("/api/users/signup", user)
            toast.success("Signup successfull")
            toast("Please check your inbox and click on verification link.", {duration: 10000})
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length >0 && user.password.length >0 && user.username.length >0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])
    
    return (
       <> 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4 text-3xl">{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input className="p-1.5 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-300 text-black"
                type="text" 
                id="username" 
                value={user.username} 
                onChange={(e) => setUser({...user, username:e.target.value})}
                placeholder="username"
            />
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
            <button onClick={onSignup} className="bg-white text-black font-medium py-2 px-4 border-gray-300 rounded-lg">{buttonDisabled ? "No Signup" : "Sign Up"}</button>
            <Link className="p-4" href='/login'>Visit Login Page</Link>
            </div>
        </>
    )
}