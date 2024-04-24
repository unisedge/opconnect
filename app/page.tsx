import Image from "next/image";
import landing from "@/public/arrivals.png";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
  return (
    <main className="flex flex-col h-full  items-center justify-center">
      <div className="flex text-center">
        <Image
          src={landing}
          alt="landing page image"
          className="w-12 h-12 dark:invert"
        />
        <h1 className="text-2xl font-extrabold p-3 w-full">
          Landing Page . . .
        </h1>
        <div>
          <ModeToggle />
        </div>
      </div>

      <Button size="lg" asChild className="">
        <Link href="/auth/login">Sign In</Link>
      </Button>
    </main>
  );
}
