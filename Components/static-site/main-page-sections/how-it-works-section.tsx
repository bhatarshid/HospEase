import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

const steps = [
  {
    step: "Step 1",
    title: "Signup",
    details: ["Enter Phone number", "Enter password", "Verify using OTP"],
  },
  {
    step: "Step 2",
    title: "Register Profile",
    details: ["Enter Personal details", "This will include the medical data", "Accept privacy and policy"],
  },
  {
    step: "Step 3",
    title: "Book Appointment",
    details: ["Browse service", "Book an appointment", "Manage an appointment"],
  },
]

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">How does this work</h2>
          <p className="max-w-[900px] text-gray-500 text-sm md:text-base lg:text-lg">
            Simple steps to get started with our healthcare services
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
          {steps.map((item) => (
            <Card key={item.step} className="bg-gray-100/80">
              <CardHeader>
                <p className="text-xs md:text-sm text-gray-500">{item.step}</p>
                <CardTitle className="text-lg md:text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.details.map((detail, index) => (
                    <li key={index} className="text-xs md:text-sm text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

