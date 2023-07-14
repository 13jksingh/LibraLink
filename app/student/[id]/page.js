// Components
import StudentDetail from "./studentDetail";
import IssueBook from "@/app/components/issueBook";
import DataTable from "@/app/components/dataTable";
// Functions
import { getLendData } from "@/app/Functions/Lend";
import { getParticularStudent } from "@/app/Functions/Student";
// Attributes
import { lendAttributesInfoStudent } from "@/app/constData";
// Icons
import { BiErrorCircle } from "react-icons/bi";

const StudentView = async ({ params: { id } }) => {
    const { data: studentData   } = await getParticularStudent(id);
    const { data, overdueData, returnedData, count, overdueCount, retrunCount } = await getLendData({ studentId: id });

    return (
        <>
            {studentData ?
                <>
                    <StudentDetail id={id.toString()} name={studentData.name} studentId={studentData.studentId} email={studentData.email} phone={studentData.phone} overdueCount={overdueCount} currentlyLentCount={count} lendCount={retrunCount} />
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 my-6">
                        <IssueBook id={id.toString()} selectItem="book" />
                    </div>
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                        <DataTable
                            columns={lendAttributesInfoStudent.filter((attribute) => attribute.key !== "returnedDate")}
                            data={data}
                            url="lend"
                            scroable
                            headBgDiffernt
                            textBig
                            textFontNormal
                            actionCol
                            hasDelButton
                            hasReturnedButton
                        />
                    </div>
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                        <DataTable
                            columns={lendAttributesInfoStudent.filter((attribute) => attribute.key !== "returnedDate")}
                            data={overdueData}
                            url="lend"
                            scroable
                            headBgDiffernt
                            textBig
                            textFontNormal
                            actionCol
                            hasDelButton
                            hasReturnedButton
                        />
                    </div>
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                        <DataTable
                            columns={lendAttributesInfoStudent}
                            data={returnedData}
                            url="lend"
                            scroable
                            headBgDiffernt
                            textBig
                            textFontNormal
                            actionCol
                            hasDelButton
                        />
                    </div>
                </>

                :
                <div className="flex text-3xl text-[#F65867] font-bold justify-center gap-3 items-center">
                    <BiErrorCircle />
                    <h1>No result found</h1>
                </div>
            }
        </>
    );
}

export default StudentView;