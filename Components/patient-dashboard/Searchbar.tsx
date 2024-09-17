"use client"

import { Form, FormControl, FormField, FormItem } from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const Searchbar = () => {
  const form = useForm({
    defaultValues: {
      searchInput: ''
    },
  });

  const onSubmit = () => {
    // handle form submission
    console.log("onSubmit")
  }
  return (      
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row items-center px-3 space-y-5 bg-white rounded-2xl">
        <div className="flex items-center justify-between h-8">
          <FormField
            control={form.control}
            name="searchInput"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Input
                    placeholder="Search..."
                    {...field}
                    className="h-full px-2 py-1 focus:outline-none border-0"
                  />
                </FormControl>
              </FormItem>
            )}
          >
          </FormField>
          <Button type="submit" className="relative h-full px-1 ml-1 bg-white"><Search size={20} /></Button>
        </div>
      </form>
    </Form>
  )
}

export default Searchbar