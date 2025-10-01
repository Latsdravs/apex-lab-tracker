'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProjectFormValues } from '@/types'
import { createProject, updateProject } from '@/lib/api'
import { projectSchema } from './schema'

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id: string }
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      if (initialData) {
        return updateProject({ id: initialData.id, data })
      } else {
        return createProject(data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      if (initialData) {
        queryClient.invalidateQueries({ queryKey: ['project', initialData.id] })
      }
      toast.success(
        initialData
          ? 'Proje başarıyla güncellendi!'
          : 'Proje başarıyla oluşturuldu!'
      )
      router.push('/projects')
    },
    onError: (error) => toast.error(error.message),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || { name: '', description: '', lead: '' },
  })

  const onSubmit = (data: ProjectFormValues) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-lg'>
      <div>
        <Label htmlFor='name' className='text-foreground'>
          Proje Adı
        </Label>
        <Input
          id='name'
          {...register('name')}
          disabled={isPending}
          className='bg-card text-card-foreground border-border placeholder:text-muted-foreground'
        />
        {errors.name && (
          <p className='text-destructive text-sm mt-1'>{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='description' className='text-foreground'>
          Açıklama
        </Label>
        <Input
          id='description'
          {...register('description')}
          disabled={isPending}
          className='bg-card text-card-foreground border-border placeholder:text-muted-foreground'
        />
        {errors.description && (
          <p className='text-destructive text-sm mt-1'>
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor='lead' className='text-foreground'>
          Proje Lideri
        </Label>
        <Input
          id='lead'
          {...register('lead')}
          disabled={isPending}
          className='bg-card text-card-foreground border-border placeholder:text-muted-foreground'
        />
        {errors.lead && (
          <p className='text-destructive text-sm mt-1'>{errors.lead.message}</p>
        )}
      </div>
      <Button
        type='submit'
        disabled={isPending}
        className='bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'
      >
        {isPending
          ? 'Kaydediliyor...'
          : initialData
            ? 'Değişiklikleri Kaydet'
            : 'Proje Oluştur'}
      </Button>
    </form>
  )
}
