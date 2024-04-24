"use client";
import { Button } from "@/components/ui/button";
import { HashLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSucess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

export default function VerificationPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!...");
    }
    newVerification(token!)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!...");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="max-w-lg min-w-[400px]">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            User verification
          </CardTitle>
          <CardDescription className="text-center">
            please wait while we verify you . . .
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          {!success && !error && <HashLoader className="dark:invert" />}
          {!success && <FormError message={error} />}

          <FormSucess message={success} />
        </CardContent>
        <CardFooter>
          <Button variant="link" size="sm" asChild className="w-full">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
