// // // // import { verifyOtpFromDb } from "@/lib/emailOtpDb";
// // // // import { setLoginSession } from "@/lib/session";
// // // // import responseHelper from "@/lib/responseHelper";

// // // // export async function POST(req) {
// // // //   try {
// // // //     const { email, otp } = await req.json();

// // // //     if (!email || !otp) {
// // // //       return responseHelper(false, null, "Email and OTP required", 400);
// // // //     }

// // // //     // OTP check
// // // //     const valid = await verifyOtpFromDb(email, otp);
// // // //     if (!valid) {
// // // //       return responseHelper(false, null, "Invalid OTP", 400);
// // // //     }

// // // //     // User object
// // // //     const user = { email };

// // // //     // response create karo
// // // //     const response = responseHelper(true, { user }, "Login successful", 200);

// // // //     // session set karo
// // // //     await setLoginSession(response, user);

// // // //     return response;
// // // //   } catch (error) {
// // // //     console.error("Verify OTP error:", error);
// // // //     return responseHelper(false, null, "Server error", 500);
// // // //   }
// // // // }



// // // import { verifyOtpFromDb } from "@/lib/emailOtpDb";
// // // import { setLoginSession } from "@/lib/session";
// // // import responseHelper from "@/lib/responseHelper";

// // // export async function POST(req) {
// // //   try {
// // //     const { email, otp } = await req.json();

// // //     if (!email || !otp) {
// // //       return responseHelper.badRequest("Email and OTP required");
// // //     }

// // //     // OTP check
// // //     const valid = await verifyOtpFromDb(email, otp);
// // //     if (!valid) {
// // //       return responseHelper.badRequest("Invalid OTP");
// // //     }

// // //     // User object
// // //     const user = { email };

// // //     // response create karo
// // //     const response = responseHelper.success({ user }, "Login successful");

// // //     // session set karo
// // //     await setLoginSession(response, user);

// // //     return response;
// // //   } catch (error) {
// // //     console.error("Verify OTP error:", error);
// // //     return responseHelper.serverError("Server error");
// // //   }
// // // }



// // import { verifyOtpFromDb } from "@/lib/emailOtpDb";
// // import { setLoginSession } from "@/lib/session";
// // import responseHelper from "@/lib/responseHelper";

// // export async function POST(req) {
// //   try {
// //     const { email, otp } = await req.json();
// //       console.log("Email", email)
// //       console.log("Otp", otp)
// //     if (!email || !otp) {
// //       return responseHelper.badRequest("Email and OTP required");
// //     }

// //     // OTP check
// //     const valid = await verifyOtpFromDb(email, otp);
// //     if (!valid) {
// //       return responseHelper.badRequest("Invalid OTP");
// //     }

// //     // user object
// //     const user = { email };

// //     // login session (cookie + response)
// //     return await setLoginSession(user);
// //   } catch (error) {
// //     console.error("Verify OTP error:", error);
// //     return responseHelper.serverError("Server error");
// //   }
// // }

// // import { verifyOtpFromDb } from "@/lib/emailOtpDb";
// // import { setLoginSession } from "@/lib/session";
// // import responseHelper from "@/lib/responseHelper";
// // import { connectDb } from "@/lib/connectDb";
// // import responseHelper from "@/lib/responseHelper";
// // import User from "@/models/User";

// // export async function POST(req) {
// //   await connectDb();

// //   try {
// //     const { email, name, mobile, otp } = await req.json();

// //     if (!email || !name || !mobile || !otp) {
// //       return responseHelper.badRequest("Email, Name, OTP, and Mobile are required");
// //     }

// //        // OTP check
// //     const valid = await verifyOtpFromDb(email, otp);
// //     if (!valid) {
// //       return responseHelper.badRequest("Invalid OTP");
// //     }


// //     // Format mobile (Pakistan)
// //     let formattedMobile = mobile;
// //     if (!mobile.startsWith("+")) {
// //       formattedMobile = "+92" + mobile.replace(/^0/, "");
// //     }

// //     // Check if user already exists
// //     let user = await User.findOne({ email });

