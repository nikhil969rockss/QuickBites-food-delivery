import React from 'react'

const Footer = () => {
  return (
    <div className="] mt-10 flex w-full flex-col justify-between gap-4 border-t-2 border-black/10 bg-[#FFEDEB] p-4 py-6 text-xs md:gap-0 lg:flex-row">
      <div>
        <h3 className="font-black text-[#C84D1C]">QuickBites</h3>
      </div>
      <div className="flex flex-col gap-2 self-start lg:flex-row lg:items-center lg:gap-4">
        <p className="cursor-pointer hover:underline">About Us</p>
        <p className="cursor-pointer hover:underline">Partner with Us</p>
        <p className="cursor-pointer hover:underline">Terms of Services</p>
        <p className="cursor-pointer hover:underline">Privacy Policy</p>
        <p className="cursor-pointer hover:underline">Contact</p>
      </div>
      <div>
        <p className="w-[40%] lg:w-fit">
          © 2023 QuickBites Technologies kinetic kitchen delviery. All Rights
          Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
