import SchoolCard from '@/components/SchoolCard'

async function getSchools() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || ''
  const res = await fetch("http://localhost:3000/api/schools", {
  cache: "no-store", // optional, prevents caching in dev
});
  if (!res.ok) throw new Error('Failed to fetch schools')
  return res.json()
}

export default async function ShowSchoolsPage() {
  const data = await getSchools()
  const schools = data.schools as { id:number, name:string, address:string, city:string, image:string }[]

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Browse Schools</h1>
      {schools.length === 0 ? (
        <div className="card">No schools found. Add one from the <a className="text-brand-700 underline" href="/addSchool">Add School</a> page.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map(s => (
            <SchoolCard key={s.id} name={s.name} address={s.address} city={s.city} image={s.image} />
          ))}
        </div>
      )}
    </section>
  )
}
