'use client'

//library
import { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { SlEnvolope } from 'react-icons/sl'
import { MdOutlineLocalPhone } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { BsArrowRight } from 'react-icons/bs'
import Link from 'next/link'

//components
import DivideLine from '../DivideLine'
import Button from '../Button'
import InputElement from '../InputElement'
import GoogleButton from '../GoogleButton'

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
        {/* Full name */}
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
        {/* Email */}
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
        {/* Phone number */}
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
        {/* Password */}
        <InputElement
          label="Password"
          id="phone"
          icon={<CiLock color="#E09C96" />}
          placeholder="●●●●●●●●"
          type="password"
          name="password"
          value={inputField.password}
          onChange={handleChange}
          passwordValue={inputField.password}
          required
        />
        {/* Create account button */}
        <Button>
          Create Account <BsArrowRight />{' '}
        </Button>
      </form>

      <DivideLine />

      {/* Google sign in button */}
      <GoogleButton />

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
