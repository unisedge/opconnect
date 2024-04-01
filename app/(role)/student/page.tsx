"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
// import { useSession } from "next-auth/react";

import React from "react";

type Props = {};

const StudentDashboard = (props: Props) => {
  // const { update } = useSession();
  // then after changing someting, we have to call update() int .then()
  // then after rhe above step go to auth.js and change the jwt field.

  const user = useCurrentUser();

  return (
    <section className="w-full text-wrap h-full">
      <header className="w-full text-center p-2 text-xl font-extrabold border-b rounded-2xl tracking-widest">
        <h1>Dashboard Page</h1>
      </header>
      <main className="flex h-full items-center justify-center gap-3 ">
        <div>
          <Image
            src={user?.image as string}
            alt="Picture of the author"
            width={100}
            height={100}
            className="rounded-2xl"
          />
        </div>
        <div>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          {/* <p>profile: {user?.image}</p> */}
        </div>
      </main>
    </section>
  );
};

export default StudentDashboard;
