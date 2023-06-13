import Card from "../components/card";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import AddForm from "../components/form";

async function getStudentData(limit = 4) {
    // try {
    //     const response = await fetch(`http://localhost:3000/api/student?limit=${limit}`, {
    //         method: 'GET',
    //         next: { revalidate: 5 }
    //     });

    //     if (!response.ok) {
    //         throw new Error('Failed to delete student');
    //     }

    //     const data = await response.json();
    //     console.log(data);
    //     return data;
    //     // Handle the response data or perform additional actions
    // } catch (error) {
    //     console.error(error);
    //     // Handle the error
    // }
    try {
        // const limit =parseInt(request.nextUrl.searchParams.get('limit')) || 4;
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data');
    }
}
const Student = async () => {
    let baseUrl = "";
    process.env.VERCEL_URL ? baseUrl = "https://" + process.env.VERCEL_URL : baseUrl = "http://localhost:3000";
    var { data: studentData } = await getStudentData(10);
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
            />
        </div>
    );
}

export default Student;
