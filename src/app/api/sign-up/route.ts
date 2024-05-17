import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";

// post request to create a new user
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();
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
