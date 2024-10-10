import { CalendarDays, ChevronsDown, Clock, LucideMessageCirclePlus, User } from "lucide-react"
import Link from "next/link"

const RightsideBar = () => {
  return (
    <div className="w-[20%] h-full flex-col justify-center items-center bg-backgroundColor fixed top-[58px] right-0 z-0  border-l-[1px] border-dark3">
      <div className="px-3 py-2 flex flex-col">
        <h1 className="font-semibold text-dark1">Upcoming Schedule</h1>
        <section className="py-1 bg-white mt-2 rounded-xl shadow-md">
          <div className="flex flex-col lg:flex-row px-2 py-2">
            <User  size={44} />
            <div className="flex-col">  
              <h1 className="">Dr. Alexander Boje</h1>
              <h2 className="text-xs text-dark3">Orthopedic</h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mx-2 rounded-[6px] bg-[#eaf1fe] justify-between py-2 px-1">
            <div className="flex py-2 lg:py-0">
              <CalendarDays className="my-auto" color="blue" size={20} />
              <h1 className="text-[12px] my-auto px-2">June 12, 2025</h1>
            </div>
            <div className="flex">
              <Clock className="my-auto" color="blue" size={20} />
              <h1 className="text-[12px] my-auto px-2">09:00 - 10:00</h1>
            </div>
          </div>
        </section>
        <section className="py-1 bg-white mt-2 rounded-xl shadow-md">
          <div className="flex flex-col lg:flex-row px-2 py-2">
            <User  size={44} />
            <div className="flex-col">  
              <h1 className="">Dr. Alexander Boje</h1>
              <h2 className="text-xs text-dark3">Orthopedic</h2>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mx-2 rounded-[6px] bg-[#eaf1fe] justify-between py-2 px-1">
            <div className="flex py-2 lg:py-0">
              <CalendarDays className="my-auto" color="blue" size={20} />
              <h1 className="text-[12px] my-auto px-2">June 12, 2025</h1>
            </div>
            <div className="flex">
              <Clock className="my-auto" color="blue" size={20} />
              <h1 className="text-[12px] my-auto px-2">09:00 - 10:00</h1>
            </div>
          </div>
        </section>
        <div className="flex my-auto justify-center h-8 mt-2">
          <Link href='#'><ChevronsDown size={24} className="text-primary"/></Link>
        </div>
        <hr className="border-t-2 border-dark3 rounded-full w-[70%] mx-auto mt-2"/>
      </div>
      <div className="px-3 py-2 flex flex-col">
        <h1 className="font-semibold text-dark1">Calendar</h1>
        <section className="mt-2">
          <CalendarDays className="h-[50%] w-[70%]" />
        </section>
        <hr className="border-t-2 border-dark3 rounded-full w-[70%] mx-auto mt-2"/> 
      </div>
      <Link href="#">
        <div className="mx-auto px-3 py-2 flex flex-row text-primary">
            <LucideMessageCirclePlus className="mx-2" size={24} />
            <h1 className="font-semibold">Chat with us</h1>
        </div >
      </Link>
    </div>
  )
}

export default RightsideBar