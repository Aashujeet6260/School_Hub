import Image from 'next/image'

type Props = {
  name: string
  address: string
  city: string
  image: string
}

export default function SchoolCard({ name, address, city, image }: Props) {
  return (
    <div className="card flex flex-col">
      <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl mb-3 bg-gray-100">
        <Image src={image.startsWith('/') ? image : '/' + image} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 line-clamp-2">{address}</p>
      <div className="mt-2 text-sm text-brand-700 font-medium">{city}</div>
    </div>
  )
}
