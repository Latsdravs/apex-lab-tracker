import { twMerge } from 'tailwind-merge'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
