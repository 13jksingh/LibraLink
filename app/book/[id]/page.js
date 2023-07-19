// Components
import BookDetail from "./bookDetail";
import IssueBook from "@/app/components/issueBook";
import DataTable from "@/app/components/dataTable";
// Functions
import { getLendData } from "@/app/Functions/Lend";
import { getParticularBook } from "@/app/Functions/Book";
// Attributes
import { lendAttributesInfoBook } from "@/app/constData";
// Icons
import { BiErrorCircle } from "react-icons/bi";

const BookView = async ({ params: { id } }) => {
    const { data: bookData   } = await getParticularBook(id);
    const { data, overdueData, returnedData, count, overdueCount, retrunCount } = await getLendData({ bookId: id.toString() });
    return (
        <>
            {bookData ?
                <>
                    <BookDetail bookCode={bookData.code} title={bookData.title} description={bookData.description} author={bookData.author} id={id.toString()} copies={bookData.copies} overdueCount={overdueCount} currentlyLentCount={count} lendCount={retrunCount} />
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 my-6">
                        <IssueBook id={id} selectItem="student" />
                    </div>
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                        <h1 className="text-2xl font-semibold py-3">Issued Books</h1>
                        <DataTable
                            columns={lendAttributesInfoBook.filter((attribute) => attribute.key !== "returnedDate")}
                            data={data.map(item => JSON.parse(JSON.stringify(item)))}
                            url="lend"
                            scroable
                            headBgDiffernt
                            textBig
                            textFontNormal
                            actionCol
                            hasDelButton
                            hasReturnedButton
                        />
                    </div>
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                        <h1 className="text-2xl font-semibold py-3">Overdue Books</h1>                        
                        <DataTable
                            columns={lendAttributesInfoBook.filter((attribute) => attribute.key !== "returnedDate")}
                            data={overdueData.map(item => JSON.parse(JSON.stringify(item)))}
                            url="lend"
                            scroable
                            headBgDiffernt
                            textBig
                            textFontNormal
                            actionCol
                            hasDelButton
                            hasReturnedButton
                        />
                    </div>
                    <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                        <h1 className="text-2xl font-semibold py-3">Returned Books</h1>
                        <DataTable
                            columns={lendAttributesInfoBook}
                            data={returnedData.map(item => JSON.parse(JSON.stringify(item)))}
                            url="lend"
                            scroable
                            headBgDiffernt
                            textBig
                            textFontNormal
                            actionCol
                            hasDelButton
                        />
                    </div>
                </>
                :
                <div className="flex text-3xl text-[#F65867] font-bold justify-center gap-3 items-center">
                    <BiErrorCircle />
                    <h1>No result found</h1>
                </div>
            }
        </>
    );
}

export default BookView;