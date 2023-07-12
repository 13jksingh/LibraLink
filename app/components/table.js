'use client'
import React, { useState } from "react";
import ActionButton from "./actionButtons";
import ReturnButton from "./returnButton";

const Table = ({
  items,
  itemTitle,
  textSmall,
  textLeft,
  paddingReq,
  contrastBorder,
  headingBgColor,
  headingLight,
  narrowColumns,
  page,
  url,
  editDelete,
  del,
  returnButton
}) => {
  const truncateText = (text, limit) => {
    if (!text) {
      return;
    }
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  const isNarrowColumn = (column) => {
    return narrowColumns.includes(column);
  };

  const [editId, setEditId] = useState(""); // State to store the currently edited ID
  const [inputValues, setInputValues] = useState({}); // State to store the input values for each column

  const handleEdit = (id) => {
    // Handle the edit action with the received id
    console.log(`Edit clicked for ID: ${id}`);
    setEditId(id); // Set the ID for the input boxes that should be visible
  };
  const handleCloseEdit = (id) => {
    // Handle the edit action with the received id
    console.log(`Edit closed for ID: ${id}`);
    setEditId(null); // Set the ID for the input boxes that should be visible
    setInputValues({});
  };

  const handleInputChange = (column, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [column]: value,
    }));
  };

  return (
    <div className="table-auto overflow-x-auto my-2">
      <div
        className={`table table-fixed w-full ${
          textSmall ? "text-sm" : ""
        } ${textLeft ? "text-left" : "text-center"}`}
      >
        {/* Table Header */}
        <div
          className={`table-header-group ${
            headingBgColor ? "dark:bg-[#201C1D] bg-[#F9F9F9]" : ""
          }`}
        >
          <div className="table-row">
            {itemTitle &&
              Object.keys(itemTitle).map((x, i) => (
                <div
                  key={i}
                  className={`table-cell rounded-t-lg ${
                    headingLight
                      ? "font-medium text-[#6b7280] dark:text-[#9ca3af]"
                      : ""
                  } ${
                    contrastBorder
                      ? "border-[#6b7280] dark:border-[#9ca3af] border-b"
                      : "dark:border-[#201C1D] border-[#f0f0f0] border-b"
                  }`}
                  style={{
                    padding: paddingReq,
                    width: isNarrowColumn(x) ? "17%" : "auto",
                  }}
                >
                  {x}
                </div>
              ))}
          </div>
        </div>
        {/* Table Body */}
        <div className="table-row-group">
          {items?.map((x, index) => (
            <div key={index} className="table-row hover:dark:bg-[#201C1D] hover:bg-[#F9F9F9] transition">
              {itemTitle &&
                Object.keys(itemTitle).map((y, i) => (
                  <div
                    key={i}
                    className={`table-cell ${
                      contrastBorder
                        ? "border-[#6b7280] dark:border-[#9ca3af] border-b"
                        : "dark:border-[#201C1D] border-[#f0f0f0] border-b"}
                    `}
                    style={{
                      padding: paddingReq,
                      wordWrap: "break-word",
                      width: isNarrowColumn(y) ? "20%" : "auto",
                    }}
                  >
                    {itemTitle[y] === "component" ? (
                      y=="Action" ?
                      <ActionButton
                        id={x._id}
                        page={page}
                        url={url}
                        handleEdit={handleEdit}
                        handleCloseEdit={handleCloseEdit}
                        inputValue={inputValues || ""}
                        editDelete={editDelete}
                        del={del}
                        returnButton = {returnButton}
                      /> :
                      (y=="ReturnButton" ? <ReturnButton id={x._id} /> : null)
                      
                    ) : (
                      <>
                        {editId === x._id ? (
                          <input
                            id={`myText-${x._id}-${y}`}
                            type="text"
                            className="text-center w-full"
                            style={{ border: "none", background: "transparent", outline: "0" }}
                            value={inputValues[itemTitle[y].alise] || ""}
                            onChange={(e) => handleInputChange(itemTitle[y].alise, e.target.value)}
                            placeholder={x[itemTitle[y].alise]}
                          />
                        ) : (
                          truncateText(x[itemTitle[y].alise], 19)
                        )}
                      </>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
