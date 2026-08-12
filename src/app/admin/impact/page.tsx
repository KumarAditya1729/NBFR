import { PrismaClient } from '@prisma/client'
import ImpactStatClient from '@/components/admin/ImpactStatClient'

const prisma = new PrismaClient()

export default async function ImpactAdmin() {
  const stats = await prisma.impactStat.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <ImpactStatClient initialData={stats} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
