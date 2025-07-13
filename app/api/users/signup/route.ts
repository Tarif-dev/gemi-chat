import { connect } from "@/app/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/helpers/mailer";
import bcrypt from "bcrypt";
const saltRounds = 10;
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password }: any = reqBody;
    // validation
    console.log(reqBody);

    const user = await (User as any).findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user already exits" },
        { status: 400 }
      );
    }

    const hashedpassword = await bcrypt.hash(password, saltRounds);

    const newUser = new (User as any)({
      username,
      email,
      password: hashedpassword,
    });

    const savedUser = await newUser.save();

    //send verification mail
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    },{status : 200});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
