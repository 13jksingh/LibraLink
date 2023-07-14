'use client'
import { useState } from "react";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { BiLoaderCircle, BiErrorCircle } from "react-icons/bi";
import { MdDone } from "react-icons/md";
const IssueBookForm = ({ children, selectItem, id }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleIssue = async (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectId = formData.get(selectItem);
        try {
            if (selectItem === "book") {
                const response = await fetch("/api/lend", {
                    method: "POST",
                    body: JSON.stringify({
                        "bookId": selectId,
                        "studentId": id,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    setError(true);
                    console.error("Failed to issue book");
                }
                await fetch(`/api/revalidate?path=${"student"}`);
                setSuccess(true);
                router.refresh();
                setTimeout(() => {
                    setSuccess(false);
                }, 500);
            } else {
                const response = await fetch("/api/lend", {
                    method: "POST",
                    body: JSON.stringify({
                        "bookId": id,
                        "studentId": selectId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    setError(true);
                    console.error("Failed to issue book");
                }
                await fetch(`/api/revalidate?path=${"book"}`);
                setSuccess(true);
                router.refresh();
                setTimeout(() => {
                    setSuccess(false);
                }, 100);
            }


        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
    };
    return (
        <form method="POST" onSubmit={handleIssue} className="flex justify-center items-center gap-2">
            {children}
            <CustomButton
                icon={loading ? (
                    <BiLoaderCircle className="animate-spin" />
                ) : error ? (
                    <BiErrorCircle className="text-red-500" />
                ) : success ? (
                    <MdDone className="text-green-500" />
                ) : (
                    "Issue"
                )}
                style={"border rounded-xl p-2 shadow text-[#F65867] w-auto h-10 text-center"}
                isSubmitButton
                needRefresh
            />
        </form>
    );
}

export default IssueBookForm;