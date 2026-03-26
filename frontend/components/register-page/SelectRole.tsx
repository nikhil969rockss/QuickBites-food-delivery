'use client'
import { roleTypesButton } from '@/utils/constants'
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
        {roleTypesButton.map((r) => {
          return (
            <input
              onClick={() => setRole(r.value)}
              name={r.value}
              value={r.button}
              readOnly
              key={r.id}
              className={`min-w-12.5 flex-1 cursor-pointer rounded-xl border p-3 text-center outline-none ${r.value === role && `bg-linear-to-r from-[#B13B09] via-[#C74C1B] to-[#EE6B3B] p-3 font-black text-white`} transition-all duration-300`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SelectRole
