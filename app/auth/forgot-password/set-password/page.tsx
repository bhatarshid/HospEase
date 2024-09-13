import SetPasswordForm from "@/Components/forms/SetPasswordForm"
import Image from "next/image"

const SetPassword = () => {
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
          <h1 className="text-[28px] text-center flex justify-center">Set Password</h1>
          <p className="text-[14px] font-thin flex justify-center">Enter new password here</p>
        </section>
        <hr className="my-5"/>

        <SetPasswordForm />

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

export default SetPassword