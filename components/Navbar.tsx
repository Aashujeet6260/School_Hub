'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const linkClass = (path: string) =>
    `px-3 py-2 rounded-xl ${pathname === path ? 'bg-brand-600 text-white' : 'hover:bg-brand-100'}`
  return (
    <nav className="bg-white shadow-soft">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-brand-700">SchoolHub</Link>
        <div className="flex gap-2">
          <Link href="/showSchools" className={linkClass('/showSchools')}>Schools</Link>
          <Link href="/addSchool" className={linkClass('/addSchool')}>Add School</Link>
          <a href="https://uniformapp.in/schoolsearch.php" target="_blank" className="px-3 py-2 hover:bg-brand-100 rounded-xl">Inspiration</a>
        </div>
      </div>
    </nav>
  )
}
