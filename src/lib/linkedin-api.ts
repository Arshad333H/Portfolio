interface LinkedInExperience {
  title: string
  company: string
  location?: string
  description?: string
  startDate: string
  endDate?: string|null
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
  expiryDate?: string|null
  credentialId?: string
  credentialUrl?: string
}

export class LinkedInAPI {
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
      throw new Error(`LinkedIn API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getExperiences(): Promise<LinkedInExperience[]> {
    try {
      const profile = await this.makeRequest("/people/~:(id)")
      const profileId = profile.id

      const positions = await this.makeRequest(
        `/people/(id:${profileId})/positions?projection=(elements*(id,title,companyName,location,description,startDate,endDate,isCurrent))`,
      )

      return (
        positions.elements?.map((pos: any) => ({
          title: pos.title || "",
          company: pos.companyName || "",
          location: pos.location?.name || "",
          description: pos.description || "",
          startDate: pos.startDate
            ? `${pos.startDate.year}-${String(pos.startDate.month).padStart(2, "0")}-01`
            : new Date().toISOString(),
          endDate: pos.endDate ? `${pos.endDate.year}-${String(pos.endDate.month).padStart(2, "0")}-01` : null,
          isCurrent: pos.isCurrent || false,
        })) || []
      )
    } catch (error) {
      console.error("Error fetching experiences:", error)
      // Mock data for development/testing
      return [
        {
          title: "Senior Full Stack Developer",
          company: "Tech Solutions Inc",
          location: "San Francisco, CA",
          description:
            "Led development of scalable web applications using Next.js, TypeScript, and PostgreSQL. Implemented CI/CD pipelines and improved system performance by 40%.",
          startDate: "2022-01-01",
          endDate: null,
          isCurrent: true,
        },
        {
          title: "Software Engineer",
          company: "StartupXYZ",
          location: "Remote",
          description:
            "Built full-stack applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
          startDate: "2020-06-01",
          endDate: "2021-12-01",
          isCurrent: false,
        },
      ]
    }
  }

  async getSkills(): Promise<LinkedInSkill[]> {
    try {
      const profile = await this.makeRequest("/people/~:(id)")
      const profileId = profile.id

      const skills = await this.makeRequest(
        `/people/(id:${profileId})/skills?projection=(elements*(name,endorsements))`,
      )

      return (
        skills.elements?.map((skill: any) => ({
          name: skill.name || "",
          endorsements: skill.endorsements?.total || 0,
        })) || []
      )
    } catch (error) {
      console.error("Error fetching skills:", error)
      // Mock data for development/testing
      return [
        { name: "JavaScript", endorsements: 45 },
        { name: "TypeScript", endorsements: 38 },
        { name: "React", endorsements: 42 },
        { name: "Next.js", endorsements: 35 },
        { name: "Node.js", endorsements: 40 },
        { name: "PostgreSQL", endorsements: 28 },
        { name: "Prisma", endorsements: 22 },
        { name: "Tailwind CSS", endorsements: 30 },
      ]
    }
  }

  async getCertificates(): Promise<LinkedInCertificate[]> {
    try {
      const profile = await this.makeRequest("/people/~:(id)")
      const profileId = profile.id

      const certifications = await this.makeRequest(
        `/people/(id:${profileId})/certifications?projection=(elements*(name,authority,startDate,endDate,licenseNumber,url))`,
      )

      return (
        certifications.elements?.map((cert: any) => ({
          name: cert.name || "",
          organization: cert.authority?.name || "",
          issueDate: cert.startDate
            ? `${cert.startDate.year}-${String(cert.startDate.month).padStart(2, "0")}-01`
            : null,
          expiryDate: cert.endDate ? `${cert.endDate.year}-${String(cert.endDate.month).padStart(2, "0")}-01` : null,
          credentialId: cert.licenseNumber || "",
          credentialUrl: cert.url || "",
        })) || []
      )
    } catch (error) {
      console.error("Error fetching certificates:", error)
      // Mock data for development/testing
      return [
        {
          name: "AWS Certified Solutions Architect - Associate",
          organization: "Amazon Web Services",
          issueDate: "2023-03-01",
          expiryDate: "2026-03-01",
          credentialId: "AWS-SAA-123456789",
          credentialUrl: "https://aws.amazon.com/verification",
        },
        {
          name: "Google Cloud Professional Developer",
          organization: "Google Cloud",
          issueDate: "2022-08-01",
          expiryDate: "2024-08-01",
          credentialId: "GCP-PD-987654321",
          credentialUrl: "https://cloud.google.com/certification",
        },
        {
          name: "MongoDB Certified Developer",
          organization: "MongoDB",
          issueDate: "2023-01-15",
          expiryDate: null,
          credentialId: "MONGO-DEV-456789123",
          credentialUrl: "https://university.mongodb.com/certification",
        },
      ]
    }
  }
}
