'use client'

import { useState, useEffect, useRef } from "react";
import AddForm from "./form";
import CustomButton from "./CustomButton";

const DashboardForm = ({
    itemTitle,
    title,
    url,
    buttonStyle
}) => {
    const [isOpen, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="relative" ref={dropdownRef}>
            <CustomButton
                action={toggleDropdown}
                icon={title}
                style={buttonStyle}
            />
            {isOpen && <div className="absolute right-0 shadow-xl rounded-xl w-[250px] backdrop-blur-lg bg-black/20 dark:bg-white/20 mt-1 px-8 py-4" >
                <AddForm itemTitle={itemTitle} title={title} url={url} vertical />
            </div>}
        </div>
    );
}

export default DashboardForm;