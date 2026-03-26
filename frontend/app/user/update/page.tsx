'use client'

import { getMeApi, updateUserMobileApi, updateUserRoleApi } from '@/api/user.api'
import Button from '@/components/Button'
import ErrorNotification from '@/components/ErrorNotification'
import Footer from '@/components/Footer'
import InputElement from '@/components/InputElement'
import { roleTypesButton } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaArrowCircleRight } from 'react-icons/fa'

const PhoneAndRolePage = () => {
  const [step, setStep] = useState<number>(1)
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [roleType, setRoleType] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(Number(value))) return
    if (value.length > 10) return
    setMobileNumber(value)
  }

  const handleMobileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (mobileNumber.length < 10 || !mobileNumber) {
      setLoading(false)
      return setError('Please enter a valid mobile number')
    }
    const response = await updateUserMobileApi({ mobile: mobileNumber })
    console.log(response)
    if (!response?.success) {
      setLoading(false)
      return setError(response?.message)
    }

    setStep(2)
    setLoading(false)
  }

  const handleRoleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!roleType) {
      setLoading(false)
      return setError('Please select a role type')
    }
    const data = { role: roleType }
    const response = await updateUserRoleApi(data)
    console.log(response)
    if (!response?.success) {
      setLoading(false)
      return setError(response?.message)
    }
    setLoading(false)
    router.push('/')
  }

  // checking if user has already regestered with mobile number if yes then showing up the select role type component
  useEffect(() => {
    async function checkUser() {
      const response = await getMeApi()

      if (!response?.success) {
        setError(response?.message || 'Something went wrong')
        router.push('/login')
      }
      if (response?.data?.mobile && response?.data?.mobile !== 'unavailable') {
        setStep(2)
      }
    }
    checkUser()
  }, [])

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
        <section className="w-full max-w-md rounded-xl border border-black/20 p-6 shadow-lg md:max-w-lg lg:max-w-xl">
          <ErrorNotification error={error} />
          <div className="flex flex-col gap-4">
            {/* Heading */}
            <h1 className="text-primary font-black lg:text-2xl">QuickBites</h1>
          </div>
          {step === 1 && (
            <form
              onSubmit={handleMobileUpdate}
              className="mt-6 flex flex-col gap-4"
            >
              <InputElement
                label="Enter Your Phone Number"
                placeholder="9876543210"
                max={10}
                value={mobileNumber}
                onChange={handleChange}
                componentType="phone"
                required
                inputMode="numeric"
                title="Enter phone number"
              />
              <Button
                disabled={loading}
                className="btn-primary disabled:bg-gray-400!"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <>
                    Continue <FaArrowCircleRight />
                  </>
                )}
              </Button>
            </form>
          )}
          {step === 2 && (
            <form
              onSubmit={handleRoleUpdate}
              className="mt-6 flex flex-col gap-4"
            >
              <label className="font-xl font-bold" htmlFor="role">
                Please select your role
              </label>
              {roleTypesButton.map((role) => (
                <button
                  type="button"
                  onClick={() => setRoleType(role.value)}
                  key={role.id}
                  value={role.value}
                  className={`cursor-pointer rounded-xl border border-black/20 p-5 font-bold transition-all duration-200 ${roleType === role.value && 'bg-primary text-white'}`}
                >
                  {role.button}
                </button>
              ))}

              <Button
                disabled={loading}
                className="btn-primary disabled:bg-gray-400!"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <>
                    Continue <FaArrowCircleRight />
                  </>
                )}
              </Button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PhoneAndRolePage
