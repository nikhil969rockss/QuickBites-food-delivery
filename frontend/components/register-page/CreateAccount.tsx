import Link from 'next/link'
import RegisterForm from './RegisterForm'

const CreateAccount = () => {
  return (
    <div className="px-10 py-8">
      <h1 className="text-primary text-xl font-bold md:hidden">QuickBites</h1>
      <div>
        <h2 className="text-2xl font-black">Create Account</h2>
        <p>Start your delicious journey today.</p>
      </div>

      <RegisterForm />

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
