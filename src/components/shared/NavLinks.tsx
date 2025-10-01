'use client'

import { FolderKanban, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navLinks = [
  { name: 'Ana Panel', href: '/', icon: Home },
  { name: 'Projeler', href: '/projects', icon: FolderKanban },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className='flex flex-col gap-2 p-4'>
      {navLinks.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-3 rounded-radius px-3 py-2 transition-normal shadow-sm',
              {
                // Aktif link
                'bg-primary text-primary-foreground font-semibold shadow-md':
                  isActive,
                // Aktif olmayan link
                'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground':
                  !isActive,
              }
            )}
          >
            <link.icon
              className={clsx(
                'h-5 w-5 transition-normal',
                isActive
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground group-hover:text-foreground'
              )}
            />
            <span>{link.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
