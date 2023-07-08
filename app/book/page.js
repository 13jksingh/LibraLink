import Card from "../components/card";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import AddForm from "../components/form";
export const revalidate = 60 // revalidate this page every 60 seconds
import { Suspense } from "react";
const ITEMS_PER_PAGE = 10;

async function getBookData(page = 1) {
    try {
        const client = await clientPromise;
        const db = client.db("LibraLink");
        const collection = db.collection('Book');
        const skip = (page - 1) * ITEMS_PER_PAGE;
        const documents = await collection.find({}).sort({ _id: -1 }).skip(skip).limit(ITEMS_PER_PAGE).toArray();
        return NextResponse.json({ data: documents }).json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data');
    }
}
async function getTotalbooks() {
  try {
    const client = await clientPromise;
    const db = client.db("LibraLink");
    const collection = db.collection('Book');
    const totalItems = await collection.countDocuments();
    return NextResponse.json({ data: totalItems }).json();
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
}
const Book = async (context) => {
  const { searchParams: { page } } = context;
  const parsedPage = page ? parseInt(page, 10) : 1;

  var { data: bookData } = parsedPage ? await getBookData(parsedPage) : await getBookData(1);
  const { data: totalItems } = await getTotalbooks();
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
    <section >
      <Suspense fallback={<p>Loading Add Book Form</p>}>
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
          url="book"
        />
      </Suspense>
      <Suspense fallback={<p>Loading Books...</p>}>
        <Card
          listItems
          buttonTitle="Export CSV"
          items={bookData}
          itemTitle={bookDataTitles}
          paddingReq="20px"
          headingBgColor
          narrowColumns={["ID"]}
          page="book"
          url="book"
          pagination
          prevLink={`/book?page=${parsedPage > 1 ? parsedPage - 1 : Math.ceil(totalItems / ITEMS_PER_PAGE)}`}
          nextLink={`/book?page=${parsedPage < Math.ceil(totalItems / ITEMS_PER_PAGE) ? parsedPage + 1 : 1}`}
          navigationText={`${(parsedPage - 1) * 10 + 1}-${Math.min((parsedPage - 1) * 10 + 10, totalItems)} of ${totalItems}`}
        />
      </Suspense>
    </section>
  );
}

export default Book;
