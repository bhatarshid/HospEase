import Image from "next/image"

const BottomBar = () => {
  return (
    <div className="mx-10 space-y-4">
      <Image 
        src="/assets/icons/logo-full.svg"
        alt="logo"
        width={200}
        height={50}
        className="h-10 w-fit bg-primary rounded-xl p-1"
      />
      <section className="flex justify-between pb-5">
        <div className="space-y-2 text-start">
          <p>Company</p>
          <p>Privacy Policy</p>
          <p>Terms and conditions</p>
        </div>
        <div className="space-y-2 text-start">
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Why hospease?</p>
        </div>
        <div className="space-y-2 text-start">
          <p>FAQs</p>
          <p>Get Support</p>
        </div>
      </section>
      <p className="font-thin text-sm pb-5">© 2024 HospEase. All rights reserved.</p>
    </div>
  )
}

export default BottomBar