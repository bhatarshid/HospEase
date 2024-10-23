import { ServiceGrid } from "@/Components/patient-dashboard/ServiceGrid"

const Service = () => {
  return (
    <div className="max-h-full w-full">
      <ServiceGrid service='services' />
    </div>
  )
}

export default Service