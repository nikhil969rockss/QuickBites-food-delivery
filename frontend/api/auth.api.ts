import { loginData, signupData } from '@/types'
import { api } from '@/utils/axios'

export const registerUserApi = async (formData: signupData) => {
  try {
    const response = await api.post('/api/auth/signup', formData)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}

export const loginUser = async (data: loginData) => {
  try {
    const response = await api.post('/api/auth/login', data)

    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}

export async function sendOTPApi(email: string) {
  try {
    const response = await api.post('/api/auth/send-otp', { email })
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error.response.data
  }
}
export async function verifyOTPApi(email: string, otp: string) {
  try {
    const response = await api.post('/api/auth/verify-otp', { email, otp })
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
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
    console.log(error.response)
    return error?.response?.data
  }
}

export const googleAuthApi = async (data: {
  fullName: string
  email: string
}) => {
  try {
    const response = await api.post('/api/auth/google', data)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}
