import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";

export async function GET(request) {
    try {
        const limit = parseInt(request.nextUrl.searchParams.get('limit'));
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
        if (limit) {
            const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
            return NextResponse.json({ data: documents });

        } else {
            const documents = await collection.find({}).sort({ _id: -1 }).toArray();
            return NextResponse.json({ data: documents });

        }
        // const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        // return NextResponse.json({ data: documents });
    } catch (e) {
        console.error(e);
    }
}
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');

        const data = await request.json();
        // Check if any of the fields are not present
        const book = await collection.findOne({
            $or: [
                {code: data.code},
                {title: data.title},
            ]
        });
        if (book) {
            console.log(book);
            // Return an error message with the repeated field
            let repeatedField = "";
            if (book.code === data.code) {
                repeatedField = "Book Code";
            } else if (book.title === data.title) {
                repeatedField = "Title";
            }
            return NextResponse.json({error: `Book already exists with the same ${repeatedField}`},{status:409});
        } else {
            // Insert the document
            const result = await collection.insertOne(data);
            // Return the inserted document
            console.log(result);
            return NextResponse.json(result);
        }
    } catch (e) {
        console.error(e);
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        const deleteId = new ObjectId(id);
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
        const lendCollection = db.collection('Lend');

        const session = client.startSession();
        await session.withTransaction(async () => {
            // Perform the delete operations inside the transaction
            const book = await collection.deleteOne({ _id: deleteId }, { session });
            const lend = await lendCollection.deleteMany({ bookId: deleteId }, { session });
            console.log(book, lend);
        });
        // End the session
        await session.endSession();
        return NextResponse.json({acknowledged: true});
    } catch (e) {
        console.error(e);
    }
}


export async function PUT(request) {
    try {
        const id = request.nextUrl.searchParams.get('id'); // Retrieve the student ID from the request query
        const updatedFields = await request.json(); // Retrieve the updated fields from the request body

        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');

        const updateResult = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFields }
        );
        console.log(updatedFields);

        if (updateResult.modifiedCount === 1) {
            return NextResponse.json({ message: 'Student updated successfully' });
        } else {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }
    } catch (e) {
        console.error(e);
    }
}