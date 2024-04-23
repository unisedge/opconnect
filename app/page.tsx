import Image from "next/image";
import landing from "@/public/arrivals.png";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import LoginPage from "./(role)/auth/login/page";

export default async function Home() {
  return (
    <main className="flex flex-col  h-full items-center justify-center">
      <div className="flex text-center">
        <Image
          src={landing}
          alt="landing page image"
          className="w-12 h-12 dark:invert"
        />
        <h1 className="text-2xl font-extrabold p-3 ">
          Landing Page...
        </h1>
      </div>

      <Button size="lg" asChild className="">
        <Link href="/auth/login">Sign In</Link>
      </Button>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">SignIn</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <LoginPage />
        </DialogContent>
      </Dialog> */}
    </main>
  );
}
