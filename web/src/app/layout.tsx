import { RootProvider } from 'fumadocs-ui/provider/next'
import './global.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const jetbrainsMono = localFont({
  src: '../fonts/jetbrains-mono-latin-wght-normal.woff2',
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: '100 800',
})

export const metadata: Metadata = {
  title: {
    default:
      'fast-url - High-Performance URL Builder for JavaScript & TypeScript',
    template: '%s | fast-url',
  },
  description:
    'Build correct URLs easily with fast-url. A fast, type-safe, lightweight URL building library for JavaScript and TypeScript. Modern fork of urlcat with better performance.',
  keywords: [
    'url builder',
    'urlcat',
    'url',
    'query string',
    'typescript',
    'javascript',
    'fast-url',
    'url encoding',
    'path parameters',
  ],
  authors: [
    {
      name: 'Khánh Hoàng',
      url: 'https://www.khanh.id',
    },
  ],
  creator: 'Khánh Hoàng',
  metadataBase: new URL('https://fast-url.khanh.id'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fast-url.khanh.id',
    title: 'fast-url - High-Performance URL Builder',
    description:
      'Build correct URLs easily. Fast, type-safe, lightweight URL building library for JavaScript and TypeScript.',
    siteName: 'fast-url',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fast-url - High-Performance URL Builder',
    description:
      'Build correct URLs easily. Fast, type-safe, lightweight URL building library for JavaScript and TypeScript.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
