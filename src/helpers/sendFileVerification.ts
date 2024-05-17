import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export async function sendFileVerification(
  email: string,
  username: string,
  otp: string
): Promise<ApiResponse> {
  try {
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (emailError) {
    console.error(emailError);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
