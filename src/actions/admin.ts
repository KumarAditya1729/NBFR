'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// SITE SETTINGS
export async function saveSiteSettings(formData: FormData) {
  const data = {
    heroHeadline: formData.get('heroHeadline') as string,
    heroSubheadline: formData.get('heroSubheadline') as string,
    aboutText: formData.get('aboutText') as string,
    contactEmail: formData.get('contactEmail') as string,
    contactPhone: formData.get('contactPhone') as string,
    address: formData.get('address') as string,
  }
  
  const existing = await prisma.siteSettings.findFirst()
  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data })
  } else {
    await prisma.siteSettings.create({ data })
  }
  revalidatePath('/')
}

// TIMELINE EVENTS
export async function saveTimelineEvent(formData: FormData, id?: string) {
  const data = {
    year: formData.get('year') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
  }
  if (id) {
    await prisma.timelineEvent.update({ where: { id }, data })
  } else {
    await prisma.timelineEvent.create({ data })
  }
  revalidatePath('/')
}

export async function deleteTimelineEvent(id: string) {
  await prisma.timelineEvent.delete({ where: { id } })
  revalidatePath('/')
}

// IMPACT STATS
export async function saveImpactStat(formData: FormData, id?: string) {
  const data = {
    value: formData.get('value') as string,
    label: formData.get('label') as string,
    description: formData.get('description') as string,
    iconName: formData.get('iconName') as string,
  }
  if (id) {
    await prisma.impactStat.update({ where: { id }, data })
  } else {
    await prisma.impactStat.create({ data })
  }
  revalidatePath('/')
}

export async function deleteImpactStat(id: string) {
  await prisma.impactStat.delete({ where: { id } })
  revalidatePath('/')
}

// FOCUS AREAS
export async function saveFocusArea(formData: FormData, id?: string) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    iconName: formData.get('iconName') as string,
  }
  if (id) {
    await prisma.focusArea.update({ where: { id }, data })
  } else {
    await prisma.focusArea.create({ data })
  }
  revalidatePath('/')
}

export async function deleteFocusArea(id: string) {
  await prisma.focusArea.delete({ where: { id } })
  revalidatePath('/')
}

// INSIGHTS
export async function saveInsight(formData: FormData, id?: string) {
  const data = {
    title: formData.get('title') as string,
    type: formData.get('type') as string,
    author: formData.get('author') as string,
    date: formData.get('date') as string,
    link: formData.get('link') as string,
  }
  if (id) {
    await prisma.insight.update({ where: { id }, data })
  } else {
    await prisma.insight.create({ data })
  }
  revalidatePath('/')
}

export async function deleteInsight(id: string) {
  await prisma.insight.delete({ where: { id } })
  revalidatePath('/')
}

// MEDIA MENTIONS
export async function saveMediaMention(formData: FormData, id?: string) {
  const data = {
    source: formData.get('source') as string,
    headline: formData.get('headline') as string,
    date: formData.get('date') as string,
    url: formData.get('url') as string,
  }
  if (id) {
    await prisma.mediaMention.update({ where: { id }, data })
  } else {
    await prisma.mediaMention.create({ data })
  }
  revalidatePath('/')
}

export async function deleteMediaMention(id: string) {
  await prisma.mediaMention.delete({ where: { id } })
  revalidatePath('/')
}

// MEMBERSHIP PROGRAMS
export async function saveMembershipProgram(formData: FormData, id?: string) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    iconName: formData.get('iconName') as string,
  }
  if (id) {
    await prisma.membershipProgram.update({ where: { id }, data })
  } else {
    await prisma.membershipProgram.create({ data })
  }
  revalidatePath('/')
}

export async function deleteMembershipProgram(id: string) {
  await prisma.membershipProgram.delete({ where: { id } })
  revalidatePath('/')
}
