import {connect} from "@/app/db/dbConfig"
import User from "@/models/userModel"
import { NextResponse,NextRequest } from "next/server"
import { getDataFromToken } from "@/app/helpers/getDataFromToken"

connect()

export async function POST(request : NextRequest){
    const userId = await getDataFromToken(request)
    const user = await (User as any).findOne({_id : userId}).select("-password")

    if(!user) {
        return NextResponse.json({
            message : "User not found. Please log in ."
        })
    }

    return NextResponse.json({
        message : "user found",
        data : user
    })
}