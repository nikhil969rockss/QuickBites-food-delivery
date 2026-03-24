import nodmailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

// Create a transporter using service
const transporter = nodmailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

export const sendMail = async (senderMail, otp) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL,
      to: senderMail,
      subject: "Reset Password OTP",
      html: `<p>Your One Time Password for Resetting Password: <b>${otp}</b>. This OTP is valid for only 5 minutes</p>`,
    });
    console.log("mail sent successfully to "+ info.messageId);
    return true
  } catch (error) {
    console.log("sendMail error->", error);
    return false
  }
};
