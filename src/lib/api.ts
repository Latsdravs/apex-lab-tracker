import { DashboardStats, Project, ProjectFormValues } from '@/types'
import { notFound } from 'next/navigation'
import { type ProjectStatus } from '@/types'

// API'den gelen projeler listesinin tipi
export interface ProjectsApiResponse {
  projects: Project[]
  totalPages: number
}

const API_BASE_URL = '/api'

//Hata yonetimi icin yardimci fonk
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Bir sunucu hatası oluştu.')
  }
  if (response.status === 204) return // No Content
  return response.json()
}

export const fetchProjects = async (
  query: string,
  status: string,
  page: number
): Promise<ProjectsApiResponse> => {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (status) params.set('status', status)
  params.set('page', page.toString())
  // params.set('limit', '6');

  const res = await fetch(`/api/projects?${params.toString()}`)
  if (!res.ok) throw new Error('Projeler yüklenirken bir hata oluştu.')
  return res.json()
}

export const fetchProjectById = async (projectId: string): Promise<Project> => {
  const res = await fetch(`/api/projects/${projectId}`)
  if (res.status === 404) {
    notFound()
  }
  if (!res.ok) {
    throw new Error('Proje yüklenirken bir hata oluştu.')
  }
  return res.json()
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await fetch('/api/dashboard')
  if (!res.ok) throw new Error('İstatistikler yüklenemedi.')
  return res.json()
}

export const createProject = async (data: ProjectFormValues) => {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Proje oluşturulamadı.')
  return res.json()
}

export const updateProject = async (variables: {
  id: string
  data: ProjectFormValues
}) => {
  const { id, data } = variables
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Proje güncellenemedi.')
  return res.json()
}

export const deleteProject = async (projectId: string) => {
  const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Proje silinemedi.')
}

export const updateProjectStatus = (
  id: string,
  status: ProjectStatus
): Promise<Project> => {
  return fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).then(handleResponse)
}

export const reorderProjects = (
  orderedIds: string[]
): Promise<{ success: boolean }> => {
  return fetch(`${API_BASE_URL}/projects/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderedIds }),
  }).then(handleResponse)
}
