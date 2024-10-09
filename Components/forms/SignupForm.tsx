"use client"

import { Form } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { CreateUserInput, SignupResponse } from "@/types/entities";
import { signupAPI } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { ApiErrorType } from "@/types/entities/common-types";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateUserInput) => {
    // handle form submission
    setIsLoading(true);
    const { firstName, lastName, phoneNumber, password} = data;
    try {
      const response: SignupResponse | ApiErrorType = await signupAPI({
        firstName,
        password,
        lastName,
        phoneNumber
      });
      console.log(response)
      if ((response as ApiErrorType).error || (response as ApiErrorType).status !== 201) {
        toast.error(response.error.error)
        return
      }

      toast.success('Signup successful! You can now log in')
      router.push('/auth/signin');
    }
    catch (error) {
      toast.error('Uh oh! Something went wrong')
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 text-[#8f8e8e] space-y-5">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="firstName"
          label="Please enter your first name"
          placeholder="John"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="lastName"
          label="Please enter your last name"
          placeholder="Doe"
        />
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

        <SubmitButton isLoading={isLoading}>Signup</SubmitButton>
      </form>
    </Form>
  )
}

export default SignupForm