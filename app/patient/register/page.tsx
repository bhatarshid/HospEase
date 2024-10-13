import RegisterForm from "@/Components/forms/RegisterForm"
import Image from "next/image"

const Register = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <section className="text-dark1">
            <h1 className="text-[28px] text-start">Welcome 👋</h1>
            <p className="text-[14px] text-dark2 font-thin text-start">Let us know more about yourself</p>
          </section>
          <hr className="my-6"/>

          <RegisterForm />

          <p className="copyright py-12 font-thin text-sm">© 2024 CarePluse</p>
        </div>
      </section>
      <Image 
        src="/assets/images/register-img.png"
        alt="doctor"
        width={1000}
        height={1000}
        className="max-w-[390px]"
      />
    </div>
  )
}

export default Register