// src/features/projects/ProjectColumn.tsx
import { Project } from '@/types'
import { ProjectCard } from './ProjectCard'

interface ProjectColumnProps {
  title: string
  projects: Project[]
}

export function ProjectColumn({ title, projects }: ProjectColumnProps) {
  return (
    <div className='flex-1 p-4 rounded-lg'>
      <h3 className='text-lg font-bold mb-4 px-2 text-foreground'>{title}</h3>
      <div className='space-y-4'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
