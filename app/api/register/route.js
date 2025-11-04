import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import User from "../../../models/User";
import { connectToDatabase } from "../../../lib/db";

export async function POST(request) {
    try {
        connectToDatabase();
        const { name, email, password } = await request.json();
        const userExist = await User.findOne({ email })

        if (userExist) {
            return NextResponse.json({ error: "User Already Existed" })
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashpassword,
        })

        await newUser.save()

        return NextResponse.json({ message: "User Register", status: 201 })

    } catch (err) {
        return NextResponse.json({ error: "Error in Server", status: 500 })
    }


}