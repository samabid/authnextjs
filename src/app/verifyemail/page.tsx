'use client'
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"


export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
            toast.success("Your account has been verified")
        } catch (error: any) {
            setError(true)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <Link href={"/login"}>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}