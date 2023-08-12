'use client'

import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/forgotpassword', {email})
            toast.success("User Found!")
            toast("Please check your inbox and click on verification link.", {duration: 10000})
        } catch (error: any) {
            toast.error("Something went wrong try again", error.message)    
        }
    }

    return (
        <div className="flex flex-col justify-center items-center py-4 min-h-screen">
            <h1>Enter Your Email</h1>
            <input className="p-1.5 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-300 text-black" 
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={verifyEmail} className="bg-white text-black font-medium py-2 px-4 border-gray-300 rounded-lg">Submit</button>
        </div>
    )
}