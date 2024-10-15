'use client'

import Image from "next/image"
import { Button } from "./ui/button"
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { reset, signout } from "@/redux/features/auth-slice";


const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      router.push('/auth/signin')
    }

    dispatch(reset());
  }, [ isError, isSuccess, message, router, dispatch]);

  const handleLogout = async () => {
    dispatch(signout());
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