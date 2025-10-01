import React from 'react'
import { BeakerIcon } from 'lucide-react'

import { NavLinks } from './NavLinks'

export function Sidebar() {
  return (
    <aside className='w-64 h-full border-r bg-card flex flex-col'>
      <div className='h-16 border-b flex items-center px-6'>
        <div className='flex items-center gap-2'>
          <BeakerIcon className='h-7 w-7 text-primary' />
          <span className='font-bold text-lg text-foreground'>APEX</span>
        </div>
      </div>

      <NavLinks />
    </aside>
  )
}
