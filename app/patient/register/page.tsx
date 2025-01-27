import RegisterForm from '@/Components/forms/RegisterForm'
import React from 'react'

const page = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container max-w-[70%]">
        <div className="sub-container max-w-full flex-1 flex-col py-10">
          <h1 className="text-[28px] text-start p-4">Welcome 👋</h1>
          <p className="text-[14px] text-dark2 font-thin text-start p-4">Let us know more about yourself</p>
          <RegisterForm />
        </div>
      </section>
    </div>
  )
}

export default page