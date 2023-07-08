'use client'
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiLoaderCircle } from "react-icons/bi"
import {AiOutlineInfoCircle} from "react-icons/ai"
import useSWR from 'swr';
const IssueBook = ({ id }) => {
    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { data, error : studentLodingerror, isLoading } = useSWR(
        "/api/book",
        fetcher
      );

    const handleIssue = async (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const bookId = formData.get("books");

        try {
            const response = await fetch("/api/lend", {
                method: "POST",
                body: JSON.stringify({
                    "bookId": bookId,
                    "studentId": id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            if (response.ok) {
                console.log("Book issued successfully!");
                const revalidate = await fetch(`/api/revalidate?path=${"student"}`);
                console.log(revalidate);
                setSuccess(true);
                window.location.reload();
                // Perform any additional actions or show a success message
            } else {
                setError(true);
                console.error("Failed to issue book");
                // Handle the error or show an error message
            }
        } catch (error) {
            setError(true);
            console.error(error);
            // Handle the error or show an error message
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center pb-5 justify-between">
                <h1 className="text-2xl font-bold ">
                    Issue Book
                </h1>
                <p className="flex items-center gap-1"><AiOutlineInfoCircle />Book issued for 15 days</p>
            </div>

            {success && <p className="text-green-400">Issued Book</p>}
            {error && <p className="text-red-400">Error occoured</p>}
            {isLoading ? <h1 className="text-center text-xl font-semibold">Loading ...</h1> : <form action="/api/issue-book" method="POST" onSubmit={handleIssue} className="flex justify-center items-center gap-2">
                <select name="books" id="book" className="text-xl rounded-xl p-2 shadow border">
                    {data?.data.map((x) => (
                        <option value={x._id} key={x._id}>
                            {x.title}
                        </option>
                    ))}
                </select>
                <button type="submit" className="border rounded-xl p-2 shadow text-[#F65867] w-20 h-10 text-center">
                    {loading ?
                        <IconContext.Provider value={{ className: "animate-spin w-full text-xl" }}>
                            <BiLoaderCircle />
                        </IconContext.Provider> :
                        "Issue"}
                </button>
            </form>}
        </div>
    );
};

export default IssueBook;
