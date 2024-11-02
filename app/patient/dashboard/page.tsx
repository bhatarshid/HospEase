'use client'

import RightsideBar from "@/Components/patient-dashboard/RightsideBar"
import { CalendarDays } from "lucide-react"
import { ServiceGrid } from "@/Components/patient-dashboard/ServiceGrid";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";

const Dashboard = () => {
  const {user} = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen">
      <div className="remove-scrollbar max-h-full w-full lg:w-[80%] space-y-10 p-7 pr-0"> 
        <section className="flex flex-col sm:flex-row-reverse justify-between">
          <div className="flex flex-row items-center justify-center bg-white w-46 h-1/2 px-2 py-1 rounded-[8px] space-x-2 my-auto ml-4 mb-5 md:mb-0">
            <CalendarDays color="blue" size={24} className="" />
            <p className="text-dark2 text-xs sm:text-sm md:text-base text-[16px]">{new Date().toDateString()}</p>
          </div>
          <div>
            <h1 className="font-semibold text-dark1 text-2xl">Welcome, {user?.firstName ?? 'User'}! </h1>
            <p className="text-dark3 text-sm md:text-base lg:text-[16px]">Hello there! Welcome to our application. How can we assist you today?</p>
          </div>
        </section>
        <ServiceGrid service='dashboard'/>
      </div>
      <RightsideBar />
    </div>
  )
}

export default Dashboard