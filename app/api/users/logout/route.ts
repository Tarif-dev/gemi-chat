import {connect} from "@/app/db/dbConfig"
import { NextRequest,NextResponse } from "next/server"

connect()

export async function GET(request : NextRequest){
    try {
        const response = NextResponse.json({
            message : "logout Successfully",
            success : true
        })

        response.cookies.set("token","",{
            httpOnly : true,
            expires : new Date(0)
        })

        return response
    } catch (error){
        return NextResponse.json({error : error.message},{status : 500})
    }
}

