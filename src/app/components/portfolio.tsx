"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, Award, Briefcase, RefreshCw, AlertCircle } from "lucide-react"

interface Experience {
  id: string
  title: string
  company: string
  location?: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
}

interface Skill {
  id: string
  name: string
  endorsements: number
}

interface Certificate {
  id: string
  name: string
  organization: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

interface Portfolio {
  linkedinConnected: boolean
  lastSyncAt?: string
  experiences: Experience[]
  skills: Skill[]
  certificates: Certificate[]
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio")
      const data = await response.json()

      if (response.ok) {
        setPortfolio(data.portfolio)
        setError(null)
      } else {
        setError(data.error || "Failed to fetch portfolio")
        console.error("Failed to fetch portfolio:", data.error || "Unknown error")
      }
    } catch (error) {
      setError("Network error while fetching portfolio")
      console.error("Failed to fetch portfolio:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLinkedInSync = async () => {
    setSyncing(true)
    setError(null)

    try {
      const response = await fetch("/api/linkedin/sync", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Portfolio synced successfully from LinkedIn!")
        await fetchPortfolio()
      } else {
        setError(data.error || "Failed to sync portfolio")
        console.error("Failed to sync portfolio:", data.error || "Unknown error")
      }
    } catch (error) {
      setError("Network error during sync")
      console.error("Failed to sync portfolio:", error)
    } finally {
      setSyncing(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Configure your LinkedIn access token to sync portfolio data</CardDescription>
          </CardHeader>
          {error && (
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My LinkedIn Portfolio</span>
            <div className="flex items-center gap-2">
              {portfolio.linkedinConnected && (
                <Button onClick={handleLinkedInSync} disabled={syncing} size="sm">
                  <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Syncing from LinkedIn..." : "Sync from LinkedIn"}
                </Button>
              )}
            </div>
          </CardTitle>
          {portfolio.lastSyncAt && (
            <CardDescription>Last synced: {new Date(portfolio.lastSyncAt).toLocaleString()}</CardDescription>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Experience */}
      {portfolio.experiences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Experience ({portfolio.experiences.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {portfolio.experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-primary pl-4 pb-4">
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <p className="text-base font-medium text-muted-foreground">{exp.company}</p>
                {exp.location && <p className="text-sm text-muted-foreground">{exp.location}</p>}
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(exp.startDate)} - {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                </div>
                {exp.description && <p className="text-sm mt-3 leading-relaxed text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {portfolio.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills ({portfolio.skills.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="text-sm py-1 px-3">
                  {skill.name}
                  {skill.endorsements > 0 && <span className="ml-2 text-xs opacity-70">({skill.endorsements})</span>}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificates */}
      {portfolio.certificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certificates ({portfolio.certificates.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolio.certificates.map((cert) => (
              <div key={cert.id} className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-sm font-medium text-muted-foreground">{cert.organization}</p>
                {cert.issueDate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    Issued {formatDate(cert.issueDate)}
                    {cert.expiryDate && ` • Expires ${formatDate(cert.expiryDate)}`}
                  </div>
                )}
                {cert.credentialUrl && (
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2" asChild>
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Credential
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {portfolio.experiences.length === 0 && portfolio.skills.length === 0 && portfolio.certificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {portfolio.linkedinConnected
                ? "No portfolio data found. Click sync to fetch from LinkedIn."
                : "LinkedIn access token not configured."}
            </p>
            {portfolio.linkedinConnected && (
              <Button onClick={handleLinkedInSync} disabled={syncing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing from LinkedIn..." : "Sync from LinkedIn"}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
