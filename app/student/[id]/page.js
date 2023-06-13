import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";
import Image from 'next/image'

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
    console.log(studentData);
    return (
        <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
            <img
                src="https://lh3.googleusercontent.com/ogw/AOLn63Erp2jah7UXWhA2ghU-chihEi6U3IByulqkbA73ug=s32-c-mo"
                width={500}
                height={500}
                alt="Picture of the author"
            />
        </div>
    );
}

export default StudentView;