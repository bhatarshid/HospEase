import SignupForm from "@/Components/forms/SignupForm"
import Image from "next/image"
import Link from "next/link"

const Signup = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="mx-auto flex size-full flex-col max-w-[496px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit bg-primary mt-5"
          />
        </div>
        
        <section className="text-[#6b6969]">
          <h1 className="text-[28px] text-center flex justify-center">Create New Account</h1>
          <p className="text-[14px] font-thin flex justify-center">Already Registered? <Link href="/auth/signin" className="text-blue-700">Login</Link></p>
        </section>
        <hr className="my-5"/>

        <SignupForm />

        <p className="copyright py-12 font-thin text-sm">© 2024 CarePluse</p>
      </section>
      <Image 
        src="/assets/images/doctor-image.png"
        alt="doctor"
        width={1000}
        height={1000}
        className="max-w-[50%]"
      />
    </div>
  )
}

export default Signup