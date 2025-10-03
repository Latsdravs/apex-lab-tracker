import { mockProjects } from '@/lib/mock-data'
import { NextResponse } from 'next/server'
import { type Project } from '@/types'

export async function POST(request: Request) {
  try {
    const { orderedIds }: { orderedIds: string[] } = await request.json()

    if (!orderedIds || orderedIds.length === 0) {
      return new Response('Geçersiz istek: orderedIds gerekli', { status: 400 })
    }

    const reorderedProjects = orderedIds
      .map((id) => mockProjects.find((p) => p.id === id))
      .filter((p): p is Project => p !== undefined)

    const otherProjects = mockProjects.filter((p) => !orderedIds.includes(p.id))

    const newFullOrder = [...otherProjects, ...reorderedProjects]

    mockProjects.length = 0
    mockProjects.push(...newFullOrder)

    console.log('Projeler BAŞARIYLA yeniden sıralandı.')

    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ success: true })
  } catch (error) {
    return new Response('İstek işlenirken hata oluştu', { status: 500 })
  }
}
