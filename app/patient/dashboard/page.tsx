import DashboardNavbar from "@/Components/patient-dashboard/Navbar"
import RightsideBar from "@/Components/patient-dashboard/RightsideBar"
import { CalendarDays } from "lucide-react"
import Services from "../services/page"

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <main className="flex h-screen max-h-screen mt-16">
        <div className="remove-scrollbar max-h-full w-[80%] bg-backgroundColor"> 
          <section className=" mt-5 flex flex-col sm:flex-row-reverse justify-between px-10">
            <div className="flex flex-row items-center justify-center bg-white w-46 h-1/2 px-2 py-1 rounded-[8px] space-x-2 my-auto ml-4 mb-5 md:mb-0">
              <CalendarDays color="blue" size={24} className="" />
              <p className="text-dark2 text-xs sm:text-sm md:text-base text-[16px]">{new Date().toDateString()}</p>
            </div>
            <div>
              <h1 className="font-semibold text-dark1 text-2xl">Welcome, John!</h1>
              <p className="text-dark3 text-sm md:text-base lg:text-[16px]">Hello there! Welcome to out application. How can we assist you today?</p>
            </div>
          </section>
          <Services />
        </div>
        <RightsideBar />
      </main>
    </>
  )
}

export default Dashboard