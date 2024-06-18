"use server";
import { Message } from "@/app/types";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Filter from "bad-words";
import { generateRandomAnimalName } from "@/utils";

export const submitPostAction = async ({
  createdAt,
  createdBy,
  text,
}: {
  text: string;
  createdAt?: Date;
  createdBy?: string;
}) => {
  const filter = new Filter();
  const sanitizedText = filter.clean(text);

  const payload: Omit<Message, "id"> = {
    text: sanitizedText,
    createdAt: createdAt || new Date(),
    createdBy: createdBy || generateRandomAnimalName(),
  };

  // @ts-expect-error
  sql`INSERT INTO messages (text, "createdAt", "createdBy") VALUES (${payload.text}, ${payload.createdAt}, ${payload.createdBy})`;

  revalidatePath("/");
};
