import AddForm from "../components/form";
import { librarianAttributes } from "../constData";
import { getLibrariansData } from "../Functions/Librarians";
import DataTable from "../components/dataTable";

const ITEMS_PER_PAGE = 10;

export default async function Setting(context) {
  const page = context.searchParams.page ? parseInt(context.searchParams.page, 10) : 1;

  var { data: librarianData, count: totalItems } = await getLibrariansData(page);
  return (
    <div>
      <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
        <AddForm
          itemTitle={librarianAttributes}
          title="Add new Librarian"
          url="librarians"
        />
      </div>
      <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
        <DataTable
          columns={librarianAttributes}
          data={librarianData.map(item => JSON.parse(JSON.stringify(item)))}
          url="librarians"
          scroable
          headBgDiffernt
          textBig
          textFontNormal
          actionCol
          hasViewButton
          hasEditButton
          hasDelButton
          pagination
          prevLink={`/setting?page=${page > 1 ? page - 1 : Math.ceil(totalItems / ITEMS_PER_PAGE)}`}
          nextLink={`/setting?page=${page < Math.ceil(totalItems / ITEMS_PER_PAGE) ? page + 1 : 1}`}
          navigationText={`${(page - 1) * 10 + 1}-${Math.min((page - 1) * 10 + 10, totalItems)} of ${totalItems}`}
        />
      </div>
    </div>
  )
}
