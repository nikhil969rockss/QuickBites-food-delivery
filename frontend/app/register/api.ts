import { signupData } from '@/types'
import { api } from '@/utils/axios'

export const registerUser = async (formData: signupData) => {
  try {
    const response = await api.post('/api/auth/signup', formData)
    return response.data
  } catch (error) {
    console.log(error)
    return
  }
}
