'use client'
import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode, MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineLibrary } from "react-icons/hi";
import { AiOutlineMenu, AiOutlineMenuFold } from "react-icons/ai";
const Navbar = ({ toggleDarkMode, segment }) => {
    let active;
    if (segment === "dashboard") {
        active = 1;
    } else if (segment === "book") {
        active = 2;
    } else if (segment === "student") {
        active = 3;
    } else if (segment === "setting") {
        active = 4;
    }
    const [darkMode, setDarkMode] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        toggleDarkMode(); // Call the toggleDarkMode function from props
    }

    const getLinkClass = (index) => {
        let linkClass = "";
        if (active === index) {
            linkClass += "text-[#F65867]";
        }
        return linkClass;
    };

    return (
        <nav className="h-15 p-5 px-10 flex justify-between items-center text-3xl">
            <div className="flex gap-10 font-bold items-center">
                <HiOutlineLibrary />
                <h1>{`${segment.charAt(0).toUpperCase()}${segment.slice(1)}`}</h1>
            </div>
            <div>
                <input type="text" className="hidden text-xl lg:block rounded-xl bg-[#F8F8F8] px-4 w-[400px] py-2 text-slate-950 focus:outline-none" placeholder="Search ..." />
            </div>
            <div className="flex gap-3 items-center md:gap-5">
                <button onClick={handleDarkModeToggle}>
                    <div className="hover:bg-slate-400 transition rounded-md p-2">
                        {darkMode ? <CiLight /> : <MdDarkMode />}
                    </div>
                </button>
                {/* {status === 'loading' ? <>     <div className=" border-t-teal-400 w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <span class="ml-2 text-base">loading</span></> : status === 'authenticated' ? (
                        <>
                            <img className=' rounded-full hover:border-2 border-emerald-300 transition duration-200' width={40} height={40} src={data.user.image} alt={data.user.name + ' photo'} />
                            <button className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline text-base" onClick={signOut}>Sign Out</button>
                        </>
                    ) : <button className=" text-base border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline" onClick={() => signIn('google')}>Sign In</button>
                } */}

                <div className="md:hidden">
                    {isDropdownOpen ? <AiOutlineMenuFold onClick={handleDropdownToggle} /> : <AiOutlineMenu onClick={handleDropdownToggle} />}
                    {isDropdownOpen && (
                        <div className="absolute rounded-md top-20 left-0 w-full dark:bg-[#201C1D] bg-[#F9F9F9] p-4 z-10">
                            {/* Dropdown content goes here */}
                            <div className="flex flex-col items-center py-6 gap-3">
                                <a href="/dashboard" className={getLinkClass(1)}>Dashboard</a>
                                <a href="/student" className={getLinkClass(2)}>Students</a>
                                <a href="/book" className={getLinkClass(3)}>Books</a>
                                <a href="/setting" className={getLinkClass(3)}>Setting</a>
                                <a href="/setting" className={getLinkClass(4)}>SignUp</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
