import { FcGoogle } from 'react-icons/fc'

type GoogleButtonProps = {
  className?: string
  text: string
} & React.ComponentProps<'button'>

const GoogleButton = ({ className, text, ...rest }: GoogleButtonProps) => {
  return (
    <button
      className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 font-semibold transition-all duration-300 hover:bg-gray-200 active:scale-95 ${className}`}
      {...rest}
    >
      <FcGoogle />
      Sign {text} with Google
    </button>
  )
}

export default GoogleButton
