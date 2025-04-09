import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  
} from "@tabler/icons-react";

import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";


export function Navbar() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Mail",
      icon: (
        <SiGmail className="h-full w-full text-neutral-500 dark:text-neutral-300"/>
      ),
      href:'/mail',
    },
    {
      title: "LinkedIn",
      icon: (
        <FaLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/arshad-shareef-439698245",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/Arshad333_s",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full   w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Arshad333S",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName="mb-12 w-full flex justify-end" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
