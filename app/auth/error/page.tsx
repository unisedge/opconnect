"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorPage() {
  return (
    <div className="max-w-lg min-w-[400px]">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center"> Oops!... </CardTitle>
          <CardDescription className="text-center">
            Something went wrong!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-destructive" />
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
