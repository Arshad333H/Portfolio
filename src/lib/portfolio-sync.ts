import prisma from "@/lib/prisma"

interface LinkedInExperience {
  title: string
  company: string
  location?: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
}

interface LinkedInSkill {
  name: string
  endorsements: number
}

interface LinkedInCertificate {
  name: string
  organization: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

export class PortfolioSyncService {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`https://api.linkedin.com/v2${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`LinkedIn API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    return response.json()
  }

  async getExperiences(): Promise<LinkedInExperience[]> {
    try {
      // Get current user profile
      const profile = await this.makeRequest("/people/~:(id)")
      const profileId = profile.id

      // Get positions/experience
      const positions = await this.makeRequest(
        `/people/(id:${profileId})/positions?projection=(elements*(id,title,companyName,location,description,startDate,endDate,isCurrent))`,
      )

      if (!positions.elements || positions.elements.length === 0) {
        console.log("No experience data found from LinkedIn API")
        return []
      }

      return positions.elements.map((pos: any) => ({
        title: pos.title || "Untitled Position",
        company: pos.companyName || "Unknown Company",
        location: pos.location?.name || null,
        description: pos.description || null,
        startDate: pos.startDate
          ? `${pos.startDate.year}-${String(pos.startDate.month || 1).padStart(2, "0")}-01`
          : new Date().toISOString(),
        endDate: pos.endDate ? `${pos.endDate.year}-${String(pos.endDate.month || 1).padStart(2, "0")}-01` : null,
        isCurrent: pos.isCurrent || false,
      }))
    } catch (error) {
      console.error("Error fetching experiences from LinkedIn:", error)
      throw new Error(`Failed to fetch LinkedIn experiences: ${error}`)
    }
  }

  async getSkills(): Promise<LinkedInSkill[]> {
    try {
      // Get current user profile
      const profile = await this.makeRequest("/people/~:(id)")
      const profileId = profile.id

      // Get skills
      const skills = await this.makeRequest(
        `/people/(id:${profileId})/skills?projection=(elements*(name,endorsements))`,
      )

      if (!skills.elements || skills.elements.length === 0) {
        console.log("No skills data found from LinkedIn API")
        return []
      }

      return skills.elements.map((skill: any) => ({
        name: skill.name || "Unknown Skill",
        endorsements: skill.endorsements?.total || 0,
      }))
    } catch (error) {
      console.error("Error fetching skills from LinkedIn:", error)
      throw new Error(`Failed to fetch LinkedIn skills: ${error}`)
    }
  }

  async getCertificates(): Promise<LinkedInCertificate[]> {
    try {
      // Get current user profile
      const profile = await this.makeRequest("/people/~:(id)")
      const profileId = profile.id

      // Get certifications
      const certifications = await this.makeRequest(
        `/people/(id:${profileId})/certifications?projection=(elements*(name,authority,startDate,endDate,licenseNumber,url))`,
      )

      if (!certifications.elements || certifications.elements.length === 0) {
        console.log("No certifications data found from LinkedIn API")
        return []
      }

      return certifications.elements.map((cert: any) => ({
        name: cert.name || "Unknown Certification",
        organization: cert.authority?.name || "Unknown Organization",
        issueDate: cert.startDate
          ? `${cert.startDate.year}-${String(cert.startDate.month || 1).padStart(2, "0")}-01`
          : null,
        expiryDate: cert.endDate ? `${cert.endDate.year}-${String(cert.endDate.month || 1).padStart(2, "0")}-01` : null,
        credentialId: cert.licenseNumber || null,
        credentialUrl: cert.url || null,
      }))
    } catch (error) {
      console.error("Error fetching certifications from LinkedIn:", error)
      throw new Error(`Failed to fetch LinkedIn certifications: ${error}`)
    }
  }

  async syncPortfolio(): Promise<void> {
    try {
      console.log("Starting portfolio sync with LinkedIn API...")

      // Validate access token
      if (!this.accessToken) {
        throw new Error("LinkedIn access token is required")
      }

      // Test API connection first
      try {
        await this.makeRequest("/people/~:(id)")
        console.log("LinkedIn API connection successful")
      } catch (error) {
        throw new Error(`LinkedIn API connection failed: ${error}`)
      }

      // Get LinkedIn data
      console.log("Fetching data from LinkedIn...")
      const [experiences, skills, certificates] = await Promise.all([
        this.getExperiences(),
        this.getSkills(),
        this.getCertificates(),
      ])

      console.log(
        `Fetched ${experiences.length} experiences, ${skills.length} skills, ${certificates.length} certificates from LinkedIn`,
      )

      // Clear existing data
      console.log("Clearing existing portfolio data...")
      await Promise.all([
        prisma.experience.deleteMany({}),
        prisma.skill.deleteMany({}),
        prisma.certificate.deleteMany({}),
      ])

      // Insert new data
      console.log("Inserting new portfolio data...")
      const insertPromises = []

      if (experiences.length > 0) {
        insertPromises.push(
          prisma.experience.createMany({
            data: experiences.map((exp) => ({
              title: exp.title,
              company: exp.company,
              location: exp.location,
              description: exp.description,
              startDate: new Date(exp.startDate),
              endDate: exp.endDate ? new Date(exp.endDate) : null,
              isCurrent: exp.isCurrent,
            })),
          }),
        )
      }

      if (skills.length > 0) {
        insertPromises.push(
          prisma.skill.createMany({
            data: skills.map((skill) => ({
              name: skill.name,
              endorsements: skill.endorsements,
            })),
          }),
        )
      }

      if (certificates.length > 0) {
        insertPromises.push(
          prisma.certificate.createMany({
            data: certificates.map((cert) => ({
              name: cert.name,
              organization: cert.organization,
              issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
              expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
              credentialId: cert.credentialId,
              credentialUrl: cert.credentialUrl,
            })),
          }),
        )
      }

      await Promise.all(insertPromises)

      // Update sync status
      try {
        await prisma.syncStatus.upsert({
          where: { id: "single" },
          update: { lastSyncAt: new Date() },
          create: { id: "single", lastSyncAt: new Date() },
        })
      } catch (error) {
        console.log("Creating sync status via raw query")
        await prisma.$executeRaw`
          INSERT INTO sync_status (id, last_sync_at) 
          VALUES ('single', ${new Date()})
          ON CONFLICT (id) 
          DO UPDATE SET last_sync_at = ${new Date()}
        `
      }

      console.log("Portfolio synced successfully from LinkedIn!")
    } catch (error) {
      console.error("Error syncing portfolio:", error)
      throw error
    }
  }
}
