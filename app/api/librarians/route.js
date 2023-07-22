import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import { ObjectId } from "mongodb";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Librarians');

        const data = await request.json();
        const person = await collection.findOne({
            $or: [
                {name: data.name},
                {lid: data.lid},
                {phone: data.phone},
                {email: data.email}
            ]
        });
        if (person) {
            console.log(person);
            // Return an error message with the repeated field
            let repeatedField = "";
            if (person.lid === data.lid) {
                repeatedField = "Student Id";
            } else if (person.name === data.name) {
                repeatedField = "Name";
            } else if (person.email === data.email) {
                repeatedField = "Email";
            } else if (person.phone === data.phone) {
                repeatedField = "Phone Number";
            }
            return NextResponse.json({error: `Person already exists with the same ${repeatedField}`},{status:409});
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
        const collection = db.collection('Librarians');
        await collection.deleteOne({ _id: deleteId });
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
        const collection = db.collection('Librarians');

        const updateResult = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFields }
        );
        console.log(updatedFields);

        if (updateResult.modifiedCount === 1) {
            return NextResponse.json({ message: 'Librarian updated successfully' });
        } else {
            return NextResponse.json({ message: 'Librarian not found' }, { status: 404 });
        }
    } catch (e) {
        console.error(e);
    }
}
