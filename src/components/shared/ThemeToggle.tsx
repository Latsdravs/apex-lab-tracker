'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant='outline' size='sm' className='w-9 h-9' disabled />
  }

  return (
    <Button
      variant='outline'
      size='sm'
      className='w-9 h-9'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className='h-5 w-5 scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-5 w-5 scale-0 rotate-90 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Temayı değiştir</span>
    </Button>
  )
}
