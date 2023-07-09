import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";

export async function GET(request) {
    try {
        const limit =parseInt(request.nextUrl.searchParams.get('limit')) || 4;
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Lend');
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
      const lendCollection = db.collection("Lend");
      const bookCollection = db.collection("Book");
      const studentCollection = db.collection("Student");
  
      const { bookId, studentId } = await request.json();
  
      // Check if the book and student exist
      const book = await bookCollection.findOne({ _id: new ObjectId(bookId) });
      const student = await studentCollection.findOne({ _id: new ObjectId(studentId) });
  
      if (!book || !student) {
        return NextResponse.json("Invalid book or student ID");
      }

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 15)
  
      // Prepare the lend document
      const lendDocument = {
        bookId: new ObjectId(bookId),
        studentId: new ObjectId(studentId),
        issueDate: new Date(),
        dueDate: dueDate,
        returnedDate : null
      };
  
      // Insert the lend document into the Lend collection
      const result = await lendCollection.insertOne(lendDocument);
  
      // Return the inserted document
      console.log(result);
      return NextResponse.json(result);
    } catch (error) {
      console.error(error);
      return NextResponse.error("Failed to issue book");
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
      const collection = db.collection('Lend');
  
      const result = await collection.deleteOne({ _id: deleteId });
      // Return the deletion result
      console.log(result);
      return NextResponse.json(result);
    } catch (e) {
      console.error(e);
    }
  }  
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