import { PrismaClient } from '@prisma/client'
import EventClient from '@/components/admin/EventClient'

const prisma = new PrismaClient()

export default async function EventsAdmin() {
  const events = await prisma.eventItem.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return (
    <div className="max-w-6xl mx-auto">
      <EventClient initialData={events} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
