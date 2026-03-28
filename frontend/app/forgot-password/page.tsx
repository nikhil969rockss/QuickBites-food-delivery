//components
import Footer from '@/components/Footer'
import ForgotPasswordForm from '@/components/forgot-password-page/ForgotPasswordForm'
import BackButton from '@/components/forgot-password-page/BackButton'

const ForgotPasswordPage = () => {
  return (
    <>
      <main className="flex-center-row min-h-[90vh] w-full">
        <section className="w-full max-w-md rounded-xl border border-black/20 p-6 shadow-lg md:max-w-lg lg:max-w-xl">
          <div className="flex flex-col gap-4">
            {/* Heading */}
            <h1 className="text-primary font-black lg:text-2xl italic">QuickBites</h1>

            {/* back button with heading */}
            <div className="flex items-center gap-4">
              <BackButton />
              <h2 className="text-lg font-semibold">Forgot Password</h2>
            </div>

            <ForgotPasswordForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ForgotPasswordPage
