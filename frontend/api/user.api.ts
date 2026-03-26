import { api } from '@/utils/axios'

export const getMe = async () => {
  try {
    const response = await api.get('/api/user/me')
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}
export const updateMobile = async () => {
  try {
    const response = await api.get('/api/user/me')
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}
