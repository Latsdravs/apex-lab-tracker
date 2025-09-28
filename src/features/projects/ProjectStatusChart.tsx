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

const COLORS = ['#16a34a', '#facc15', '#dc2626'] // Yesil, Sari, Kirmizi

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <h3 className='text-lg font-semibold'>Proje Durum Dağılımı</h3>
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
              fill='#8884d8'
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
            <Legend />
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
        <Skeleton className='h-[300px] w-[300px] rounded-full' />
      </CardContent>
    </Card>
  )
}
