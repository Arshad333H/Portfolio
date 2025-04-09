import React from 'react'
import { BackgroundLines } from "@/components/ui/background-lines";
import { Navbar } from './Navbar';
import { TextGenerateEffect } from './ui/text-generate-effect';


function Hero() {
  return (
    <div className="min-h-screen flex">
    <BackgroundLines className="flex  items-center justify-center w-full flex-col px-4">
    <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
    Shaik Mohammed  <br /> Arshad Shareef.
    </h2>
    <div className="max-w-xl mx-auto md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      <TextGenerateEffect 
      className='text-sm '
      words='Hi, I am Arshad – a passionate Full Stack Developer specializing in building scalable web applications with Next.js and the MERN stack'
      />
      </div>
      
    
    
  </BackgroundLines>
  </div>
  
)
}

export default Hero