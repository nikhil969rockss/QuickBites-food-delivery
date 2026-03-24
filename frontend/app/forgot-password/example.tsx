'use client'
import React, { useState, useRef } from 'react'

const OtpInput = ({ length = 4 }: { length?: number }) => {
  // 1. State: Ek array jisme utne khali strings honge jitni length hai (e.g., ["", "", "", ""])
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))

  // 2. Ref Array: Har input dabbe ka DOM element store karne ke liye
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Function 1: Jab user kuch type kare
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value

    // Sirf numbers allow karo
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    // Agar user tez type kare, toh last digit hi rakho
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Agar value daali hai aur aage dabba bacha hai, toh NEXT dabbe par focus karo
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Function 2: Jab user Backspace dabaye
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Agar input khali hai, aur backspace dabaya, toh PICHLE dabbe me jao
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Function 3: (Bonus Pro Feature) Jab user poora OTP paste kare
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length)

    if (isNaN(Number(pastedData))) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      newOtp[index] = char
    })
    setOtp(newOtp)

    // Paste hone ke baad last bhare hue dabbe par cursor le jao
    const focusIndex = Math.min(pastedData.length, length - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="ml-1 text-sm font-semibold">
        Enter Verification Code
      </label>
      <div className="flex gap-3">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric" // Mobile me number keypad kholne ke liye (jo humne pehle seekha tha!)
            maxLength={1} // Ek baar me ek hi digit
            ref={(el) => {
              inputRefs.current[index] = el
            }} // Har dabbe ka ref save kar rahe hain
            value={data}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="h-14 w-14 rounded-xl border-2 border-transparent bg-[#FFEDEB] text-center text-2xl font-bold text-black transition-all duration-300 outline-none focus:border-[#C84D1C] focus:bg-white"
          />
        ))}
      </div>

      {/* Test karne ke liye ki state sahi kaam kar rahi hai ya nahi */}
      <p className="mt-2 text-sm text-gray-500">
        Entered OTP: <span className="font-bold">{otp.join('')}</span>
      </p>
    </div>
  )
}

export default OtpInput
