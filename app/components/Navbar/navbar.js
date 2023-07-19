//Components
import DarkModeButton from "./darkModeButton";
import SearchBox from "./searchBox";
import DropDownNav from "./dropDownNav";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
//Icons
import { HiOutlineLibrary } from "react-icons/hi";
import RevalidateButton from "./revalidateButton";

const Navbar = async () => {
    const session = await getServerSession(options);
    return (
        <>
            {session ? <nav className="h-15 p-5 px-10 flex justify-between items-center text-3xl">
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
                    <img className=' rounded-full hover:border-2 border-emerald-300 transition duration-200' width={40} height={40} src={session.user.image} alt={session.user.name + ' photo'} />
                    <DropDownNav />
                </div>
            </nav> :
            <h1>Hi</h1>}
        </>

    );
}

export default Navbar;
