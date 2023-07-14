import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
async function connectLendDb() {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Lend');
        return collection;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to connect db');
    }
}
function formatDate(documents) {
    return documents.map(x => {
        const formatDate = (date) => {
            if (!date) {
                return null;
            }
            return `${date.getDate()} ${date.toLocaleString("default", {
                month: "long"
            })}, ${date.getFullYear()}`;
        }

        return {
            ...x,
            issueDate: formatDate(x.issueDate),
            dueDate: formatDate(x.dueDate),
            returnedDate : formatDate(x.returnedDate)
        };
    });
}
export async function getLendData({studentId, bookId}) {
    try {
        const lendCollection = await connectLendDb();

        const pipeline = [
            {
                $match: {
                    returnedDate: null
                }
            },
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
                    sid : "$studentData.studentId",
                    phone :"$studentData.phone",
                    returnedDate: 1
                }
            }
        ];
        if (studentId) {
            pipeline[0].$match.studentId = new ObjectId(studentId);
            delete pipeline[0].$match.returnedDate;
        }
        if (bookId) {
            pipeline[0].$match.bookId = new ObjectId(bookId);
            delete pipeline[0].$match.returnedDate;

        }

        const documents = await lendCollection.aggregate(pipeline).sort({ _id: -1 }).toArray();
        const currentDate = new Date();


        const {
            returnedBooks,
            overdueDocuments,
            currentLendBooks
        } = documents.reduce(
            (result, document) => {
                if (document.returnedDate !== null) {
                    result.returnedBooks.push(document);
                } else if (document.dueDate < currentDate) {
                    result.overdueDocuments.push(document);
                }

                if (document.returnedDate === null) {
                    result.currentLendBooks.push(document);
                }

                return result;
            },
            {
                returnedBooks: [],
                overdueDocuments: [],
                currentLendBooks: []
            }
        );

        return {
            data: formatDate(currentLendBooks),
            overdueData: formatDate(overdueDocuments),
            returnedData: formatDate(returnedBooks),
            count: currentLendBooks.length,
            overdueCount: overdueDocuments.length,
            retrunCount: returnedBooks.length
        };
    } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch data");
    }
}
