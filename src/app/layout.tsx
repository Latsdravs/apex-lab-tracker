import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/shared/Header'
import { Sidebar } from '@/components/shared/Sidebar'
import { Providers } from '@/components/providers/Providers'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

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
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Providers>
            <div className='flex h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-200'>
              <div className='hidden lg:block'>
                <Sidebar />
              </div>
              <div className='flex-1 flex flex-col'>
                <Header />
                <main className='flex-1 p-6 overflow-y-auto'>{children}</main>
              </div>
            </div>
            <Toaster richColors position='top-right' />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
