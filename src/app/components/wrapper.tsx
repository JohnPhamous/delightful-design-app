"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useInterval } from "usehooks-ts";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps): JSX.Element {
  useRefreshComponentIfFocus();
  useKeepScreenWake();

  return <>{children}</>;
}

const useRefreshComponentIfFocus = () => {
  const router = useRouter();
  const pollingInterval = 1000;

  useInterval(() => {
    router.refresh();
  }, pollingInterval);
};

const useKeepScreenWake = () => {
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const acquireLock = async () => {
      if (wakeLock.current === null) {
        try {
          const lock = await navigator.wakeLock.request("screen");
          wakeLock.current = lock;
        } catch (err) {
          // no-op
        }
      }
    };

    const releaseLock = async () => {
      if (wakeLock.current) {
        await wakeLock.current.release();
        wakeLock.current = null;
      }
    };

    window.addEventListener("focus", acquireLock);
    window.addEventListener("blur", releaseLock);

    acquireLock();

    return () => {
      releaseLock();

      window.removeEventListener("focus", acquireLock);
      window.removeEventListener("blur", releaseLock);
    };
  }, []);
};
