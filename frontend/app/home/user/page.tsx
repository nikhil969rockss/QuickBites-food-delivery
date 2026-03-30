//components
import AuthenticateUser from '@/components/AuthenticateUser'
import PromotionBanner from '@/components/home/user/PromotionBanner'
import UserNavbar from '@/components/home/user/UserNavbar'

const UserHomePage = () => {
  return (
    <AuthenticateUser>
      <section className="container mx-auto min-h-screen w-full">
        <section className="mx-auto px-2 flex max-w-200 flex-col gap-4 py-2">
          <UserNavbar />
          <PromotionBanner />
        </section>
      </section>
    </AuthenticateUser>
  )
}

export default UserHomePage
