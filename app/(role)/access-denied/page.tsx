"use client";

import { Button } from "@/components/ui/button";

import React from "react";

type Props = {};

const Guest = (props: Props) => {
  return (
    <div>
      <Button size="lg" variant="destructive">
        Acess Denied
      </Button>
    </div>
  );
};

export default Guest;
