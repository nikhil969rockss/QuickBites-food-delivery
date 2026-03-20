import z from "zod";

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name should be atleast 3 characters long")
    .max(50, "Name should be less than 50 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "password should be atleast 6 character long")
    .max(20, "password should be less than 20 character long")
    .optional(),
  mobile: z
    .string()
    .min(10, "Mobile number should be atleast 10 characters long")
    .max(18, "Mobile number should be less than 18 characters long"),
  role: z.enum(["user", "owner", "deliveryBoy"]).default("user"),
});

export default signUpSchema;
