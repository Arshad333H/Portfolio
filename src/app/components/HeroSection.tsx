import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, ArrowRight, Zap, Bot, Code2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center">
          <Badge
            variant="secondary"
            className="px-6 py-3 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Bot className="mr-2 h-4 w-4 text-blue-600 animate-pulse" />
            AI-Powered Development
            <Sparkles className="ml-2 h-4 w-4 text-purple-600 animate-pulse delay-300" />
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          AI Developer &{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Machine Learning
          </span>{" "}
          Engineer
        </h1>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Building intelligent systems and AI-powered applications that transform ideas into reality. Specializing in{" "}
          <span className="font-semibold text-blue-600">Machine Learning</span>,{" "}
          <span className="font-semibold text-purple-600">Deep Learning</span>, and{" "}
          <span className="font-semibold text-cyan-600">Neural Networks</span>.
        </p>

        {/* Tech Stack Pills */}
       <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { name: "Python", icon: "🐍" },
            { name: "JavaScript", icon: "⚡" },
            { name: "React", icon: "⚛️" },
            { name: "Machine Learning", icon: "🤖" },
            { name: "Data Science", icon: "📊" },
            { name: "Problem Solving", icon: "🧩" },
          ].map((skill) => (
            <span
              key={skill.name}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <span className="mr-2">{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View AI Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105"
          >
            <Brain className="mr-2 h-5 w-5" />
            Explore ML Models
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-3">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 font-medium">AI Models Deployed</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-3">
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.5%</div>
            <div className="text-gray-600 font-medium">Model Accuracy</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-3">
              <Code2 className="h-8 w-8 text-cyan-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100K+</div>
            <div className="text-gray-600 font-medium">Lines of AI Code</div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-8 opacity-40">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping delay-300"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-700"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-ping delay-1000"></div>
        </div>

        {/* Floating AI Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Bot className="absolute top-1/4 left-10 h-6 w-6 text-blue-400/30 animate-bounce delay-500" />
          <Brain className="absolute top-1/3 right-16 h-7 w-7 text-purple-400/30 animate-bounce delay-1000" />
          <Zap className="absolute bottom-1/3 left-20 h-5 w-5 text-cyan-400/30 animate-bounce delay-700" />
        </div>
      </div>
    </div>
  )
}
