import { api } from '@/utils/axios'

export const getMeApi = async () => {
  try {
    const response = await api.get('/api/user/me')
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}

export const updateUserMobileApi = async (data: { mobile: string }) => {
  try {
    const response = await api.post('/api/user/update/mobile', data)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}

export const updateUserRoleApi = async (data: { role: string }) => {
  try {
    const response = await api.post('/api/user/update/role', data)
    return response.data
  } catch (error: any) {
    console.log(error.response)
    return error?.response?.data
  }
}
