import Image from 'next/image'

const FruitBackground = () => {
  return (
    <div className="absolute -right-10 -bottom-10 overflow-hidden rounded-full opacity-50 md:size-60 lg:-right-30 lg:size-100">
      <Image
        src="/veges.png"
        alt="vegetable-image"
        loading="eager"
        width={512}
        height={512}
      />
    </div>
  )
}

export default FruitBackground
