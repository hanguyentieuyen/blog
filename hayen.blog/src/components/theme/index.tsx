"use client"
import { GlobalContext } from "@/context"
import { useContext } from "react"
import  {BsSunFill} from "react-icons/bs"
import { MdDarkMode } from "react-icons/md"

export default function ToggleTheme() {
    const {toggleTheme, theme} = useContext(GlobalContext)
    return (
        <button onClick={toggleTheme}>
            {theme === "dark" ? <MdDarkMode size={30} color="#fff" /> : <BsSunFill size={30} />}
        </button>
    )
}