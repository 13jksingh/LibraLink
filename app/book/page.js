import Card from "../components/card";
import AddForm from "../components/form";

import { getBookData } from "../Functions/Book";
import { bookDataTitles, BookAttributesInfo } from "../constData";

const ITEMS_PER_PAGE = 10;

const Book = async (context) => {
  const page = context.searchParams.page ? parseInt(context.searchParams.page, 10) : 1;

  var { data: bookData, count: totalItems } = await getBookData(page);

  return (
    <div >
      <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
        <AddForm
          itemTitle={BookAttributesInfo}
          title="Add new Book"
          url="book"
        />
      </div>

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
        prevLink={`/book?page=${page > 1 ? page - 1 : Math.ceil(totalItems / ITEMS_PER_PAGE)}`}
        nextLink={`/book?page=${page < Math.ceil(totalItems / ITEMS_PER_PAGE) ? page + 1 : 1}`}
        navigationText={`${(page - 1) * 10 + 1}-${Math.min((page - 1) * 10 + 10, totalItems)} of ${totalItems}`}
      />
    </div>
  );
}

export default Book;
