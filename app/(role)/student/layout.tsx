"use client";
import { logout } from "@/actions/logout";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StudentLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const onclick = () => {
    logout();
  };
  return (
    <section className="h-full w-full gap-2 flex">
      <section className="sm:w-[25%] md:w-[15%] border-r-2 mx-2">
        <section className="flex flex-col justify-start items-start my-24">
          <Button
            variant="link"
            asChild
            className={`${
              pathname === "/student"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            }`}
          >
            <Link href="/student">Home</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className={`${
              pathname === "/student/oppurtunities"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            }`}
          >
            <Link href="/student/oppurtunities">Opportunities</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className={`${
              pathname === "/student/applications"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            }`}
          >
            <Link href="/student/applications">My Applications</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className={`${
              pathname === "/student/profile"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            }`}
          >
            <Link href="/student/profile">Profile</Link>
          </Button>
          <Button variant="link" onClick={onclick} className="">
            Logout
          </Button>
          <section className="w-20">
            <ModeToggle />
          </section>
        </section>
      </section>
      <section className="w-full my-12">{children}</section>
    </section>
  );
};

export default StudentLayout;
