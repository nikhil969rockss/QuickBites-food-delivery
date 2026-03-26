import z from "zod";

const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z.string(),
});

export default loginSchema;
