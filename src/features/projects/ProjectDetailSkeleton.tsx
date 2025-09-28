import { Skeleton } from '@/components/ui/Skeleton'

export function ProjectDetailSkeleton() {
  return (
    <div>
      <Skeleton className='h-6 w-1/4 mb-4' />
      <div className='bg-white p-6 rounded-lg border shadow-sm'>
        <div className='mb-4 border-b pb-4'>
          <Skeleton className='h-8 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/3' />
        </div>
        <div className='space-y-3 mb-6'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </div>
      </div>
    </div>
  )
}
