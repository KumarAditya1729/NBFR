import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const events = await prisma.eventItem.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(events)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const event = await prisma.eventItem.create({ data: body })
    return NextResponse.json(event, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
