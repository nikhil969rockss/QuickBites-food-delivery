'use client'
import Button from '@/components/Button'
import DivideLine from '@/components/DivideLine'
import Footer from '@/components/Footer'
import GoogleButton from '@/components/GoogleButton'
import InputElement from '@/components/InputElement'
import Link from 'next/link'
import { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { CiLock } from 'react-icons/ci'
import { SlEnvolope } from 'react-icons/sl'

const LoginPage = () => {
  const [inputFields, setinputFields] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputFields({ ...inputFields, [e.target.name]: e.target.value })
  }
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {/* <--------main form----> */}
      <section className="w-full max-w-150 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-black">QuickBite</h2>
        <p>Welcome back to the kinetic kichen</p>

        <form action="" className="mt-6 flex flex-col gap-4">
          <InputElement
            label="Email"
            id="email"
            icon={<SlEnvolope color="#E09C96" />}
            placeholder="john@example.com"
            required
            name="email"
            value={inputFields.email}
            onChange={handleChange}
            className="w-full"
          />

          <InputElement
            label="Password"
            id="password"
            icon={<CiLock color="#E09C96" />}
            placeholder="●●●●●●●●"
            required
            name="email"
            value={inputFields.email}
            onChange={handleChange}
          />
          <Button>
            Sign In <BsArrowRight />{' '}
          </Button>
        </form>
        <DivideLine />
        <GoogleButton text="in" />
        <p className="mt-4 text-center text-sm text-black/70">
          New to QuickBite?{' '}
          <Link href={'/register'} className="cursor-pointer hover:underline">
            Create an account
          </Link>
        </p>
      </section>

      {/* <-------Footer-------> */}
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  )
}

export default LoginPage
