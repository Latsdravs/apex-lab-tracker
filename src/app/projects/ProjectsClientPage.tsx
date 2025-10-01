'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '@/lib/store'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { fetchProjects } from '@/lib/api'
import { Project } from '@/types'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { updateProjectStatus } from '@/lib/api'
import { ProjectStatus } from '@/types'
import {
  SortableContext, // Kartların sıralanması için, sonra eklenecek
  // sortableKeyboardCoordinates, // Klavye için sıralama koordinatları, sonra eklenecek
  // arrayMove, // Dizi içinde eleman hareket ettirme, sonra eklenecek
} from '@dnd-kit/sortable'
import { ProjectColumn } from '@/features/projects/ProjectColumn'
import { ProjectCardSkeleton } from '@/features/projects/ProjectCardSkeleton'

import { Skeleton } from '@/components/ui/Skeleton'
import { ProjectCard } from '@/features/projects/ProjectCard'
import { toast } from 'sonner'

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
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery, status])

  const { data, isLoading, isError } = useQuery<ProjectsApiResponse>({
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  )

  const queryClient = useQueryClient()

  const { mutate: updateStatus } = useMutation({
    mutationFn: (variables: { id: string; status: ProjectStatus }) =>
      updateProjectStatus(variables.id, variables.status),

    onMutate: async (newProjectData) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] })

      const previousProjects = queryClient.getQueryData<ProjectsApiResponse>([
        'projects',
        debouncedQuery,
        status,
        page,
      ])

      queryClient.setQueryData<ProjectsApiResponse>(
        ['projects', debouncedQuery, status, page],
        (oldData) => {
          if (!oldData) return
          return {
            ...oldData,
            projects: oldData.projects.map((p) =>
              p.id === newProjectData.id
                ? { ...p, status: newProjectData.status }
                : p
            ),
          }
        }
      )

      return { previousProjects }
    },

    onError: (err, newProjectData, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(
          ['projects', debouncedQuery, status, page],
          context.previousProjects
        )
        toast.error('Proje durumu güncellenemedi, değişiklikler geri alındı.')
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  function handleDragStart(event: DragStartEvent) {
    const project = projects?.find((p) => p.id === event.active.id)
    if (project) {
      setActiveProject(project)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveProject(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id.toString()
    const overId = over.id.toString() as ProjectStatus

    const currentProject = projects?.find((p) => p.id === activeId)
    if (!currentProject || currentProject.status === overId) {
      return
    }

    updateStatus({ id: activeId, status: overId })

    console.log(`
      --- KART SÜRÜKLENDİ ---
      Sürüklenen Kart ID: ${activeId}
      Bırakıldığı Sütun ID: ${overId}
      Bu bilgiyi API'ye göndereceğiz.
    `)

    setActiveProject(null)
  }

  if (isError) {
    return (
      <p className='text-destructive'>
        Projeler yüklenemedi. Lütfen daha sonra tekrar deneyin.
      </p>
    )
  }

  if (!projects && isLoading) {
    return (
      <div>
        <div className='flex justify-between items-center mb-6'>
          <Skeleton className='h-9 w-48 bg-muted' />
          <Skeleton className='h-10 w-36 bg-muted' />
        </div>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <Skeleton className='h-10 max-w-sm w-full bg-muted' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-10 w-20 bg-muted' />
            <Skeleton className='h-10 w-20 bg-muted' />
            <Skeleton className='h-10 w-24 bg-muted' />
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='flex-1 space-y-4'>
            <Skeleton className='h-6 w-1/3 mb-2 bg-muted' />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
          <div className='flex-1 space-y-4'>
            <Skeleton className='h-6 w-1/3 mb-2 bg-muted' />
            <ProjectCardSkeleton />
          </div>
          <div className='flex-1 space-y-4'>
            <Skeleton className='h-6 w-1/3 mb-2 bg-muted' />
            <ProjectCardSkeleton />
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
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Projeler
          </h1>
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
          <ProjectColumn id='Active' title='Aktif' projects={activeProjects} />
          <ProjectColumn
            id='On Hold'
            title='Beklemede'
            projects={onHoldProjects}
          />
          <ProjectColumn
            id='Completed'
            title='Tamamlandı'
            projects={completedProjects}
          />
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
            <span className='text-sm font-medium text-foreground'>
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
      <DragOverlay>
        {activeProject ? (
          <ProjectCard project={activeProject} isDraggable={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
