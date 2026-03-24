type ButtonProps = {
  children: React.ReactNode
} & React.ComponentProps<'button'>

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className="btn-primary" {...rest}>
      {children}
    </button>
  )
}

export default Button
