import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar1 from "./components/Navbar1"
import { AuthProvider } from "./AuthProvider"
import { connection } from "next/server"
import { Suspense } from "react"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "./api/uploadthing/core"
import { Brain, Sparkles, Rocket, Code2, Bot, Zap } from "lucide-react"

async function UTSSR() {
  await connection()
  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "my-perfect-potfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-50 to-gray-100`}
        >
          {/* Background decorative elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Original decorative elements */}
            <Brain className="absolute top-20 left-20 h-8 w-8 text-blue-400/60 animate-bounce delay-300" />
            <Code2 className="absolute top-40 right-32 h-6 w-6 text-purple-400/60 animate-bounce delay-700" />
            <Sparkles className="absolute bottom-40 left-32 h-7 w-7 text-cyan-400/60 animate-bounce delay-1000" />
            <Rocket className="absolute bottom-20 right-20 h-8 w-8 text-indigo-400/60 animate-bounce delay-500" />

            {/* Additional AI-themed decorative elements */}
            <Bot className="absolute top-1/3 left-10 h-6 w-6 text-blue-400/40 animate-bounce delay-1200" />
            <Zap className="absolute top-1/2 right-16 h-5 w-5 text-purple-400/40 animate-bounce delay-800" />
            <Brain className="absolute bottom-1/3 right-40 h-7 w-7 text-green-400/40 animate-bounce delay-1500" />
            <Sparkles className="absolute top-1/4 right-1/4 h-5 w-5 text-pink-400/40 animate-bounce delay-400" />
            <Bot className="absolute bottom-1/4 left-1/3 h-6 w-6 text-cyan-400/40 animate-bounce delay-900" />
            <Zap className="absolute top-3/4 left-1/4 h-5 w-5 text-yellow-400/40 animate-bounce delay-1100" />
          </div>

          <Suspense>
            <UTSSR />
          </Suspense>

          {/* Navbar */}
          <Navbar1 />

          {/* Main content */}
          <main className="relative z-10 pt-24 px-40">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
