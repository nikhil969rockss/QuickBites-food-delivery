import { api } from '@/utils/axios'

export async function sendOTPApi(email: string) {
  try {
    const response = await api.post('/api/auth/send-otp', { email })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}
export async function verifyOTPApi(email: string, otp: string) {
  try {
    const response = await api.post('/api/auth/verify-otp', { email, otp })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}

export async function resetPasswordApi(email: string, newPassword: string) {
  try {
    const response = await api.post('/api/auth/reset-password', {
      email,
      newPassword,
    })
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}
