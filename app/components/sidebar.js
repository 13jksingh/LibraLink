import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiBookOpen, FiSettings } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";

const Sidebar = () => {
  const active = 1;

  const getLinkClass = (index) => {
    let linkClass = "rounded-md p-2";
    if (active === index) {
      linkClass += " bg-[#F65867] text-white scale-125";
    }
    return linkClass;
  };

  return (
    <div className="h-screen sticky top-0 w-24 flex flex-col items-center gap-14 text-2xl py-8 text-[#7D7B7B]">
      <a href="/dashboard" className={getLinkClass(1)}>
        <MdOutlineSpaceDashboard />
      </a>
      <a href="/dashboard" className={getLinkClass(2)}>
        <FiBookOpen />
      </a>
      <a href="/dashboard" className={getLinkClass(3)}>
        <HiOutlineUsers />
      </a>
      <a href="/dashboard" className={getLinkClass(4)}>
        <FiSettings />
      </a>
      <a href="/dashboard" className={getLinkClass(5)}>
        <GoSignOut />
      </a>
    </div>
  );
};

export default Sidebar;
