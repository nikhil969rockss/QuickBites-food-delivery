'use client'

//library
import { FaLocationDot } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'

import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const UserNavbar = () => {
  //states
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)

  const { user } = useSelector((state: any) => state.user)

  const handleInputFocus = () => inputRef?.current?.focus()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex justify-between rounded-md border-b border-black/20 px-4 py-4 shadow md:justify-around md:px-0">
      {/* Heading */}

      <div>
        <h1 className="text-primary text-lg font-black italic md:text-2xl">
          QuickBites
        </h1>
      </div>

      {/* location div */}

      <div className="hidden w-full max-w-100 items-center gap-4 md:flex">
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
      <div className="flex items-center gap-6 text-[18px] md:flex-[0.5] md:text-[25px]">
        {/* mobile view search */}
        <FaSearch
          className="text-primary cursor-pointer md:hidden"
          onClick={() => {
            setShowSearch((prev) => !prev)
            if (open) setOpen(false)
          }}
        />
        {showSearch && (
          <>
            <div
              onClick={() => {
                setShowSearch(false)
              }}
              className="fixed inset-0 z-100 bg-black/50 md:hidden"
            ></div>
            <div className="bg-background fixed top-8 left-1/2 z-200 mx-auto mt-20 flex w-full max-w-100 -translate-1/2 items-center gap-4 rounded-xl p-2 text-[14px]">
              <div className="flex items-center gap-2 border-r border-black/30">
                <FaLocationDot className="text-primary cursor-pointer" />
                <h2 className="w-fit max-w-[70%] truncate">lodhi colony</h2>
              </div>

              {/* search bar div */}

              <form
                onSubmit={handleSearch}
                className={`flex flex-1 items-center gap-2 rounded-xl p-2 transition-all duration-200`}
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
          </>
        )}
        {/* Cart icon */}

        <div className="relative flex cursor-pointer flex-col">
          <FaCartShopping className="" />
          <p className="text-xs select-none">Cart</p>

          {/* cart item count */}

          <div className="flex-center-col bg-primary absolute -top-2 -right-2 size-4 rounded-full font-semibold text-white md:-top-3 md:-right-4 md:size-6">
            <p className="flex-center-col text-[12px] select-none">0</p>
          </div>
        </div>

        {/* profile icon */}

        <div className="relative flex cursor-pointer flex-col items-center">
          {/* profile options overlay */}

          <div
            className={`bg-background absolute top-12 -right-3 z-100 flex min-w-30 flex-col justify-start overflow-hidden rounded-lg border border-black/10 shadow-md ${open ? 'block' : 'hidden'}`}
          >
            <p className="hover:bg-primary/20 flex cursor-pointer items-center gap-1 p-3 text-xs font-bold capitalize select-none">
              <CgProfile className="text-lg" />
              {user?.fullName}
            </p>
            <p className="hover:bg-primary/20 flex cursor-pointer items-center gap-1 p-3 text-xs font-bold capitalize">
              <FaCartShopping className="text-lg" />
              My Orders
            </p>
            <p className="hover:bg-primary/20 flex cursor-pointer items-center gap-1 p-3 text-xs font-bold capitalize select-none">
              <IoIosLogOut className="text-lg" />
              Logout
            </p>
          </div>

          {/* profile icon */}

          <CgProfile className="" onClick={() => setOpen(!open)} />
          <p className="text-xs font-bold capitalize select-none">
            {user?.fullName?.split(' ')[0]}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar
