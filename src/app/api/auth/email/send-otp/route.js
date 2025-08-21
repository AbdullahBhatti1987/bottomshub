// // import { saveOtpToDb } from "@/lib/emailOtpDb";
// // import { sendEmailOTP } from "@/lib/sendEmailOTP";
// // import responseHelper from "@/lib/responseHelper";

// // export async function POST(req) {
// //   try {
// //     const { email } = await req.json();
// //     if (!email) return responseHelper.badRequest("Email is required");

// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //     await saveOtpToDb(email, otp);
// //     await sendEmailOTP(email, otp);

// //     return responseHelper.success({}, "OTP sent successfully");
// //   } catch (error) {
// //     console.error("send-otp error:", error);
// //     return responseHelper.serverError("Failed to send OTP");
// //   }
// // }

// // // Agar koi aur method call kare to error return karo
// // export function GET() {
// //   return responseHelper.methodNotAllowed();
// // }


// import { saveOtpToDb } from "@/lib/emailOtpDb";
// import { sendEmailOTP } from "@/lib/sendEmailOTP";
// import responseHelper from "@/lib/responseHelper";
// import { connectDb } from "@/lib/connectDb";
// import User from "@/models/User";

// export async function POST(req) {
//   await connectDb();

//   try {
//     const { email } = await req.json();
//     if (!email) return responseHelper.badRequest("Email is required");

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return responseHelper.badRequest("User with this email already exists");
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await saveOtpToDb(email, otp);
//     await sendEmailOTP(email, otp);

//     return responseHelper.success({}, "OTP sent successfully");
//   } catch (error) {
//     console.error("send-otp error:", error);
//     return responseHelper.serverError("Failed to send OTP");
//   }
// }

// // Agar koi aur method call kare to error return karo
// export function GET() {
//   return responseHelper.methodNotAllowed();
// }


import { saveOtpToDb } from "@/lib/emailOtpDb";
import { sendEmailOTP } from "@/lib/sendEmailOTP";
import responseHelper from "@/lib/responseHelper";
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";

export async function POST(req) {
  await connectDb();

  try {
    const { email } = await req.json();
    if (!email) return responseHelper.badRequest("Email is required");

    // Check if user exists
    const existingUser = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await saveOtpToDb(email, otp);
    await sendEmailOTP(email, otp);

    return responseHelper.success(
      { userExists: !!existingUser },
      "OTP sent successfully"
    );
  } catch (error) {
    console.error("send-otp error:", error);
    return responseHelper.serverError("Failed to send OTP");
  }
}
