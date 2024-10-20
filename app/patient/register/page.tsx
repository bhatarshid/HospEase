'use client'
import RegisterForm from "@/Components/forms/RegisterForm"
import PatientProfile from "@/Components/patient-dashboard/Profile"
import { RootState } from "@/redux/store";
import Image from "next/image"
import { useSelector } from "react-redux";


const Register = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-full flex-1 flex-col py-10">
          <section className="text-dark1">
            {user?.isRegistered === false ? (
              <>
                <h1 className="text-[28px] text-start">Welcome 👋</h1>
                <p className="text-[14px] text-dark2 font-thin text-start">Let us know more about yourself</p>
              </>
            ) : (
              <h1 className="text-[28px] text-start">Profile</h1>
            )}
          </section>
          <hr className="my-6"/>

          {user?.isRegistered && <PatientProfile />}
          {!user?.isRegistered && <RegisterForm />}
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