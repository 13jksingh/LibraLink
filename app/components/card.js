'use client'
import { useState } from "react";
import Button from "./Button";
import Table from "./table";
import AddForm from "./form";
import Link from "next/link";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md"

const Card = ({
    title,
    buttonTitle,
    itemTitle,
    apiPostPath,
    seeMore,
    items,
    textSmall,
    textLeft,
    paddingReq,
    contrastBorder,
    headingBgColor,
    headingLight,
    narrowColumns,
    action,
    page,
    url,
    editDelete,
    del,
    returnButton,
    pagination,
    nextLink,
    prevLink,
    navigationText
}) => {
    const [showForm, setShowForm] = useState(false);
    const handleAddStudentClick = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
            <div className="flex justify-between items-center">
                {title && <h1 className="text-2xl font-semibold">{title}</h1>}
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
                {buttonTitle && (
                    <div className="relative">
                        <Button title={buttonTitle} onClick={handleAddStudentClick} />
                        {showForm && (
                            <div className="absolute z-10 right-0 bg-[#efd6d6] dark:bg-[#201C1D] dark:text-white rounded-xl p-4">
                                <AddForm
                                    itemTitle={itemTitle}
                                    apiPostPath={apiPostPath}
                                    name={title} title={buttonTitle}
                                    inputClass="focus:outline-none rounded-md dark:bg-[#353334] w-40 px-2 mx-2"
                                    inputBoxClass="flex items-center"
                                    formClass="flex flex-col gap-4"
                                    buttonBoxClass="flex justify-center"
                                    buttonClass="rounded-lg bg-[#F65867] w-28"
                                    titleClass="p-4 text-center"
                                    inputBoxesDivClass="flex flex-col gap-2"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-6">
                <Table
                    items={items}
                    itemTitle={itemTitle}
                    action={action}
                    textSmall={textSmall}
                    textLeft={textLeft}
                    paddingReq={paddingReq}
                    contrastBorder={contrastBorder}
                    headingBgColor={headingBgColor}
                    headingLight={headingLight}
                    narrowColumns={narrowColumns}
                    page={page}
                    url={url}
                    editDelete={editDelete}
                    del={del}
                    returnButton={returnButton}
                />
            </div>
            {seeMore && <a href={seeMore} className="flex justify-end text-[#F65867] text-sm font-semibold">See More</a>}
        </div>
    )

}

export default Card;