"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  ArrowRight,
  Zap,
  Bot,
  Code2,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Globe,
  FileText,
} from "lucide-react";
import Link from "next/link";

const RESUME_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/resume.pdf"
    : "https://portfolio-mpqc.vercel.app/resume.pdf";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="text-center max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            👋 Hello, I'm{" "}
            <span className="font-semibold text-blue-600">Arshad</span>
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI Developer &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Machine Learning
            </span>{" "}
            Engineer
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A passionate web developer building intelligent systems and
            AI-powered applications that transform ideas into reality. I
            specialize in{" "}
            <span className="font-semibold text-blue-600">
              Machine Learning
            </span>
            ,{" "}
            <span className="font-semibold text-purple-600">Deep Learning</span>
            , and{" "}
            <span className="font-semibold text-cyan-600">Neural Networks</span>
            , creating intelligent applications that bridge the gap between
            cutting-edge AI and user-friendly web experiences.
          </p>
        </div>

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

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { name: "Python", icon: "🐍" },
            { name: "JavaScript", icon: "⚡" },
            { name: "TypeScript", icon: "📘" },
            { name: "React", icon: "⚛️" },
            { name: "Next.js", icon: "▲" },
            { name: "Machine Learning", icon: "🤖" },
            { name: "Data Science", icon: "📊" },
            { name: "Excel", icon: "📈" },
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href={"/projects"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105"
            >
              
              <FileText className=" h-5 w-5"/>
              View Resume
            </Button>
          </Link>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Connect With Me
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                name: "GitHub",
                icon: Github,
                href: "https://github.com/Arshad333H",
                color: "hover:text-gray-900 hover:bg-gray-100",
              },
              {
                name: "LinkedIn",
                icon: Linkedin,
                href: "https://www.linkedin.com/in/shaik-mohammed-arshad-shareef-439698245/",
                color: "hover:text-blue-600 hover:bg-blue-50",
              },
              {
                name: "Twitter",
                icon: Twitter,
                href: "https://x.com/Arshad333_s",
                color: "hover:text-sky-500 hover:bg-sky-50",
              },
              {
                name: "Instagram",
                icon: Instagram,
                href: "https://www.instagram.com/a_rshad333.s",
                color: "hover:text-pink-600 hover:bg-pink-50",
              },
              {
                name: "Email",
                icon: Mail,
                href: "mailto:skmohammedarshad333@gmail.com",
                color: "hover:text-red-600 hover:bg-red-50",
              },
              {
                name: "Portfolio",
                icon: Globe,
                href: "/",
                color: "hover:text-green-600 hover:bg-green-50",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 ${social.color} min-w-[120px]`}
              >
                <social.icon className="h-8 w-8 mb-2 transition-colors duration-300" />
                <span className="font-medium text-sm mb-1">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-3">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
            <div className="text-gray-600 font-medium">Projects Completed</div>
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

        <div className="flex justify-center space-x-8 opacity-40">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping delay-300"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-700"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-ping delay-1000"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Bot className="absolute top-1/4 left-10 h-6 w-6 text-blue-400/30 animate-bounce delay-500" />
          <Brain className="absolute top-1/3 right-16 h-7 w-7 text-purple-400/30 animate-bounce delay-1000" />
          <Zap className="absolute bottom-1/3 left-20 h-5 w-5 text-cyan-400/30 animate-bounce delay-700" />
        </div>
      </div>
    </div>
  );
}
