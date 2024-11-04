"use client"

import { Form } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { LoginInput } from "@/types/entities";
import { useSelector, useDispatch } from 'react-redux'
import { signin, reset } from "@/redux/features/auth-slice";
import { AppDispatch, RootState } from "@/redux/store";


const SigninForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

  const form = useForm<LoginInput>({
    defaultValues: {
      phoneNumber: '',
      password: ''
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      if (user?.isRegistered) {
        router.push('/patient/dashboard')
      }
      else {
        router.push('/patient/register')
      }
    }

    dispatch(reset())
  }, [ isError, isSuccess, router, dispatch]);

  const onSubmit = async (data: LoginInput) => {
    // handle form submission
    dispatch(signin(data));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 text-[#8f8e8e] space-y-5">
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phoneNumber"
          label="Please enter your phone number"
          placeholder=""
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Please enter your password"
          placeholder="Password"
        />

        <SubmitButton isLoading={isLoading}>Signin</SubmitButton>
      </form>
    </Form>
  )
}

export default SigninForm