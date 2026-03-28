import Image from 'next/image'
type TPromotionBannerProps = {
  bannerImage?: string
  bannerText?: string
  tagLine?: string
}
const PromotionBanner = ({
  bannerImage,
  bannerText,
  tagLine,
}: TPromotionBannerProps) => {
  return (
    <div className="relative min-h-75 w-full overflow-hidden rounded-xl shadow-md">
      <div className="absolute inset-0 opacity-90 select-none">
        <Image
          src={bannerImage ?? '/banner.png'}
          fill
          className="object-cover"
          alt="promotion-banner"
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col gap-4 p-4 text-white">
        <h1 className="text-6xl font-black text-white uppercase">
          {bannerText ?? (
            <>
              Get your <span className="text-yellow-300 italic">50%</span> OFF
              <br /> on your <br />
              <span className="text-yellow-300 italic">first order</span>
            </>
          )}
        </h1>
        <p className="text-[18px] font-bold">
          {tagLine ?? (
            <>
              Fuel your day with the fastest delivery in the city <br />
              Use code:{' '}
              <span className="text-yellow-300 underline">Bite50</span>
            </>
          )}
        </p>
      </div>
      <div className="bg-primary absolute inset-0 opacity-75"></div>
    </div>
  )
}

export default PromotionBanner
