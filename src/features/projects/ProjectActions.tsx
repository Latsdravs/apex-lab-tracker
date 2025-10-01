'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteProject } from '@/lib/api'

export function ProjectActions({
  projectId,
  projectName,
}: {
  projectId: string
  projectName: string
}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success(`"${projectName}" projesi başarıyla silindi!`)
      router.push('/projects')
    },
    onError: (error: unknown) => {
      toast.error(`Bir hata oluştu: ${error}`)
    },
  })

  return (
    <div className='flex items-center gap-2'>
      <Link href={`/projects/${projectId}/edit`}>
        <Button
          variant='outline'
          size='sm'
          disabled={isPending}
          className='text-foreground hover:text-primary hover:bg-accent transition-colors'
        >
          Düzenle
        </Button>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            size='sm'
            disabled={isPending}
            className='transition-colors'
          >
            {isPending ? 'Siliniyor...' : 'Sil'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-foreground'>
              Emin misiniz?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-muted-foreground'>
              Bu işlem geri alınamaz. Bu, &quot;{projectName}&quot; projesini
              kalıcı olarak silecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteMutate(projectId)}>
              Evet, Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
