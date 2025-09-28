import { ProjectForm } from '@/features/projects/ProjectForm'

export default function NewProjectPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold tracking-tight mb-6'>
        Yeni Proje Oluştur
      </h1>
      <div className='bg-card p-6 rounded-lg border shadow-sm text-card-foreground'>
        <ProjectForm />
      </div>
    </div>
  )
}
