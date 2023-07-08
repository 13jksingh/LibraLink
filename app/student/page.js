import Card from "../components/card";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import AddForm from "../components/form";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

async function getStudentData(page = 1) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        const skip = (page - 1) * ITEMS_PER_PAGE;
        const documents = await collection.find({}).sort({ _id: -1 }).skip(skip).limit(ITEMS_PER_PAGE).toArray();
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data');
    }
}
async function getTotalStudents(){
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        const totalItems = await collection.countDocuments();
        return NextResponse.json({ data: totalItems }).json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data');
    }
}
const Student = async (context) => {
    const { searchParams: { page } } = context;
    const parsedPage = page ? parseInt(page, 10) : 1;
    let baseUrl = "";
    process.env.VERCEL_URL ? baseUrl = "https://" + process.env.VERCEL_URL : baseUrl = "http://localhost:3000";

    var { data: studentData } = parsedPage ? await getStudentData(parsedPage) : await getStudentData(1);
    const {data : totalItems } = await getTotalStudents();
    const studentDataTitles = {
        "ID":
            { "alise": "studentId", "icon": <BsPersonVcard />, "type": "text" },
        "Name":
            { "alise": "name", "icon": <CiUser />, "type": "text" },
        "Email":
            { "alise": "email", "icon": <AiOutlineMail />, "type": "email" },
        "Phone Number":
            { "alise": "phone", "icon": <AiOutlinePhone />, "type": "tel" },
        "Action": "component"
    }
    return (
        <div className="">
            <AddForm
                itemTitle={studentDataTitles}
                title="Add new student"
                divClass="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6"
                formClass="w-full "
                inputBoxesDivClass="w-full grid xl:grid-cols-4 md:grid-cols-2 gap-2 text-lg py-4 pb-6 justify-items-center overflow-hidden"
                inputBoxClass="flex items-center gap-2 "
                apiPostPath="/api/student"
                buttonBoxClass="w-full text-center"
                buttonClass="bg-[#F65867] rounded-xl text-white px-10 py-1"
                inputClass="rounded-xl px-2 py-1 dark:bg-[#201C1D] bg-[#F9F9F9] "
                titleClass="text-xl font-bold px-4 py-2"
                url="/student"
            />
            <Card
                listItems
                buttonTitle="Export CSV"
                items={studentData}
                itemTitle={studentDataTitles}
                apiPostPath={`${baseUrl}/api/student`}
                paddingReq="20px"
                headingBgColor
                narrowColumns={["ID"]}
                page="student"
                url="/student"
                pagination
                prevLink={`/student?page=${parsedPage > 1 ? parsedPage - 1 : Math.ceil(totalItems / ITEMS_PER_PAGE)}`}
                nextLink={`/student?page=${parsedPage < Math.ceil(totalItems / ITEMS_PER_PAGE)  ? parsedPage + 1 : 1}`}
                navigationText={`${(parsedPage-1)*10 + 1}-${Math.min((parsedPage-1)*10 + 10 ,totalItems)} of ${totalItems}`}
            />
        </div>
    );
}

export default Student;
