import { getProjectById } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/features/projects/ProjectForm'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const project = await getProjectById(projectId)

  if (!project) {
    notFound()
  }

  const projectFormData = {
    id: project.id,
    name: project.name,
    description: project.description,
    lead: project.lead,
  }

  return (
    <div className='dark:text-gray-400'>
      <h1 className='text-3xl font-bold tracking-tight mb-6 '>
        Projeyi Düzenle: {project.name}
      </h1>
      <div className='bg-card p-6 rounded-lg border shadow-sm text-card-foreground'>
        <ProjectForm initialData={projectFormData} />
      </div>
    </div>
  )
}
