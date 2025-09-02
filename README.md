# SchoolHub – Next.js + MySQL mini project

A compact full‑stack app (Next.js App Router) with a MySQL database to **add** and **list** schools. 
Images are uploaded to `public/schoolImages/`. Styling is done with **Tailwind CSS**. 
Forms use **react-hook-form** for UX + validation.

## Tech
- Next.js 14 (App Router)
- MySQL via Prisma ORM
- Tailwind CSS
- react-hook-form
- Single app for both frontend & backend – just one `npm run dev`

## Database
Create a MySQL database and put the connection string in `.env`:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/schools_db"
```

Create DB and push schema:

```bash
# Ensure MySQL is running and DB exists:
# mysql -u root -p -e "CREATE DATABASE schools_db;"
npm install
npx prisma db push
```

## Run
```bash
npm install
npx prisma db push       # creates tables
npm run dev              # start app on http://localhost:3000
```

> If you deploy, also run `npx prisma generate` and ensure write access to `public/schoolImages`.

## Pages
- `/addSchool` – form with validation & image upload.
- `/showSchools` – e‑commerce style grid of school cards (name, address, city, image).

## API
- `GET /api/schools` – list schools.
- `POST /api/schools` – multipart form: `{ name, address, city, state, contact, email_id, image }`

## Notes
- Contact is stored as a string to preserve leading zeros and international numbers.
- Image size is limited to 5 MB. Supported types inherit from the browser file input.
- For production on Linux, make sure the directory `public/schoolImages` is writable by the Node process.
- `NEXT_PUBLIC_BASE_URL` is optional; if set for SSR fetches, use your full origin (e.g., `http://localhost:3000`).

## Project Structure
```
app/
  addSchool/page.tsx
  showSchools/page.tsx
  api/schools/route.ts
  layout.tsx
  page.tsx
components/
  Navbar.tsx
  Footer.tsx
  SchoolCard.tsx
lib/
  prisma.ts
prisma/
  schema.prisma
public/
  schoolImages/ (uploads go here)
  placeholder.txt
tailwind.config.ts
postcss.config.js
next.config.js
tsconfig.json
.env (edit me)
```

## How it works
1. The Add School page submits a `multipart/form-data` POST to `/api/schools`.
2. The API route validates fields, writes the uploaded image to `public/schoolImages/`, and saves a row in MySQL using Prisma.
3. The Show Schools page fetches data from the API and renders a responsive grid, like a product gallery.
