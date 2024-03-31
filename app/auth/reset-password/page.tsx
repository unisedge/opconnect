"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { resetEmail } from "@/actions/reset-password";

export default function ResetPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof PasswordResetSchema>) {
    setError("");
    setSucess("");
    startTransition(() => {
      resetEmail(values).then((data) => {
        setError(data?.error);
        setSucess(data?.success);
      });
    });
  }

  return (
    <div className="max-w-lg min-w-[400px]">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Forgot your password?
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@sru.edu.in"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        * Enter your verified email only.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSucess message={sucess} />
              <Button type="submit" className="w-full ">
                Send reset email
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="link" size="sm" asChild className="w-full">
            <Link href="/auth/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
