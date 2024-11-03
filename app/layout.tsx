import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '株式会社Saira',
  description: 'ビジネスの成長を加速するノーコードソリューションと人材戦略',
  icons: {
    icon: '/images/saira-high-resolution-logo-transparent.png',
    apple: '/images/saira-high-resolution-logo-transparent.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}