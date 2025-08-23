import { NextResponse } from "next/server"
import { PortfolioSyncService } from "@/lib/portfolio-sync"

export async function POST() {
  try {
    // Use your LinkedIn access token directly
    const linkedinToken = process.env.LINKEDIN_ACCESS_TOKEN

    if (!linkedinToken) {
      return NextResponse.json({ error: "LinkedIn token not configured" }, { status: 400 })
    }

    // Sync portfolio
    const syncService = new PortfolioSyncService(linkedinToken)
    await syncService.syncPortfolio()

    return NextResponse.json({ success: true, message: "Portfolio synced successfully" })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ error: "Failed to sync portfolio" }, { status: 500 })
  }
}
