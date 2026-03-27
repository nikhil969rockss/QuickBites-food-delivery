'use client'
import { IoChevronBackSharp } from 'react-icons/io5'

const BackButton = () => {
  return (
    <button onClick={() => history.back()} className="cursor-pointer">
      <IoChevronBackSharp size={20} />
    </button>
  )
}

export default BackButton
