import Card from "../components/card";
import { HiOutlineUsers } from "react-icons/hi"
import { GiSandsOfTime } from "react-icons/gi"
import { AiOutlineUserAdd } from "react-icons/ai"
import { MdOutlineLibraryBooks } from "react-icons/md";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"

async function getStudentData(limit = 4) {
    const res = await fetch(`http://localhost:3000/api/student?limit=${limit}`, { next: { tags: ['collection'], revalidate: 10 } });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
async function getBookData(limit = 4) {
    const res = await fetch(`http://localhost:3000/api/book?limit=${limit}`, { next: { tags: ['collection'], revalidate: 10 } });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Dashboard = async () => {
    // var day =new Date();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const date = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    var { data: studentData } = await getStudentData();
    var { data: bookData } = await getBookData();
    const studentDataTitles = { "ID": { "alise": "studentId", "icon": <BsPersonVcard />, "type": "text" }, "Name": { "alise": "name", "icon": <CiUser />, "type": "text" }, "Email": { "alise": "email", "icon": <AiOutlineMail />, "type": "email" }, "Phone Number": { "alise": "phone", "icon": <AiOutlinePhone />, "type": "tel" } }
    const bookDataTitles = { "Code": { "alise": "code", "icon": <BsPersonVcard />, "type": "text" }, "Title": { "alise": "title", "icon": <CiUser />, "type": "text" }, "Author": { "alise": "author", "icon": <AiOutlineMail />, "type": "text" }, "Description": { "alise": "description", "icon": <AiOutlinePhone />, "type": "text" } }
    // const Booksitms = [{ "Title": "Life is Everywhere", "Author": "Lucy lves", "Description": "Teaches about life", "Code": "#B-32521-31" }, { "Title": "Life is Everywhere", "Author": "Lucy lves", "Description": "Teaches about life", "Code": "#B-32521-31" }, { "Title": "Life is Everywhere", "Author": "Lucy lves", "Description": "Teaches about life", "Code": "#B-32521-31" }, { "Title": "Life is Everywhere", "Author": "Lucy lves", "Description": "Teaches about life", "Code": "#B-32521-31" }]
    return (
        <div>
            <h1 className="text-3xl font-bold">Hey, <span className="text-[#F65867]">Jaskeerat!</span></h1>
            <h1 className="py-3 font-semibold">{month} {date}, {year} | {day}, {hours}:{minutes}</h1>
            <div className="flex flex-row w-full justify-around items-center py-6 gap-5">
                <Card count="1223" title="Total Visitors" icon={<HiOutlineUsers />} />
                <Card count="740" title="Borrowed Books" icon={<MdOutlineLibraryBooks />} />
                <Card count="22" title="Overdue Books" icon={<GiSandsOfTime />} />
                <Card count="60" title="New Members" icon={<AiOutlineUserAdd />} />
            </div>
            <div className="flex gap-5">
                <Card title="Students" listItems buttonTitle="Add New Student" items={studentData} itemTitle={studentDataTitles} apiPostPath="http://localhost:3000/api/student" action />
                <Card title="Books" listItems buttonTitle="Add New Book" items={bookData} itemTitle={bookDataTitles} apiPostPath="http://localhost:3000/api/book" action />
            </div>
            <div className="my-7">
                <Card title="Overdue Book List" listItems />
            </div>
            <div className="my-7 flex gap-5">
                <Card title="Overdue Book List" listItems />
                <Card title="Overdue Book List" listItems />
            </div>
        </div>
    );
}

export default Dashboard;