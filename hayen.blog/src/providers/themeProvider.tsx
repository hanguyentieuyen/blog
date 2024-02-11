"use client";

import { GlobalContext } from "@/context";
import { ReactNode, useContext, useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useContext(GlobalContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }
}
