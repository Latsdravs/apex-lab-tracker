// src/features/projects/ProjectCard.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Users } from 'lucide-react'
import { Project } from '@/types'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

// Proje durumuna göre Badge rengini belirleyen yardımcı fonksiyon
const getStatusVariant = (status: Project['status']) => {
  if (status === 'Active') return 'success'
  if (status === 'On Hold') return 'warning'
  return 'default'
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className='block'>
      <Card className='hover:shadow-lg transition-shadow duration-200'>
        <CardHeader>
          <div className='flex justify-between items-start'>
            <h2 className='text-xl font-semibold tracking-tight text-foreground'>
              {project.name}
            </h2>
            <Badge variant={getStatusVariant(project.status)}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground mb-4'>
            {project.description}
          </p>
          <div className='flex items-center text-sm text-muted-foreground'>
            <Users className='h-4 w-4 mr-2' />
            <span>Proje Lideri: {project.lead}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
