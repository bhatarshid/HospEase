"use client"

import { Form } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";


const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      
    },
  });

  const onSubmit = () => {
    // handle form submission
    console.log("onSubmit")
    setIsLoading(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 text-[#8f8e8e] space-y-5">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="firstNmae"
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