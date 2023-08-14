'use client'

import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Loader2 } from "lucide-react"
import { set } from "mongoose"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const verifyEmail = async () => {
        try {
            setLoading(true)
            await axios.post('/api/users/forgotpassword', {email})
            toast.success("User Found!")
            toast("Please check your inbox and click on verification link.", {duration: 10000})
        } catch (error: any) {
            toast.error("Something went wrong try again", error.message)    
        } finally {
            setLoading(false)
            setEmail("")
        }
    }

    return (
        <div className="flex flex-col justify-center items-center py-4 min-h-screen">
            <Card className="w-[300px] sm:w-[350px]">
             <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Passwrod Reset</CardTitle>
                <CardDescription>
                Enter your email to reset the password
                </CardDescription>
            </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button disabled={email.length >0 ? false : true} onClick={verifyEmail}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
                </Button>
            </CardFooter>
         </Card>
        </div>
    )
}