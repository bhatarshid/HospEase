"use client"

import { useForm } from "react-hook-form"
import { Search } from 'lucide-react'
import { Input } from "@/Components/ui/input"

const Searchbar = () => {
  const form = useForm({
    defaultValues: {
      searchInput: ''
    },
  })

  const onSubmit = (data: { searchInput: string }) => {
    // handle form submission
    console.log(data.searchInput)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        {...form.register("searchInput")}
        placeholder="Search..."
        className="pl-8 pr-4 py-2 w-full h-9 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </form>
  )
}

export default Searchbar
