export const verifyNewPassword = ({
  password,
  confirmPassword,
}: {
  password: string
  confirmPassword: string
}) => {
  if (password !== confirmPassword) {
    return { sucess: false, message: 'Password does not match' }
  }
  return { sucess: true, message: 'Password match' }
}
