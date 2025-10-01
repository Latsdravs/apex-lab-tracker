import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card className='bg-card text-card-foreground rounded-radius shadow-sm transition-normal hover:bg-accent hover:text-accent-foreground'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <h3 className='text-sm font-medium text-muted-foreground'>{title}</h3>
        <Icon className='h-5 w-5 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-foreground'>{value}</div>
      </CardContent>
    </Card>
  )
}

export function StatCardSkeleton() {
  return (
    <Card className='bg-card text-card-foreground rounded-radius shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <Skeleton className='h-4 w-24 bg-muted' />
        <Skeleton className='h-5 w-5 rounded-full bg-muted' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-8 w-12 bg-muted' />
      </CardContent>
    </Card>
  )
}
