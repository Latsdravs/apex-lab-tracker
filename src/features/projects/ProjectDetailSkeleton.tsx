import { Skeleton } from '@/components/ui/Skeleton'

export function ProjectDetailSkeleton() {
  return (
    <div>
      <Skeleton className='h-6 w-1/4 mb-4 bg-muted' />
      <div className='bg-card p-6 rounded-lg border border-border shadow-sm text-card-foreground'>
        <div className='mb-4 border-b border-border pb-4'>
          <Skeleton className='h-8 w-3/4 mb-2 bg-muted' />
          <Skeleton className='h-4 w-1/3 bg-muted' />
        </div>
        <div className='space-y-3 mb-6'>
          <Skeleton className='h-4 w-full bg-muted' />
          <Skeleton className='h-4 w-full bg-muted' />
          <Skeleton className='h-4 w-5/6 bg-muted' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Skeleton className='h-12 w-full bg-muted' />
          <Skeleton className='h-12 w-full bg-muted' />
          <Skeleton className='h-12 w-full bg-muted' />
        </div>
      </div>
    </div>
  )
}
