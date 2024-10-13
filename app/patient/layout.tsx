import DashboardNavbar from "@/Components/patient-dashboard/Navbar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="p-4">{children}</main>
    </>
  )
}