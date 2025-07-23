import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const linkedinToken = process.env.LINKEDIN_ACCESS_TOKEN

    const [experiences, skills, certificates] = await Promise.all([
      prisma.experience.findMany({
        orderBy: { startDate: "desc" },
      }),
      prisma.skill.findMany({
        orderBy: { endorsements: "desc" },
      }),
      prisma.certificate.findMany({
        orderBy: { issueDate: "desc" },
      }),
    ])

    // Get sync status properly using Prisma model
    let syncStatus = null
    try {
      syncStatus = await prisma.syncStatus.findUnique({
        where: { id: "single" },
      })
    } catch (error) {
      console.log("Sync status not found, will be created on first sync")
    }

    return NextResponse.json({
      portfolio: {
        linkedinConnected: !!linkedinToken,
        lastSyncAt: syncStatus?.lastSyncAt || null,
        experiences,
        skills,
        certificates,
      },
    })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
  }
}
