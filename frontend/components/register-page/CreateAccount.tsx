'use client'

//library
import { useEffect, useRef, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { SlEnvolope } from 'react-icons/sl'
import { MdOutlineLocalPhone } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { BsArrowRight } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'
import { IoIosEyeOff } from 'react-icons/io'
import Link from 'next/link'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

//components
import DivideLine from '../DivideLine'
import Button from '../Button'
import InputElement from '../InputElement'
import GoogleButton from '../GoogleButton'
import SelectRole from './SelectRole'
import { signupValidation } from '@/app/register/validation'
import { registerUserApi, googleAuthApi } from '@/api/auth.api'
import ErrorNotification from '../ErrorNotification'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'

const CreateAccount = () => {
  //states
  const fullNameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  // Phone number validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (isNaN(Number(value))) return
    if (phone.length > 10) return
    setPhone(value)
  }

  //handling form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (
      !fullNameRef.current?.value ||
      !emailRef.current?.value ||
      !password ||
      !phone
    ) {
      setError('Please fill all the fields')
      setLoading(false)
      return
    }
    const formData = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      password,
      mobile: '+91' + phone,
      role,
    }
    const { success, error, data } = signupValidation(formData)
    if (!success) {
      setError(error!)
      setLoading(false)
      return
    }
    if (data) {
      const response = await registerUserApi(data)
      if (!response?.success) {
        setError(response?.message)
        setLoading(false)
        return
      }
      console.log(response)
      setLoading(false)
    }
  }

  // handle google signin

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
  //use effect for error removing after delay
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }, [error])

  return (
    <div className="px-10 py-8">
      <ErrorNotification error={error} />
      <h1 className="text-primary text-xl font-bold md:hidden">QuickBites</h1>
      <div>
        <h2 className="text-2xl font-black">Create Account</h2>
        <p>Start your delicious journey today.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {/* Full name */}
        <InputElement
          label="Full Name"
          id="fullName"
          icon={<FaRegUser color="#E09C96" />}
          placeholder="John Doe"
          required
          name="fullName"
          ref={fullNameRef}
        />
        {/* Email */}
        <InputElement
          label="Email"
          id="Email"
          icon={<SlEnvolope color="#E09C96" />}
          placeholder="john@example.com"
          type="email"
          name="email"
          required
          ref={emailRef}
        />
        {/* Phone number */}
        <InputElement
          label="Phone Number"
          id="phone"
          icon={<MdOutlineLocalPhone color="#E09C96" />}
          placeholder="812345679"
          value={phone}
          onChange={handlePhoneChange}
          componentType="phone"
          name="mobile"
          required
        />
        {/* Password */}
        <InputElement
          label="Password"
          id="password"
          icon={<CiLock color="#E09C96" />}
          placeholder="●●●●●●●●"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          passwordValue={password}
          required
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

        {/* role */}
        <SelectRole role={role} setRole={setRole} />

        {/* Create account button */}
        <Button disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <>
              Create Account
              <BsArrowRight />
            </>
          )}
        </Button>
      </form>

      <DivideLine />

      {/* Google sign in button */}
      <GoogleButton disabled={loading} onClick={googleAuth} text="up" />

      <p className="mt-4 text-center text-sm text-black/70">
        Already have an account?{' '}
        <Link href={'/login'} className="cursor-pointer hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default CreateAccount
