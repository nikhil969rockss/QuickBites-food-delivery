import z from "zod";

export const validateUpdateMobile = (body) => {
  const schema = z.object({
    email: z.email({ error: "Invalid Email" }),
    mobile: z
      .string()
      .min(10, { error: "Phone number must be 10 digits" })
      .max(18, { error: "Phone number must be max of 18 digits" }),
  });

  return schema.safeParse(body);
};

export const validateUpdateRole = (body) => {
  const schema = z.object({
    email: z.email({ error: "Invalid Email" }),
    role: z.enum(["user", "owner", "deliveryBoy"], {
      error: "Invalid Role, Role must be user, owner or deliveryBoy",
    }),
  });

  return schema.safeParse(body);
};
