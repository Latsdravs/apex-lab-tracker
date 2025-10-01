'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Users, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'
import { ProjectActions } from '@/features/projects/ProjectActions'
import { ProjectDetailSkeleton } from '@/features/projects/ProjectDetailSkeleton'
import { Project } from '@/types'
import { fetchProjectById } from '@/lib/api'

const getStatusVariant = (status: Project['status']) => {
  if (status === 'Active') return 'success'
  if (status === 'On Hold') return 'warning'
  return 'default'
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery<Project>({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectById(projectId),
  })

  if (isLoading) return <ProjectDetailSkeleton />
  if (isError)
    return <p>Proje yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
  if (!project) return null

  return (
    <div className='space-y-4'>
      <Link
        href='/projects'
        className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2'
      >
        <ArrowLeft className='h-4 w-4' />
        Tüm Projelere Geri Dön
      </Link>

      <div className='bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm'>
        <div className='flex justify-between items-start mb-4 border-b border-border pb-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              {project.name}
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            <Badge
              variant={getStatusVariant(project.status)}
              className='text-sm'
            >
              {project.status}
            </Badge>
            <ProjectActions projectId={project.id} projectName={project.name} />
          </div>
        </div>

        <p className='text-muted-foreground mb-6'>{project.description}</p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Users className='h-5 w-5 text-primary' />
            <div>
              <p className='font-semibold'>Proje Lideri</p>
              <p>{project.lead}</p>
            </div>
          </div>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Calendar className='h-5 w-5 text-primary' />
            <div>
              <p className='font-semibold'>Başlangıç Tarihi</p>
              <p>15.01.2024</p>
            </div>
          </div>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <Activity className='h-5 w-5 text-primary' />
            <div>
              <p className='font-semibold'>Proje Kodu</p>
              <p>{project.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
