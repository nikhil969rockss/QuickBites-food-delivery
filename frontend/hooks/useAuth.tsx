'use client'
//library
import { setUser } from '@/redux/slices/user.slice'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//apis
import { getMeApi } from '@/api/user.api'

type Props = {
  setError?: Dispatch<SetStateAction<string>>
}
const useAuth = ({ setError }: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    async function checkUser() {
      const { data } = await getMeApi()

      if (!data?.success) {
        if (setError) setError(data?.message || 'Something went wrong')
        router.push('/login')
      }
      dispatch(setUser(data))
    }
    checkUser()
  }, [])
  return user
}

export default useAuth
