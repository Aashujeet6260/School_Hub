'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormValues = {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: FileList
}

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setMessage(null)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('address', data.address)
      formData.append('city', data.city)
      formData.append('state', data.state)
      formData.append('contact', data.contact)
      formData.append('email_id', data.email_id)
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
      } else {
        throw new Error('Please select an image')
      }
      const res = await fetch('/api/schools', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save school')
      setMessage('School added successfully!')
      reset()
    } catch (e:any) {
      setMessage(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      {message && <div className="mb-4 p-3 rounded-xl bg-brand-100 text-brand-900">{message}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">School Name</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="e.g. Green Valley High"
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })} />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea className="w-full border rounded-xl px-3 py-2" rows={3} placeholder="Street, Area"
            {...register('address', { required: 'Address is required' })} />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input className="w-full border rounded-xl px-3 py-2" placeholder="e.g. Mumbai"
              {...register('city', { required: 'City is required' })} />
            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input className="w-full border rounded-xl px-3 py-2" placeholder="e.g. Maharashtra"
              {...register('state', { required: 'State is required' })} />
            {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input className="w-full border rounded-xl px-3 py-2" placeholder="10-digit phone"
              {...register('contact', {
                required: 'Contact is required',
                pattern: { value: /^\d{7,15}$/, message: 'Enter 7-15 digits' }
              })} />
            {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input className="w-full border rounded-xl px-3 py-2" placeholder="name@example.com"
              {...register('email_id', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
              })} />
            {errors.email_id && <p className="text-red-600 text-sm mt-1">{errors.email_id.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">School Image</label>
          <input type="file" accept="image/*" className="w-full border rounded-xl px-3 py-2 bg-white"
            {...register('image', { required: 'Image is required' })} />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message as any}</p>}
          <p className="text-xs text-gray-500 mt-1">Accepted types: JPG, PNG (≤ 5 MB)</p>
        </div>

        <button className="btn" disabled={loading} type="submit">
          {loading ? 'Saving...' : 'Save School'}
        </button>
      </form>
    </div>
  )
}
