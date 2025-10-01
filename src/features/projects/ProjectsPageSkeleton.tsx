import { ProjectCardSkeleton } from './ProjectCardSkeleton'
import { Skeleton } from '@/components/ui/Skeleton'

const ProjectsPageSkeleton = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <Skeleton className='h-9 w-48' />
        <Skeleton className='h-10 w-36' />
      </div>
      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        <Skeleton className='h-10 max-w-sm w-full' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-20' />
          <Skeleton className='h-10 w-20' />
          <Skeleton className='h-10 w-24' />
        </div>
      </div>

      <div className='flex gap-6'>
        <div className='flex-1 space-y-4'>
          <Skeleton className='h-6 w-1/3 mb-2' />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
        <div className='flex-1 space-y-4'>
          <Skeleton className='h-6 w-1/3 mb-2' />
          <ProjectCardSkeleton />
        </div>
        <div className='flex-1 space-y-4'>
          <Skeleton className='h-6 w-1/3 mb-2' />
          <ProjectCardSkeleton />
        </div>
      </div>
    </div>
  )
}

export default ProjectsPageSkeleton
