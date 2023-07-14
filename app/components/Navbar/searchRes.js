'use client'
import Link from "next/link";
import { BiUser, BiBookOpen } from "react-icons/bi"
import { MdSearchOff } from "react-icons/md"


const SearchRes = ({ data,handleClick }) => {
    return (
        <div className="absolute z-20 dark:bg-[#201C1D] bg-[#F9F9F9] w-[400px] rounded-lg  mt-2 shadow-md dark:shadow-[#353334]">
            <ul className="flex flex-col gap-1">
                {data?.students?.map(x => (
                    <li className="border-l-4 border-green-400 hover:bg-white hover:dark:bg-[#353334] transition p-3 rounded-sm">
                        <Link href={`/student/${x._id}`} onClick={handleClick}>
                            <p className="text-xs">{x.studentId}</p>
                            <div className="flex items-center gap-2">
                                <BiUser className="text-sm" />
                                <h1 className="text-lg font-semibold">{x.name}</h1>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-sm">{x.email}</p>
                                <p className="text-sm">{x.phone}</p>
                            </div>
                        </Link>
                    </li>
                ))}
                {data?.books?.map(x => (
                    <li className="border-l-4 px-2 border-red-400 hover:bg-white hover:dark:bg-[#353334] transition p-3">
                        <Link href={`/book/${x._id}`} onClick={handleClick}>
                            <p className="text-xs">{x.code}</p>
                            <div className="flex items-center gap-2">
                                <BiBookOpen className="text-sm" />
                                <h1 className="text-lg font-semibold">{x.title}</h1>
                            </div>
                            <p className="text-sm">{x.author}</p>
                        </Link>
                    </li>
                ))}
                {/* If no result found */}
                {data?.students?.length == 0 && data?.books?.length == 0 &&
                    <li className="p-3">
                        <div className="flex items-center gap-2">
                            <MdSearchOff className="text-lg" />
                            <p className="text-lg font-semibold text-red-500">No result found</p>
                        </div>
                    </li>
                }
            </ul>
        </div>
    );
}

export default SearchRes;