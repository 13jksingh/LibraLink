//Components
import DarkModeButton from "./darkModeButton";
import SearchBox from "./searchBox";
import DropDownNav from "./dropDownNav";
import Link from "next/link"
//Icons
import { HiOutlineLibrary } from "react-icons/hi";
import RevalidateButton from "./revalidateButton";

const Navbar = () => {
    return (
        <nav className="h-15 p-5 px-10 flex justify-between items-center text-3xl">
            {/* Logo and Heading */}
            <Link href="/">
                <div className="flex gap-10 font-bold items-center">
                    <HiOutlineLibrary className="hidden sm:block" />
                    <h1 >LibraLink</h1>
                </div>
            </Link>
            {/* Search Box */}
            <div>
                <SearchBox />
            </div>
            {/* Dark Mode */}
            <div className="flex gap-3 items-center md:gap-5">
                <RevalidateButton url="all" />
                <DarkModeButton />
                {/* {status === 'loading' ? <>     <div className=" border-t-teal-400 w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <span class="ml-2 text-base">loading</span></> : status === 'authenticated' ? (
                        <>
                            <img className=' rounded-full hover:border-2 border-emerald-300 transition duration-200' width={40} height={40} src={data.user.image} alt={data.user.name + ' photo'} />
                            <button className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline text-base" onClick={signOut}>Sign Out</button>
                        </>
                    ) : <button className=" text-base border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline" onClick={() => signIn('google')}>Sign In</button>
                } */}

                <DropDownNav />
            </div>
        </nav>
    );
}

export default Navbar;
