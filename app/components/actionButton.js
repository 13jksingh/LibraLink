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
    handleEditToggle,
    editId,
    editValues
}) => {
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
    const UpdateChanges = async (id,editValues) => {
        const response = await fetch(`/api/${url}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editValues)
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${url}`);
        }
        await response.json();
        await fetch("/api/revalidate");
        handleEditToggle(id);
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
            {editId===id ?
                <>
                    <CustomButton
                        action={() => UpdateChanges(id,editValues)}
                        icon={<AiOutlineSend />}
                        style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                        needRefresh
                    />
                    <CustomButton
                        action={() => handleEditToggle(id)}
                        icon={<AiOutlineCloseCircle />}
                        style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
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
                                action={()=>handleEditToggle(id)}
                                icon={<AiOutlineEdit />}
                                style="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
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