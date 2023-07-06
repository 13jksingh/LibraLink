'use client'

import { useState } from "react";
import { BiLoaderCircle, BiErrorCircle } from "react-icons/bi";
import { IconContext } from "react-icons";
import { MdDone,MdOutlineAssignmentReturned } from "react-icons/md";
import {PiKeyReturnFill} from "react-icons/pi"

const ReturnButton = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const returnBook = async () => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        try {
            const response = await fetch(`/api/lend/return?id=${id}`, {
                method: 'PUT'
            });
            const data = await response.json();
            if (!response.ok) {
                setError(true);
                throw new Error(`Failed to update ${url}`);
            }
            setSuccess(true);
            window.location.reload();
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
    }
    return (
        <>
            <button className="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition" onClick={returnBook}>
                {loading ?
                    <IconContext.Provider value={{ className: "animate-spin text-green-400" }}>
                        <BiLoaderCircle />
                    </IconContext.Provider> : (
                        error ? <BiErrorCircle className=" text-red-500" />
                            : (
                                success ? <MdDone className="" />
                                    :
                                    <MdOutlineAssignmentReturned />
                            )
                    )
                }
            </button>
        </>

    );
}

export default ReturnButton;