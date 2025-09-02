export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Welcome to SchoolHub</h1>
        <p className="text-gray-700">
          A mini-project built with Next.js (App Router), MySQL (via Prisma), and Tailwind. 
          Add schools and browse them like an e‑commerce grid.
        </p>
        <ul className="mt-4 list-disc pl-5 text-gray-700">
          <li>Image uploads stored under <code>public/schoolImages</code></li>
          <li>Server-side validation & client-side form validation</li>
          <li>Responsive layout for mobile & desktop</li>
        </ul>
        <a className="btn mt-4" href="/addSchool">Add a School</a>
      </div>
      <div className="card">
        <h2 className="text-2xl font-semibold mb-2">Quick Links</h2>
        <div className="flex gap-3">
          <a className="btn" href="/showSchools">Browse Schools</a>
          <a className="btn" href="https://uniformapp.in/schoolsearch.php" target="_blank">See Reference</a>
        </div>
      </div>
    </section>
  )
}
