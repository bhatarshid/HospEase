'use client'
import { BellPlus, Contact, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import LogoutButton from "../LogoutButton";
import { getImageSrc } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { getMyDetails, reset } from "@/redux/features/profile-slice";
import { Avatar, AvatarImage } from "../ui/avatar";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {profile, isError } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(isError) { 
      toast.error("Failed to load profile. Please refresh page");
      dispatch(reset());
    }

    dispatch(getMyDetails());
  }, [dispatch])

  return (
    <div className="flex flex-row justify-between items-center bg-backgroundColor h-8 fixed top-0 left-0 right-0 z-50 p-7 border-b-2 shadow-md border-dark3 rounded-[6px]">
      <div className="w-[15%] flex justify-start items-center">
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
      <section className="flex flex-1 justify-end md:items-center md:justify-between space-x-4">
        <div className="hidden md:flex w-[50%] justify-between text-base px-2 h-7 text-dark2">
          <Link href="/patient/appointments">Appointments</Link>
          <Link href="/patient/services">Services</Link>
          <Link href="#">Medical History</Link>
          <Link href="#">Settings</Link>
        </div>
        <div className="hidden md:flex w-[40%] justify-between px-1 py-1 space-x-1 text-dark2 items-center">
          <Searchbar />
          <BellPlus size={24} />
          <div className="relative"> {/* Added: Wrapper div for positioning context */}
            <Button 
              variant="ghost" 
              onClick={() => setIsOpen(!isOpen)}
            >
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
                </Avatar>
              )}
            </Button>
            {isOpen && (
              <div className="absolute top-full right-0 w-32 bg-backgroundColor text-dark1 flex flex-col items-start space-y-4 z-0 p-3 mr-2 rounded-xl shadow-lg border-2 border-dark3">
                <Link href="/patient/register">Profile</Link>
                <LogoutButton />  
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </section>
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-64 bg-backgroundColor text-dark1 flex flex-col items-start space-y-4 z-0 p-3 mr-2 rounded-xl shadow-lg border-2 border-dark3">
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Message</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Appointments</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Notifications</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Medical History</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Settings</Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
