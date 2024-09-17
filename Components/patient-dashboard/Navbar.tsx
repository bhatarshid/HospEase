'use client'
import { BellPlus, Contact, Mail, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useState } from "react";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link href="#">Appointments</Link>
          <Link href="#">Services</Link>
          <Link href="#">Medical History</Link>
          <Link href="#">Settings</Link>
        </div>
        <div className="hidden md:flex w-[40%] justify-between px-1 py-1 space-x-1 text-dark2 items-center">
          <Searchbar />
          <BellPlus size={24} />
          <Mail size={24} />
          <Contact size={24} />
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </section>
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 w-4/5 ml-auto bg-dark3 text-dark1 p-4 flex flex-col items-start space-y-4 md:hidden z-40">
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Message</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Appointments</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Notifications</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Medical History</Link>
          <Link className="border-b-2 w-[80%] border-dark2" href="#" onClick={() => setIsMenuOpen(false)}>Settings</Link>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
