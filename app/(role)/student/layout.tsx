"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StudentLayout = async ({ children }: { children: React.ReactNode }) => {
  const onclick = () => {
    logout();
  };
  return (
    <section className="h-full w-full gap-2 flex">
      <section className="flex  flex-col justify-start items-start border border-slate-100 rounded-xl my-12 sm:w-[25%] md:w-[25%] ">
        <Button variant="link" asChild>
          <Link href="/student">Home</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/student/applications">My Applications</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/student/about">About</Link>
        </Button>
        <Button variant="link" onClick={onclick}>
          Logout
        </Button>
      </section>
      <section className="w-full border border-slate-100 rounded-xl my-12">
        {children}
      </section>
    </section>
  );
};

export default StudentLayout;
