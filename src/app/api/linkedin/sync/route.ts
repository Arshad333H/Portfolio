import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN!;

export async function GET(req: Request) {
  // ✅ Check if logged in with Kinde
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authed = await isAuthenticated();
  const user = await getUser();

  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Only allow your admin email
  if (user?.email !== "skmohammedarshad333@gmail.com") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // ✅ Fetch LinkedIn certifications using fetch API
    const response = await fetch(
      "https://api.linkedin.com/v2/certifications?q=List",
      {
        headers: {
          Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        },
        cache: "no-store", // always fresh
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LinkedIn API Error:", errorText);
      return NextResponse.json({ error: "LinkedIn API failed" }, { status: 500 });
    }

    const data = await response.json();
    const certs = data.elements || [];

    for (const cert of certs) {
      await prisma.certificate.upsert({
        where: { 
            id:cert.id,
            credentialUrl: cert.credentialUrl || cert.name },
        update: {
          title: cert.name,
          organization: cert.organization,
          issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
          expirationDate: cert.expirationDate ? new Date(cert.expirationDate) : null,
          logoUrl: cert.logo || null,
        },
        create: {
          title: cert.name,
          organization: cert.organization,
          issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
          expirationDate: cert.expirationDate ? new Date(cert.expirationDate) : null,
          credentialUrl: cert.credentialUrl || null,
          logoUrl: cert.logo || null,
        },
      });
    }

    return NextResponse.json({
      message: "LinkedIn certifications synced!",
      count: certs.length,
    });
  } catch (error: any) {
    console.error("LinkedIn Sync Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
