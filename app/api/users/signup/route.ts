import { connect } from "@/app/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");
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

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {}

export async function PUT(request: NextRequest) {}
