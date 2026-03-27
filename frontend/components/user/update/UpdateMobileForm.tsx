'use client'
//library
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

//components
import ErrorNotification from '@/components/ErrorNotification'
import InputElement from '@/components/InputElement'
import Button from '@/components/Button'

//apis
import { updateUserMobileApi } from '@/api/user.api'

//custom hooks
import useAuth from '@/hooks/useAuth'

const UpdateMobileForm = () => {
  const router = useRouter()
  //states
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  //checking the authenticated user
  useAuth({ setError })
  const user = useSelector((state: any) => state.user)

  // change event for mobile input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(Number(value))) return
    if (value.length > 10) return
    setMobileNumber(value)
  }
  // handle submit for mobile update
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

    setLoading(false)
    router.push('/user/update/role')
  }

  //use effect for error removing after delay
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }, [error])

  //checking
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
    if (user.mobile !== 'unavailable') {
      router.push('/user/update/role')
    }
  }, [user])

  return (
    <>
      <ErrorNotification error={error} />
      <form onSubmit={handleMobileUpdate} className="mt-6 flex flex-col gap-4">
        <InputElement
          label="Enter Your Phone Number"
          placeholder="9876543210"
          maxLength={10}
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
    </>
  )
}

export default UpdateMobileForm
