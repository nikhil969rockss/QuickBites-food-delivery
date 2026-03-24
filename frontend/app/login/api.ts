import { loginData } from '@/types'
import { api } from '@/utils/axios'

export const loginUser = async (data: loginData) => {
  try {
    const response = await api.post('/api/auth/login', data)

    return response.data

    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}
