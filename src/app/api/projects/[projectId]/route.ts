import { NextResponse } from 'next/server'
import { mockProjects } from '@/lib/mock-data'
import { projectSchema } from '@/features/projects/schema'
import { type Project } from '@/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params

  await new Promise((resolve) => setTimeout(resolve, 500))

  const project = mockProjects.find((p) => p.id === projectId)

  if (!project) {
    return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })
  }

  return NextResponse.json(project)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params
  const index = mockProjects.findIndex((p) => p.id === projectId)

  if (index === -1) {
    return new Response('Proje bulunamadı', { status: 404 })
  }

  mockProjects.splice(index, 1)
  return new Response(null, { status: 204 })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params
  const index = mockProjects.findIndex((p) => p.id === projectId)

  if (index === -1) {
    return new Response('Proje bulunamadı', { status: 404 })
  }

  try {
    const body = await request.json()
    const validation = projectSchema.safeParse(body)

    if (!validation.success) {
      return new Response('Geçersiz veri', { status: 400 })
    }

    const originalProject = mockProjects[index] as Project
    mockProjects[index] = { ...originalProject, ...validation.data }

    return NextResponse.json(mockProjects[index])
  } catch {
    return new Response('Geçersiz JSON formatı', { status: 400 })
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params
  const index = mockProjects.findIndex((p) => p.id === projectId)

  if (index === -1) {
    return new Response('Proje bulunamadı', { status: 404 })
  }

  try {
    const { status } = await request.json()

    if (!['Active', 'On Hold', 'Completed'].includes(status)) {
      return new Response('Geçersiz status değeri', { status: 400 })
    }

    mockProjects[index].status = status

    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockProjects[index])
  } catch (error) {
    return new Response('Geçersiz JSON formatı', { status: 400 })
  }
}
