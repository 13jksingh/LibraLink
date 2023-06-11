import Card from "../components/card";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"

async function getStudentData(limit = 4) {
    try {
        // const limit =parseInt(request.nextUrl.searchParams.get('limit')) || 4;
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        throw new Error('Failed to fetch data');
    }
}
const Student = async () => {
    let baseUrl = "";
    if (process.env.VERCEL_URL) {
        baseUrl = "https://" + process.env.VERCEL_URL;
    } else {
        // Set a fallback URL if VERCEL_URL is undefined
        baseUrl = "http://localhost:3000";
    }
    var { data: studentData } = await getStudentData(10);
    const studentDataTitles = { "ID": { "alise": "studentId", "icon": <BsPersonVcard />, "type": "text" }, "Name": { "alise": "name", "icon": <CiUser />, "type": "text" }, "Email": { "alise": "email", "icon": <AiOutlineMail />, "type": "email" }, "Phone Number": { "alise": "phone", "icon": <AiOutlinePhone />, "type": "tel" } }
    return (
        <div className="">
            <Card title="" listItems buttonTitle="Export CSV" items={studentData} itemTitle={studentDataTitles} apiPostPath={`${baseUrl}/api/student`} paddingReq="20px" headingBgColor narrowColumns={["ID"]} />
        </div>
    );
}

export default Student;
