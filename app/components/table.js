'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Icons
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineAssignmentReturned } from "react-icons/md";
// Components
import CustomButton from "./CustomButton";

const truncateText = (text, limit) => text?.length > limit ? text.slice(0, limit) + "..." : text;
// listItems
// paddingReq="20px"
// headingBgColor
// narrowColumns={["ID"]}
const Table = ({
  items,
  itemTitle,
  textSmall,
  textLeft,
  paddingReq,
  contrastBorder,
  headingBgColor,
  headingLight,

  url,
  actionCol =true ,
  hasViewButton = true,
  hasEditButton = true,
  hasDelButton = true,
  hasReturnedButton,
}) => {
  const [editId, setEditId] = useState(""); // State to store the currently edited ID
  const [inputValues, setInputValues] = useState({}); // State to store the input values for each column
  const router = useRouter();

  // const isNarrowColumn = (column) => narrowColumns.includes(column);

  // Return 
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
    <div className={`table table-auto overflow-x-auto my-2 w-full ${textSmall ? "text-sm" : ""} ${textLeft ? "text-left" : "text-center"}`}>
      {/* Table Header */}
      <div className={`table-header-group ${headingBgColor ? "dark:bg-[#201C1D] bg-[#F9F9F9]" : ""}`} >
        <div className="table-row">
          {itemTitle.map(attr => (
            <div
              key={attr.key}
              className={`table-cell py-4 rounded-t-lg ${headingLight
                ? "font-medium text-[#6b7280] dark:text-[#9ca3af]"
                : ""
                } ${contrastBorder
                  ? "border-[#6b7280] dark:border-[#9ca3af] border-b"
                  : "dark:border-[#201C1D] border-[#f0f0f0] border-b"
                }`}
            // style={{
            //   padding: paddingReq,
            //   width: isNarrowColumn(attr.label) ? "17%" : "auto",
            // }}
            >
              {attr.label}
            </div>
          ))}
          {/* Action button column */}
          {actionCol &&
            <div
              key="action"
              className={`table-cell rounded-t-lg ${headingLight
                ? "font-medium text-[#6b7280] dark:text-[#9ca3af]"
                : ""
                } ${contrastBorder
                  ? "border-[#6b7280] dark:border-[#9ca3af] border-b"
                  : "dark:border-[#201C1D] border-[#f0f0f0] border-b"
                }`}
              // style={{
              //   padding: paddingReq,
              //   width: "17%",
              // }}
            >
              Action
            </div>}
        </div>
      </div>
      {/* Table Body */}
      <div className="table-row-group">
        {/* Data */}
        {items?.map((x, idx) => (
          <div key={idx} className="table-row hover:dark:bg-[#201C1D] hover:bg-[#F9F9F9] transition">
            {itemTitle.map((attr, i) => (
              <div
                key={i}
                className={`table-cell h-14 align-middle ${contrastBorder
                  ? "border-[#6b7280] dark:border-[#9ca3af] border-b"
                  : "dark:border-[#201C1D] border-[#f0f0f0] border-b"}
                    `}
                // style={{
                //   padding: paddingReq,

                //   width: isNarrowColumn(x[attr.key]) ? "20%" : "auto",
                // }}
              >
                {editId === x._id ?
                  <input
                    id={`myText-${x._id}-${attr.key}`}
                    type="text"
                    className="text-center w-full"
                    style={{ border: "none", background: "transparent", outline: "0" }}
                    value={inputValues[attr.key] || x[attr.key]}
                    onChange={(e) => handleInputChange(attr.key, e.target.value)}
                    placeholder={x[attr.key]}
                  /> :
                  truncateText(x[attr.key], 100)
                }
              </div>
            ))}
            {/* Action Buttons */}
            {actionCol && <div className="flex items-center justify-center gap-2 text-xl align-middle">
              {editId != "" ?
                <>
                  <CustomButton
                    action={() => UpdateChanges(x._id)}
                    icon={<AiOutlineSend />}
                    style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                    feedback={true}
                  />
                  <CustomButton
                    action={() => handleToggleEdit(x._id)}
                    icon={<AiOutlineCloseCircle />}
                    style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                    feedback={true}
                  />
                </>
                : (
                  <>
                    {hasViewButton &&
                      <CustomButton
                        action={() => { router.push(`/${url}/${x._id}`) }}
                        icon={<AiOutlineEye />}
                        style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                      />
                    }
                    {hasReturnedButton &&
                      <CustomButton
                        action={() => returnBook(x._id)}
                        icon={<MdOutlineAssignmentReturned />}
                        style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                      />}
                    {hasEditButton &&
                      <CustomButton
                        action={() => handleToggleEdit(x._id)}
                        icon={<AiOutlineEdit />}
                        style="text-blue-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                      />}
                    {hasDelButton &&
                      <CustomButton
                        action={() => handleDelete(x._id)}
                        icon={<AiOutlineDelete />}
                        style="text-red-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
                        feedback={true}
                      />}
                  </>
                )}
            </div>
            }
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default Table;
