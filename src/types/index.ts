export type ProjectStatus = 'Active' | 'Completed' | 'On Hold'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  lead: string
}

import { z } from 'zod'
import { projectSchema } from '@/features/projects/schema'
export type ProjectFormValues = z.infer<typeof projectSchema>

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  onHoldProjects: number
}

export interface ProjectsApiResponse {
  projects: Project[]
  totalPages: number
}

export interface RouteHandlerContext {
  params: {
    projectId: string
  }
}
