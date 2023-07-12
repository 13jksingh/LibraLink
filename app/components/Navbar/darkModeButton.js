'use client'
import React, { useEffect, useState } from 'react'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from 'next-themes';

export default function DarkModeButton() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [currentTheme , setCurrentTheme] = useState(null);
    useEffect(()=>{
        theme === 'system' ? setCurrentTheme(systemTheme) : setCurrentTheme(theme);
    },[theme])
    return (
        <button
            onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
            className='hover:bg-slate-400 transition rounded-md p-2'
        >
            {currentTheme == "dark" ? <CiLight /> : <MdDarkMode />}
        </button>
    )
}
