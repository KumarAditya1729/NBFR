import { PrismaClient } from '@prisma/client'
import InsightClient from '@/components/admin/InsightClient'

const prisma = new PrismaClient()

export default async function InsightsAdmin() {
  const insights = await prisma.insight.findMany({ 
    orderBy: { createdAt: 'desc' } 
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <InsightClient initialData={insights} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
