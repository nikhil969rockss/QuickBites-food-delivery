import { FaGoogle } from 'react-icons/fa'

type GoogleButtonProps = {
  className?: string
} & React.ComponentProps<'button'>

const GoogleButton = ({ className, ...rest }: GoogleButtonProps) => {
  return (
    <button
      className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border bg-[#4C8DF5] p-3 font-semibold text-white transition-[scale] duration-300 active:scale-95 ${className}`}
      {...rest}
    >
      <FaGoogle />
      Google
    </button>
  )
}

export default GoogleButton
