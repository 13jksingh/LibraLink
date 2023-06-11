import React from "react";

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
}) => {
  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  const isNarrowColumn = (column) => {
    return narrowColumns.includes(column);
  };

  return (
    <div className="table-auto overflow-x-auto my-2">
      <div className={`table table-fixed w-full ${textSmall ? "text-sm" : ""} ${textLeft ? "text-left" : "text-center"}`}>
        {/* Table Header */}
        <div className={`table-header-group ${headingBgColor ? "dark:bg-[#201C1D] bg-[#F9F9F9]" : ""}`}>
          <div className="table-row">
            {itemTitle &&
              Object.keys(itemTitle).map((x, i) => (
                <div
                  key={i}
                  className={`table-cell rounded-t-lg ${headingLight ? "font-medium text-[#6b7280] dark:text-[#9ca3af]" : ""} ${contrastBorder ? "border-[#6b7280] dark:border-[#9ca3af] border-b" : "dark:border-[#201C1D] border-[#f0f0f0] border-b"}`}
                  style={{ padding: paddingReq, width: isNarrowColumn(x) ? "17%" : "auto" }}
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
                    className={`table-cell ${contrastBorder ? "border-[#6b7280] dark:border-[#9ca3af] border-b" : "dark:border-[#201C1D] border-[#f0f0f0] border-b"}`}
                    style={{ padding: paddingReq, wordWrap: "break-word", width: isNarrowColumn(y) ? "20%" : "auto" }}
                  >
                    {truncateText(x[itemTitle[y].alise], 19)}
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
