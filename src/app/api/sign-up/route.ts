import { sendEmailVerification } from "@/helpers/sendEmailVerification";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";

// post request to create a new user
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();
    const user = await UserModel.findOne({
      name,
      isVerified: true,
    });
    // check if the user already exists
    if (user) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    const userByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.random().toString(36).substring(7);
    if (userByEmail) {
      if (userByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        userByEmail.password = hashedPassword;
        userByEmail.verifyCode = verifyCode;
        userByEmail.verifuCodeExpires = new Date();
        userByEmail.verifuCodeExpires.setHours(
          userByEmail.verifuCodeExpires.getHours() + 1
        );
        await userByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expirydate = new Date();
      expirydate.setHours(expirydate.getHours() + 1); // set expiry date to 1 hour from now
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifuCodeExpires: expirydate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
      // why await here?
      // because we want to wait for the user to be saved in the database
    }

    // verification email
    // send email with verification code
    const emailResponse = await sendEmailVerification(email, name, verifyCode);
    console.log(emailResponse);
    if (emailResponse.success) {
      return Response.json(
        {
          success: true,
          message: "User created successfully",
        },
        {
          status: 201,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Failed to send verification email",
        },
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        success: false,
        message: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}
