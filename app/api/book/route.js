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
        const result = await collection.insertOne(data);
        // Return the inserted document
        console.log(result);
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
    }
}

export async function DELETE(request) {
    // console.log(request);
    try {
        //   const { id } = request.query; // Retrieve the student ID from the request query
        const id = request.nextUrl.searchParams.get('id');
        const deleteId = new ObjectId(id);
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');

        const lendCollection = db.collection('Lend');

        const [book , lend] = await Promise.all([
            collection.deleteOne({ _id: deleteId }),
            lendCollection.deleteMany({ bookId: deleteId })
        ])
        console.log(book,lend);
        return NextResponse.json({ book: book,lend:lend});
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