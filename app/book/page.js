import Card from "../components/card";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import AddForm from "../components/form";

async function getBookData(limit = 4) {
  // try {
  //   const response = await fetch(`http://localhost:3000/api/book?limit=${limit}`, {
  //     method: 'GET',
  //     next: { revalidate: 60 }
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to delete student');
  //   }

  //   const data = await response.json();
  //   return data;
  //   // Handle the response data or perform additional actions
  // } catch (error) {
  //   console.error(error);
  //   // Handle the error
  // }
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
const Book = async () => {
  var { data: bookData } = await getBookData(10);
  const bookDataTitles = {
    "Code":
      { "alise": "code", "icon": <BsPersonVcard />, "type": "text" },
    "Title":
      { "alise": "title", "icon": <CiUser />, "type": "text" },
    "Author":
      { "alise": "author", "icon": <AiOutlineMail />, "type": "text" },
    "Description":
      { "alise": "description", "icon": <AiOutlinePhone />, "type": "text" },
    "Action": "component"
  }
  return (
    <div className="">
      <AddForm
        itemTitle={bookDataTitles}
        title="Add new Book"
        divClass="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6"
        formClass="w-full "
        inputBoxesDivClass="w-full grid xl:grid-cols-4 md:grid-cols-2 gap-2 text-lg py-4 pb-6 justify-items-center overflow-hidden"
        inputBoxClass="flex items-center gap-2 "
        apiPostPath="/api/book"
        buttonBoxClass="w-full text-center"
        buttonClass="bg-[#F65867] rounded-xl text-white px-10 py-1"
        inputClass="rounded-xl px-2 py-1 dark:bg-[#201C1D] bg-[#F9F9F9] "
        titleClass="text-xl font-bold px-4 py-2"
      />
      <Card
        listItems
        buttonTitle="Export CSV"
        items={bookData}
        itemTitle={bookDataTitles}
        paddingReq="20px"
        headingBgColor
        narrowColumns={["ID"]}
        page="book"
      />
    </div>
  );
}

export default Book;
