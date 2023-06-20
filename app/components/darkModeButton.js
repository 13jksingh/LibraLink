'use client'
import React from 'react'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function DarkModeButton() {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <button
            onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
        >
            <div className="hover:bg-slate-400 transition rounded-md p-2">
                {currentTheme == "dark" ? <CiLight /> : <MdDarkMode />}
            </div>
        </button>
    )
}
