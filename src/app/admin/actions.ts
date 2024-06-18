"use server";

import { sql } from "@vercel/postgres";

export const changeState = async (direction: "left" | "right") => {
  if (direction === "left") {
    await sql`UPDATE config SET state = state - 1`;
  } else {
    await sql`UPDATE config SET state = state + 1`;
  }
};
