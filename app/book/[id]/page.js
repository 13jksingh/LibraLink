import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";
import BookDetail from "./bookDetail";
import { BiErrorCircle } from "react-icons/bi";
import Card from "@/app/components/card";
import IssueBook from "./issueBook";

async function getBookData(id) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
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
                    bookId: new ObjectId(id) // Match documents with the specified bookId
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
                $unwind: "$bookData" // Flatten the bookData array
            },
            {
                $lookup: {
                    from: "Student", // The collection to join (Assuming "Student" is the name of the student collection)
                    localField: "studentId", // The field from the "Lend" collection to match
                    foreignField: "_id", // The field from the "Student" collection to match
                    as: "studentData" // The name of the array field to add the joined data
                }
            },
            {
                $unwind: "$studentData" // Flatten the studentData array
            },
            {
                $project: {
                    _id: 1,
                    studentId: 1,
                    issueDate: 1,
                    dueDate: 1,
                    sid: "$studentData.studentId",
                    name: "$studentData.name", // Include the student name from the joined collection
                    phone: "$studentData.phone", // Include the student phone from the joined collection
                    email: "$studentData.email", // Include the student email from the joined collection
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

        const documents = await lendCollection.aggregate(pipeline).toArray();
        if (type==="returnedData"){
            const updatedDoc = documents.map(x => {
                const formatDate = date =>
                    `${date.getDate()} ${date.toLocaleString("default", {
                        month: "long"
                    })}, ${date.getFullYear()}`;
                return {
                    ...x,
                    issueDate: formatDate(x.issueDate),
                    dueDate: formatDate(x.dueDate),
                    returnedDate:formatDate(x.returnedDate)
                };
            });
        return NextResponse.json({ data: updatedDoc }).json();

        }else{
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


const BookView = async ({ params: { id } }) => {
    const { data: bookData } = await getBookData(id);
    console.log(bookData);
    const { data: lendData } = await getLendData(id, "lendData");
    const { data: overdueData } = await getLendData(id, "overdueData");
    const { data: returnedData } = await getLendData(id, "returnedData");

    const dataTitles = {
        "Student Id":
            { "alise": "sid" },
        "Name":
            { "alise": "name" },
        "Phone":
            { "alise": "phone" },
        "Email":
            { "alise": "email" },
        "Issue Date":
            { "alise": "issueDate" },
        "Due Date":
            { "alise": "dueDate" },
        "Return Date":
            { "alise": "returnedDate" },
        "Action": "component"
    }
    const {"Return Date":omittedField , ...currentlyDataTitles} = dataTitles;
    const { ...filteredDataTitles } = dataTitles;
    return (
        <>
            {bookData ?
                <>
                    <BookDetail bookData={bookData} id={id} overdueCount={overdueData.length} currentlyLentCount={lendData.length} totalStudentsLent={returnedData.length} />
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

export default BookView;