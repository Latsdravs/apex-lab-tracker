import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Eye } from 'lucide-react'
import { Project } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface ProjectCardProps {
  project: Project
  isDraggable?: boolean
}

const getStatusVariant = (status: Project['status']) => {
  if (status === 'Active') return 'success'
  if (status === 'On Hold') return 'warning'
  return 'default'
}

export function ProjectCard({
  project,
  isDraggable = false,
}: ProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
    disabled: !isDraggable,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  const cardContent = (
    <Card
      className={`transition-shadow duration-200 ${isDraggable ? 'cursor-grab' : 'cursor-default'}`}
    >
      <CardHeader>
        <div className='flex justify-between items-start gap-2'>
          <h2 className='text-xl font-semibold tracking-tight text-foreground'>
            {project.name}
          </h2>
          <div className='flex-shrink-0'>
            <Badge variant={getStatusVariant(project.status)}>
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground mb-4'>
          {project.description}
        </p>

        <div className='flex justify-between items-center'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <Eye className='h-4 w-4 mr-2' />
            <span>Proje Lideri: {project.lead}</span>
          </div>

          <Link href={`/projects/${project.id}`} passHref>
            <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
              <Eye className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  if (isDraggable) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={isDragging ? 'transform rotate-3' : ''}
      >
        {cardContent}
      </div>
    )
  }
  return cardContent
}
