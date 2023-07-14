'use client'
import React, { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import SearchRes from './searchRes';
import { VscLoading } from "react-icons/vsc"
import { MdOutlineClear } from "react-icons/md"
import CustomButton from '../CustomButton';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function SearchBox() {
    const [isOpen, setOpen] = useState(true);
    const dropdownRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
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


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const { data, error, isLoading } = useSWR(
        searchQuery ? `/api/search?search=${encodeURIComponent(searchQuery)}` : null,
        fetcher
    );

    return (
        <div className='relative hidden lg:block' ref={dropdownRef} >
            <div className='flex items-center relative'>
                <input
                    type="text"
                    className="text-xl rounded-xl bg-[#F8F8F8] px-4 py-2 w-[400px] text-slate-950 focus:outline-none"
                    placeholder="Search ..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setOpen(true)}
                />
                {isLoading ? <VscLoading className='animate-spin absolute right-3 text-gray-500' /> :
                    <CustomButton icon={<MdOutlineClear className='text-xl' />} action={() => setSearchQuery('')} style={"absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"} />
                }
            </div>
            {searchQuery && data && isOpen && <SearchRes data={data} handleClick={()=>{setOpen(false);setSearchQuery("");}} />}
        </div>
    );
}
