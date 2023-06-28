import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";
import StudentDetail from "./studentDetail";
import { BiErrorCircle } from "react-icons/bi";
import Card from "@/app/components/card";
import IssueBook from "./issueBook";

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

async function getLendData(id) {
    try {
      const client = await clientPromise;
      const db = client.db("LibraLink");
      const lendCollection = db.collection("Lend");
  
      const pipeline = [
        {
          $match: { studentId: new ObjectId(id) } // Match documents with the specified studentId
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
          $project: {
            _id: 1,
            studentId: 1,
            issueDate: 1,
            dueDate: 1,
            title: "$bookData.title", // Include the title from the joined collection
            author: "$bookData.author", // Include the author from the joined collection
            bookCode: "$bookData.code" // Include the author from the joined collection
          }
        }
      ];
  
      const documents = await lendCollection.aggregate(pipeline).toArray();
      console.log(documents);
      return NextResponse.json({ data: documents }).json();
    } catch (e) {
      console.log(e);
      throw new Error("Failed to fetch data");
    }
  }  

const StudentView = async ({ params: { id } }) => {
    const { data: studentData } = await getStudentData(id);
    const { data: lendData } = await getLendData(id);
    console.log(lendData,"lund")
    const lendTitles = {
        "BookCode":
            { "alise": "bookCode", "icon": null, "type": "text" },
        "Title":
            { "alise": "title", "icon": null, "type": "text" },
        "Author":
            { "alise": "author", "icon": null, "type": "email" },
        "Issue Date":
            { "alise": "issueDate", "icon": null, "type": "tel" },
        "Due Date":
            { "alise": "dueDate", "icon": null, "type": "tel" },
    }
    return (
        <>
            {studentData ?
                <>
                    <StudentDetail studentData={studentData} id={id} />
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mt-6">
                        <IssueBook id={id} />
                    </div>
                    <div className="mt-6">
                        <Card
                            listItems
                            items={lendData}
                            buttonTitle="Export CSV"
                            itemTitle={lendTitles}
                            paddingReq="20px"
                            headingBgColor
                            narrowColumns={["ID"]}
                            page="student"
                            url="/student"
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