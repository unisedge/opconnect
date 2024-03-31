"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

import React from "react";

type Props = {};

const StudentDashboard = (props: Props) => {
  // const { update } = useSession();
  // then after changing someting, we have to call update() int .then()
  // then after rhe above step go to auth.js and change the jwt field.
  const user = useCurrentUser();
  const onclick = () => {
    logout();
  };
  return (
    <div>
      {JSON.stringify(user)}
      <Button size="lg" onClick={onclick}>
        Logout
      </Button>
    </div>
  );
};

export default StudentDashboard;
