// Components
import DataTable from "../components/dataTable";
import AddForm from "../components/form";
// Functions
import { getBookData } from "../Functions/Book";
// Attributes
import { BookAttributesInfo } from "../constData";

const ITEMS_PER_PAGE = 10;

const Book = async (context) => {
  const page = context.searchParams.page ? parseInt(context.searchParams.page, 10) : 1;

  const { data: bookData, count: totalItems } = await getBookData(page);

  return (
    <div >
      <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
        <AddForm
          itemTitle={BookAttributesInfo}
          title="Add new Book"
          url="book"
        />
      </div>
      <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
        <DataTable
          columns={BookAttributesInfo}
          data={bookData.map(item => JSON.parse(JSON.stringify(item)))}
          url="book"
          truncateTextLimit={100}
          scroable
          headBgDiffernt
          textBig
          textFontNormal
          actionCol 
          hasViewButton
          hasEditButton
          hasDelButton 
          pagination
          prevLink={`/book?page=${page > 1 ? page - 1 : Math.ceil(totalItems / ITEMS_PER_PAGE)}`}
          nextLink={`/book?page=${page < Math.ceil(totalItems / ITEMS_PER_PAGE) ? page + 1 : 1}`}
          navigationText={`${(page - 1) * 10 + 1}-${Math.min((page - 1) * 10 + 10, totalItems)} of ${totalItems}`}
        />
      </div>
    </div>
  );
}

export default Book;
