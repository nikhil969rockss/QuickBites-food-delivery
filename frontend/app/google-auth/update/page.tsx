'use client'

import Button from '@/components/Button'
import ErrorNotification from '@/components/ErrorNotification'
import Footer from '@/components/Footer'
import InputElement from '@/components/InputElement'
import { roleTypesButton } from '@/utils/constants'
import { useState } from 'react'

const PhoneAndRolePage = () => {
  const [step, setStep] = useState<number>(1)
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [roleType, setRoleType] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(Number(value))) return
    if (value.length > 10) return
    setMobileNumber(value)
  }

  const handleSubmitFirst = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //api call
    setStep(2)
  }

  const handleSubmitFinal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: Api call
  }
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
              onSubmit={handleSubmitFirst}
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
              <Button className="btn-primary disabled:bg-gray-400!">
                Continue
              </Button>
            </form>
          )}
          {step === 2 && (
            <form
              onSubmit={handleSubmitFinal}
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

              <Button className="btn-primary mt-4 disabled:bg-gray-400!">
                Continue
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
