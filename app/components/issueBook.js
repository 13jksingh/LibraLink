import { AiOutlineInfoCircle } from "react-icons/ai"

import { getBookData } from "../Functions/Book";
import { getStudentData } from "../Functions/Student";
import IssueBookForm from "./issueBookForm";

const IssueBook = async ({
    id,
    selectItem,
}) => {
    const { data } = selectItem === "book" ? await getBookData() : await getStudentData();
    // Convert the data to plain objects
    const plainData = data.map(item => JSON.parse(JSON.stringify(item)));

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center pb-5 justify-between">
                <h1 className="text-2xl font-bold ">
                    Issue Book
                </h1>
                <p className="flex items-center gap-1"><AiOutlineInfoCircle />Book issued for 15 days</p>
            </div>
            <IssueBookForm selectItem={selectItem} id={id.toString()} >
                <select name={selectItem} id={selectItem} className="sm:text-xl rounded-xl sm:p-2 py-2 shadow border flex-initial sm:w-auto w-full">
                    {plainData?.map((x) => (
                        <option value={x._id.toString()} key={x._id}>
                            {selectItem == "book" ? x.title : x.name}
                        </option>
                    ))}
                </select>
            </IssueBookForm>
        </div>
    );
};

export default IssueBook;
