import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PopupDialogProvider } from '@/components/PopupDialogWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Men In The Arena',
  description: 'Every man is who we are',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PopupDialogProvider>
          {children}
        </PopupDialogProvider>
      </body>
    </html>
  )
}