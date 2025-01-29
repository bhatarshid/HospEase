import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Heart, Brain, Stethoscope, Microscope } from "lucide-react"

const services = [
  {
    title: "Primary Care",
    description: "Comprehensive health services for individuals and families.",
    icon: Heart,
  },
  {
    title: "Specialized Care",
    description: "Expert medical care in specific areas of medicine.",
    icon: Brain,
  },
  {
    title: "Diagnostics",
    description: "Advanced diagnostic services and medical testing.",
    icon: Microscope,
  },
  {
    title: "Consultations",
    description: "Professional medical consultations and second opinions.",
    icon: Stethoscope,
  },
]

export function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-500 to-blue-600">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl">Our Services</h2>
          <p className="max-w-[900px] text-white/80 text-sm md:text-base lg:text-lg">
            We provide a wide range of medical services to meet your healthcare needs
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <Icon className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
                  <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-gray-500">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

