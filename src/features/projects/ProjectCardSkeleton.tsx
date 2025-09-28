import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-6 w-20 rounded-full' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <div className='pt-2'>
            <Skeleton className='h-5 w-1/2' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
