'use client'
import { useState } from "react";
import ActionButton from "@/app/components/actionButtons";
const StudentDetail = ({
    studentData,
    id
}) => {
    const [edit, setEdit] = useState(false); // State to store the currently edited ID
    const [inputValues, setInputValues] = useState({}); // State to store the input values for each column
    const handleEdit = (id) => {
        // Handle the edit action with the received id
        console.log(`Edit clicked for ID: ${id}`);
        setEdit(true); // Set the ID for the input boxes that should be visible
    };
    const handleCloseEdit = (id) => {
        // Handle the edit action with the received id
        console.log(`Edit closed for ID: ${id}`);
        setEdit(null); // Set the ID for the input boxes that should be visible
        setInputValues({});
    };

    const handleInputChange = (column, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [column]: value,
        }));
    };
    return (
        <div className="dark:bg-[#353334] bg-white py-4 pt-6 rounded-xl">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-2 px-6">
                {edit ? (
                    <input
                        id={`myText-${id}-name`}
                        type="text"
                        className="text-4xl font-bold text-center text-[#F65867] flex-1"
                        style={{ border: "none", background: "transparent", outline: "0" }}
                        value={inputValues["name"] || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder={studentData.name}
                    />
                ) : (
                    <h1 className="text-4xl font-bold text-center text-[#F65867] flex-1">{studentData.name}</h1>
                )}
                <ActionButton
                    id={id}
                    handleEdit={handleEdit}
                    handleCloseEdit={handleCloseEdit}
                    inputValue={inputValues || ""}
                    page="student"
                    url="/student"
                    editDelete
                />
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:my-10 my-5 place-items-center lg:gap-10 gap-5 lg:text-left text-center">
                <img
                    src="https://lh3.googleusercontent.com/ogw/AOLn63Erp2jah7UXWhA2ghU-chihEi6U3IByulqkbA73ug=s32-c-mo"
                    width={200}
                    height={200}
                    alt="Picture of the author"
                    className="rounded-lg"
                />
                <div className="flex flex-col justify-between text-lg gap-3 w-full">
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Student Id</p>
                        {edit ? (
                            <input
                                id={`myText-${id}-studentId`}
                                type="text"
                                className="w-auto text-center lg:text-left"
                                style={{ border: "none", background: "transparent", outline: "0" }}
                                value={inputValues["studentId"] || ""}
                                onChange={(e) => handleInputChange("studentId", e.target.value)}
                                placeholder={studentData.studentId}
                            />
                        ) : (
                            <p>{studentData.studentId}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Email</p>
                        {edit ? (
                            <input
                                id={`myText-${id}-email`}
                                type="text"
                                className="w-auto text-center lg:text-left"
                                style={{ border: "none", background: "transparent", outline: "0" }}
                                value={inputValues["email"] || ""}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder={studentData.email}
                            />
                        ) : (
                            <p>{studentData.email}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Phone Number</p>
                        {edit ? (
                            <input
                                id={`myText-${id}-phone`}
                                type="text"
                                className="w-auto text-center lg:text-left"
                                style={{ border: "none", background: "transparent", outline: "0" }}
                                value={inputValues["phone"] || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder={studentData.phone}
                            />
                        ) : (
                            <p>{studentData.phone}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between text-lg gap-3 w-full">
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Total Books Lent</p>
                        <p>15</p>
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Books Currently Lent</p>
                        <p className="text-green-800 dark:text-green-400">7</p>
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Overdue Books Count</p>
                        <p className="text-red-800 dark:text-red-400">5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;
