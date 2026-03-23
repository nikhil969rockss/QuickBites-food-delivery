'use client'

import React, { useState } from 'react'
import InputElement from './InputElement'
import { FaRegUser } from 'react-icons/fa'
import { SlEnvolope } from 'react-icons/sl'
import { MdOutlineLocalPhone } from 'react-icons/md'
import { FaGoogle } from 'react-icons/fa'

const CreateAccount = () => {
  const [inputField, setInputField] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }
  const [phone, setPhone] = useState('')
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
    if (onlyNumbers.length <= 10) setPhone(onlyNumbers)
  }
  return (
    <div className="px-10 py-8">
      <h1 className="text-xl font-bold text-[#C84D1C] md:hidden">QuickBites</h1>
      <div>
        <h2 className="text-2xl font-black">Create Account</h2>
        <p>Start your delicious journey today.</p>
      </div>
      <form action="" className="mt-8 flex flex-col gap-4">
        <InputElement
          label="Full Name"
          id="fullName"
          icon={<FaRegUser color="#E09C96" />}
          placeholder="John Doe"
          required
          name="fullName"
          value={inputField.fullName}
          onChange={handleChange}
        />
        <InputElement
          label="Email"
          id="Email"
          icon={<SlEnvolope color="#E09C96" />}
          placeholder="john@example.com"
          type="email"
          name="email"
          required
          value={inputField.email}
          onChange={handleChange}
        />
        <InputElement
          label="Phone Number"
          id="phone"
          icon={<MdOutlineLocalPhone color="#E09C96" />}
          placeholder="+91 812345679"
          type="tel"
          value={phone}
          onChange={handlePhone}
          required
        />
        <InputElement
          label="Password"
          id="phone"
          icon={<MdOutlineLocalPhone color="#E09C96" />}
          placeholder="●●●●●●●●"
          type="password"
          name="password"
          value={inputField.password}
          onChange={handleChange}
          passwordValue={inputField.password}
          required
        />
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-linear-to-r from-[#B13B09] via-[#C74C1B] to-[#EE6B3B] p-3 font-black text-white transition-[scale] duration-300 active:scale-95">
          Create Account
        </button>
      </form>
      <div className="mt-4 flex items-center">
        <div className="w-full border-t border-black/20"></div>
        <p className="w-full text-center text-sm text-black/50">
          Or continue with
        </p>
        <div className="w-full border-t border-black/20"></div>
      </div>

      <button className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border bg-[#4C8DF5] p-3 font-semibold text-white transition-[scale] duration-300 active:scale-95">
        <FaGoogle />
        Google
      </button>
    </div>
  )
}

export default CreateAccount
