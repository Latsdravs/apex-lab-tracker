import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-300 dark:text-slate-900 dark:hover:bg-slate-500',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-700',

        outline:
          'border border-slate-300 hover:bg-slate-100 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-800',
        secondary:
          'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
      },

      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const finalClassName = twMerge(
      clsx(buttonVariants({ variant, size, className }))
    )
    return <button className={finalClassName} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
