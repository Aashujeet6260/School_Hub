export default function Footer() {
  return (
    <footer className="mt-12 py-8 text-center text-sm text-gray-600">
      <div className="container">
        Made with ❤️ using Next.js & MySQL • © {new Date().getFullYear()} SchoolHub
      </div>
    </footer>
  )
}
