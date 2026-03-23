import React from 'react'
import IconHolder from './IconHolder'
import BackgroundSvg from './BackgroundSvg'
import FruitBackground from './FruitBackground'
import { MdOutlineSpeed } from 'react-icons/md'

const Intro = () => {
  return (
    <div className="relative col-span-1 hidden min-h-[90vh] flex-col justify-between overflow-hidden bg-[#ff794a] p-8 text-white md:flex">
      <BackgroundSvg />
      <FruitBackground />
      {/* upper section---- */}
      <div>
        <h1 className="font-black md:text-3xl lg:text-5xl">QuickBites</h1>
        <div className="mt-8 flex flex-col gap-4">
          <h3 className="font-bold md:text-2xl lg:text-4xl">
            Satisfy your <br />
            <span className="text-green-300 italic">cravings</span> in <br />
            record time
          </h3>
          <p className="font-semibold">
            Join the kinetic kitchen revolution. <br />
            Fresh meals delivered from local favourites to your doorstep
          </p>
        </div>
      </div>
      {/* lower section---- */}
      <div className="rounded-xl border bg-white/10 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex gap-2 font-semibold">
            <IconHolder
              icon={<MdOutlineSpeed size={20} />}
              className="bg-white text-black"
            />
            <div className="flex flex-col">
              20 Min Average <br />{' '}
              <span className="font-medium">Lightening fast delivery</span>
            </div>
          </div>
        </div>
        <div className="relative mt-4">
          <IconHolder src="/people.png" alt="customer" />
          <IconHolder
            src="/people1.png"
            className="absolute top-0 left-6"
            alt="custormer"
          />
          <IconHolder
            src="/people2.png"
            className="absolute top-0 left-12"
            alt="customer"
          />
          <IconHolder
            className="absolute top-0 left-18 bg-[#FF794A]"
            text="+2k"
          />
        </div>
      </div>
    </div>
  )
}

export default Intro
