import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <Skeleton className='h-6 w-3/4 bg-muted' />

          <Skeleton className='h-5 w-16 rounded-md bg-muted' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2 mb-4'>
          <Skeleton className='h-4 w-full bg-muted' />
          <Skeleton className='h-4 w-11/12 bg-muted' />
        </div>

        <Skeleton className='h-4 w-1/2 bg-muted' />
      </CardContent>
    </Card>
  )
}
