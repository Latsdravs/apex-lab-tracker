'use client'
import { useUserStore } from '@/lib/store'
import { Avatar } from '../ui/Avatar'
import { Bell, Search, BeakerIcon } from 'lucide-react'
import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '../ui/Button'

const getInitials = (name: string) => {
  const names = name.split(' ')
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`
  }
  return name.substring(0, 2)
}

export function Header() {
  const { name } = useUserStore()

  return (
    <header className='h-16 border-b bg-background flex items-center justify-between px-6'>
      <div className='lg:hidden flex items-center gap-2'>
        <BeakerIcon className='h-6 w-6 text-blue-600' />
        <span className='font-bold text-md text-gray-800'>APEX</span>
      </div>

      <div className='hidden sm:flex items-center gap-2 border rounded-md p-2 w-full max-w-sm'>
        <Search className='h-5 w-5 text-gray-400' />
        <input
          type='text'
          placeholder='Projelerde ara...'
          className='outline-none w-full bg-transparent'
        />
      </div>

      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <Button variant='outline' size='sm'>
          <Bell className='h-5 w-5' />
          <span className='sr-only'>Bildirimleri Görüntüle</span>
        </Button>
        <Avatar fallback={getInitials(name)} />
      </div>
    </header>
  )
}
