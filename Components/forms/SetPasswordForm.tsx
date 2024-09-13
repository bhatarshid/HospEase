"use client"

import { Form } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

// todo: new password and confirm password must be same

const SetPasswordForm = () => {
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
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="newPassword"
          label="Please enter your password"
          placeholder="Password"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="confirmPassword"
          label="Please enter your password"
          placeholder="Password"
        />

        <SubmitButton isLoading={isLoading}>Set Password</SubmitButton>
      </form>
    </Form>
  )
}

export default SetPasswordForm