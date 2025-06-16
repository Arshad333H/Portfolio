"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, GraduationCap } from "lucide-react"
import Image from "next/image"

const Education = () => {
  const educationData = [
    {
      institution: "Sree Dattha Institute of Engineering and Science",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science",
      duration: "2021 - Present",
      location: "Ibrahimpatnam, Hyderabad",
      description:
        "Currently pursuing B.Tech in Computer Science with focus on software development, algorithms, and modern technologies.",
      status: "Pursuing",
      image: "/SDES.avif",
      achievements: ["Dean's List", "Programming Club Member"],
    },
    {
      institution: "Narayana Junior College",
      degree: "Intermediate",
      field: "MPC (Maths, Physics, Chemistry)",
      duration: "2019 - 2021",
      location: "Dilsuknagar, Hyderabad",
      description: "Completed Intermediate education with strong foundation in Mathematics, Physics, and Chemistry.",
      status: "Completed",
      image: "/Mpc.jpeg",
      achievements: ["Science Olympiad Participant", "Mathematics Excellence"],
    },
    {
      institution: "Oxford Grammar High School",
      degree: "Secondary Education",
      field: "Grade 9-10",
      duration: "2017 - 2019",
      location: "Hyderabad",
      description:
        "Strengthened foundation in science and mathematics while participating in various academic and co-curricular activities.",
      status: "Completed",
      image: "/Oxford.avif",
      achievements: ["Academic Excellence", "Co-curricular Activities"],
    },
    {
      institution: "Ravindra Bharathi School",
      degree: "Primary & Middle School",
      field: "Grade 1-8",
      duration: "2009 - 2017",
      location: "Dilsuknagar, Hyderabad",
      description:
        "Developed early interest in STEM subjects and built strong academic foundation during formative years.",
      status: "Completed",
      image: "/RBS.png",
      achievements: ["STEM Interest Development", "Academic Foundation"],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <GraduationCap className="h-10 w-10 text-blue-600" />
          Educational Journey
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive overview of my academic background and educational milestones
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

              <Card className="md:ml-16 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={edu.image || "/placeholder.svg"}
                        alt={edu.institution}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <CardTitle className="text-xl font-bold text-foreground">{edu.institution}</CardTitle>
                        <Badge variant={edu.status === "Pursuing" ? "default" : "secondary"} className="w-fit">
                          {edu.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-blue-600">
                          {edu.degree} - {edu.field}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {edu.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {edu.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{edu.description}</p>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Key Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education
