'use client'
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiLoaderCircle } from "react-icons/bi"
const IssueBook = ({ id }) => {
    const [bookData, setBookData] = useState([]);
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch("/api/book");
                const data = await response.json();
                setBookData(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookData();
    }, []);

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
                    "dueDate": dueDate
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
            {success && <p className="text-green-400">Issued Book</p>}
            {error && <p className="text-red-400">Error occoured</p>}
            <form action="/api/issue-book" method="POST" onSubmit={handleIssue}>
                <select name="books" id="book">
                    {bookData.map((x) => (
                        <option value={x._id} key={x._id}>
                            {x.title}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="dueDate"
                    placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">
                    {loading ?
                        <IconContext.Provider value={{ className: "animate-spin text-yellow-400" }}>
                            <BiLoaderCircle />
                        </IconContext.Provider> :
                        "Issue"}
                </button>
            </form>
        </div>
    );
};

export default IssueBook;
