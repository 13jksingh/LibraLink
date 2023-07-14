'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Icons
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineAssignmentReturned } from "react-icons/md";
// Components
import CustomButton from "./CustomButton";

const ActionButton = ({
    id,
    url,
    hasViewButton,
    hasEditButton,
    hasDelButton,
    hasReturnedButton,
}) => {
    const [editId, setEditId] = useState(""); // State to store the currently edited ID
    const [inputValues, setInputValues] = useState({}); // State to store the input values for each column
    const router = useRouter();
 
    const returnBook = async (id) => {
        const response = await fetch(`/api/lend?id=${id}`, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${url}`);
        }
        await fetch(`/api/revalidate?path=${url}`);
    };

    // Edit 
    const handleToggleEdit = (id) => {
        editId != "" ? setEditId("") : setEditId(id);
        setInputValues({});
    };

    const handleInputChange = (column, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [column]: value,
        }));
    };

    const UpdateChanges = async (id) => {
        const response = await fetch(`/api/${url}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${url}`);
        }
        await response.json();
        await fetch("/api/revalidate");
        handleToggleEdit();
    }

    // Delete
    const handleDelete = async (id) => {
        const response = await fetch(`/api/${url}?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete ${url}`);
        }
        await fetch(`/api/revalidate?path=${url}`);
    };

    return (
        <div className="flex items-center justify-center gap-2 text-xl align-middle">
            {editId != "" ?
                <>
                    <CustomButton
                        action={() => UpdateChanges(id)}
                        icon={<AiOutlineSend />}
                        style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                        needRefresh
                    />
                    <CustomButton
                        action={() => handleToggleEdit(id)}
                        icon={<AiOutlineCloseCircle />}
                        style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                        needRefresh
                    />
                </>
                : (
                    <>
                        {hasViewButton &&
                            <CustomButton
                                action={() => { router.push(`/${url}/${id}`) }}
                                icon={<AiOutlineEye />}
                                style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                                needRefresh
                            />
                        }
                        {hasReturnedButton &&
                            <CustomButton
                                action={() => returnBook(id)}
                                icon={<MdOutlineAssignmentReturned />}
                                style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                                needRefresh
                            />}
                        {hasEditButton &&
                            <CustomButton
                                action={() => handleToggleEdit(id)}
                                icon={<AiOutlineEdit />}
                                style="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                                needRefresh
                            />}
                        {hasDelButton &&
                            <CustomButton
                                action={() => handleDelete(id)}
                                icon={<AiOutlineDelete />}
                                style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                                needRefresh
                            />}
                    </>
                )}
        </div>
    );
}

export default ActionButton;