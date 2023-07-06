import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";

export async function PUT(request) {
    try {
        const id = request.nextUrl.searchParams.get('id'); // Retrieve the student ID from the request query

        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Lend');

        const returned = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: {returnedDate:new Date()} }
        );
        console.log(returned);

        if (returned.modifiedCount === 1) {
            return NextResponse.json({ message: 'Book returned successfully' });
        } else {
            return NextResponse.json({ message: 'Book lend info not found' }, { status: 404 });
        }
    } catch (e) {
        console.error(e);
    }
}
// export async function UPDATE(request) {
//     try {
//       const client = await clientPromise;
//       const db = client.db("LibraLink");
//       const lendCollection = db.collection("Lend");

//       const { lendId } = await request.json();
  
//       // Insert the lend document into the Lend collection
//       const result = await lendCollection.insertOne(lendDocument);
  
//       // Return the inserted document
//       console.log(result);
//       return NextResponse.json(result);
//     } catch (error) {
//       console.error(error);
//       return NextResponse.error("Failed to issue book");
//     }
//   }