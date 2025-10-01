import { ProjectCardSkeleton } from './ProjectCardSkeleton'

const ProjectsPageSkeleton = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Projeler
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default ProjectsPageSkeleton
