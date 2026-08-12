import { PrismaClient } from '@prisma/client'
import FocusAreaClient from '@/components/admin/FocusAreaClient'

const prisma = new PrismaClient()

export default async function FocusAreasAdmin() {
  const areas = await prisma.focusArea.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <FocusAreaClient initialData={areas} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
