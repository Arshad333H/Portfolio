import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Sparkles, Rocket, Code2 } from "lucide-react"

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Brain className="absolute top-20 left-20 h-8 w-8 text-blue-400/60 animate-bounce delay-300" />
        <Code2 className="absolute top-40 right-32 h-6 w-6 text-purple-400/60 animate-bounce delay-700" />
        <Sparkles className="absolute bottom-40 left-32 h-7 w-7 text-cyan-400/60 animate-bounce delay-1000" />
        <Rocket className="absolute bottom-20 right-20 h-8 w-8 text-indigo-400/60 animate-bounce delay-500" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center">
            <Badge
              variant="secondary"
              className="px-6 py-3 text-sm bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Brain className="mr-2 h-4 w-4 text-blue-600" />
              Aspiring AI/ML Developer
              <Sparkles className="ml-2 h-4 w-4 text-purple-600" />
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            <span className="block text-gray-900 mb-2">Learning to</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              Shape Tomorrow
            </span>
            <span className="block text-gray-900 text-5xl md:text-6xl mt-2">with AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            I'm on an exciting journey to master artificial intelligence and machine learning. Every day I'm building,
            learning, and creating solutions that could change the world.
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">
              {" "}
              Want to join the adventure?
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Explore My Journey
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-10 py-6 text-lg font-semibold bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Let's Connect
            </Button>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl hover:bg-blue-50/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                100+
              </div>
              <div className="text-sm text-gray-600 font-medium">Hours of Learning</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl hover:bg-purple-50/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-sm text-gray-600 font-medium">Projects Built</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl hover:bg-cyan-50/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ∞
              </div>
              <div className="text-sm text-gray-600 font-medium">Curiosity Level</div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="mt-16 max-w-2xl mx-auto">
            <blockquote className="text-lg italic text-gray-600 bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl hover:bg-blue-50/30 transition-all duration-300">
              "The best way to predict the future is to create it with AI"
              <footer className="mt-3 text-sm font-semibold text-gray-800">— My Learning Motto</footer>
            </blockquote>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-8 opacity-30">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-300"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
