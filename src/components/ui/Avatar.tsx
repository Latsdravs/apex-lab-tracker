import React from 'react'
import { twMerge } from 'tailwind-merge'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback: string
}

export function Avatar({ fallback, className, ...props }: AvatarProps) {
  return (
    <div
      className={twMerge(
        'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-700 text-white',
        className
      )}
      {...props}
    >
      <span className='font-medium'>{fallback}</span>
    </div>
  )
}
