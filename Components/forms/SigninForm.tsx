"use client"

import { Form } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<{ phoneNumber: string; password: string; }>({
    defaultValues: {
      
    },
  });

  const onSubmit = async (data: { phoneNumber: string; password: string; }) => {
    // handle form submission
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        phoneNumber: data.phoneNumber,
        password: data.password,
        redirect: false,
      });
      console.log({result})
      if (result?.error) {
        toast.error(result.error)
        return;
      }

      if (result?.ok) {
        toast.success("Login successful")
        router.push("/patient/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error('Uh oh! Something went wrong')
    } finally {
      setIsLoading(false);
    }
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