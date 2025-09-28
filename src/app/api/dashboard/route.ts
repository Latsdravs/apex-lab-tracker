import { mockProjects } from '@/lib/mock-data'
import { NextResponse } from 'next/server'

export async function GET() {
  //gercekci bir gecikme
  await new Promise((resolve) => setTimeout(resolve, 700))

  const totalProjects = mockProjects.length
  const activeProjects = mockProjects.filter(
    (p) => p.status === 'Active'
  ).length
  const completedProjects = mockProjects.filter(
    (p) => p.status === 'Completed'
  ).length
  const onHoldProjects = mockProjects.filter(
    (p) => p.status === 'On Hold'
  ).length

  const stats = {
    totalProjects,
    activeProjects,
    completedProjects,
    onHoldProjects,
  }

  return NextResponse.json(stats)
}
