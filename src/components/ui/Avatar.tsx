import React from 'react'
import { twMerge } from 'tailwind-merge'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback: string
}

export function Avatar({ fallback, className, ...props }: AvatarProps) {
  return (
    <div
      className={twMerge(
        'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground',
        className
      )}
      {...props}
    >
      <span className='font-medium'>{fallback}</span>
    </div>
  )
}
