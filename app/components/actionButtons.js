'use client'
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineLoading3Quarters , AiOutlineSend , AiOutlineCloseCircle} from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { IconContext } from "react-icons";

const ActionButton = ({
    id,
    page,
    url,
    handleEdit,
    handleCloseEdit,
    inputValue
}) => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleView = () => {
        console.log("/student/" + id);
        router.push("/student/" + id);
    };

    const handle_edit = () => {
        if (!editing) {
            handleEdit(id);
        }
        else {
            handleCloseEdit(id);
        }
        console.log(editing);
        setEditing(!editing);
        console.log(id, inputValue);
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            const response = await fetch(`/api/${page}?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete student");
            }

            const data = await response.json();
            console.log(data);
            const revalidate = await fetch(`/api/revalidate?path=${url}`);
            console.log(revalidate);
        } catch (error) {
            console.error(error);
            // Handle the error
        }
        setLoadingDelete(false);
    };
    const UpdateChanges = async () => {
        console.log(inputValue);
        try {
            const response = await fetch(`/api/student?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValue)
            });

            if (!response.ok) {
                throw new Error('Failed to update student');
            }
            const revalidate = await fetch("/api/revalidate");
            const revalidateJson = await revalidate.json();
            console.log(revalidate);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            // Handle the error
        }
    }

    return (
        <div>
            {editing ?
                <div className="flex items-center justify-center gap-2 text-xl">
                    <a
                        className="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        onClick={UpdateChanges}
                    >
                        <AiOutlineSend /> 
                    </a>
                    <a
                        className="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        onClick={handle_edit}
                    >
                        <AiOutlineCloseCircle />
                    </a>
                </div>
                :
                <div className="flex items-center justify-center gap-2 text-xl">
                    <a
                        className="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        href={"/student/" + id}
                    >
                        <AiOutlineEye />
                    </a>
                    <button
                        className="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        onClick={handle_edit}
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
                        ) : (
                            <AiOutlineDelete />
                        )}
                    </button>
                </div>
            }

        </div>
    );
};

export default ActionButton;
