'use client'
//library
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaArrowCircleRight } from 'react-icons/fa'

//components
import Button from '@/components/Button'
import ErrorNotification from '@/components/ErrorNotification'

//apis
import { updateUserRoleApi } from '@/api/user.api'

//constants
import { roleTypesButton } from '@/utils/constants'

const UpdateRoleForm = () => {
  //states
  const [roleType, setRoleType] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // handle submit for updating role
  const handleRoleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!roleType) {
      setLoading(false)
      return setError('Please select a role type')
    }
    const data = { role: roleType }
    const response = await updateUserRoleApi(data)
    console.log(response)
    if (!response?.success) {
      setLoading(false)
      return setError(response?.message)
    }
    setLoading(false)
    router.push('/')
  }

  return (
    <>
      <ErrorNotification error={error} />

      <form onSubmit={handleRoleUpdate} className="mt-6 flex flex-col gap-4">
        <label className="font-xl font-bold" htmlFor="role">
          Please select your role
        </label>
        {roleTypesButton.map((role) => (
          <button
            type="button"
            onClick={() => setRoleType(role.value)}
            key={role.id}
            value={role.value}
            className={`cursor-pointer rounded-xl border border-black/20 p-5 font-bold transition-all duration-200 ${roleType === role.value && 'bg-primary text-white'}`}
          >
            {role.button}
          </button>
        ))}

        <Button
          disabled={loading}
          className="btn-primary disabled:bg-gray-400!"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <>
              Continue <FaArrowCircleRight />
            </>
          )}
        </Button>
      </form>
    </>
  )
}

export default UpdateRoleForm
