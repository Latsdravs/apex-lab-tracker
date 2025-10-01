'use client'

import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/lib/store'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { fetchProjects } from '@/lib/api'
import { Project } from '@/types'
import { ProjectColumn } from '@/features/projects/ProjectColumn'
import { Skeleton } from '@/components/ui/Skeleton'
import { ProjectCardSkeleton } from '@/features/projects/ProjectCardSkeleton'

export const dynamic = 'force-dynamic'

interface ProjectsApiResponse {
  projects: Project[]
  totalPages: number
}

const getStatusVariant = (status: Project['status']) => {
  if (status === 'Active') return 'success'
  if (status === 'On Hold') return 'warning'
  return 'default'
}

export default function ProjectsClientPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { role } = useUserStore()

  const initialQuery = searchParams.get('q') || ''
  const initialStatus = searchParams.get('status') || ''
  const initialPage = Number(searchParams.get('page')) || 1

  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState(initialStatus)
  const [page, setPage] = useState(initialPage)

  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)
    return () => clearTimeout(handler)
  }, [query])

  const { data, isError } = useQuery<ProjectsApiResponse>({
    queryKey: ['projects', debouncedQuery, status, page],
    queryFn: () => fetchProjects(debouncedQuery, status, page),
  })

  const projects = data?.projects
  const totalPages = data?.totalPages

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedQuery) params.set('q', debouncedQuery)
    else params.delete('q')
    if (status) params.set('status', status)
    else params.delete('status')
    if (page > 1) params.set('page', page.toString())
    else params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedQuery, status, page, pathname, router, searchParams])

  if (isError) {
    return <p>Projeler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
  }

  if (!projects) {
    return (
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold tracking-tight'>Projeler</h1>
          {role === 'Admin' && (
            <Link href='/projects/new'>
              <Button>Yeni Proje Ekle</Button>
            </Link>
          )}
        </div>

        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <Input
            placeholder='Proje adında ara...'
            className='max-w-sm'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className='flex items-center gap-2'>
            <Button
              variant={status === '' ? 'default' : 'outline'}
              onClick={() => setStatus('')}
            >
              Tümü
            </Button>
            <Button
              variant={status === 'Active' ? 'default' : 'outline'}
              onClick={() => setStatus('Active')}
            >
              Aktif
            </Button>
            <Button
              variant={status === 'Completed' ? 'default' : 'outline'}
              onClick={() => setStatus('Completed')}
            >
              Tamamlandı
            </Button>
          </div>
        </div>

        <div className='flex gap-6 mt-6'>
          <div className='flex-1 space-y-4'>
            <Skeleton className='h-6 w-1/3 mb-2' />
            <ProjectCardSkeleton />
          </div>
          <div className='flex-1 space-y-4'>
            <Skeleton className='h-6 w-1/3 mb-2' />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
          <div className='flex-1 space-y-4'>
            <Skeleton className='h-6 w-1/3 mb-2' />
          </div>
        </div>
      </div>
    )
  }

  const activeProjects = projects?.filter((p) => p.status === 'Active') || []
  const onHoldProjects = projects?.filter((p) => p.status === 'On Hold') || []
  const completedProjects =
    projects?.filter((p) => p.status === 'Completed') || []

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Projeler</h1>
        {role === 'Admin' && (
          <Link href='/projects/new'>
            <Button>Yeni Proje Ekle</Button>
          </Link>
        )}
      </div>

      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        <Input
          placeholder='Proje adında ara...'
          className='max-w-sm'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='flex items-center gap-2'>
          <Button
            variant={status === '' ? 'default' : 'outline'}
            onClick={() => setStatus('')}
          >
            Tümü
          </Button>
          <Button
            variant={status === 'Active' ? 'default' : 'outline'}
            onClick={() => setStatus('Active')}
          >
            Aktif
          </Button>
          <Button
            variant={status === 'Completed' ? 'default' : 'outline'}
            onClick={() => setStatus('Completed')}
          >
            Tamamlandı
          </Button>
        </div>
      </div>

      <div className='flex gap-6 overflow-x-auto pb-4'>
        <ProjectColumn title='Aktif' projects={activeProjects} />
        <ProjectColumn title='Beklemede' projects={onHoldProjects} />
        <ProjectColumn title='Tamamlandı' projects={completedProjects} />
      </div>

      {/* {totalPages && totalPages > 1 && (
        <div className='flex items-center justify-center gap-4 mt-8'>
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            variant='outline'
          >
            Önceki
          </Button>
          <span className='text-sm font-medium'>
            Sayfa {page} / {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            variant='outline'
          >
            Sonraki
          </Button>
        </div>
      )} */}
    </div>
  )
}
