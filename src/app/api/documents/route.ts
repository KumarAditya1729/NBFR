import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const documents = await prisma.scannedDocument.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Failed to fetch documents:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, extractedText } = body

    if (!title || !extractedText) {
      return NextResponse.json({ error: 'Title and extractedText are required' }, { status: 400 })
    }

    const document = await prisma.scannedDocument.create({
      data: {
        title,
        extractedText,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error('Failed to create document:', error)
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}
