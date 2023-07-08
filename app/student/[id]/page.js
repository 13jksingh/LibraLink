import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";
import StudentDetail from "./studentDetail";
import { BiErrorCircle } from "react-icons/bi";
import Card from "@/app/components/card";
import IssueBook from "./issueBook";

async function getStudentData(id) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
        const documents = await collection.findOne({ _id: new ObjectId(id) });
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data');
    }
}
async function getLendData(id, type) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const lendCollection = db.collection("Lend");

        const pipeline = [
            {
                $match: {
                    studentId: new ObjectId(id) // Match documents with the specified bookId
                }
            },
            {
                $lookup: {
                    from: "Book", // The collection to join
                    localField: "bookId", // The field from the "Lend" collection to match
                    foreignField: "_id", // The field from the "Book" collection to match
                    as: "bookData" // The name of the array field to add the joined data
                }
            },
            {
                $project: {
                    _id: 1,
                    studentId: 1,
                    issueDate: 1,
                    dueDate: 1,
                    title: "$bookData.title",
                    name: "$studentData.name", // Include the student name from the joined collection
                    author: "$bookData.author", // Include the student phone from the joined collection
                    bookCode: "$bookData.code", // Include the student email from the joined collection
                    returnedDate: 1
                }
            }
        ];
        if (type === "lendData") {
            pipeline.push({
                $match: {
                    returnedDate: null
                }
            });
        } else if (type === "overdueData") {
            const currentDate = new Date();
            pipeline.push({
                $match: {
                    returnedDate: null,
                    dueDate: { $lt: currentDate }
                }
            });
        } else if (type === "returnedData") {
            pipeline.push({
                $match: {
                    returnedDate: { $ne: null }
                }
            });
        }

        const documents = await lendCollection.aggregate(pipeline).sort({ _id: -1 }).toArray();
        if (type === "returnedData") {
            const updatedDoc = documents.map(x => {
                const formatDate = date =>
                    `${date.getDate()} ${date.toLocaleString("default", {
                        month: "long"
                    })}, ${date.getFullYear()}`;
                return {
                    ...x,
                    issueDate: formatDate(x.issueDate),
                    dueDate: formatDate(x.dueDate),
                    returnedDate: formatDate(x.returnedDate)
                };
            });
            return NextResponse.json({ data: updatedDoc }).json();

        } else {
            const updatedDoc = documents.map(x => {
                const formatDate = date =>
                    `${date.getDate()} ${date.toLocaleString("default", {
                        month: "long"
                    })}, ${date.getFullYear()}`;
                return {
                    ...x,
                    issueDate: formatDate(x.issueDate),
                    dueDate: formatDate(x.dueDate),
                };
            });
            return NextResponse.json({ data: updatedDoc }).json();

        }


    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch data");
    }
}


const StudentView = async ({ params: { id } }) => {
    const { data: studentData } = await getStudentData(id);
    const { data: lendData } = await getLendData(id, "lendData");
    const { data: overdueData } = await getLendData(id, "overdueData");
    const { data: returnedData } = await getLendData(id, "returnedData");

    const dataTitles = {
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
        "Return Date":
            { "alise": "returnedDate" },
        "Action": "component"
    }
    const { "Return Date": omittedField, ...currentlyDataTitles } = dataTitles;
    const { ...filteredDataTitles } = dataTitles;
    return (
        <>
            {studentData ?
                <>
                    <StudentDetail studentData={studentData} id={id} overdueCount={overdueData.length} currentlyLentCount={lendData.length} lendCount={returnedData.length} />
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mt-6">
                        <IssueBook id={id} />
                    </div>
                    <div className="mt-6">
                        <Card
                            title="Currently Issued"
                            listItems
                            items={lendData}
                            itemTitle={currentlyDataTitles}
                            paddingReq="20px"
                            headingBgColor
                            narrowColumns={["ID"]}
                            page="lend"
                            url="/lend"
                            del
                            returnButton
                        />
                    </div>
                    <div className="mt-6">
                        <Card
                            title="Overdue"
                            listItems
                            items={overdueData}
                            itemTitle={currentlyDataTitles}
                            paddingReq="20px"
                            headingBgColor
                            narrowColumns={["ID"]}
                            page="lend"
                            url="/lend"
                            del
                            returnButton
                        />
                    </div>
                    <div className="mt-6">
                        <Card
                            title="Returned"
                            listItems
                            items={returnedData}
                            itemTitle={filteredDataTitles}
                            paddingReq="20px"
                            headingBgColor
                            narrowColumns={["ID"]}
                            page="lend"
                            url="/lend"
                            del
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