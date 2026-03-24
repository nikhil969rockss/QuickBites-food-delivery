import { signupData } from '@/types'
import { api } from '@/utils/axios'

export const registerUserApi = async (formData: signupData) => {
  try {
    const response = await api.post('/api/auth/signup', formData)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error.response.data
  }
}
