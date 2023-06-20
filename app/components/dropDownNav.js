'use client'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineMenuFold } from "react-icons/ai";
import Link from "next/link";

export default function DropDownNav() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const getLinkClass = (index) => {
        let linkClass = "";
        // if (active === index) {
        //     linkClass += "text-[#F65867]";
        // }
        return linkClass;
    };
    return (
        <div className="md:hidden">
            {isDropdownOpen ? <AiOutlineMenuFold onClick={handleDropdownToggle} /> : <AiOutlineMenu onClick={handleDropdownToggle} />}
            {isDropdownOpen && (
                <div className="absolute rounded-md top-20 left-0 w-full dark:bg-[#201C1D] bg-[#F9F9F9] p-4 z-10">
                    {/* Dropdown content goes here */}
                    <div className="flex flex-col items-center py-6 gap-3">
                        <Link href="/dashboard" className={getLinkClass(1)} onClick={handleDropdownToggle}>Dashboard</Link>
                        <Link href="/student" className={getLinkClass(2)} onClick={handleDropdownToggle}>Students</Link>
                        <Link href="/book" className={getLinkClass(3)} onClick={handleDropdownToggle}>Books</Link>
                        <Link href="/setting" className={getLinkClass(3)} onClick={handleDropdownToggle}>Setting</Link>
                        <Link href="/setting" className={getLinkClass(4)} onClick={handleDropdownToggle}>SignUp</Link>
                    </div>
                </div>
            )}
        </div>
    )
}
