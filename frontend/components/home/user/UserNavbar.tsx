'use client'

//library
import { FaLocationDot } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'

import { useRef } from 'react'

const UserNavbar = () => {
  //states
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInputFocus = () => inputRef?.current?.focus()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(inputRef.current?.value)
  }

  return (
    <div className="flex justify-around rounded-md border-b border-black/20 py-4 shadow">
      {/* Heading */}
      <div>
        <h1 className="text-primary text-2xl font-black italic">QuickBites</h1>
      </div>

      {/* location div */}
      <div className="flex w-full max-w-100 items-center gap-4">
        <div className="flex items-center gap-2 border-r border-black/30 text-[16px]">
          <FaLocationDot className="text-primary cursor-pointer" />
          <h2 className="w-fit max-w-[70%] truncate">lodhi colony</h2>
        </div>
        {/* search bar div */}
        <form
          onSubmit={handleSearch}
          id="active-div"
          className={`flex flex-1 items-center gap-2 rounded-xl border-2 border-black/20 p-2 transition-all duration-200`}
        >
          <FaSearch
            className="text-primary cursor-pointer"
            onClick={handleInputFocus}
          />
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for Resturants"
            className="search-food w-full border-none outline-none"
          />
        </form>
      </div>
      <div className="flex flex-[0.5] items-center gap-6 text-[25px]">
        {/* Cart icon */}
        <div className="relative flex cursor-pointer flex-col">
          <FaCartShopping className="" />
          <p className="text-xs select-none">Cart</p>
          <div className="flex-center-col bg-primary absolute -top-3 -right-4 size-6 rounded-full font-semibold text-white">
            <p className="flex-center-col text-[12px] select-none">0</p>
          </div>
        </div>
        {/* profile icon */}
        <div className="flex cursor-pointer flex-col items-center">
          <CgProfile className="" />
          <p className="text-xs select-none">Profile</p>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar
