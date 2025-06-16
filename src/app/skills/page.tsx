import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Database, Code, BarChart3, GraduationCap, Globe, Smartphone } from "lucide-react"

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Machine Learning",
      icon: <Brain className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Supervised Learning", level: 75, tools: ["Scikit-learn", "Linear Regression", "Decision Trees"] },
        { name: "Deep Learning", level: 65, tools: ["TensorFlow", "Keras", "Neural Networks"] },
        { name: "Data Preprocessing", level: 80, tools: ["Pandas", "NumPy", "Feature Engineering"] },
        { name: "Model Evaluation", level: 70, tools: ["Cross-validation", "Metrics", "Hyperparameter Tuning"] },
        { name: "Unsupervised Learning", level: 60, tools: ["K-means", "PCA", "Clustering"] },
      ],
    },
    {
      title: "Data Science",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Data Analysis", level: 75, tools: ["Pandas", "NumPy", "Statistical Analysis"] },
        { name: "Data Visualization", level: 70, tools: ["Matplotlib", "Seaborn", "Plotly"] },
        { name: "Statistical Methods", level: 65, tools: ["Hypothesis Testing", "Descriptive Stats", "Probability"] },
        { name: "EDA Techniques", level: 80, tools: ["Data Cleaning", "Pattern Recognition", "Outlier Detection"] },
        { name: "Business Intelligence", level: 55, tools: ["Dashboard Creation", "KPI Analysis"] },
      ],
    },
    {
      title: "Web Development",
      icon: <Globe className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Next.js", level: 80, tools: ["App Router", "Server Components", "API Routes"] },
        { name: "TypeScript", level: 75, tools: ["Type Safety", "Interfaces", "Generics"] },
        { name: "React", level: 78, tools: ["Hooks", "Context", "Component Design"] },
        { name: "JavaScript", level: 82, tools: ["ES6+", "Async/Await", "DOM Manipulation"] },
        { name: "HTML/CSS", level: 85, tools: ["Semantic HTML", "Flexbox", "Grid", "Responsive Design"] },
        { name: "Tailwind CSS", level: 80, tools: ["Utility Classes", "Responsive Design", "Custom Components"] },
      ],
    },
    {
      title: "Programming & Tools",
      icon: <Code className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Python", level: 80, tools: ["Core Python", "OOP", "Data Structures"] },
        { name: "SQL", level: 70, tools: ["Queries", "Joins", "Database Design"] },
        { name: "Git/GitHub", level: 75, tools: ["Version Control", "Collaboration", "Branching"] },
        { name: "R", level: 60, tools: ["Data Manipulation", "Statistical Computing"] },
        { name: "Node.js", level: 65, tools: ["Express", "API Development", "NPM"] },
      ],
    },
    {
      title: "Development Tools",
      icon: <Database className="h-6 w-6" />,
      color: "from-indigo-500 to-blue-500",
      skills: [
        { name: "VS Code", level: 85, tools: ["Extensions", "Debugging", "IntelliSense"] },
        { name: "Jupyter Notebook", level: 85, tools: ["Data Analysis", "Prototyping", "Documentation"] },
        { name: "Google Colab", level: 80, tools: ["Cloud Computing", "GPU Access", "Collaboration"] },
        { name: "Vercel", level: 70, tools: ["Deployment", "Serverless Functions", "Analytics"] },
        { name: "Anaconda", level: 75, tools: ["Environment Management", "Package Management"] },
      ],
    },
    {
      title: "Frontend & Design",
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-pink-500 to-rose-500",
      skills: [
        { name: "Responsive Design", level: 80, tools: ["Mobile-First", "Breakpoints", "Flexbox"] },
        { name: "UI/UX Principles", level: 65, tools: ["User Experience", "Design Systems", "Accessibility"] },
        { name: "Component Libraries", level: 75, tools: ["shadcn/ui", "Material-UI", "Chakra UI"] },
        { name: "State Management", level: 70, tools: ["React Context", "useState", "useEffect"] },
        { name: "API Integration", level: 72, tools: ["REST APIs", "Fetch", "Axios"] },
      ],
    },
  ]

  const getSkillLevel = (level: number) => {
    if (level >= 75) return { text: "Proficient", color: "text-green-600 dark:text-green-400" }
    if (level >= 60) return { text: "Intermediate", color: "text-blue-600 dark:text-blue-400" }
    if (level >= 40) return { text: "Learning", color: "text-orange-600 dark:text-orange-400" }
    return { text: "Beginner", color: "text-gray-600 dark:text-gray-400" }
  }

  return (
    <div className="min-h-screen  dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gray-200 dark:bg-slate-900 border-b rounded-xl">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Technical Skills
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Full-stack development and data science capabilities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Skills Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border shadow-lg bg-white dark:bg-slate-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 bg-gradient-to-r ${category.color} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{category.icon}</div>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.skills.length} skills • {category.skills.filter((s) => s.level >= 70).length} proficient
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const skillLevel = getSkillLevel(skill.level)
                  return (
                    <div key={skillIndex} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-base">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${skillLevel.color}`}>{skillLevel.text}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={skill.level} className="h-2.5 bg-muted/50" />
                        <div className="flex flex-wrap gap-1.5">
                          {skill.tools.map((tool, tIndex) => (
                            <Badge
                              key={tIndex}
                              variant="secondary"
                              className="text-xs px-2.5 py-1 bg-muted/60 hover:bg-muted transition-colors"
                            >
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        
      </div>
    </div>
  )
}
