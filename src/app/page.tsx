'use client'

import { useQuery } from '@tanstack/react-query'
import { StatCard, StatCardSkeleton } from '@/components/shared/StatCard'
import { Activity, CheckCircle2, Package, PauseCircle } from 'lucide-react'
import {
  ProjectStatusChart,
  ProjectStatusChartSkeleton,
} from '@/features/projects/ProjectStatusChart'
import { DashboardStats } from '@/types'
import { fetchDashboardStats } from '@/lib/api'

export default function HomePage() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  })

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Ana Panel</h1>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2'>
          <ProjectStatusChartSkeleton />
        </div>
      </div>
    )
  }

  if (isError || !stats) {
    return (
      <p className='text-destructive-foreground'>
        Ana panel yüklenirken bir hata oluştu veya veri bulunamadı.
      </p>
    )
  }

  const chartData = [
    { name: 'Aktif', value: stats.activeProjects },
    { name: 'Beklemede', value: stats.onHoldProjects },
    { name: 'Tamamlanan', value: stats.completedProjects },
  ].filter((item) => item.value > 0)

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>
        Ana Panel
      </h1>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Toplam Proje'
          value={stats.totalProjects}
          icon={Package}
        />
        <StatCard
          title='Aktif Projeler'
          value={stats.activeProjects}
          icon={Activity}
        />
        <StatCard
          title='Tamamlanan Projeler'
          value={stats.completedProjects}
          icon={CheckCircle2}
        />
        <StatCard
          title='Beklemede'
          value={stats.onHoldProjects}
          icon={PauseCircle}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='col-span-1 lg:col-span-2'>
          <ProjectStatusChart data={chartData} />
        </div>

        <div className='col-span-1'>
          <p className='text-center text-muted-foreground p-8 border border-border rounded-radius bg-card'>
            Gelecek Bileşenler İçin Alan
          </p>
        </div>
      </div>
    </div>
  )
}
