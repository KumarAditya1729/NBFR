"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ==========================================
// Focus Areas
// ==========================================

export async function createFocusArea(data: any) {
  try {
    const focusArea = await prisma.focusArea.create({
      data,
    });
    revalidatePath("/bihar");
    revalidatePath("/admin/focus-areas");
    return { success: true, data: focusArea };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateFocusArea(id: string, data: any) {
  try {
    const focusArea = await prisma.focusArea.update({
      where: { id },
      data,
    });
    revalidatePath("/bihar");
    revalidatePath("/admin/focus-areas");
    return { success: true, data: focusArea };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteFocusArea(id: string) {
  try {
    await prisma.focusArea.delete({
      where: { id },
    });
    revalidatePath("/bihar");
    revalidatePath("/admin/focus-areas");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// Impact Stats
// ==========================================

export async function createImpactStat(data: any) {
  try {
    const impactStat = await prisma.impactStat.create({
      data,
    });
    revalidatePath("/");
    revalidatePath("/impact");
    revalidatePath("/admin/impact");
    return { success: true, data: impactStat };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateImpactStat(id: string, data: any) {
  try {
    const impactStat = await prisma.impactStat.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath("/impact");
    revalidatePath("/admin/impact");
    return { success: true, data: impactStat };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteImpactStat(id: string) {
  try {
    await prisma.impactStat.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/impact");
    revalidatePath("/admin/impact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// Media Mentions
// ==========================================

export async function createMediaMention(data: any) {
  try {
    const mediaMention = await prisma.mediaMention.create({
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/media");
    return { success: true, data: mediaMention };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMediaMention(id: string, data: any) {
  try {
    const mediaMention = await prisma.mediaMention.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath("/admin/media");
    return { success: true, data: mediaMention };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMediaMention(id: string) {
  try {
    await prisma.mediaMention.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// Timeline Events
// ==========================================

export async function createTimelineEvent(data: any) {
  try {
    const event = await prisma.timelineEvent.create({ data });
    revalidatePath("/admin/timeline");
    return { success: true, data: event };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTimelineEvent(id: string, data: any) {
  try {
    const event = await prisma.timelineEvent.update({ where: { id }, data });
    revalidatePath("/admin/timeline");
    return { success: true, data: event };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTimelineEvent(id: string) {
  try {
    await prisma.timelineEvent.delete({ where: { id } });
    revalidatePath("/admin/timeline");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// Insights
// ==========================================

export async function createInsight(data: any) {
  try {
    const insight = await prisma.insight.create({ data });
    revalidatePath("/admin/insights");
    return { success: true, data: insight };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateInsight(id: string, data: any) {
  try {
    const insight = await prisma.insight.update({ where: { id }, data });
    revalidatePath("/admin/insights");
    return { success: true, data: insight };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteInsight(id: string) {
  try {
    await prisma.insight.delete({ where: { id } });
    revalidatePath("/admin/insights");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// Publications
// ==========================================

export async function createPublication(data: any) {
  try {
    const pub = await prisma.publication.create({ data });
    revalidatePath("/admin/publications");
    revalidatePath("/publications");
    return { success: true, data: pub };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePublication(id: string, data: any) {
  try {
    const pub = await prisma.publication.update({ where: { id }, data });
    revalidatePath("/admin/publications");
    revalidatePath("/publications");
    return { success: true, data: pub };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePublication(id: string) {
  try {
    await prisma.publication.delete({ where: { id } });
    revalidatePath("/admin/publications");
    revalidatePath("/publications");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// Memberships
// ==========================================

export async function createMembershipProgram(data: any) {
  try {
    const program = await prisma.membershipProgram.create({ data });
    revalidatePath("/admin/memberships");
    return { success: true, data: program };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMembershipProgram(id: string, data: any) {
  try {
    const program = await prisma.membershipProgram.update({ where: { id }, data });
    revalidatePath("/admin/memberships");
    return { success: true, data: program };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMembershipProgram(id: string) {
  try {
    await prisma.membershipProgram.delete({ where: { id } });
    revalidatePath("/admin/memberships");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

import { writeFile } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueSuffix = randomBytes(8).toString("hex");
    const extension = file.name.split(".").pop();
    const filename = `${uniqueSuffix}.${extension}`;
    
    // Save to public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
