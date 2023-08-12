'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function PasswordReset() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")

    const changePassword = async () => {
        try {
            const response = await axios.post('/api/users/passwordreset/', {token, password})
            toast.success("Password Changed Successfully", response.data.message)
            setPassword("")
            router.push("/login")
        } catch (error:any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            <h1 className="text-4xl py-2">Please Enter New Password</h1>
            <input className="p-1.5 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-300 text-black" type="password" placeholder="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={changePassword} className="bg-white text-black font-medium py-2 px-4 border-gray-300 rounded-lg" >Submit</button>
        </div>
    )
}