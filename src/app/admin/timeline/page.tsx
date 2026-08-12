import { PrismaClient } from '@prisma/client'
import TimelineEventClient from '@/components/admin/TimelineEventClient'

const prisma = new PrismaClient()

export default async function TimelineAdmin() {
  const events = await prisma.timelineEvent.findMany({ 
    orderBy: { year: 'asc' } 
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <TimelineEventClient initialData={events} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
