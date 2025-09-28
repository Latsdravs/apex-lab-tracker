'use client'

import { FolderKanban, Home, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navLinks = [
  { name: 'Ana Panel', href: '/', icon: Home },
  { name: 'Projeler', href: '/projects', icon: FolderKanban },
  { name: 'Ayarlar', href: '/settings', icon: Settings },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className='flex flex-col gap-2 p-4'>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-200 hover:text-black',
            {
              'bg-gray-200 text-black font-semibold': pathname === link.href,
            }
          )}
        >
          <link.icon className='h-5 w-5' />
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
