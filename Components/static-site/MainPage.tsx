import Image from 'next/image'
import Navbar from './Navbar'
import BottomBar from './BottomBar'

const MainPage = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="space-y-10 py-10 mx-auto items-center w-full justify-between">
        <section className="mx-10 flex flex-row justify-between">
          <div className='items-center w-full my-auto'>
            <h1 className='text-[64px] font-semibold'>Welcome to Online Service Booking</h1>
            <h2 className="text-[16px] font-thin text-darkcolor-medium">Book a healthcare service with one click</h2>
          </div>
          <Image 
            src="/assets/images/doctor-img.png"
            height={496}
            width={496}
            alt="doctor"
            className='px-10'
          />
        </section>
        <section className='mx-10 pb-10 bg-primary flex flex-col justify-center text-white rounded-xl'>
          <h1 className="text-[32px] text-center py-5">Our Services</h1>
          <div className='over  flow-x-auto px-10 flex flex-row justify-center gap-6'>
            <div className="flex flex-col px-10 min-w-[200px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center text'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            <div className="flex flex-col px-10 min-w-[250px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            <div className="flex flex-col px-10 min-w-[250px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            <div className="flex flex-col px-10 min-w-[250px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
          </div>
        </section>
        <section className='mx-10'>
          <h1 className="text-[32px] text-center py-5">How does this work</h1>
          <div className='flex flex-row space-x-10 px-16'>
            <div className='bg-gray-300 p-10 rounded-xl w-1/3'>
              <h2 className='text-[16px] text-darkcolor-low text-start py-3'> Step 1 </h2>
              <h2 className='text-[20px] text-darkcolor-medium text-start pb-4'> Signup </h2>
              <p className='text-[14px] text-start pb-1'>Enter Phone number</p>
              <p className='text-[14px] text-start pb-1'>Enter password</p>
              <p className='text-[14px] text-start'>Verify using otp</p>
            </div>
            <div className='bg-gray-300 p-10 rounded-xl w-1/3'>
              <h2 className='text-[16px] text-darkcolor-low text-start py-3'> Step 2 </h2>
              <h2 className='text-[20px] text-darkcolor-medium text-start pb-4'> Register Profile </h2>
              <p className='text-[14px] text-start pb-1'>Enter Personal details</p>
              <p className='text-[14px] text-start pb-1'>This will include the medical data</p>
              <p className='text-[14px] text-start'>Accept privacy and policy</p>
            </div>
            <div className='bg-gray-300 p-10 rounded-xl w-1/3'>
              <h2 className='text-[16px] text-darkcolor-low text-start py-3'> Step 3 </h2>
              <h2 className='text-[20px] text-darkcolor-medium text-start pb-4'> Book Appointment </h2>
              <p className='text-[14px] text-start pb-1'>Browse service</p>
              <p className='text-[14px] text-start pb-1'>Book an appoint</p>
              <p className='text-[14px] text-start'>Manage an appointment</p>
            </div>
          </div>
        </section>
        <section className='mx-10 pb-10 bg-primary flex flex-col justify-center text-white rounded-xl'>
          <h1 className="text-[32px] text-center py-5">Reviews</h1>
          <div className='overflow-x-auto px-10 flex flex-row justify-center gap-6'>
            <div className="flex flex-col px-10 min-w-[200px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center text'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            <div className="flex flex-col px-10 min-w-[250px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            <div className="flex flex-col px-10 min-w-[250px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            <div className="flex flex-col px-10 min-w-[250px] items-center">
              <Image 
                src="/assets/icons/close.svg"
                height={120}
                width={120}
                alt='name'
                className=''
              />
              <h2 className='font-semibold text-[20px] text-center'>LOREM IPSUM</h2>
              <p className="font-thin text-sm text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
          </div>
        </section>
      </div>
      <div>
        <BottomBar />
      </div>
    </div>
  )
}

export default MainPage