'use client'
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineLoading3Quarters, AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderCircle, BiErrorCircle } from "react-icons/bi";
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
import Link from "next/link"
import ReturnButton from "./returnButton";

const ActionButton = ({
    id,
    page,
    url,
    handleEdit,
    handleCloseEdit,
    inputValue,
    editDelete,
    del,
    returnButton
}) => {
    const [loading, setLoading] = useState({
        "edit": false,
        "delete": false
    });
    const [success, setSuccess] = useState({
        "edit": false,
        "delete": false
    });
    const [error, setError] = useState({
        "edit": false,
        "delete": false
    });
    const [editing, setEditing] = useState(false);

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
        setLoading((prevState) => ({
            ...prevState,
            delete: true
        }));
        try {
            const response = await fetch(`/api/${page}?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete ${url}`);
            }

            const data = await response.json();
            const revalidate = await fetch(`/api/revalidate?path=${url}`);
            setSuccess((prevState) => ({
                ...prevState,
                delete: true
            }));
            window.location.reload();
        } catch (error) {
            console.error(error);
            // Handle the error
            setError((prevState) => ({
                ...prevState,
                delete: true
            }));
        }
        setLoading((prevState) => ({
            ...prevState,
            delete: false
        }));
    };
    const UpdateChanges = async () => {
        setLoading((prevState) => ({
            ...prevState,
            edit: true
        }));
        try {
            // console.log(inputValue);
            const response = await fetch(`/api/${url}?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValue)
            });
            console.log(inputValue,response);
            if (!response.ok) {
                throw new Error(`Failed to update ${url}`);
            }
            const data = await response.json();
            const revalidate = await fetch("/api/revalidate");
            setSuccess((prevState) => ({
                ...prevState,
                edit: true
            }));
            window.location.reload();
            // console.log(data,inputValue);
        } catch (error) {
            console.error(error);
            // Handle the error'
            setError((prevState) => ({
                ...prevState,
                edit: true
            }));
        }
        setLoading((prevState) => ({
            ...prevState,
            edit: false
        }));
    }

    return (
        <div>
            {editing ?
                <div className="flex items-center justify-center gap-2 text-xl">
                    <button
                        className="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        onClick={UpdateChanges}
                    >
                        {loading.edit ? (
                            <div className="flex items-center justify-center">
                                <IconContext.Provider value={{ className: "animate-spin text-green-400" }}>
                                    <BiLoaderCircle />
                                </IconContext.Provider>
                            </div>
                        ) : success.edit ? (
                            <MdDone />
                        ) : error.edit ? (
                            <BiErrorCircle />
                        ) : (
                            <AiOutlineSend />
                        )}
                    </button>
                    <button
                        className="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        onClick={handle_edit}
                    >
                        <AiOutlineCloseCircle />
                    </button>
                </div>
                :
                <>
                    <div className="flex items-center justify-center gap-2 text-xl">
                        {/* Return Buuton */}
                        {returnButton && <ReturnButton id={id} />}
                        {/* View */}
                        {editDelete || del ? null :<Link
                            className="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                            href={`/${page}/${id}`}
                        >
                            <AiOutlineEye />
                        </Link>}
                        {/* Edit */}
                        {del ? null : <button
                            className="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                            onClick={handle_edit}
                        >
                            <AiOutlineEdit />
                        </button>}
                        {/* Delete */}
                        <button
                            className="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                            onClick={handleDelete}
                        >
                            {loading.delete ? (
                                <div className="flex items-center justify-center">
                                    <IconContext.Provider value={{ className: "animate-spin text-red-400" }}>
                                        <BiLoaderCircle />
                                    </IconContext.Provider>
                                </div>
                            ) : success.delete ? (
                                <MdDone />
                            ) : error.delete ? (
                                <BiErrorCircle />
                            ) : (
                                <AiOutlineDelete />
                            )}

                        </button>
                    </div>
                </>
            }
        </div>
    );

};

export default ActionButton;
