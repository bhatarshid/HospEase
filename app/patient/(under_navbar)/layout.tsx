import DashboardNavbar from "@/Components/patient-dashboard/Navbar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="bg-backgroundColor">{children}</main>
    </>
  )
}