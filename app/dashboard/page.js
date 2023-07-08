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
import Time from "./time";

async function getBookCount(date=false) {
    try {
      const client = await clientPromise;
      const db = client.db('LibraLink');
      const lendCollection = db.collection('Lend');
  
      const pipeline = [];
  
      if (date) {
        const currentDate = new Date();
        pipeline.push({
          $match: {
            dueDate: { $lt: currentDate }
          }
        });
      }
  
      pipeline.push({
        $count: 'BookCount'
      });
  
      const result = await lendCollection.aggregate(pipeline).toArray();
      const bookCount = result.length > 0 ? result[0].BookCount : 0;
  
      return NextResponse.json({ count: bookCount }).json();
    } catch (e) {
      console.log(e);
      throw new Error('Failed to fetch data');
    }
  }

async function getStudentData(limit = 4) {
    try {
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
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
        const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        throw new Error('Failed to fetch data');
    }
}
async function getLendData(date=false) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const lendCollection = db.collection("Lend");

        const pipeline = [
            {
                $lookup: {
                    from: "Book",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "bookData"
                }
            },
            {
                $unwind: "$bookData"
            },
            {
                $lookup: {
                    from: "Student",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "studentData"
                }
            },
            {
                $unwind: "$studentData"
            },
            {
                $project: {
                    _id: 1,
                    studentId: 1,
                    issueDate: 1,
                    dueDate: 1,
                    title: "$bookData.title",
                    author: "$bookData.author",
                    bookCode: "$bookData.code",
                    studentName: "$studentData.name", // Include the name from the joined collection,
                    returnedDate: 1
                }
            },
            {
                $match: {
                    returnedDate: null
                }
            }
        ];

        if (date) {
            const currentDate = new Date();

            pipeline.push({
                $match: {
                    dueDate: { $lt: currentDate }
                }
            });
        }

        const documents = await lendCollection.aggregate(pipeline).sort({ _id: -1 }).toArray();
        const updatedDoc = documents.map(x => {
            const formatDate = (date) =>
                `${date.getDate()} ${date.toLocaleString("default", {
                    month: "long"
                })}, ${date.getFullYear()}`;
            return {
                ...x,
                issueDate: formatDate(x.issueDate),
                dueDate: formatDate(x.dueDate)
            };
        });
        console.log(updatedDoc);

        return NextResponse.json({ data: updatedDoc }).json();
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch data");
    }
}

const Dashboard = async () => {
    // Production or dev Base URL
    let baseUrl = "";
    process.env.VERCEL_URL ? baseUrl = "https://" + process.env.VERCEL_URL : baseUrl = "http://localhost:3000";

    // // Date and Time
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = currentDate.toLocaleString('default', { month: 'long' });
    // const day = currentDate.toLocaleString('default', { weekday: 'long' });
    // const date = currentDate.getDate();
    // const hours = String(currentDate.getHours()).padStart(2, '0');
    // const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // Data fetch Students and Books
    const { count: overdueCount } = await getBookCount(true);
    const { count: count } = await getBookCount();
    var { data: studentData } = await getStudentData();
    var { data: bookData } = await getBookData();
    const { data: lendData } = await getLendData();
    const { data: overdueData } = await getLendData(true);

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
    const lendTitles = {
        "Student Name":
            { "alise": "studentName" },
        "BookCode":
            { "alise": "bookCode" },
        "Title":
            { "alise": "title" },
        "Author":
            { "alise": "author" },
        "Issue Date":
            { "alise": "issueDate" },
        "Due Date":
            { "alise": "dueDate" },
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Hey, <span className="text-[#F65867]">Jaskeerat!</span></h1>
            {/* <h1 className="py-3 font-semibold">{month} {date}, {year} | {day}, {hours}:{minutes}</h1> */}
            <Time />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-6">
                <Card count="1223" title="Total Visitors" icon={<HiOutlineUsers />} />
                <Card count={count} title="Borrowed Books" icon={<MdOutlineLibraryBooks />} />
                <Card count={overdueCount} title="Overdue Books" icon={<GiSandsOfTime />} />
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
                    url="/student"
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
                    url="/book"
                />

            </div>
            <div className="grid grid-cols-1 gap-4 my-6">
                <Card
                    title="Issued Book"
                    listItems
                    items={lendData}
                    itemTitle={lendTitles}
                    action
                    textSmall
                    paddingReq="20px 5px"
                    contrastBorder
                    headingLight
                    narrowColumns={["Code"]}
                    url="/lend"
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <Card
                    title="Overdue Book List"
                    listItems
                    items={overdueData}
                    itemTitle={lendTitles}
                    action
                    textSmall
                    paddingReq="20px 5px"
                    contrastBorder
                    headingLight
                    narrowColumns={["Code"]}
                    url="/lend"
                />
            </div>
        </div>
    );
}

export default Dashboard;