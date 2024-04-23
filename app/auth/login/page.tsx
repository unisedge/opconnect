"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Icons } from "@/components/icons";
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
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
// import { signIn } from "next-auth/react";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  // const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSucess("");
    startTransition(() => {
      // login(values, callbackUrl).then((data) => {
      login(values).then((data) => {
        setError(data?.error);
        // when added 2FA
        // setSucess(data?.success);
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
            LOGIN
          </CardTitle>
          <CardDescription className="text-center ">
            Enter credentials to signin
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
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="px-0 font-normal "
                      >
                        <Link href="/auth/reset-password">
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error || urlError} />
              <FormSucess message={sucess} />
              <Button type="submit" className="w-full ">
                SignIn
              </Button>
            </form>
          </Form>
          {/* <CardFooter>
          <Button className="w-full">Sign In</Button>
        </CardFooter> */}
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-full  font-normal"
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            variant="link"
            size="sm"
            asChild
            className="w-full "
          >
            <Link href="/auth/register">Don't have an account?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
