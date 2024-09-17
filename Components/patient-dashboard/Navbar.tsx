import { BellPlus, Contact, Mail } from "lucide-react"
import Image from "next/image"
import Searchbar from "./Searchbar"
import Link from "next/link"

const DashboardNavbar = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-backgroundColor h-8 fixed top-0 left-0 right-0 z-50 p-7 border-b-2 shadow-md border-dark3 rounded-[6px]">
      <div className="w-[10%] flex justify-start items-center">
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
      <section className=" w-[50%] flex flex-row justify-between text-base px-2 h-7 text-dark2">
        <div>Appointments</div>
        <div>Notifications</div>
        <div>Services</div>
        <div>Medical History</div>
        <div>Settings</div>    
      </section>
      <section className="w-[32%] flex justify-between px-1 py-1 space-x-1 text-dark2 items-center">
        <Searchbar />
        <BellPlus size={24} />
        <Mail size={24} />
        <Contact size={24} />
      </section>
    </div>
  )
}

export default DashboardNavbar