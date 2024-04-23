"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// import { Icons } from "@/components/icons";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
// import { signIn } from "next-auth/react";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "",
    },
  });
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError("");
    setSucess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSucess(data.success);
      });
    });
  }
  // const onclick = (provider: "google" | "github") => {
  //   signIn(provider, {
  //     callbackUrl: DEFAULT_LOGIN_REDIRECT,
  //   });
  // };
  return (
    <div className="max-w-lg min-w-[400px]">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center ">
            SignUp
          </CardTitle>
          <CardDescription className="text-center ">
            Create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" onClick={() => onclick("github")}>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" onClick={() => onclick("google")}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div> */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with credentials
              </span>
            </div> */}
          </div>
          {/*  */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@sru.edu.in"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                      Please enter your college email only.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="example" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        Who are you?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          {/* <Input type="text" placeholder="student" {...field} /> */}
                          <SelectTrigger>
                            <SelectValue placeholder="Select here..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="STUDENT">Student</SelectItem>
                          <SelectItem value="MENTOR">Mentor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSucess message={sucess} />
              <Button type="submit" className="w-full ">
                Register
              </Button>
            </form>
          </Form>
          {/* <CardFooter>
          <Button className="w-full">Sign In</Button>
        </CardFooter> */}
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            size="sm"
            asChild
            className="w-full "
          >
            <Link href="/auth/login">Already have an account?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
