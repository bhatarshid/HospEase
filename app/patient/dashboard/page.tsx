import DashboardNavbar from "@/Components/patient-dashboard/Navbar"

const Dashboard = () => {
  return (
    <div className="flex max-h-full bg-backgroundColor text-dark1">
      <div className=" w-screen">
        <DashboardNavbar />
      </div>
    </div>
  )
}

export default Dashboard