"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MentorLayout = async ({ children }: { children: React.ReactNode }) => {
  const onclick = () => {
    logout();
  };
  return (
    <section className="h-full w-full gap-2 flex">
      <section
        className="flex  flex-col justify-start items-start my-24 
      sm:w-[25%] md:w-[15%] "
      >
        <Button variant="link" asChild className="">
          <Link href="/mentor">Home</Link>
        </Button>
        <Button variant="link" asChild className="">
          <Link href="/mentor/about">About</Link>
        </Button>
        <Button variant="link" onClick={onclick} className="">
          Logout
        </Button>
      </section>
      <section className="w-full my-12">{children}</section>
    </section>
  );
};

export default MentorLayout;
