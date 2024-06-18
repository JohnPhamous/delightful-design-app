"use client";

import { changeState } from "@/app/admin/actions";
import { Config } from "@/app/types";
import React from "react";

interface ComponentProps {
  state: Config["state"];
}

export function AdminButtons({ state }: ComponentProps): JSX.Element {
  return (
    <div className="w-100vw h-dvh flex justify-center items-center gap-7">
      <button
        className="w-24 aspect-square bg-slate-600 text-3xl"
        onClick={async () => {
          changeState("left");
        }}
      >
        -
      </button>
      <p>{state}</p>
      <button
        className="w-24 aspect-square bg-slate-600 text-3xl"
        onClick={async () => {
          changeState("right");
        }}
      >
        +
      </button>
    </div>
  );
}
