import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SchoolHub',
  description: 'Add and browse schools – Next.js + MySQL demo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
