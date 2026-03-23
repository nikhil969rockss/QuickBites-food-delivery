'use client'
import { useState } from 'react'

const SelectRole = ({
  role,
  setRole,
}: {
  role: string
  setRole: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="role"
        className="ml-1 cursor-pointer text-sm font-semibold"
      >
        Role
      </label>
      <div className="flex gap-4">
        {['User', 'Owner', 'Delivery Boy'].map((r) => {
          let value: string
          if (r === 'User') value = 'user'
          if (r === 'Owner') value = 'owner'
          if (r === 'Delivery Boy') value = 'deliveryBoy'
          return (
            <button
              onClick={() => setRole(value)}
              type="button"
              key={r}
              className={`flex-1 cursor-pointer rounded-xl border p-3 ${r.trim().toLowerCase().replace(' ', '') === role.toLowerCase() && `bg-linear-to-r from-[#B13B09] via-[#C74C1B] to-[#EE6B3B] p-3 font-black text-white`} transition-all duration-300`}
            >
              {r}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SelectRole
