"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

import React, { useEffect } from "react";

type Props = {};

const Role = (props: Props) => {
  // const { update } = useSession();
  // then after changing someting, we have to call update() int .then()
  // then after rhe above step go to auth.js and change the jwt field.
  const user = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (user.role === "STUDENT") {
      router.push("/student");
    } else if (user.role === "ADMIN") {
      router.push("/admin");
    } else if (user.role === "GUEST") {
      router.push("/guest");
    }
  }, [user]);

  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <Button size="lg">Just!. Auth</Button>
    </div>
  );
};

export default Role;
