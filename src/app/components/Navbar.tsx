import Link from "next/link";
import React from "react";
import { MdBuild, MdMail, MdSchool, MdWork } from "react-icons/md";
import { Authenticated } from "./Authenticated";
const Navbar = () => {
  return (
    <div className="px-2 sm:px-4 py-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <nav className="flex items-center justify-between p-2">
          <div className="h-12 md:flex md:items-center">
            <img
              src="/logo.png"
              alt="Portfolio Logo"
              className="h-15 hidden w-20 md:flex md:h-15 md:w-25 ml-5 object-contain filter brightness-1 sepia-1 hue-rotate-190 saturate-2"
            />
          </div>

          {/* Mobile Navigation - Right side */}
          <div className="w-full size-auto flex md:hidden space-x-5 items-center overflow-x-auto justify-center">
            <Link href="/projects">
              <button className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-all min-w-[60px]">
                <MdWork className="text-gray-700 text-xl" />
                <span className="text-xs mt-1 text-gray-600">Projects</span>
              </button>
            </Link>
            <button className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-all min-w-[60px]">
              <MdSchool className="text-gray-700 text-xl" />
              <span className="text-xs mt-1 text-gray-600">Education</span>
            </button>
            <button className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-all min-w-[60px]">
              <MdBuild className="text-gray-700 text-xl" />
              <span className="text-xs mt-1 text-gray-600">Skills</span>
            </button>
            <button className="flex flex-col items-center p-2 rounded-lg hover:bg-blue-50 transition-all min-w-[60px]">
              <MdMail className="text-gray-700 text-xl" />
              <span className="text-xs mt-1 text-gray-600">Contact</span>
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/projects">
              <button className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                <MdWork className="text-gray-700 text-xl" />
                <span className="text-xs mt-1 text-gray-600">Projects</span>
              </button>
            </Link>
            <Link href="/education">
              <button className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                <MdSchool className="text-gray-700 text-xl" />
                <span className="text-xs mt-1 text-gray-600">Education</span>
              </button>
            </Link>
            <Link href="/skills">
              <button className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                <MdBuild className="text-gray-700 text-xl" />
                <span className="text-xs mt-1 text-gray-600">Skills</span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="flex flex-col items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                <MdMail className="text-gray-700 text-xl" />
                <span className="text-xs mt-1 text-gray-600">Contact</span>
              </button>
            </Link>
          </div>

          {/* Avatar + Dropdown Menu */}
          <Authenticated />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
