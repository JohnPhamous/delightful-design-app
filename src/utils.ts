import { Config, States } from "@/app/types";
import { AnimationProps } from "framer-motion";
import { CSSProperties } from "react";

export const getStyles = (
  config: Config["state"],
  styles: Record<States, CSSProperties>
): CSSProperties => {
  if (styles[config]) {
    return styles[config];
  }

  return {};
};

export const TRANSITION_PROPERTIES: AnimationProps["transition"] = {
  duration: 1,
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomAnimalName(): string {
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
