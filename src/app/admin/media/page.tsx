import { PrismaClient } from '@prisma/client'
import MediaMentionClient from '@/components/admin/MediaMentionClient'

const prisma = new PrismaClient()

export default async function MediaAdmin() {
  const mentions = await prisma.mediaMention.findMany({ 
    orderBy: { createdAt: 'desc' } 
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <MediaMentionClient initialData={mentions} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
