type ButtonProps = {
  children: React.ReactNode
} & React.ComponentProps<'button'>

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-linear-to-r from-[#B13B09] via-[#C74C1B] to-[#EE6B3B] p-3 font-black text-white transition-[scale] duration-300 active:scale-95"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
