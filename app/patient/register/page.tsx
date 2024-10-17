'use client'
import RegisterForm from "@/Components/forms/RegisterForm"
import PatientProfile from "@/Components/patient-dashboard/Profile"
import { RootState } from "@/redux/store";
import Image from "next/image"
import { useSelector } from "react-redux";


const Register = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-full flex-1 flex-col py-10">
          <section className="text-dark1">
            <h1 className="text-[28px] text-start">Welcome 👋</h1>
            <p className="text-[14px] text-dark2 font-thin text-start">Let us know more about yourself</p>
          </section>
          <hr className="my-6"/>

          {user && <PatientProfile />}
          {!user && <RegisterForm />}


          <p className="copyright py-12 font-thin text-sm">© 2024 CarePluse</p>
        </div>
      </section>
      <Image 
        src="/assets/images/register-img.png"
        alt="doctor"
        width={1000}
        height={1000}
        className="max-w-[30%]"
      />
    </div>
  )
}

export default Register