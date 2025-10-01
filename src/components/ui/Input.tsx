import React from 'react'
import { twMerge } from 'tailwind-merge'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={twMerge(
        'flex h-10 w-full rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground',
        className
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
