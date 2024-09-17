import Image from "next/image"
import Link from "next/link"

const Services = () => {
  return (
    <section className="mt-5 px-10">
      <h1 className="font-semibold text-dark1 text-[20px]">Services</h1>
      <div className="flex flex-row py-1 gap-6 overflow-visible">
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/stethoscope.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">GP</h2>
          </div>
        </Link>
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/heart.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">Cardiologist</h2>
          </div>
        </Link>
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/heart.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">Oncologist</h2>
          </div>
        </Link>
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/heart.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">Dentist</h2>
          </div>
        </Link>
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/heart.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">Neurologist</h2>
          </div>
        </Link>
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/heart.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">Psychiatrists</h2>
          </div>
        </Link>
        <Link href="#">
          <div className="bg-white w-[110px] h-[120px] flex flex-col justify-center items-center space-y-2 rounded-[6px] shadow-md">
            <Image 
              src="/assets/images/heart.png"
              height={60}
              width={60}
              alt="Stethoscope"
            />
            <h2 className="text-[16px] text-dark2 px-2">ENT</h2>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Services