'use client'
import { useState } from "react";
import ActionButton from "@/app/components/actionButton";
const StudentDetail = ({
    id,
    name,
    studentId,
    email,
    phone,
    overdueCount,
    currentlyLentCount,
    lendCount
}) => {
    const [editId, setEditId] = useState("");
    const [inputValues, setInputValues] = useState({});
    const handleEditToggle = id => {
        setEditId(prev => {
            return prev === id ? "" : id;
        });
        setInputValues({});
    }
    const handleInputChange = (column, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [column]: value,
        }));
    };
    return (
        <div className="dark:bg-[#353334] bg-white py-4 pt-6 rounded-xl">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-2 px-6">
                {editId===id ? (
                    <input
                        id={`myText-${id}-name`}
                        type="text"
                        className="text-4xl font-bold text-center text-[#F65867] flex-1"
                        style={{ border: "none", background: "transparent", outline: "0" }}
                        value={inputValues["name"] || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder={name}
                    />
                ) : (
                    <h1 className="text-4xl font-bold text-center text-[#F65867] flex-1">{name}</h1>
                )}
                <ActionButton
                    id={id}
                    url={"student"}
                    hasEditButton
                    hasDelButton
                    handleEditToggle={handleEditToggle}
                    editId={editId}
                    editValues={inputValues}
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
                        {editId===id ? (
                            <input
                                id={`myText-${id}-studentId`}
                                type="text"
                                className="w-auto text-center lg:text-left"
                                style={{ border: "none", background: "transparent", outline: "0" }}
                                value={inputValues["studentId"] || ""}
                                onChange={(e) => handleInputChange("studentId", e.target.value)}
                                placeholder={studentId}
                            />
                        ) : (
                            <p>{studentId}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Email</p>
                        {editId===id ? (
                            <input
                                id={`myText-${id}-email`}
                                type="text"
                                className="w-auto text-center lg:text-left"
                                style={{ border: "none", background: "transparent", outline: "0" }}
                                value={inputValues["email"] || ""}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder={email}
                            />
                        ) : (
                            <p>{email}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Phone Number</p>
                        {editId===id ? (
                            <input
                                id={`myText-${id}-phone`}
                                type="text"
                                className="w-auto text-center lg:text-left"
                                style={{ border: "none", background: "transparent", outline: "0" }}
                                value={inputValues["phone"] || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder={phone}
                            />
                        ) : (
                            <p>{phone}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between text-lg gap-3 w-full">
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Total Books Lent</p>
                        <p>{lendCount + currentlyLentCount}</p>
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Books Currently Lent</p>
                        <p className="text-green-500 dark:text-green-400">{currentlyLentCount}</p>
                    </div>
                    <div className="">
                        <p className="font-semibold dark:text-[#ffffffa9]">Overdue Books Count</p>
                        <p className="text-red-500 dark:text-red-400">{overdueCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetail;
