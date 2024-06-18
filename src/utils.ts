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
