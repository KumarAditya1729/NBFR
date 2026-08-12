import { PrismaClient } from '@prisma/client'
import MembershipClient from '@/components/admin/MembershipClient'

const prisma = new PrismaClient()

export default async function MembershipsAdmin() {
  const programs = await prisma.membershipProgram.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-6xl mx-auto h-full">
      <MembershipClient initialData={programs} />
    </div>
  )
}
export const dynamic = 'force-dynamic';