// //     if (user) {
// //       // Update existing user with new name/mobile if changed
// //       user.name = name;
// //       user.mobile = formattedMobile;
// //       await user.save();
// //     } else {
// //       // Create new user
// //       user = await User.create({
// //         name,
// //         email,
// //         mobile: formattedMobile,
// //         role: "customer",
// //         isVerified: true, // Email verified
// //       });
// //     }

// //     return responseHelper.success({ user }, "User registered/updated successfully");
// //   } catch (error) {
// //     console.error("Email OTP verify error:", error);
// //     return responseHelper.serverError("Something went wrong while saving user");
// //   }
// // }



// import { verifyOtpFromDb } from "@/lib/emailOtpDb";
// import { setLoginSession } from "@/lib/session";
// import responseHelper from "@/lib/responseHelper";
// import { connectDb } from "@/lib/connectDb";
// import User from "@/models/User";

// export async function POST(req) {
//   await connectDb();

//   try {
//     const { email, name, mobile, otp } = await req.json();

//     if (!email || !name || !mobile || !otp) {
//       return responseHelper.badRequest("Email, Name, OTP, and Mobile are required");
//     }
//     console.log("Point-1")

//     // Format mobile (Pakistan)
//     const formattedMobile = mobile.startsWith("+")
//       ? mobile
//       : "+92" + mobile.replace(/^0/, "");

//     console.log("Point-2")

//     // OTP verification
//     const valid = await verifyOtpFromDb(email, otp);
//     if (!valid) {
//       return responseHelper.badRequest("Invalid OTP");
//     }

//     console.log("Point-3")

//     // Check if email or mobile already exists
//     const existingUser = await User.findOne({
//       $or: [{ email }, { mobile: formattedMobile }],
//     });

//     console.log("Point-4")


//     if (existingUser) {
//       if (existingUser.email === email) {
//         return responseHelper.badRequest("This email is already registered");
//       }
//       if (existingUser.mobile === formattedMobile) {
//         return responseHelper.badRequest("This mobile number is already registered");
//       }
//     }
//     console.log("Point-5")

//     // Create new user
//     const user = await User.create({
//       name,
//       email,
//       mobile: formattedMobile,
//       role: "customer",
//       isVerified: true, // Email verified
//     });
//     console.log("Point-6")

//     // Set login session (cookie)
//     await setLoginSession({ email: user.email, id: user._id });

//     return responseHelper.success(
//       { user },
//       "User registered and logged in successfully"
//     );
//   } catch (error) {
//     console.error("Email OTP verify error:", error);
//     return responseHelper.serverError("Something went wrong while saving user");
//   }
// }



import { verifyOtpFromDb } from "@/lib/emailOtpDb";
import { setLoginSession } from "@/lib/session";
import responseHelper from "@/lib/responseHelper";
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";

export async function POST(req) {
  await connectDb();

  try {
    const { email, name, mobile, otp } = await req.json();

    if (!email || !otp) {
      return responseHelper.badRequest("Email and OTP are required");
    }

    const valid = await verifyOtpFromDb(email, otp);
    if (!valid) return responseHelper.badRequest("Invalid OTP");


    let user = await User.findOne({ email });

    // If user exists, update mobile and name if provided
    if (user) {
      if (name) user.name = name;
      if (mobile) {
        user.mobile = mobile.startsWith("+") ? mobile : "+92" + mobile.replace(/^0/, "");
      }
      await user.save();
    } else {
      if (!name || !mobile)
        return responseHelper.badRequest("Name and mobile required for new users");

      const formattedMobile = mobile.startsWith("+") ? mobile : "+92" + mobile.replace(/^0/, "");
      user = await User.create({
        name,
        email,
        mobile: formattedMobile,
        role: "customer",
        isVerified: true,
      });
    }

        

    await setLoginSession({ email: user.email, id: user._id });

    return responseHelper.success({ user }, "User logged in successfully");
  } catch (error) {
    console.error("Email OTP verify error:", error);
    return responseHelper.serverError("Something went wrong while saving user");
  }
}
