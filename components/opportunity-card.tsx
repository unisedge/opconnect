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
import { OpportunitySchema } from "@/schemas";
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
import { addOpportunity } from "@/hooks/opportunities-mutations";

type Props = {};

export const OpportunityCard = ({}: Props) => {
  const [err, setErr] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");

  const { isPending, mutateAsync, variables } = addOpportunity();

  const form = useForm<z.infer<typeof OpportunitySchema>>({
    resolver: zodResolver(OpportunitySchema),
    defaultValues: {
      type: "",
      jobTitle: "",
      link: "",
      company: "",
      description: "",
    },
  });
  function onSubmit(values: z.infer<typeof OpportunitySchema>) {
    setErr("");
    setSucess("");
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
    // console.log("variables : ", variables);
  }
  return (
    <div className="max-w-2xl min-w-[500px]">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center tracking-[3px]">
            Adding Opportunity
          </CardTitle>
          <CardDescription className="text-center tracking-wide">
            Enter necessary details
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
                      <FormLabel className="tracking-wide">Type</FormLabel>
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
                      <FormLabel className="tracking-wide">Job Title</FormLabel>
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
                      <FormLabel className="tracking-wide">Link</FormLabel>
                      <FormControl className="text-xs">
                        <Input
                          type="text"
                          placeholder="paste your link in here.."
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription className="tracking-[1px] ">
                          Please put application link in here...
                        </FormDescription> */}
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
                      <FormLabel className="tracking-wide">Company</FormLabel>
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
                      <FormLabel className="tracking-wide">
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
              <Button
                type="submit"
                className="w-full tracking-[4px]"
                disabled={isPending}
                value={isPending ? "adding..." : "add"}
              >
                Add
              </Button>
            </form>
          </Form>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </CardContent>
      </Card>
    </div>
  );
};
