'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Form } from '@/Components/ui/form';
import CustomFormField, { FormFieldType } from '@/Components/CustomFormField';
import SubmitButton from '@/Components/SubmitButton';
import { useForm } from "react-hook-form";

const ContactUsPage = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
  });

  const onSubmit = async (data: any) => {
    // handle form submission

  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Get in touch with our team for any inquiries or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 text-[#8f8e8e] space-y-5">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Please enter your name"
                    placeholder=""
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Please enter your name"
                    placeholder=""
                  />
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="name"
                    label="Please enter your name"
                    placeholder=""
                  />

                  <SubmitButton isLoading={false}>Send</SubmitButton>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 font-medium">Address</h4>
                  <p className="text-gray-600">
                    123 Main Street, Anytown USA 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 font-medium">Phone</h4>
                  <p className="text-gray-600">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="text-gray-900 font-medium">Email</h4>
                  <p className="text-gray-600">info@hospease.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;