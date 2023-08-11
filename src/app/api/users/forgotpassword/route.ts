import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request:NextRequest){

    try {
        const reqBody= await request.json()
        const {email} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400})
        }

        //send reset password email
        await sendEmail({email, emailType: "RESET", userId: user._id})

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save()

        console.log(user)
        return NextResponse.json({
            message: "User Found",
            success: true
        })



    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}