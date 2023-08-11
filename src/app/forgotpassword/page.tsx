'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/forgotpassword', {email})
            console.log("User Found")
            //router.push("/resetpassword")
            setMessage("User Found Please check your inbox and click on verifiaction link")
        } catch (error: any) {
            console.log("User Not Found", error.message)
            setMessage("User Not Found, Please try again")
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
            <br />
            <h1>{message}</h1>
        </div>
    )
}