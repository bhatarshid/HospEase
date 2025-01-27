"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import { BellIcon, MenuIcon, Search } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import Searchbar from "./Searchbar";
import LogoutButton from "../LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { getMyDetails, reset } from "@/redux/features/user-slice";
import { getImageSrc } from "@/lib/utils";

const navigation = [
  { name: "Appointments", href: "/patient/appointments" },
  { name: "Services", href: "/patient/services" },
  { name: "Medical History", href: "/patient/medical-history" },
  { name: "Settings", href: "/patient/settings" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {profile, isError } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    async function fetchData() {
      if(isError) { 
        toast.error("Failed to load profile. Please refresh page");
      }

      dispatch(getMyDetails());
    }

    fetchData();
  }, [dispatch])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/patient/dashboard">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="logo"
              width={200}
              height={40}
              className="h-7 w-fit bg-dark1 rounded-[8px] p-1"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.name}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full md:flex md:w-auto md:flex-1 md:justify-end md:space-x-4">
            <Searchbar />
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                {profile?.profilePicture ? (
                  <Image
                    src={getImageSrc(profile?.profilePicture)}
                    alt="profile"
                    height={1000}
                    width={1000}
                    className='w-9 h-9 rounded-full mx-auto sm:mx-0'
                  />
                ) : (
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile?.firstName[0]}${profile?.lastName[0]}`} />
                    <AvatarFallback>HE</AvatarFallback>
                  </Avatar>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <Link href="/patient/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-8" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

