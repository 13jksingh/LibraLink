import { getStudentData } from "../Functions/Student";
import Card from "../components/card";
import AddForm from "../components/form";

import { StudentAttributesInfo, studentDataTitles } from "../constData";

const ITEMS_PER_PAGE = 10;


const Student = async (context) => {
    const page = context.searchParams.page ? parseInt(context.searchParams.page, 10) : 1;

    var { data: studentData, count: totalItems } = await getStudentData(page);

    return (
        <div className="">
            <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                <AddForm
                    itemTitle={StudentAttributesInfo}
                    title="Add new Student"
                    url="student"
                />
            </div>
            <Card
                listItems
                buttonTitle="Export CSV"
                items={studentData}
                itemTitle={studentDataTitles}
                paddingReq="20px"
                headingBgColor
                narrowColumns={["ID"]}
                page="student"
                url="/student"
                pagination
                prevLink={`/student?page=${page > 1 ? page - 1 : Math.ceil(totalItems / ITEMS_PER_PAGE)}`}
                nextLink={`/student?page=${page < Math.ceil(totalItems / ITEMS_PER_PAGE) ? page + 1 : 1}`}
                navigationText={`${(page - 1) * 10 + 1}-${Math.min((page - 1) * 10 + 10, totalItems)} of ${totalItems}`}
            />
        </div>
    );
}

export default Student;
