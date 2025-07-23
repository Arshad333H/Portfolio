import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/lib/prisma"

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "skmohammedarshad333@gmail.com"

export async function GET(req: Request) {
  try {
    // ✅ Check if logged in with Kinde
    const { isAuthenticated, getUser } = getKindeServerSession()
    const authed = await isAuthenticated()
    const user = await getUser()

    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ✅ Only allow admin access
    if (user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // ✅ Fetch LinkedIn certifications
    const response = await fetch("https://api.linkedin.com/v2/certifications?q=List", {
      headers: {
        Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("LinkedIn API Error:", response.status, errorText)
      return NextResponse.json({ error: `LinkedIn API failed: ${response.status}` }, { status: 500 })
    }

    const data = await response.json()
    const certs = data.elements || []

    let syncedCount = 0
    const errors: string[] = []

    for (const cert of certs) {
      try {
        // Create a unique identifier for the certificate
        const uniqueId = cert.id || `${cert.name}-${cert.organization}`.replace(/\s+/g, "-").toLowerCase()

        await prisma.certificate.upsert({
          where: {
            id: uniqueId,
          },
          update: {
            title: cert.name || "Untitled Certificate",
            organization: cert.organization || "Unknown Organization",
            issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
            expirationDate: cert.expirationDate ? new Date(cert.expirationDate) : null,
            credentialUrl: cert.credentialUrl || null,
            logoUrl: cert.logo || null,
            updatedAt: new Date(),
          },
          create: {
            id: uniqueId,
            title: cert.name || "Untitled Certificate",
            organization: cert.organization || "Unknown Organization",
            issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
            expirationDate: cert.expirationDate ? new Date(cert.expirationDate) : null,
            credentialUrl: cert.credentialUrl || null,
            logoUrl: cert.logo || null,
          },
        })
        syncedCount++
      } catch (certError: any) {
        console.error(`Error syncing certificate ${cert.name}:`, certError)
        errors.push(`Failed to sync "${cert.name}": ${certError.message}`)
      }
    }

    return NextResponse.json({
      message: "LinkedIn certifications sync completed!",
      totalCertificates: certs.length,
      syncedCount,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error: any) {
    console.error("LinkedIn Sync Error:", error)
    return NextResponse.json({ error: "Internal server error during sync" }, { status: 500 })
  }
}
