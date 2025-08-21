// import { sendEmail } from "./sendEmail";

// export const sendEmailOTP = async (email, otp) => {
//   const subject = "Your OTP Code - BottomsHub";
//   const html = `
//     <div style="font-family: Arial, sans-serif; padding: 20px;">
//       <h2>Your OTP Code</h2>
//       <p>Use the following OTP to login:</p>
//       <h1 style="color: #2c3e50;">${otp}</h1>
//       <p>This OTP will expire in 5 minutes.</p>
//     </div>
//   `;

//   return await sendEmail({ to: email, subject, html });
// };


import { sendEmail } from "./sendEmail";

export const sendEmailOTP = async (email, otp) => {
  const subject = "🔐 Your OTP Code - Bottom'sHub";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 12px; border: 1px solid #eee;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">Bottom'sHub</h1>
        <p style="color: #555; margin: 5px 0;">Smart Shopping Experience</p>
      </div>
      
      <div style="background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 2px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #2c3e50; text-align: center;">Hello 👋</h2>
        <p style="font-size: 15px; color: #555; text-align: center;">
          Thank you for choosing <strong>Bottom'sHub</strong>.  
          Please use the following OTP code to login securely:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #fff; background: #2c3e50; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
            ${otp}
          </span>
        </div>
        
        <p style="font-size: 14px; color: #777; text-align: center;">
          This OTP is valid for <strong>5 minutes</strong>.  
          Do not share this code with anyone for security reasons.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 25px; color: #888; font-size: 12px;">
        <p>Best regards,</p>
        <p><strong>Team Bottom'sHub</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p>If you didn’t request this code, please ignore this email.</p>
      </div>
    </div>
  `;

  return await sendEmail({ to: email, subject, html });
};
