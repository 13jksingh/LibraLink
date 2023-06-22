import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const search = request.nextUrl.searchParams.get('search');
    if (!search) {
        return NextResponse.json({ message: 'Type something to search' }, { status: 400 });
      }
    const client = await clientPromise;
    const db = client.db("LibraLink");
    const bookCollection = db.collection('Book');
    const studentCollection = db.collection('Student');

    const searchQuery = {
      $or: [
        { studentId: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ]
    };

    const searchResultsBook = await bookCollection.find(searchQuery).toArray();
    const searchResultsStudent = await studentCollection.find(searchQuery).toArray();

    // Return the search results as the API response
    return NextResponse.json({
        books: searchResultsBook,
        students: searchResultsStudent
      });
  } catch (error) {
    console.error('Error performing search:', error);
    // Return an error response
    return new NextResponse(500, { error: error });
  }
}
