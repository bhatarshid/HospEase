import ForgotPasswordForm from "@/Components/forms/ForgotPasswordForm";
import { PasskeyModal } from "@/Components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = ({ searchParams }: SearchParamProps) => {
  const isOTP = searchParams.isotp === 'true';
  return (
    <div className="flex h-screen max-h-screen">
     {isOTP && <PasskeyModal />}
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
          <h1 className="text-[28px] text-center flex justify-center">Forgot Password</h1>
          <p className="text-[14px] font-thin flex justify-center">Recover your password here</p>
        </section>
        <hr className="my-5"/>

        <ForgotPasswordForm />

        <div className="flex flex-row text-[#8f8e8e] justify-between font-thin text-sm">
          <p className="py-12">© 2024 CarePluse</p>
          <p className="py-12"><Link href="/auth/signin" className="text-blue-700">Signin</Link></p>
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

export default ForgotPassword