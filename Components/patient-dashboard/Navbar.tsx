"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, Search } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import Searchbar from "./Searchbar"
import LogoutButton from "../LogoutButton"
import type { AppDispatch, RootState } from "@/redux/store"
import { getMyDetails } from "@/redux/features/user-slice"
import { getImageSrc } from "@/lib/utils"

const navigation = [
  { name: "Appointments", href: "/patient/appointments" },
  { name: "Services", href: "/patient/services" },
  { name: "Medical History", href: "/patient/medical-history" },
  { name: "Settings", href: "/patient/settings" },
]

export default function Navbar() {
  const { profile, isError } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    async function fetchData() {
      if (isError) {
        toast.error("Failed to load profile. Please refresh page")
      }
      dispatch(getMyDetails())
    }
    fetchData()
  }, [dispatch, isError])

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/patient/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-semibold">CP</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">CarePulse</span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <Button key={item.name} variant="ghost" className="text-gray-600 hover:text-gray-900" asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Searchbar />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  {profile?.profilePicture ? (
                    <Image
                      src={getImageSrc(profile?.profilePicture) || "/placeholder.svg"}
                      alt="profile"
                      height={32}
                      width={32}
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile?.firstName[0]}${profile?.lastName[0]}`}
                      />
                      <AvatarFallback>
                        {profile?.firstName[0]}
                        {profile?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/patient/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

