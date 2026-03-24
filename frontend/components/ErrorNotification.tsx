'use client'
import { useEffect, useState } from 'react'

const ErrorNotification = ({
  error,
  delay,
}: {
  error: string
  delay: number
}) => {
  const [showError, setShowError] = useState(error)
  //use effect for error removing
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setShowError('')
      }, delay)
    }
  }, [error])
  return (
    <p
      className={`fixed top-0 ${showError ? 'right-2' : '-right-100'} rounded-xl border bg-red-800 p-3 text-white transition-all duration-300`}
    >
      {error}
    </p>
  )
}

export default ErrorNotification
