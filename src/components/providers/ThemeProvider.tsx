'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

type Attribute = 'class' | 'data-theme'

interface CustomThemeProviderProps {
  children: ReactNode
  attribute: Attribute
  defaultTheme: string
  enableSystem: boolean
}

export function ThemeProvider({
  children,
  ...props
}: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
