import crypto from "node:crypto";
export const generateOTP = () => {
  //generating 6 digit OTP
  return crypto.randomInt(100000, 999999);
};
