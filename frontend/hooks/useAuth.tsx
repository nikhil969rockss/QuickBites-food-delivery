'use client'
//library
import { setUser } from '@/redux/slices/user.slice'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'

//apis
import { getMeApi } from '@/api/user.api'

type Props = {
  setError?: Dispatch<SetStateAction<string>>
}
const useAuth = ({ setError }: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    async function checkUser() {
      const response = await getMeApi()

      if (!response?.success) {
        if (setError) setError(response?.message || 'Something went wrong')
        router.push('/login')
      }
      dispatch(setUser(response?.data))
    }
    checkUser()
  }, [])
  return
}

export default useAuth
