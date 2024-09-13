'use client'
import { useState } from "react";
import SubmitButton from "../SubmitButton"

const Navbar = () => {
  const [singinIsLoading, setSigninIsLoading] = useState(false);
  const [signupIsLoading, setSignupIsLoading] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center mx-10 mt-3 h-8 p-5">
      <div className="w-[10%] flex justify-start items-center">
        LOGO
      </div>
      <section className="bg-white w-[65%] flex items-center justify-between px-3 py-1 rounded-2xl mr-6">
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
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