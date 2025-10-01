'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

type ChartData = Array<{
  name: string
  value: number
  [key: string]: unknown
}>

interface ProjectStatusChartProps {
  data: ChartData
}

// Tema uyumlu renkler (light/dark)
const COLORS = [
  'var(--color-primary)', // Yeşil yerine primary
  'var(--color-accent)', // Sarı yerine accent
  'var(--color-destructive)', // Kırmızı yerine destructive
]

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <h3 className='text-lg font-semibold text-foreground'>
          Proje Durum Dağılımı
        </h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              outerRadius={100}
              fill='var(--color-primary)'
              dataKey='value'
              nameKey='name'
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend wrapperStyle={{ color: 'var(--color-foreground)' }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ProjectStatusChartSkeleton() {
  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <Skeleton className='h-6 w-48' />
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        <Skeleton className='h-[300px] w-[300px] rounded-full bg-muted' />
      </CardContent>
    </Card>
  )
}
