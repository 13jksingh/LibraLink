import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiBookOpen, FiSettings } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
import Link from "next/link";

const Sidebar = ({ segment }) => {
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

  const getLinkClass = (index) => {
    let linkClass = "rounded-md p-2";
    if (active === index) {
      linkClass += " bg-[#F65867] text-white scale-125";
    }
    return linkClass;
  };

  return (
    <div className="hidden h-screen sticky top-0 w-24 md:flex flex-col items-center gap-14 text-2xl py-8 text-[#7D7B7B]">
      <Link href="/dashboard" className={getLinkClass(1)}>
        <MdOutlineSpaceDashboard />
      </Link>
      <Link href="/book" className={getLinkClass(2)}>
        <FiBookOpen />
      </Link>
      <Link href="/student" className={getLinkClass(3)}>
        <HiOutlineUsers />
      </Link>
      <Link href="/setting" className={getLinkClass(4)}>
        <FiSettings />
      </Link>
      <Link href="/dashboard" className={getLinkClass(5)}>
        <GoSignOut />
      </Link>
    </div>
  );
};

export default Sidebar;
