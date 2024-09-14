'use client'
import { useState } from "react";
import SubmitButton from "../SubmitButton"
import Image from "next/image";

const Navbar = () => {
  const [singinIsLoading, setSigninIsLoading] = useState(false);
  const [signupIsLoading, setSignupIsLoading] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center mx-10 mt-3 h-8 p-5">
      <div className="w-[10%] flex justify-start items-center">
      <Image 
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={200}
        height={40}
        className="h-7 w-fit bg-primary rounded-[8px] p-1"
      />
      </div>
      <section className="bg-white w-[65%] flex items-center justify-between px-10 py-1 rounded-2xl mr-6">
        <div>About us</div>
        <div>Services</div>
        <div>Department</div>
        <div>Contact Us</div>
      </section>
      <section className="w-[15%] flex justify-between px-3 py-1 space-x-2">
        <SubmitButton isLoading={singinIsLoading} className="bg-primary h-7 rounded-xl text-white">
          Login
        </SubmitButton>
        <SubmitButton isLoading={signupIsLoading} className="bg-white h-7 border border-primary rounded-xl">
          Signup
        </SubmitButton> 
      </section>
    </div>
  )
}

export default Navbar