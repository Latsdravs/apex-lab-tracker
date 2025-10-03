import { Project } from '@/types'
import { ProjectCard } from './ProjectCard'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface ProjectColumnProps {
  id: string
  title: string
  projects: Project[]
}

export function ProjectColumn({ id, title, projects }: ProjectColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const projectIds = projects.map((p) => p.id)

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 bg-secondary rounded-lg transition-colors duration-200 ${isOver ? 'bg-accent' : ''}`}
    >
      <h3 className='text-lg font-bold mb-4 px-2 text-foreground'>{title}</h3>
      <SortableContext
        items={projectIds}
        strategy={verticalListSortingStrategy}
      >
        <div className='space-y-4'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isDraggable={true}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
