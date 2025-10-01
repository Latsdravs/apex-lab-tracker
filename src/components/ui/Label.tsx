import React from 'react'
import { twMerge } from 'tailwind-merge'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={twMerge(
      'text-sm font-medium text-foreground transition-colors duration-200',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
