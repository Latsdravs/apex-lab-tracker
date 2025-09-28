import { Suspense } from 'react'
import ProjectsClientPage from './ProjectsClientPage'
import ProjectsPageSkeleton from '@/features/projects/ProjectsPageSkeleton'

export default function ProjectsPage() {
  return (
    // Suspense, icindeki bilesenin client-side veriye (useSearchParams gibi)
    // hazir olmasini beklerken bir fallback (yedek) arayuz gosterir
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsClientPage />
    </Suspense>
  )
}
