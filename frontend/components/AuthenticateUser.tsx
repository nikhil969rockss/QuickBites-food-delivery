'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AuthenticateUser = ({ children }: { children: React.ReactNode }) => {
  const user = useAuth({})

  const router = useRouter()

  // for redirection according to user roles
  useEffect(() => {
    if (!user?.user) {
      router.push('/login')
    }
    if (user?.user?.role === 'user') {
      router.push('/home/user')
    }
    if (user?.user?.role === 'owner') {
      router.push('/home/owner')
    }
    if (user?.user?.role === 'deliverBoy') {
      router.push('/home/delivery-boy')
    }
  }, [user])
  return <main>{children}</main>
}

export default AuthenticateUser
