import mongoose, { Mongoose } from "mongoose"
import { Monofett } from "next/font/google";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })

        connection.on('error', (err)=>{
            console.log('Mongodb connection error , please make sure db is up and running'+ err)
            process.exit()
        })
    }catch(error){
        console.log("something went wrong while conneting to DB");
        console.log(error.message.toString())
    }
}