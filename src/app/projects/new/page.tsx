import { ProjectForm } from '@/features/projects/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground dark:text-gray-200'>
        Yeni Proje Oluştur
      </h1>
      <div className='bg-card text-card-foreground dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg border border-border shadow-sm'>
        <ProjectForm />
      </div>
    </div>
  )
}
