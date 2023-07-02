'use client'
import { useState } from "react"
import { AiOutlineReload } from "react-icons/ai"
import { MdOutlineDone } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";

const RevalidateButton = ({ url }) => {
    const [spin, setSpin] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const revalidatePages = async () => {
        setSpin(true);
        setSuccess(false);
        setError(false);
        try {
            const revalidate = await fetch(`/api/revalidate?path=${url}`);
            if (!revalidate.ok) {
                throw new Error(`Failed to revalidate ${url}`);
            }
            setSuccess(true);
            window.location.reload();
        } catch (error) {
            console.error(error);
            // Handle the error
            setError(true);
        }
        setSpin(false);
    }
    return (
        <button
            onClick={revalidatePages}
            className='hover:bg-slate-400 transition rounded-md p-2 dark:text-white text-2xl font-bold'
        >
            {error ? (
                <BiErrorCircle className="text-red-400" />
            ) : success ? (
                <MdOutlineDone className="text-green-400" />
            ) : (
                <AiOutlineReload className={`${spin && "animate-spin"}`} />
            )}
        </button>
    );
}

export default RevalidateButton;