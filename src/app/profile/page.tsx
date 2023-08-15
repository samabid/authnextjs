'use client'
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")
    
    const logout = async () => {
        try {
           await axios.get('/api/users/logout')
           toast.success('Logout Successfully')
           router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
       const res = await axios.get('/api/users/me')
       setData(res.data.data._id)
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen py-2">
            <Card className="w-[300px] sm:w-[350px]">
             <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">User Details</CardTitle>
                <CardDescription>
                {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Button onClick={getUserDetails}>Get User Detailes</Button>
                <Button variant='outline' onClick={logout}>Logout</Button>
            </div>
            </CardContent>
            </Card>
        </div>
            
    )
}