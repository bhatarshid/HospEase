"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/Components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center justify-between px-4 md:px-6 h-16 w-full">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-semibold">CP</span>
            </div>
            <span className="text-xl font-semibold text-darkcolor-top">CarePulse</span>
          </Link>
        </div>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} absolute top-16 left-0 right-0 flex-col items-center bg-white p-4 md:static md:flex md:flex-row md:space-x-6 md:bg-transparent md:p-0`}
        >
          <Link
            href="/about"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors py-2 md:py-0"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors py-2 md:py-0"
          >
            Services
          </Link>
          <Link
            href="/departments"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors py-2 md:py-0"
          >
            Departments
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors py-2 md:py-0"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Sign up</Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

