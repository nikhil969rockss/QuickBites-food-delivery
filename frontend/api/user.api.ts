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

export const updateUserMobile = async (mobile: string) => {
  try {
    const response = await api.post('/api/user/update/mobile', mobile)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}

export const updateUserRole = async (data: { role: string }) => {
  try {
    const response = await api.post('/api/user/update/role', data)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}
