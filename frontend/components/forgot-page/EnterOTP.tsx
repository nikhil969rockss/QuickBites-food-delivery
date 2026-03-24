'use client'

import React, { useEffect, useRef } from 'react'

const EnterOTP = ({
  length = 4,
  OTP,
  setOTP,
}: {
  length?: number
  OTP: string[]
  setOTP: (OTP: string[]) => void
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // handling the input to the next box
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value

    // only accepts number
    if (isNaN(Number(value))) return

    const newOtp = [...OTP]
    newOtp[index] = value.substring(value.length - 1)
    setOTP(newOtp)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  //handling backspace
  const handleBackSpace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !OTP[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="otp " className="text-center font-black">
        Enter OTP
      </label>
      <div className="flex-center-row gap-4">
        {OTP.map((data, index) => (
          <input
            className="size-10 rounded-xl border-2 border-transparent bg-white text-center font-bold focus:border-black focus:bg-gray-100 focus:outline-none md:size-14 lg:size-18"
            key={index}
            type="text"
            maxLength={1}
            value={data}
            inputMode="numeric"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackSpace(e, index)}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default EnterOTP
