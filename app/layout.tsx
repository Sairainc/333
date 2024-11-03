import React, { useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"
import { useRouter } from 'next/router'; // useRouterをインポート

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
  const router = useRouter(); // useRouterを使用してrouterを取得

  useEffect(() => {
    // Google Analyticsのトラッキングコードを追加
    const handleRouteChange = (url: string) => {
      window.gtag('config', 'G-J2MM61CHTV', {
        page_path: url,
      });
    };

    // ルート変更時のイベントリスナーを追加
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J2MM61CHTV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J2MM61CHTV');
            `,
          }}
        />
        <Analytics />  {/* Analyticsコンポーネントを追加 */}
        {children}
      </body>
    </html>
  )
}