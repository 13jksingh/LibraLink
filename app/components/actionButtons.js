'use client'
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai";
import CustomButton from "./CustomButton";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { useRouter } from "next/navigation";

const ActionButton = ({
    id,
    url,
    handleToggleEdit,
    inputValue,
    hasViewButton,
    hasEditButton,
    hasDelButton,
    hasReturnedButton
}) => {
    const [editing, setEditing] = useState(false);

    const router = useRouter();

    const returnBook = async () => {
        const response = await fetch(`/api/lend?id=${id}`, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${url}`);
        }
        await fetch(`/api/revalidate?path=${url}`);
    };

    const toggleEdit = () => {
        !editing ? handleToggleEdit(id) : handleToggleEdit(id);
        setEditing(prev => !prev);
    };

    const handleDelete = async () => {
        const response = await fetch(`/api/${page}?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete ${url}`);
        }
        await fetch(`/api/revalidate?path=${url}`);
    };

    const UpdateChanges = async () => {
        const response = await fetch(`/api/${url}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValue)
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${url}`);
        }
        await response.json();
        await fetch("/api/revalidate");
        toggleEdit();
    }
    return (
        <div className="flex items-center justify-center gap-2 text-xl">
            {editing ?
                <>
                    <CustomButton
                        action={UpdateChanges}
                        icon={<AiOutlineSend />}
                        style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                    />
                    <CustomButton
                        action={toggleEdit}
                        icon={<AiOutlineCloseCircle />}
                        style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                    />
                </>
                : (
                    <>
                        {hasViewButton &&
                            <CustomButton
                                action={() => { router.push(`/${page}/${id}`) }}
                                icon={<AiOutlineEye />}
                                style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                            />
                        }
                        {hasReturnedButton &&
                            <CustomButton
                                action={returnBook}
                                icon={<MdOutlineAssignmentReturned />}
                                style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                            />}
                        {hasEditButton &&
                            <CustomButton
                                action={toggleEdit}
                                icon={<AiOutlineEdit />}
                                style="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                            />}
                        {hasDelButton &&
                            <CustomButton
                                action={handleDelete}
                                icon={<AiOutlineDelete />}
                                style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                                feedback={true}
                            />}
                    </>

                )}

        </div>
    )
};

export default ActionButton;
