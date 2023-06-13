import Card from "../components/card";
import { HiOutlineUsers } from "react-icons/hi"
import { GiSandsOfTime } from "react-icons/gi"
import { AiOutlineUserAdd } from "react-icons/ai"
import { MdOutlineLibraryBooks } from "react-icons/md";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';

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
async function getBookData(limit = 4) {
    try {
        // const limit =parseInt(request.nextUrl.searchParams.get('limit')) || 4;
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
        const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        throw new Error('Failed to fetch data');
    }
}

const Dashboard = async () => {
    // Production or dev Base URL
    let baseUrl = "";
    process.env.VERCEL_URL ? baseUrl = "https://" + process.env.VERCEL_URL : baseUrl = "http://localhost:3000";

    // Date and Time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const date = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // Data fetch Students and Books
    var { data: studentData } = await getStudentData();
    var { data: bookData } = await getBookData();

    // Meta Data for the table and form 
    const studentDataTitles = {
        "ID":
            { "alise": "studentId", "icon": <BsPersonVcard />, "type": "text" },
        "Name":
            { "alise": "name", "icon": <CiUser />, "type": "text" },
        "Email":
            { "alise": "email", "icon": <AiOutlineMail />, "type": "email" },
        "Phone Number":
            { "alise": "phone", "icon": <AiOutlinePhone />, "type": "tel" }
    }
    const bookDataTitles = {
        "Code":
            { "alise": "code", "icon": <BsPersonVcard />, "type": "text" },
        "Title":
            { "alise": "title", "icon": <CiUser />, "type": "text" },
        "Author":
            { "alise": "author", "icon": <AiOutlineMail />, "type": "text" },
        "Description":
            { "alise": "description", "icon": <AiOutlinePhone />, "type": "text" }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Hey, <span className="text-[#F65867]">Jaskeerat!</span></h1>
            <h1 className="py-3 font-semibold">{month} {date}, {year} | {day}, {hours}:{minutes}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-6">
                <Card count="1223" title="Total Visitors" icon={<HiOutlineUsers />} />
                <Card count="740" title="Borrowed Books" icon={<MdOutlineLibraryBooks />} />
                <Card count="22" title="Overdue Books" icon={<GiSandsOfTime />} />
                <Card count="60" title="New Members" icon={<AiOutlineUserAdd />} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                    title="Students"
                    listItems
                    buttonTitle="Add New Student"
                    items={studentData}
                    itemTitle={studentDataTitles}
                    apiPostPath={`${baseUrl}/api/student`}
                    action
                    textSmall
                    paddingReq="20px 5px"
                    contrastBorder
                    headingLight
                    seeMore="/student"
                    narrowColumns={["ID"]}

                />
                <Card
                    title="Books"
                    listItems
                    buttonTitle="Add New Book"
                    items={bookData}
                    itemTitle={bookDataTitles}
                    apiPostPath={`${baseUrl}/api/book`}
                    action
                    textSmall
                    paddingReq="20px 5px"
                    contrastBorder
                    headingLight
                    seeMore="/book"
                    narrowColumns={["Code"]}
                />

            </div>
            <div className="grid grid-cols-1 gap-4 my-6">
                <Card title="Overdue Book List" listItems />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title="Overdue Book List" listItems />
                <Card title="Overdue Book List" listItems />
            </div>
        </div>
    );
}

export default Dashboard;