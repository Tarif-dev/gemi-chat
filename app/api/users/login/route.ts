import { connect } from "@/app/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connect()

export async function POST(request : NextRequest){
    try{

        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody);

        const user = await (User as any).findOne({email})

        if(!user){
            return NextResponse.json({error : "user does not exist"},{status : 400})
        }
        console.log("user exists")

        const validPassword  = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error : "incorrect Password"},{status : 400})
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn : '1d'})

        const response = NextResponse.json({
            message : "Logged in successfully",
            success : true
        })

        response.cookies.set("token",token,{
            httpOnly: true
        })

        return response

    }catch(error : any){
        return NextResponse.json({
            message : error.message,
            error : error.message
        },{status : 500})
    }
}