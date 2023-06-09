import React from "react";

const Table = ({ items, itemTitle, action }) => {
  return (
    <table className="border-separate w-full text-left border-spacing-y-3">
      <thead>
        <tr>
          {itemTitle &&
            Object.keys(itemTitle).map((x, i) => (
              <th key={i} className="text-sm font-medium text-[#6b7280] dark:text-[#9ca3af]">
                {x}
              </th>
            ))}
          {action && (
            <th className="text-sm font-medium text-[#6b7280] dark:text-[#9ca3af] text-center">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {items?.map((x) => (
          <React.Fragment key={x._id}>
            <tr>
              <td colSpan="5">
                <hr className="mt-2 border-[#6b7280] dark:border-[#9ca3af]" />
              </td>
            </tr>
            <tr key={x._id}>
              {itemTitle &&
                Object.keys(itemTitle).map((y, i) => (
                  <td key={i} className="text-sm font-normal">
                    {x[itemTitle[y].alise]}
                  </td>
                ))}
              {action && <td className="text-center">...</td>}
            </tr>
          </React.Fragment>
        ))}
        <tr>
          <td colSpan="5">
            <hr className="mt-2 border-[#6b7280] dark:border-[#9ca3af]" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
