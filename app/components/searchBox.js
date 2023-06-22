'use client'
import React, { useState } from 'react';
import useSWR from 'swr';
import SearchRes from './searchRes';
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
    console.log(data,error,isLoading);

    return (
        <div className='hidden lg:block'>
            <input
                type="search"
                className="text-xl rounded-xl bg-[#F8F8F8] px-4 py-2 w-[400px] text-slate-950 focus:outline-none"
                placeholder="Search ..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            {searchQuery && <SearchRes data={data} />}
        </div>
    );
}
