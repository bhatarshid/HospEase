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
          <section className="mt-5 flex flex-row justify-between px-10">
            <div>
              <h1 className="font-semibold text-dark1 text-2xl">Welcome, John!</h1>
              <p className="text-dark3">Hello there! Welcome to out application. How can we assist you today?</p>
            </div>
            <div className="flex flex-row bg-white w-fit h-1/2 px-3 py-1 rounded-[8px] space-x-2 my-auto">
              <CalendarDays color="blue" size={24} />
              <p className="text-dark2 ">{new Date().toDateString()}</p>
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