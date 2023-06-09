import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const limit =parseInt(request.nextUrl.searchParams.get('limit')) || 4;
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Student');
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
        const collection = db.collection('Student');

        const data = await request.json();
        const result = await collection.insertOne(data);
        // Return the inserted document
        console.log(result);
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
    }
}

