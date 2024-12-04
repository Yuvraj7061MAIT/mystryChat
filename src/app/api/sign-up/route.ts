import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // Check if a verified user already exists with the same username
    const existingUserVerifiedByUserName = await userModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUserName) {
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        { status: 400 }
      );
    }

    // Check if a user already exists with the same email
    const existingUserVerifiedByEmail = await userModel.findOne({ email });
    if (existingUserVerifiedByEmail) {
      return new Response(
        JSON.stringify({ error: "Email already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set verification code and expiry
    const verifiedCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    const verifyCodeExpiry = new Date();
    verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

    // Create a new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      verifiedCode,
      verifyCodeExpiry,
      isVerified: false,
      isAcceptingMessages: true,
      messages: [],
    });
    await newUser.save();

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifiedCode
    );

    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({ error: "Failed to send verification email" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "User registered. Verification email sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500 }
    );
  }
}
