import SigninForm from "@/Components/forms/SigninForm"
import Image from "next/image"
import Link from "next/link"

const Signin = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="mx-auto flex size-full flex-col max-w-[496px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit bg-primary mt-5 rounded-xl px-2 py-1"
          />
        </div>
        
        <section className="text-[#6b6969]">
          <h1 className="text-[28px] text-center flex justify-center">Login</h1>
          <p className="text-[14px] font-thin flex justify-center">Sign in to continue</p>
        </section>
        <hr className="my-5"/>

        <SigninForm />

        <div className="flex flex-col text-[#8f8e8e] font-thin text-sm">
          <div className="flex flex-row justify-between">
            <p className="copyright py-12"><Link href="/auth/forgot-password" className="text-blue-700">Forgot Password</Link></p>
            <p className="copyright py-12">Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-700">Signup</Link></p>
          </div>
          <p className="font-thin text-sm">© 2024 CarePluse</p>
        </div>
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

export default Signin