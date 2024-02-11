"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
};

const initialState = {
  loading: false,
  setLoading: () => {},
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

const getThemeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const valueTheme = localStorage.getItem("theme");
    return valueTheme || "light";
  }
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    return getThemeFromLocalStorage() || "light";
  });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  //Update local storage after toggle change current value theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <GlobalContext.Provider
      value={{ loading, setLoading, theme, setTheme, toggleTheme }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
