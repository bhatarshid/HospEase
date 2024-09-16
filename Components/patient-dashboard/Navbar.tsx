import { BellPlus, Contact, Mail } from "lucide-react"
import Image from "next/image"
import Searchbar from "./Searchbar"

const DashboardNavbar = () => {
  return (
    <div className="flex flex-row justify-between items-center mx-10 mt-3 h-8 p-5">
      <div className="w-[10%] flex justify-start items-center">
      <Image 
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={200}
        height={40}
        className="h-7 w-fit bg-primary rounded-[8px] p-1"
      />
      </div>
      <section className="flex justify-center items-center w-2/5">
        <Searchbar />
      </section>
      <section className="w-[15%] flex justify-between px-3 py-1 space-x-2 text-dark1">
        <BellPlus size={24} />
        <Mail size={24} />
        <Contact size={24} />
      </section>
    </div>
  )
}

export default DashboardNavbar