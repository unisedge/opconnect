"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.number().min(10,{
	message:"phone number should be minimum 10 digits",
  }).max(10,{
	message:"phone number should be maximum 10 digits",
  }),
  dateOfBirth: z.date(),
  gender: z.string(),
  address: z.string(),
})

export default function ProfileForm() {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "akshay rao",
	  lastName: "chennamaneni",
	  phone: 8179139379,
	  dateOfBirth: "2000-10-18",
	  address: "2-7/1 wadkapur",
    },
  })
 
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 " >
        <FormField
          control={form.control}
          name="profileform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input placeholder="akshay rao" {...field} className="w-30"/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
			
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
