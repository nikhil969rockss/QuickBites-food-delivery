import Footer from '@/components/Footer'
import UpdateRoleForm from '@/components/user/update/UpdateRoleForm'

const UpdateRolePage = () => {
  return (
    <>
      <main className="flex-center-row min-h-[90vh] w-full">
        <section className="w-full max-w-md rounded-xl border border-black/20 p-6 shadow-lg md:max-w-lg lg:max-w-xl">
          <div className="flex flex-col gap-4">
            {/* Heading */}
            <h1 className="text-primary font-black italic lg:text-2xl">
              QuickBites
            </h1>
          </div>
          <UpdateRoleForm />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default UpdateRolePage
