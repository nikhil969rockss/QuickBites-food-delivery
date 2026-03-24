const ErrorNotification = ({ error }: { error: string }) => {
  return (
    <p
      className={`fixed top-0 ${error ? 'right-2' : '-right-100'} rounded-xl border bg-red-800 p-3 text-white transition-all duration-300`}
    >
      {error}
    </p>
  )
}

export default ErrorNotification
