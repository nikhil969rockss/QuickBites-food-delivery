'use client'

import React, { useEffect, useRef } from 'react'

const NumberBoxes = ({
  length = 4,
  state,
  setState,
  className,
  label,
}: {
  length?: number
  state: string[]
  setState: (OTP: string[]) => void
  label: string
  className?: string
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

    const newOtp = [...state]
    newOtp[index] = value.substring(value.length - 1)
    setState(newOtp)

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
    if (e.key === 'Backspace' && !state[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="otp " className="text-center font-black">
        {label}
      </label>
      <div className="flex-center-row gap-4">
        {state.map((data, index) => (
          <input
            className={`size-10 rounded-xl border-2 border-transparent bg-white text-center font-bold focus:border-black focus:bg-gray-100 focus:outline-none md:size-14 lg:size-18 ${className}`}
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

export default NumberBoxes
