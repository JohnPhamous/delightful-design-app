"use client";

import { Config, Message } from "@/app/types";
import { getStyles, TRANSITION_PROPERTIES } from "@/utils";
import { clsx } from "clsx";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { motion } from "framer-motion";
import React, { CSSProperties } from "react";
import JohnPhamousAvatar from "./johnphamous.jpeg";
import Image from "next/image";

interface PostProps {
  message: Message;
  config: Config["state"];
}

export function Post({ message, config }: PostProps): JSX.Element {
  return (
    <motion.li
      key={message.id}
      layout
      layoutId={`post-${message.id}`}
      style={getStyles(config, {
        "1": {},
        "2": {
          display: "flex",
          padding: "12px 12px",
        },
        "3": {
          display: "flex",
          padding: "12px 12px",
          gap: "8px",
          borderBottom: "1px solid #2E2E2E",
        },
        "4": {
          display: "flex",
          padding: "12px 12px",
          gap: "8px",
          borderBottom: "1px solid #2E2E2E",
        },
        "5": {
          display: "flex",
          padding: "12px 12px",
          gap: "8px",
          borderBottom: "1px solid #2E2E2E",
        },
        "6": {
          display: "flex",
          padding: "12px 12px",
          gap: "8px",
          borderBottom: "1px solid #2E2E2E",
        },
      })}
      transition={TRANSITION_PROPERTIES}
      className={clsx(
        "transition-colors duration-1000",
        config >= 3 && "last-of-type:!border-b-transparent"
      )}
    >
      <Avatar
        name={message.createdBy}
        style={getStyles(config, {
          "1": {
            display: "block",
            height: 18,
            width: 18,
          },
          "2": {
            display: "block",
            height: 18,
            width: 18,
          },
          "3": {
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
          },
          "4": {
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
          },
          "5": {
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
          },
          "6": {
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
          },
        })}
        colors={config < 4 ? RAW_COLORS : A11Y_COLORS}
      />
      <motion.div
        className={clsx("flex items-start")}
        style={getStyles(config, {
          "1": {},
          "2": {
            display: "flex",
            flexDirection: "column",
            width: "100%",
          },
          "3": {
            display: "flex",
            flexDirection: "column",
            width: "100%",
          },
          "4": {
            display: "flex",
            flexDirection: "column",
            width: "100%",
          },
          "5": {
            display: "flex",
            flexDirection: "column",
            width: "100%",
          },
          "6": {
            display: "flex",
            flexDirection: "column",
            width: "100%",
          },
        })}
        transition={TRANSITION_PROPERTIES}
      >
        <motion.div
          transition={TRANSITION_PROPERTIES}
          style={getStyles(config, {
            "1": {},
            "2": {},
            "3": {
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            },
            "4": {
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            },
            "5": {
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            },
            "6": {
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            },
          })}
        >
          <motion.h4
            layout="position"
            transition={TRANSITION_PROPERTIES}
            style={getStyles(config, {
              "1": {},
              "2": {},
              "3": {
                fontWeight: 500,
              },
              "4": {
                fontWeight: 500,
              },
              "5": {
                fontWeight: 500,
              },
              "6": {
                fontWeight: 500,
              },
            })}
          >
            {message.createdBy}
          </motion.h4>
          <span>
            <span className="sr-only">Posted at</span>
            <motion.time
              dateTime={message.createdAt.toISOString()}
              layout="position"
              transition={TRANSITION_PROPERTIES}
              style={getStyles(config, {
                "1": {},
                "2": {},
                "3": {
                  color: "#A1A1A1",
                },
                "4": {
                  color: "#A1A1A1",
                },
                "5": {
                  color: "#A1A1A1",
                },
                "6": {
                  color: "#A1A1A1",
                },
              })}
            >
              {config < 4 && "Posted "}
              {config < 4
                ? formatDistanceToNow(message.createdAt, {
                    addSuffix: false,
                  })
                : shortenRelativeDate(
                    formatDistanceToNowStrict(message.createdAt, {
                      addSuffix: false,
                    })
                  )}
            </motion.time>
          </span>
        </motion.div>
        <motion.p
          layout="position"
          transition={TRANSITION_PROPERTIES}
          style={getStyles(config, {
            "1": {},
            "2": {},
            "3": { lineHeight: "20px" },
            "4": { lineHeight: "20px", marginRight: "32px" },
            "5": { lineHeight: "20px", marginRight: "32px" },
            "6": { lineHeight: "20px", marginRight: "32px" },
          })}
        >
          {message.richText || message.text}
        </motion.p>
      </motion.div>
    </motion.li>
  );
}

const shortenRelativeDate = (date: string) => {
  const tokens = date.split(" ");

  if (tokens.length === 2) {
    if (tokens[1] === "seconds") {
      return "<1m";
    }
    return `${tokens[0]}${tokens[1].at(0)}`;
  }

  return "<1m";
};

const Avatar = ({
  name,
  style,
  colors,
}: {
  name: string;
  style: CSSProperties;
  colors: string[];
}) => {
  const names = name.split(" ");
  const initials = `${names[0].at(0)}${
    names[1] ? names[1].at(0) : ""
  }`.toUpperCase();

  const key = hashString(name);

  return (
    <motion.span
      transition={TRANSITION_PROPERTIES}
      layout="position"
      className="rounded-full h-fit overflow-hidden"
      aria-hidden
      style={{
        ...style,
        backgroundColor: colors[key % colors.length],
        flexShrink: 0,
      }}
    >
      {name === "johnphamous" ? (
        <Image src={JohnPhamousAvatar} alt="" />
      ) : (
        <>{initials}</>
      )}
    </motion.span>
  );
};

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

const RAW_COLORS = ["#FF0044", "#006CFE", "#FFCC41", "#B476FB", "#29B278"];

const A11Y_COLORS = ["#440C13", "#032249", "#361A00", "#331141", "#002A22"];
