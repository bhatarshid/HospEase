import DashboardNavbar from "@/Components/patient-dashboard/Navbar"
import RightsideBar from "@/Components/patient-dashboard/RightsideBar"

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <main className="flex h-screen max-h-screen mt-16">
        <section className="remove-scrollbar container"> 
        <div className="">
          <h1>hello</h1>
        </div>
        </section>
        <RightsideBar />
      </main>
    </>
  )
}

export default Dashboard

{/* <div className=" w-screen">
          <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
              <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                
              </div>
            </section>
            <RightsideBar />
          </div>
        </div> */}