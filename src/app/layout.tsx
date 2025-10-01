import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/shared/Header'
import { Sidebar } from '@/components/shared/Sidebar'
import { AllProviders } from '@/components/providers/Providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || 'APEX Lab Tracker',
  description: 'Academic Project & Experiment X-tracker',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground transition-normal`}
      >
        <AllProviders>
          <div className='flex h-screen'>
            <div className='hidden lg:block'>
              <Sidebar />
            </div>
            <div className='flex-1 flex flex-col'>
              <Header />
              <main className='flex-1 p-6 overflow-y-auto'>{children}</main>
            </div>
          </div>

          <Toaster richColors position='top-right' />
        </AllProviders>
      </body>
    </html>
  )
}
