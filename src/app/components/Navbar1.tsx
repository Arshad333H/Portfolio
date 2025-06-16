"use client";

import { useState } from "react";
import {
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useKindeAuth();

  const navItems = [
    { name: "Projects", href: "/projects", icon: Code },
    { name: "Education", href: "/education", icon: GraduationCap },
    { name: "Skills", href: "/skills", icon: Wrench },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.given_name || "";
    const lastName = user.family_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img className=" invert" src="/logo.png" alt="Logo" />
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
      <nav className="fixed top-4 left-4 right-4 z-50 lg:hidden">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <span className="font-semibold text-gray-900">John Doe</span>
            </Link>

            <div className="flex items-center space-x-3">
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

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={
                            user?.picture ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt="Profile"
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {isAuthenticated
                            ? `${user?.given_name} ${user?.family_name}`
                            : "Guest User"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {isAuthenticated
                            ? "Full Stack Developer"
                            : "Not logged in"}
                        </p>
                      </div>
                    </div>

                    <nav className="flex flex-col space-y-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </nav>

                    <div className="pt-4 border-t">
                      {isAuthenticated ? (
                        <LogoutLink>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </Button>
                        </LogoutLink>
                      ) : (
                        <div className="space-y-2">
                          <LoginLink>
                            <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              <LogIn className="mr-2 h-4 w-4" />
                              Login
                            </Button>
                          </LoginLink>
                          <RegisterLink>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Register
                            </Button>
                          </RegisterLink>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
