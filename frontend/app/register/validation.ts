import z from 'zod'
import { signupData } from '../../types/index'
export const signupValidation = (formData: signupData) => {
  const schema = z.object({
    fullName: z
      .string()
      .min(3, { error: "'Full name must be at least 3 characters'" })
      .max(25, { error: 'Full name must be at most 25 characters' }),
    email: z.email({ error: 'please enter a valid email address' }),
    password: z
      .string()
      .min(6, { error: 'Password must be at least 6 characters' }),
    mobile: z
      .string()
      .min(10, { error: 'Phone number must be at least 10 characters' }),

    role: z.enum(['user', 'owner', 'deliveryBoy'], {
      error: 'Invalid role types',
    }),
  })

  const { success, error, data } = schema.safeParse(formData)
  if (!success) {
    return { success: false, error: z.prettifyError(error) }
  }
  return { success: true, data }
}
