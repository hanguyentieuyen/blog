"use client";

import { initialBlogFrom } from "@/constanst";
import { BlogForm } from "@/types";
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
  formBlog: BlogForm;
  setFormBlog: Dispatch<SetStateAction<BlogForm>>
};

const initialState = {
  loading: false,
  setLoading: () => {},
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  formBlog: initialBlogFrom,
  setFormBlog: () => {}
};

const getThemeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const valueTheme = localStorage.getItem("theme");
    return valueTheme || "light";
  }
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    return getThemeFromLocalStorage() || "light";
  });
  const [formBlog, setFormBlog] = useState(initialBlogFrom)
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  //Update local storage after toggle change current value theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <GlobalContext.Provider
      value={{ loading, setLoading, theme, setTheme, toggleTheme, formBlog, setFormBlog }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
