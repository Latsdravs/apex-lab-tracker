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

  if (isLoading) {
    return <ProjectDetailSkeleton />
  }

  if (isError) {
    return <p>Proje yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
  }

  if (!project) {
    return null
  }

  return (
    <div>
      <Link
        href='/projects'
        className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4'
      >
        <ArrowLeft className='h-4 w-4' />
        Tüm Projelere Geri Dön
      </Link>

      <div className='bg-card p-6 rounded-lg border shadow-sm text-card-foreground'>
        <div className='flex justify-between items-start mb-4 border-b pb-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight dark:text-gray-400'>
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

        <p className='text-gray-700 dark:text-gray-400 mb-6'>
          {project.description}
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div className='flex items-center gap-2 text-gray-600'>
            <Users className='h-5 w-5 text-blue-500' />
            <div>
              <p className='font-semibold dark:text-gray-400'>Proje Lideri</p>
              <p>{project.lead}</p>
            </div>
          </div>
          <div className='flex items-center gap-2 dark:text-gray-400 text-gray-600'>
            <Calendar className='h-5 w-5 text-green-500' />
            <div>
              <p className='font-semibold'>Başlangıç Tarihi</p>
              <p>15.01.2024</p>
            </div>
          </div>
          <div className='flex items-center gap-2 dark:text-gray-400 text-gray-600'>
            <Activity className='h-5 w-5 text-yellow-500' />
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
