'use client'
//library
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { IoIosEyeOff } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'

//components
import ErrorNotification from '../ErrorNotification'
import NumberBoxes from '../NumberBoxes'
import InputElement from '../InputElement'

//validation
import { verifyNewPassword } from '@/app/forgot-password/validataion'

//apis
import { resetPasswordApi, sendOTPApi, verifyOTPApi } from '@/api/auth.api'

const ForgotPasswordForm = () => {
  //states
  const [step, setStep] = useState<number>(1)
  const [OTP, setOTP] = useState<string[]>(new Array(6).fill(''))
  const [newPassword, setNewPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState<string>('')

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
      <ErrorNotification error={error} />
      {/* Step - 1 email address for sending OTP */}
      {step === 1 && (
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
      )}
      {/* step-2 Verify recieved OTP */}
      {step === 2 && (
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
      )}
      {step === 3 && (
        <form onSubmit={handleNewPassword} className="flex flex-col gap-4">
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
      )}
    </>
  )
}

export default ForgotPasswordForm
