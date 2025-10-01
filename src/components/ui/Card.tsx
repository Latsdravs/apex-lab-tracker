import React from 'react'
import { twMerge } from 'tailwind-merge'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-colors duration-200 hover:shadow-md',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div ref={ref} className='flex flex-col space-y-1.5 p-6' {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} className='p-6 pt-0' {...props} />)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardContent }
