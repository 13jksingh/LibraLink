'use client'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiBookOpen, FiSettings } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden h-screen sticky top-0 w-24 md:flex flex-col items-center gap-14 text-2xl py-8 text-[#7D7B7B]">
      <Link href="/dashboard" className="rounded-md p-2 hover:bg-[#F65867] hover:text-white hover:scale-125">
        <MdOutlineSpaceDashboard />
      </Link>
      <Link href="/book" className="rounded-md p-2 hover:bg-[#F65867] hover:text-white hover:scale-125">
        <FiBookOpen />
      </Link>
      <Link href="/student" className="rounded-md p-2 hover:bg-[#F65867] hover:text-white hover:scale-125">
        <HiOutlineUsers />
      </Link>
      <Link href="/setting" className="rounded-md p-2 hover:bg-[#F65867] hover:text-white hover:scale-125">
        <FiSettings />
      </Link>
      <Link href="/dashboard" className="rounded-md p-2 hover:bg-[#F65867] hover:text-white hover:scale-125">
        <GoSignOut />
      </Link>
    </div>
  );
};

export default Sidebar;
