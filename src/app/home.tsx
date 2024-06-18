"use client";

import { submitPostAction } from "@/actions";
import { Logo } from "@/app/components/logo";
import { Post } from "@/app/components/post";
import { Config, Message, States } from "@/app/types";
import { getStyles, TRANSITION_PROPERTIES } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface HomeProps {
  messages: Message[];
  config: Config["state"];
}

export function Home({ config, messages }: HomeProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const slowPost = async (formData: FormData) => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      submitPostAction(formData);
      setLoading(false);
      setValue("");
    }, 2000);
  };

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
          })}
          transition={TRANSITION_PROPERTIES}
        >
          {messages.map((message) => {
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
        })}
        transition={TRANSITION_PROPERTIES}
      >
        <motion.input
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
          })}
        />
        <AnimatePresence>
          {(value.length > 0 || config < 5) && (
            <motion.button
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
              })}
            >
              {loading ? "Posting..." : config < 5 ? "Create New Post" : "Post"}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.main>
  );
}
