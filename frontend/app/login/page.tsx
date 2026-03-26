'use client'
import Button from '@/components/Button'
import DivideLine from '@/components/DivideLine'
import Footer from '@/components/Footer'
import GoogleButton from '@/components/GoogleButton'
import InputElement from '@/components/InputElement'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { CiLock } from 'react-icons/ci'
import { SlEnvolope } from 'react-icons/sl'
import { googleAuthApi, loginUser } from '@/api/auth.api'
import ErrorNotification from '@/components/ErrorNotification'
import { IoIosEyeOff } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  //states
  const [inputFields, setinputFields] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  // handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputFields({ ...inputFields, [e.target.name]: e.target.value })
  }

  //handling login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!inputFields.email || !inputFields.password) {
      setError('Please fill all the fields')
      setLoading(false)
      return
    }
    const formData = {
      email: inputFields.email,
      password: inputFields.password,
    }
    const response = await loginUser(formData)
    if (!response?.success) {
      setError(response?.message)
      setLoading(false)
      return
    }
    setLoading(false)
    console.log(response)
  }

  //handle sign in with google
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    if (result) {
      const data = {
        fullName: result.user.displayName!,
        email: result.user.email!,
        mobile: 'unavailable',
      }
      const response = await googleAuthApi(data)
      if (!response?.success) {
        setError(response?.message)
        return
      }
      console.log(response)
      router.push('/user/update')
    }
  }

  return (
    <>
      <main className="relative flex min-h-[90vh] flex-col items-center justify-center">
        <ErrorNotification error={error} />
        {/* <--------main form----> */}
        <section className="w-full max-w-150 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-black">QuickBite</h2>
          <p>Welcome back to the kinetic kichen</p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-6">
            <InputElement
              label="Email"
              id="email"
              icon={<SlEnvolope color="#E09C96" />}
              placeholder="john@example.com"
              required
              name="email"
              value={inputFields.email}
              onChange={handleChange}
              className="w-full"
            />

            <InputElement
              label="Password"
              id="password"
              icon={<CiLock color="#E09C96" />}
              placeholder="●●●●●●●●"
              required
              name="password"
              value={inputFields.password}
              onChange={handleChange}
              componentType="login"
              type={showPassword ? 'text' : 'password'}
              eyeIcon={
                showPassword ? (
                  <IoIosEyeOff
                    onClick={() => setShowPassword(false)}
                    color="#E09C96"
                    className="cursor-pointer select-none"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(true)}
                    color="#E09C96"
                    className="cursor-pointer select-none"
                  />
                )
              }
            />
            <Link
              href={'/forgot-password'}
              className="w-fit cursor-pointer self-end text-sm font-semibold text-[#E16131] hover:underline"
            >
              forgot password
            </Link>
            <Button disabled={loading}>
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <>
                  Sign In <BsArrowRight />
                </>
              )}
            </Button>
          </form>
          <DivideLine />
          <GoogleButton disabled={loading} onClick={googleAuth} text="in" />
          <p className="mt-4 text-center text-sm text-black/70">
            New to QuickBite?{' '}
            <Link href={'/register'} className="cursor-pointer hover:underline">
              Create an account
            </Link>
          </p>
        </section>

        {/* <-------Footer-------> */}
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </>
  )
}

export default LoginPage
