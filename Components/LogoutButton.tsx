'use client'

import Image from "next/image"
import { Button } from "./ui/button"
import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";


const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      await signOut({ 
        callbackUrl: '/auth/signin',
        redirect: true
      });

      toast.success('Logout successful');
    } catch (error) {
      toast.error('Logout Failed');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Button onClick={handleLogout} disabled={isLoading} variant="ghost" className="p-0 pr-5">
        {isLoading ? (
          <div className="">
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={24}
              height={24}
              className="animate-spin"
            />
            Loading...
          </div>
        ) : (
          <>Logout</>
        )}
      </Button>
    </div>
  )
}

export default LogoutButton