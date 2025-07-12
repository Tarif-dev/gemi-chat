import {connect} from "@/app/db/dbConfig"
import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connect()

export async function getDataFromToken(request : NextRequest){
    try {   
        const token = request.cookies.get("token")?.value || ""
        const decodedToken : any = jwt.verify(token,process.env.JWT_SECRET!)
        return decodedToken.id
        

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{
            status : 500
        })
    }
}
