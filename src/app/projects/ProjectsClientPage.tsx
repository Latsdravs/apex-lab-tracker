'use client'

import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/lib/store'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Users } from 'lucide-react'
import { fetchProjects } from '@/lib/api'
import { Project } from '@/types'

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

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects?.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card className='hover:shadow-md transition-shadow'>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <h2 className='text-xl dark:text-gray-400 font-semibold tracking-tight'>
                    {project.name}
                  </h2>
                  <Badge variant={getStatusVariant(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-sm dark:text-gray-400 text-gray-600 mb-4'>
                  {project.description}
                </p>
                <div className='flex dark:text-gray-400 items-center text-sm text-gray-500'>
                  <Users className='h-4 w-4 mr-2' />
                  <span>Proje Lideri: {project.lead}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {totalPages && totalPages > 1 && (
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
      )}
    </div>
  )
}
