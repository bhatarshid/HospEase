import { E164Number } from "libphonenumber-js/core";
import React, { useState } from 'react'
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import Image from 'next/image';
import { Input } from './ui/input';
import PhoneInput from "react-phone-number-input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password"
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [showPassword, setPassword] = useState(false)
  
  const togglePasswordVisibility = () => {
    setPassword(!showPassword)
  }
  
  switch(props.fieldType){
    case FormFieldType.INPUT:
      return (
        <div className="flex border rounded-[8px] border-gray-300">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return(
        <div className="flex border rounded-[8px] border-gray-300 px-5 py-2">
          <FormControl>
            <PhoneInput
              defaultCountry="IN"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <div className="relative flex border rounded-[8px] border-gray-300">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </FormControl>
        
      )
    default:
      return null;
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field } : any) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField