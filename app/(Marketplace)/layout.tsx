import Navbar from "@/Components/static-site/Navbar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="bg-backgroundColor">{children}</main>
    </>
  )
}