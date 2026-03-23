import Image from 'next/image'
import React, { JSX } from 'react'

const IconHolder = ({
  src,
  alt,
  className,
  text,
  icon,
}: {
  src?: string
  alt?: string
  className?: string
  text?: string
  icon?: React.JSX.Element
}) => {
  return (
    <div
      className={`size-10 overflow-hidden rounded-full border border-black ${className} flex items-center justify-center`}
    >
      {icon && icon}
      {src && <Image src={src!} alt={alt!} width={512} height={512} />}
      {text && <p>{text}</p>}
    </div>
  )
}

export default IconHolder
