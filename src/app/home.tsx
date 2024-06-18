"use client";

import { submitPostAction } from "@/actions";
import { Logo } from "@/app/components/logo";
import { Post } from "@/app/components/post";
import { Config, Message } from "@/app/types";
import {
  generateRandomAnimalName,
  getStyles,
  TRANSITION_PROPERTIES,
} from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useOptimistic } from "react";
import { nanoid } from "nanoid";
import styles from "./home.module.css";

interface HomeProps {
  messages: Message[];
  config: Config["state"];
}

export function Home({ config, messages }: HomeProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    Message
  >(messages, (state, newMessage) => [newMessage, ...state]);

  const slowPost = async (formData: FormData) => {
    if (config === 6) {
      const payload = {
        text: formData.get("text")!.toString() || "",
        createdAt: new Date(),
        createdBy: generateRandomAnimalName(),
        id: nanoid(),
      };

      // @ts-expect-error
      addOptimisticMessage(payload);
      submitPostAction(payload);
      setValue("");
      return;
    }
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      submitPostAction({
        text: formData.get("text")!.toString() || "",
      });
      setLoading(false);
      setValue("");
    }, 2000);
  };

  useEffect(() => {
    if (config === 1) {
      document.documentElement.style.overflow = "revert";
    } else {
      document.documentElement.style.overflow = "hidden";
    }
  }, [config]);

  return (
    <motion.main
      layout
      style={getStyles(config, {
        "1": {
          padding: "0px",
        },
        "2": {
          height: "100dvh",
          overflow: "hidden",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
        },
        "3": {
          height: "100dvh",
          overflow: "hidden",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
        },
        "4": {
          height: "100dvh",
          overflow: "hidden",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
        },
        "5": {
          height: "100dvh",
          overflow: "hidden",
          padding: "16px 0",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
        },
        "6": {
          height: "100dvh",
          overflow: "hidden",
          padding: "16px 0",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
        },
      })}
      transition={TRANSITION_PROPERTIES}
    >
      <motion.div
        className="h-16"
        layout="position"
        transition={TRANSITION_PROPERTIES}
        style={getStyles(config, {
          "1": {
            display: "flex",
            justifyContent: "flex-start",
          },
          "2": {
            display: "flex",
            justifyContent: "center",
          },
          "3": {
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #2E2E2E",
            paddingBottom: "16px",
          },
          "4": {
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #2E2E2E",
            paddingBottom: "16px",
          },
          "5": {
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #2E2E2E",
            paddingBottom: "16px",
          },
          "6": {
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #2E2E2E",
            paddingBottom: "16px",
          },
        })}
      >
        <div>
          <Logo />
        </div>
      </motion.div>
      <>
        <motion.ul
          className="overflow-auto"
          style={getStyles(config, {
            "1": {},
            "2": {
              flexGrow: 1,
            },
            "3": {
              flexGrow: 1,
            },
            "4": {
              flexGrow: 1,
            },
            "5": {
              flexGrow: 1,
            },
            "6": {
              flexGrow: 1,
            },
          })}
          transition={TRANSITION_PROPERTIES}
        >
          {optimisticMessages.map((message) => {
            return <Post message={message} key={message.id} config={config} />;
          })}
        </motion.ul>
      </>

      <motion.form
        action={slowPost}
        style={getStyles(config, {
          "1": {},
          "2": {
            padding: "8px 0",
          },
          "3": {
            padding: "8px 0",
          },
          "4": {
            padding: "8px 0",
          },
          "5": {
            padding: "16px 12px",
            borderTop: "1px solid #2E2E2E",
            background: "#0A0A0A",
            position: "relative",
          },
          "6": {
            padding: "16px 12px",
            borderTop: "1px solid #2E2E2E",
            background: "#0A0A0A",
            position: "relative",
          },
        })}
        transition={TRANSITION_PROPERTIES}
      >
        <motion.input
          aria-label="New post"
          name="text"
          id="text"
          placeholder="I'm thinking of..."
          required
          maxLength={254}
          layout
          value={value}
          className="outline-none focus:!border-gray-600"
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          transition={TRANSITION_PROPERTIES}
          style={getStyles(config, {
            "1": {},
            "2": {},
            "3": {},
            "4": {},
            "5": {
              padding: "8px 12px",
              paddingRight: "64px",
              backgroundColor: "#0A0A0A",
              fontSize: 16,
              color: "white",
              borderRadius: "6px",
              border: "1px solid #2E2E2E",
              width: "100%",
            },
            "6": {
              padding: "8px 12px",
              paddingRight: "64px",
              backgroundColor: "#0A0A0A",
              fontSize: 16,
              color: "white",
              borderRadius: "6px",
              border: "1px solid #2E2E2E",
              width: "100%",
            },
          })}
        />
        <AnimatePresence mode="popLayout">
          {(value.length > 0 || config < 5) && (
            <motion.button
              layoutId="submit-button"
              type="submit"
              disabled={loading}
              className="focus-visible:outline outline-blue-400 outline-2 outline-offset-2 before:content-[''] relative before:absolute before:inset-[-8px] hover:!bg-green-600"
              layout="position"
              transition={TRANSITION_PROPERTIES}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={getStyles(config, {
                "1": {},
                "2": {},
                "3": {},
                "4": {},
                "5": {
                  position: "absolute",
                  right: 20,
                  top: 24,
                  backgroundColor: "#19C37B",
                  color: "black",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: 14,
                  lineHeight: "normal",
                },
                "6": {
                  position: "absolute",
                  right: 20,
                  top: 24,
                  backgroundColor: "#19C37B",
                  color: "black",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: 14,
                  lineHeight: "normal",
                },
              })}
            >
              {loading ? (
                <span className="flex gap-1 items-center">
                  Posting...
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                      className={styles.spinner}
                    />
                  </svg>
                </span>
              ) : config < 5 ? (
                "Create New Post"
              ) : (
                "Post"
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.main>
  );
}
