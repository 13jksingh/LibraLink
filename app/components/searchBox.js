'use client'
import React, { useState } from 'react';
import useSWR from 'swr';
import SearchRes from './searchRes';
import { VscLoading } from "react-icons/vsc"
import { MdOutlineClear } from "react-icons/md"
export default function SearchBox() {
    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const [searchQuery, setSearchQuery] = useState('');
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const { data, error, isLoading } = useSWR(
        searchQuery ? `/api/search?search=${encodeURIComponent(searchQuery)}` : null,
        fetcher
    );
    return (
        <div className='hidden lg:block'>
            <div className='flex items-center relative'>
                <input
                    type="text"
                    className="text-xl rounded-xl bg-[#F8F8F8] px-4 py-2 w-[400px] text-slate-950 focus:outline-none"
                    placeholder="Search ..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                {isLoading ? <VscLoading className='animate-spin absolute right-3 text-gray-500' /> :
                    <button onClick={()=>setSearchQuery('')} class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <MdOutlineClear className='text-xl' />
                    </button>
                }
            </div>

            {searchQuery && data && <SearchRes data={data} />}
        </div>
    );
}
