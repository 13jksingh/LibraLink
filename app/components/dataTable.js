'use client'
import ActionButton from "./actionButton";
import Link from "next/dist/client/link";
import { useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"

const truncateText = (text, limit) => text?.length > limit ? text.slice(0, limit) + "..." : text;
const DataTable = ({
    columns,
    data,
    lightBorder,
    scroable,
    truncateTextLimit,
    headBgDiffernt,
    textBig,
    textFontNormal,
    url,
    actionCol,
    hasViewButton,
    hasEditButton,
    hasDelButton,
    hasReturnedButton,
    pagination,
    nextLink,
    prevLink,
    navigationText
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
        <div className="flex flex-col">
            {pagination &&
                <div className="flex items-center">
                    <div className="flex items-center justify-center text-xl">
                        <button className="hover:bg-[#F9F9F9] rounded-full p-2 dark:hover:bg-[#201C1D] transition">
                            <Link href={prevLink}>
                                <MdOutlineNavigateBefore />
                            </Link>
                        </button>
                        <button className="hover:bg-[#F9F9F9] rounded-full p-2 dark:hover:bg-[#201C1D] transition">
                            <Link href={nextLink}>
                                <MdOutlineNavigateNext />
                            </Link>
                        </button>
                    </div>
                    <div className="text-sm">
                        {navigationText}
                    </div>
                </div>

            }
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl">
                        <table className={`table  ${textBig ? "" : "text-sm"} ${scroable ? "table-auto" : "table-fixed"} w-full min-w-full text-center `}>
                            <thead className={` ${headBgDiffernt ? "dark:bg-[#201C1D] bg-[#F9F9F9] text-black dark:text-white" : ""} ${lightBorder ? "border-[#6b7280] dark:border-[#9ca3af] border-b" : "dark:border-[#201C1D] border-[#f0f0f0] border-b"} font-light text-[#6b7280] dark:text-[#9ca3af]`}>
                                <tr>
                                    {columns.map(x => (
                                        <th key={x.key} scope="col" className={`px-1 py-5 ${textFontNormal && "font-normal"}`} >{x.label}</th>
                                    ))}
                                    {actionCol && <th key="action" scope="col" className={`px-1 py-5 ${textFontNormal && "font-normal"}`} >Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(x => (
                                    <tr key={x._id} className={`${lightBorder ? "border-[#6b7280] dark:border-[#9ca3af] border-b" : "dark:border-[#201C1D] border-[#f0f0f0] border-b"} hover:dark:bg-[#201C1D] hover:bg-[#F9F9F9] transition `}>
                                        {columns.map(attr => (
                                            <td key={x[attr.key]} className="break-words px-1  py-5">
                                                {editId === x._id ?
                                                    <input
                                                        id={`myText-${x._id}-${attr.key}`}
                                                        type="text"
                                                        className="text-center w-full"
                                                        style={{ border: "none", background: "transparent", outline: "0" }}
                                                        value={inputValues[attr.key] || ""}
                                                        onChange={(e) => handleInputChange(attr.key, e.target.value)}
                                                        placeholder={x[attr.key]}
                                                    /> :
                                                    truncateText(x[attr.key], truncateTextLimit)
                                                }
                                            </td>
                                        ))}
                                        {actionCol &&
                                            <td><ActionButton
                                                id={x._id.toString()}
                                                url={url}
                                                actionCol={actionCol}
                                                hasViewButton={hasViewButton}
                                                hasEditButton={hasEditButton}
                                                hasDelButton={hasDelButton}
                                                hasReturnedButton={hasReturnedButton}
                                                handleEditToggle={handleEditToggle}
                                                editId={editId}
                                                editValues={inputValues}
                                            />
                                            </td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataTable;