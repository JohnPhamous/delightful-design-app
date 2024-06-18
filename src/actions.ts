"use server";
import { Message } from "@/app/types";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Filter from "bad-words";

export const submitPostAction = async (formData: FormData) => {
  const text = formData.get("text")!.toString() || "";

  const filter = new Filter();
  const sanitizedText = filter.clean(text);

  const payload: Omit<Message, "id"> = {
    text: sanitizedText,
    createdAt: new Date(),
    createdBy: generateRandomAnimalName(),
  };

  // @ts-expect-error
  sql`INSERT INTO messages (text, "createdAt", "createdBy") VALUES (${payload.text}, ${payload.createdAt}, ${payload.createdBy})`;

  revalidatePath("/");
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomAnimalName(): string {
  const adjectives = [
    "Swift",
    "Cunning",
    "Brave",
    "Fierce",
    "Gentle",
    "Mighty",
    "Silent",
    "Playful",
    "Loyal",
    "Noble",
  ];

  const animals = [
    "Lion",
    "Tiger",
    "Bear",
    "Wolf",
    "Eagle",
    "Falcon",
    "Shark",
    "Panther",
    "Elephant",
    "Leopard",
    "Fox",
    "Rabbit",
    "Hawk",
    "Owl",
    "Dolphin",
    "Whale",
    "Giraffe",
    "Zebra",
    "Buffalo",
    "Cheetah",
  ];

  const adjective = getRandomElement(adjectives);
  const animal = getRandomElement(animals);

  return `${adjective} ${animal}`;
}
