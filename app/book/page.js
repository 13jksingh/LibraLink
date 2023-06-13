
import Card from "../components/card";
import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"

async function getBookData(limit = 4) {
  try {
    const response = await fetch(`http://localhost:3000/api/book?limit=${limit}`, {
      method: 'GET',
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('Failed to delete student');
    }

    const data = await response.json();
    return data;
    // Handle the response data or perform additional actions
  } catch (error) {
    console.error(error);
    // Handle the error
  }
}
const Book = async () => {
  let baseUrl = "";
  process.env.VERCEL_URL ? baseUrl = "https://" + process.env.VERCEL_URL : baseUrl = "http://localhost:3000";
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
      <Card
        listItems
        buttonTitle="Export CSV"
        items={bookData}
        itemTitle={bookDataTitles}
        apiPostPath={`${baseUrl}/api/student`}
        paddingReq="20px"
        headingBgColor
        narrowColumns={["ID"]}
        page="book"
      />
    </div>
  );
}

export default Book;
