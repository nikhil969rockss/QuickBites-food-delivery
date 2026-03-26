'use client'
import Footer from '@/components/Footer'
import NumberBoxes from '@/components/NumberBoxes'
import InputElement from '@/components/InputElement'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoIosEyeOff } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'
import { verifyNewPassword } from './validataion'
import ErrorNotification from '@/components/ErrorNotification'
import { sendOTPApi, verifyOTPApi, resetPasswordApi } from '@/api/auth.api'
import { useRouter } from 'next/navigation'

const ForgotPasswordPage = () => {
  //states
  const [step, setStep] = useState<number>(1)
  const [OTP, setOTP] = useState<string[]>(new Array(6).fill(''))
  const [email, setEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const router = useRouter()

  // handling sending OTP to the mail account
  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const response = await sendOTPApi(email)
    if (!response.success) {
      setError(response.message)
      return setLoading(false)
    }
    setStep(2)
    setLoading(false)
  }
  // handling verifying OTP
  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await verifyOTPApi(email, OTP.join(''))
    if (!response.success) {
      setError(response.message)
      return setLoading(false)
    }
    setStep(3)
    setLoading(false)
  }
  //handling new password form
  const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { sucess, message } = verifyNewPassword({
      password: newPassword,
      confirmPassword,
    })
    if (!sucess) {
      setLoading(false)
      return setError(message)
    }
    const response = await resetPasswordApi(email, newPassword)
    if (!response.success) {
      setError(response.message)
      return setLoading(false)
    }
    router.push('/login')
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
    <>
      <main className="flex-center-row min-h-[90vh] w-full">
        <section className="boder-black/20 w-full max-w-md rounded-xl border p-6 shadow-lg md:max-w-lg lg:max-w-xl">
          <ErrorNotification error={error} />
          {/* Step - 1 email address for sending OTP */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              {/* Heading */}
              <h1 className="text-primary font-black lg:text-2xl">
                QuickBites
              </h1>

              {/* back button with heading */}
              <div className="flex items-center gap-4">
                <Link href={'/login'} className="cursor-pointer">
                  <IoChevronBackSharp size={20} />
                </Link>{' '}
                <h2 className="text-lg font-semibold">Forgot Password</h2>
              </div>

              {/* email input */}
              <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                <InputElement
                  label="Enter Email Address"
                  placeholder="johndoe@example.com"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn-primary w-full">
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            </div>
          )}
          {/* step-2 Verify recieved OTP */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              {/* Heading */}
              <h1 className="text-primary font-black lg:text-2xl">
                QuickBites
              </h1>

              {/* back button with heading */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => history.back()}
                  className="cursor-pointer"
                >
                  <IoChevronBackSharp size={20} />
                </button>{' '}
                <h2 className="text-lg font-semibold">Forgot Password</h2>
              </div>

              {/* otp verify */}
              <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
                <NumberBoxes
                  label="Enter OTP"
                  state={OTP}
                  setState={setOTP}
                  length={6}
                />
                <button
                  disabled={OTP[0] === ''}
                  className="btn-primary btn-disabled w-full disabled:bg-gray-400!"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    'Verfiy OTP'
                  )}
                </button>
              </form>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              {/* Heading */}
              <h1 className="text-primary font-black lg:text-2xl">
                QuickBites
              </h1>

              {/* back button with heading */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => history.back()}
                  className="cursor-pointer"
                >
                  <IoChevronBackSharp size={20} />
                </button>{' '}
              </div>

              {/* new password and confirm password form */}
              <form
                onSubmit={handleNewPassword}
                className="flex flex-col gap-4"
              >
                {/* new password input */}

                <InputElement
                  label="New Password"
                  placeholder="new password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  passwordValue={newPassword}
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
                {/* confirm passord input */}
                <InputElement
                  label="Confirm Password"
                  placeholder="confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <button
                  disabled={!newPassword || !confirmPassword || loading}
                  className="btn-primary btn-disabled w-full disabled:bg-gray-400!"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ForgotPasswordPage
