import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Online Service Booking
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Book a healthcare service with one click. Experience seamless healthcare scheduling designed around your
                needs.
              </p>
            </div>
          </div>
          <div className="mx-auto lg:mx-0">
            <Image 
              src="/assets/images/doctor-img.png"
              height={496}
              width={496}
              alt="doctor"
              className='px-10'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

