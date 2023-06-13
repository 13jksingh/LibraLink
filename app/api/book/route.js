import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";

export async function GET(request) {
    try {
        const limit =parseInt(request.nextUrl.searchParams.get('limit')) || 4;
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
        const documents = await collection.find({}).sort({ _id: -1 }).limit(limit).toArray();
        return NextResponse.json({ data: documents });
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
  
      const result = await collection.deleteOne({ _id: deleteId });
      // Return the deletion result
      console.log(result);
      return NextResponse.json(result);
    } catch (e) {
      console.error(e);
    }
  }  
