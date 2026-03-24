'use client'
import { useEffect, useState } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

type InputElementProps = {
  label: string
  eyeIcon?: React.JSX.Element
  icon?: React.JSX.Element
  className?: string
  passwordValue?: string
  componentType?: string
} & React.ComponentProps<'input'>

const InputElement = ({
  label,
  type = 'text',
  id,
  eyeIcon,
  icon,
  className,
  passwordValue,
  componentType = 'register',
  ...rest
}: InputElementProps) => {
  const [active, setActive] = useState(false)
  const [isValid, setIsValid] = useState(true)
  useEffect(() => {
    if (!passwordValue) return
    if (passwordValue.length > 6) setIsValid(false)
    else setIsValid(true)
  }, [passwordValue])

  return (
    <div className={`flex flex-col gap-2`}>
      <label className="ml-1 cursor-pointer text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl bg-[#FFEDEB] px-6 py-4 text-black ${active ? 'border-2 border-black' : 'border-2 border-transparent'} transition-[border] duration-300`}
      >
        {icon}
        <input
          type={type}
          id={id}
          className={`flex-1 border-none outline-none placeholder:text-[#E09C96] ${className}`}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          {...rest}
        />
        {id === 'password' && eyeIcon}
      </div>
      {id === 'password' &&
        active &&
        isValid &&
        componentType === 'register' && (
          <p className="flex items-center gap-2 rounded-lg bg-[#FFEBEB] px-4 py-2 text-xs opacity-80">
            <AiOutlineExclamationCircle />
            password should have at least 6 character
          </p>
        )}
    </div>
  )
}

export default InputElement
