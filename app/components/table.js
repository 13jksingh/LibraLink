import React from "react";
const Table = (props) => {
    return (
        <table className="border-separate w-full text-left border-spacing-y-3">
            <thead>
                <tr>
                    {props.items && Object.keys(props.items[0]).map(x => {
                        return (
                            <th className="text-sm font-medium text-[#6b7280] dark:text-[#9ca3af]">
                                {x}
                            </th>
                        )
                    })}
                    {props.action && (<th className="text-sm font-medium text-[#6b7280] dark:text-[#9ca3af] text-center">
                        Action
                    </th>)}
                </tr>
            </thead>
            <tbody>
                {props.items?.map((x, index) => {
                    return (
                        <React.Fragment key={index}>
                            <tr><td colSpan="5"><hr className="mt-2 border-[#6b7280] dark:border-[#9ca3af]" /></td></tr>
                            <tr key={index}>
                                {Object.keys(props.items[0]).map(y=>{
                                    return (
                                        <td className="text-sm font-normal">{x[y]}</td>
                                    )
                                })}
                                {props.action && <td className="text-center">...</td>}
                            </tr>
                        </React.Fragment>
                    )
                }
                )}
                <tr><td colSpan="5"><hr className="mt-2 border-[#6b7280] dark:border-[#9ca3af]" /></td></tr>
            </tbody>
        </table>
    );
};

export default Table;
