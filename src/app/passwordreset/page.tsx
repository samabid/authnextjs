'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Loader2 } from "lucide-react"

export default function PasswordReset() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const changePassword = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/passwordreset/', {token, password})
            toast.success("Password Changed Successfully", response.data.message)
            setPassword("")
            router.push("/login")
        } catch (error:any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 container">
            <HoverCard>
                <HoverCardTrigger>
                <Button variant="link">Token</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-max">
                {token ? `${token}` : "no token"}
                </HoverCardContent>
            </HoverCard>
            <Card className="w-[300px] sm:w-[350px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Password Reset</CardTitle>
                <CardDescription>
                Please Enter Your New Password
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <Input type="password" placeholder="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
            <Button disabled={password.length >0 ? false : true} onClick={changePassword}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
            </Button>
            </div>
            </CardContent>
            </Card>
        </div>
    )
}