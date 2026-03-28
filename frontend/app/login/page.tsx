'use client'

//library
import Link from 'next/link'

//components
import LoginForm from '@/components/login-page/LoginForm'
import Footer from '@/components/Footer'

const LoginPage = () => {
  return (
    <>
      <main className="relative flex min-h-[90vh] flex-col items-center justify-center">
        {/* <--------main form----> */}
        <section className="w-full max-w-150 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-black italic">QuickBite</h2>
          <p>Welcome back to the kinetic kichen</p>

          <LoginForm />

          <p className="mt-4 text-center text-sm text-black/70">
            New to QuickBite?{' '}
            <Link href={'/register'} className="cursor-pointer hover:underline">
              Create an account
            </Link>
          </p>
        </section>

        {/* <-------Footer-------> */}
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </>
  )
}

export default LoginPage
