"use client";
import {
  Code,
  GraduationCap,
  Mail,
  Wrench,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function FloatingNavbar() {
  const { user, isAuthenticated } = useKindeAuth();

  const navItems = [
    { name: "Projects", href: "/projects", icon: Code },
    { name: "Education", href: "/education", icon: GraduationCap },
    { name: "Skills", href: "/skills", icon: Wrench },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "AR";
    const firstName = user.given_name || "";
    const lastName = user.family_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 hidden sm:block ">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex sm:flex">
              <Image width={50} height={50} src={"/logo.png"} alt="Logo" />
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Avatar with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full p-0"
                >
                  <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm cursor-pointer">
                    <AvatarImage
                      src={
                        user?.picture || "/placeholder.svg?height=32&width=32"
                      }
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">
                          {user?.given_name} {user?.family_name}
                        </p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <LogoutLink>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </LogoutLink>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <LoginLink>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </LoginLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <RegisterLink>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </RegisterLink>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Navbar */}
      <nav className="fixed top-4 left-4 right-4 z-50 md:hidden">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl px-3 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center justify-between">
            {/* Logo - visible on mobile */}
            <Link href="/" className="flex items-center justify-center ml-3">
              <Image
                width={40}
                height={40}
                src={"/logo.png"}
                alt="Logo"
                className="rounded-lg"
              />
            </Link>

            {/* Navigation Icons - visible on mobile */}
            <div className="flex items-center space-x-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  title={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            {/* Avatar with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full p-0"
                >
                  <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm cursor-pointer">
                    <AvatarImage
                      src={
                        user?.picture || "/placeholder.svg?height=32&width=32"
                      }
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">
                          {user?.given_name} {user?.family_name}
                        </p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <LogoutLink>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </LogoutLink>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <LoginLink>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </LoginLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <RegisterLink>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </RegisterLink>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
