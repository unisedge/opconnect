"use client";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { OpportunityEditSchema } from "@/schemas";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DialogClose, DialogFooter } from "./ui/dialog";
import {
  addOpportunity,
  editOpportunity,
} from "@/hooks/opportunities-mutations";
import { Opportunity } from "@prisma/client";

type Props = {
  opportunity: Opportunity;
};

export const EditOpportunity = ({ opportunity }: Props) => {
  const [err, setErr] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");

  const { isPending, mutateAsync, variables } = editOpportunity();

  const form = useForm<z.infer<typeof OpportunityEditSchema>>({
    resolver: zodResolver(OpportunityEditSchema),
    defaultValues: {
      id: opportunity.id,
      type: opportunity.type,
      jobTitle: opportunity.jobTitle!,
      link: opportunity.link!,
      company: opportunity.company!,
      description: opportunity.description!,
    },
  });
  function onSubmit(values: z.infer<typeof OpportunityEditSchema>) {
    setErr("");
    setSucess("");
    console.log("form values : ", values);
    mutateAsync(values)
      .then((data) => {
        if (data?.error) {
          form.reset();
          setErr(data?.error);
        }

        if (data?.success) {
          setSucess(data?.success);
          form.reset();
          setTimeout(() => setSucess(""), 3000);
        }
      })
      .catch(() => setErr("Something went wrong!..."));
  }
  return (
    // <div className="max-w-2xl min-w-[500px]">
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center ">
          Editing Opportunity
        </CardTitle>
        <CardDescription className="text-center ">
          Do necessary edits and proceed to save changes
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="type"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Type</FormLabel>
                    <span className="text-sm">*</span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-xs">
                          <SelectValue placeholder="Select here . . ." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="OffCampus">Off Campus</SelectItem>
                        <SelectItem value="OnCampus">On Campus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Job Title</FormLabel>
                    <FormControl className="text-xs">
                      <Input
                        type="text"
                        placeholder="SDE or SWE or ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Link</FormLabel>
                    <FormControl className="text-xs">
                      <Input
                        type="text"
                        placeholder="paste your link in here.."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Company</FormLabel>
                    <FormControl className="text-xs">
                      <Input
                        type="text"
                        placeholder="Enter company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">
                      Job Description
                    </FormLabel>
                    <FormControl className="text-xs">
                      <Input
                        type="text"
                        placeholder="Enter details"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={err} />
            <FormSucess message={sucess} />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-full "
                  disabled={isPending}
                  value={isPending ? "adding..." : "add"}
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
    // </div>
  );
};
