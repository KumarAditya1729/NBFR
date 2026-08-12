import { PrismaClient } from '@prisma/client'
import PublicationClient from '@/components/admin/PublicationClient'

const prisma = new PrismaClient()

export default async function PublicationsAdmin() {
  const publications = await prisma.publication.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <PublicationClient initialData={publications} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
