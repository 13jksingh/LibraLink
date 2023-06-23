import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";
import StudentDetail from "./studentDetail";
import { BiErrorCircle } from "react-icons/bi";

async function getStudentData(id) {
    try {
        const oid = new ObjectId(id);
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        const documents = await collection.findOne({ _id: oid });
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data');
    }
}
const StudentView = async ({ params: { id } }) => {
    const { data: studentData } = await getStudentData(id);
    return (
        <>
            {studentData ?
                <StudentDetail studentData={studentData} id={id} /> :
                <div className="flex text-3xl text-[#F65867] font-bold justify-center gap-3 items-center">
                    <BiErrorCircle />
                    <h1>No result found</h1>
                </div>
            }
        </>
    );
}

export default StudentView;