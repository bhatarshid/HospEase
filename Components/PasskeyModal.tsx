'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from './ui/input-otp'


import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/navigation"

export const PasskeyModal = () => {
  const router = useRouter()
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');


  const closeModal = () => {
    setOpen(false)
    router.push('/auth/forgot-password')
  }

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if(true) {
      setOpen(false);
      router.push('/auth/forgot-password/set-password')
    }
    else {
      setError('Invalid passkey. Please try again')
    }
  }
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Enter OTP
            <Image 
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer bg-slate-700"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To reset the password, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="shad-error text-sm mt-4 flex justify-center">
              {error}
            </p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)} className="shad-primary-btn w-full">
            Enter valid OTP
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}