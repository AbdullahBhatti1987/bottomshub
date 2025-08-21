// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";

// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// // ✅ login ke time JWT session set
// export async function setLoginSession(response, user) {
//   const token = await new SignJWT(user)
//     .setProtectedHeader({ alg: "HS256" })
//     .setExpirationTime("7d") // 7 din valid
//     .sign(secret);

//   response.cookies.set("session", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 din
//   });

//   return response;
// }

// // ✅ session se user nikalna
// export async function getLoginSession() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("session")?.value;

//   if (!token) return null;

//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (e) {
//     return null;
//   }
// }

// // ✅ logout (cookie delete)
// export async function clearLoginSession(response) {
//   response.cookies.set("session", "", { maxAge: -1, path: "/" });
//   return response;
// }


// lib/session.js
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function setLoginSession(user) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  const response = NextResponse.json(
    { success: true, message: "Login successful", user },
    { status: 200 }
  );

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
