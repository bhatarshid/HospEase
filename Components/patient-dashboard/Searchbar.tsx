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
  }
  return (      
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center w-[60%]">
        <FormField
          control={form.control}
          name="searchInput"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  placeholder="Search..."
                  {...field}
                  className="h-8 rounded-l-full focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/5 h-8 rounded-r-full bg-dark3 hover:text-white hover:bg-dark1">
          <Search className="h-4 w-4" size={24} />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </Form>
  )
}

export default Searchbar