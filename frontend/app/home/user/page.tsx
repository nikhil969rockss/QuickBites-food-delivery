//components
import AuthenticateUser from '@/components/AuthenticateUser'
import PromotionBanner from '@/components/home/user/PromotionBanner'
import UserNavbar from '@/components/home/user/UserNavbar'

const UserHomePage = () => {
  return (
    <AuthenticateUser>
      <section className="container mx-auto min-h-screen w-full">
        <section className="mx-auto flex max-w-200 flex-col gap-4 px-2 py-2">
          <UserNavbar />
          <PromotionBanner />
        </section>
      </section>
    </AuthenticateUser>
  )
}

export default UserHomePage
