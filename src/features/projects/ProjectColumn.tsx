import { Project } from '@/types'
import { ProjectCard } from './ProjectCard'
import { useDroppable } from '@dnd-kit/core'

interface ProjectColumnProps {
  id: string
  title: string
  projects: Project[]
}

export function ProjectColumn({ id, title, projects }: ProjectColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 bg-secondary rounded-lg ${isOver ? 'opacity-80' : ''}`}
    >
      <h3 className='text-lg font-bold mb-4 px-2 text-foreground'>{title}</h3>
      <div className='space-y-4'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isDraggable={true} />
        ))}
      </div>
    </div>
  )
}
