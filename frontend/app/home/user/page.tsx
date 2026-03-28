import AuthenticateUser from '@/components/AuthenticateUser'
import UserNavbar from '@/components/home/user/UserNavbar'

const UserHomePage = () => {
  return (
    <AuthenticateUser>
      <section className="container mx-auto min-h-screen w-full ">
        <section className="mx-auto max-w-200  py-2">
          <UserNavbar />
        </section>
      </section>
    </AuthenticateUser>
  )
}

export default UserHomePage
