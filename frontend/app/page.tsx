import Footer from '@/components/Footer'
import CreateAccount from '@/components/register-page/CreateAccount'
import Intro from '@/components/register-page/Intro'

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center">
      <section className="container mx-auto mt-10 grid grid-cols-2 overflow-hidden rounded-xl shadow-md">
        {/* ------left-section------ */}
        <Intro />
        {/* -------right-section----- */}
        <div className="col-span-2 md:col-span-1">
          <CreateAccount />
        </div>
      </section>
      <Footer />
    </main>
  )
}
