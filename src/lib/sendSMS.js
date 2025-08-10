// lib/sendSMS.js
import twilio from "twilio";

export async function sendSMS({ mobile, message }) {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile,
    });

    return { success: true, sid: msg.sid };
  } catch (error) {
    console.error("Twilio SMS Error:", error);
    return { success: false, error: error.message };
  }
}
