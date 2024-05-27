import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export async function sendEmailVerification(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Message Me - Email Verification",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
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
// helpers/sendFileVerification.ts
//libs/resend.ts
