'use client'
import { useState, useEffect } from "react"
import axios from "axios"


export default function PasswordReset() {
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const changePassword = async () => {
        try {
            const response = await axios.post('/api/users/passwordreset/', {token, password})
            setMessage(response.data.message)
            setPassword("")
        } catch (error:any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verified</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            <br />
            <input className="p-1.5 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-300 text-black" type="password" placeholder="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={changePassword} className="bg-white text-black font-medium py-2 px-4 border-gray-300 rounded-lg" >Submit</button>
            <br />
            <h2 className="p-2 bg-orange-500 text-black">{message}</h2>
        </div>
    )
}