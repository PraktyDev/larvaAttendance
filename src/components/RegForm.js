"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { User } from 'lucide-react';

const formSchema = z.object({
  name: z.string({ message: "Enter a student name" }),
  studentnumber: z.number().min(4, {
    message: "Student number must be a number",
  }),
  course: z.string({ message: "Enter student course" }),
  cohort: z.number({ message: "Enter student cohort" }),
})

export function RegForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      studentnumber: "",
      course: "",
      cohort: "",
    },
  })
  
  const { reset } = form
  const { isDirty, isValid, isSubmitting, isSubmitSuccessful } = form.formState
 
  const onSubmit = (values) => {
    console.log(values)

  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset()
    }
  },[isSubmitSuccessful, reset])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-10 max-w-lg flex flex-col m-auto">
        <div className="flex flex-col gap-3 justify-center items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage  src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-gray-100" ><User color="black" size={40} /></AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-orange-400 w-48 text-white rounded-3xl" type="file" placeholder="image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-slate-100 rounded-md" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentnumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-slate-100 rounded-md mb-2" type="number" placeholder="Student Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-slate-100 rounded-md mb-2" placeholder="Course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cohort"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="bg-slate-100 rounded-md mb-2" type="number" placeholder="Cohort" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-[#F39B3B] hover:bg-orange-400 text-white rounded-lg" type="submit" disabled={!isDirty || !isValid} >{isSubmitting ? "Loading..." : "Register Student"}</Button>
      </form>
    </Form>
  )
}
