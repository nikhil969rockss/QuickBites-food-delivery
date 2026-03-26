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

export type TUpdateData = { email: string; mobile: string }
export const updateMobile = async (data: TUpdateData) => {
  try {
    const response = await api.post('/api/user/update/mobile', data)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}
