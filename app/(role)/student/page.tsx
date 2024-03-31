"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
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
      <header className="w-full text-center p-2 text-xl font-extrabold border-b rounded-2xl">
        <h1>Dashboard Page</h1>
      </header>
      <main className="flex flex-col h-full items-center justify-center ">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </main>
    </section>
  );
};

export default StudentDashboard;
