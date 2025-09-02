import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import path from 'path'
import { promises as fs } from 'fs'

const IMAGES_DIR = path.join(process.cwd(), 'public', 'schoolImages')

async function ensureDir() {
  await fs.mkdir(IMAGES_DIR, { recursive: true })
}

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { id: 'desc' },
      select: { id:true, name:true, address:true, city:true, image:true }
    })
    return NextResponse.json({ schools })
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await ensureDir()
    const form = await request.formData()

    const required = ['name','address','city','state','contact','email_id']
    for (const key of required) {
      if (!form.get(key) || String(form.get(key)).trim() === '') {
        return NextResponse.json({ error: `${key} is required` }, { status: 400 })
      }
    }

    // Validate email
    const email = String(form.get('email_id'))
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Validate contact number (7-15 digits)
    const contact = String(form.get('contact'))
    if (!/^\d{7,15}$/.test(contact)) {
      return NextResponse.json({ error: 'Invalid contact number' }, { status: 400 })
    }

    const file = form.get('image') as unknown as File
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large (max 5MB)' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const ext = (file.type && file.type.split('/')[1]) || 'png'
    const safeName = String(form.get('name')).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
    const filename = `${Date.now()}-${safeName}.${ext}`
    const relPath = path.join('schoolImages', filename)
    const absPath = path.join(process.cwd(), 'public', relPath)

    await fs.writeFile(absPath, buffer)

    const created = await prisma.school.create({
      data: {
        name: String(form.get('name')),
        address: String(form.get('address')),
        city: String(form.get('city')),
        state: String(form.get('state')),
        contact: contact,
        email_id: email,
        image: '/' + relPath.replace(/\\/g,'/')
      }
    })

    return NextResponse.json({ success: true, id: created.id })
  } catch (e:any) {
    console.error(e)
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 })
  }
}
