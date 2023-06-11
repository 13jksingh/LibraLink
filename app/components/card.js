'use client'
import { useState } from "react";
import Button from "./Button";
import Table from "./table";
import AddForm from "./form";

const Card = (props) => {
    const [showForm, setShowForm] = useState(false);
    const handleAddStudentClick = () => {
        setShowForm(!showForm);
    };
    if (props.listItems) {
        return (
            <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">{props.title}</h1>
                    {props.buttonTitle && (
                        <div className="relative">
                            <Button title={props.buttonTitle} onClick={handleAddStudentClick} />
                            {showForm && (
                                <div className="absolute z-10 right-0 bg-[#efd6d6] dark:bg-[#201C1D] dark:text-white rounded-xl p-4">
                                    <AddForm itemTitle={props.itemTitle} apiPostPath={props.apiPostPath} name={props.title} title={props.buttonTitle}/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <Table items={props.items} itemTitle={props.itemTitle} action={props.action} textSmall={props.textSmall} textLeft={props.textLeft} paddingReq={props.paddingReq} contrastBorder={props.contrastBorder} headingBgColor={props.headingBgColor} headingLight={props.headingLight} narrowColumns={props.narrowColumns}/>
                </div>
                <a href={props.seeMore} className="flex justify-end text-[#F65867] text-sm font-semibold">See More</a>
            </div>
        )
    }
    return (
        <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-3xl font-bold">{props.count}</h1>
                <div className="text-4xl rounded-3xl bg-[#F65867] text-white p-3" >
                    {props.icon}
                </div>
            </div>
            <h1 className="text-sm font-semibold">{props.title}</h1>
        </div>
    );
}

export default Card;