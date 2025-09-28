import { mockProjects } from '@/lib/mock-data'
import { NextResponse } from 'next/server'
import { projectSchema } from '@/features/projects/schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const status = searchParams.get('status')

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 6

  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProjects = [...mockProjects]

  if (query) {
    filteredProjects = filteredProjects.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  if (status) {
    filteredProjects = filteredProjects.filter((p) => p.status === status)
  }

  const totalProjects = filteredProjects.length
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * limit,
    page * limit
  )

  return NextResponse.json({
    projects: paginatedProjects,
    totalPages: Math.ceil(totalProjects / limit),
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const validation = projectSchema.safeParse(body)

  if (!validation.success) {
    return new Response('Geçersiz veri', { status: 400 })
  }

  const newProject = {
    id: `PROJ-${Date.now()}`,
    status: 'Active' as const,
    ...validation.data,
  }

  mockProjects.push(newProject)
  return new Response(JSON.stringify(newProject), { status: 201 })
}
