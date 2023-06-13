'use client'
import { useState } from "react"
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineLoading3Quarters } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi";
import { IconContext } from "react-icons";
import { redirect } from 'next/navigation'

const ActionButton = ({
    id,
    page
}) => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const handleView = () => {
        console.log("/student/"+id)
        redirect("/student/"+id);
    }
    const handleEdit = () => {
        console.log(id)
    }
    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            const response = await fetch(`/api/${page}?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            // Handle the error
        }
        setLoadingDelete(false);
    };

    return (
        <div className="flex items-center justify-center gap-2 text-xl">
            <a
                className="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                href={"/student/"+id}
            >
                <AiOutlineEye />
            </a>
            <button
                className="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                onClick={handleEdit}
            >
                <AiOutlineEdit />
            </button>
            <button
                className="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                onClick={handleDelete}
            >
                {loadingDelete ? (
                    <div className="flex items-center justify-center">
                        <IconContext.Provider value={{ className: "animate-spin text-red-400" }}>
                            <BiLoaderCircle />
                        </IconContext.Provider>
                    </div>

                ) : <AiOutlineDelete />}

            </button>
        </div>
    );
}

export default ActionButton;