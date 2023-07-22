//components 
import LoginButtons from "./components/LoginButtons";
import DataTable from "./components/dataTable";
import SmallCard from "./dashboard/smallCard";
// Data Fetch and attributes
import { getParticularStudentByEmail } from "./Functions/Student";
import { getLendData } from "./Functions/Lend";
import { lendAttributesInfoStudent } from "./constData";
// Nextjs and NextAuth functions
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
// Icons
import { GiSandsOfTime } from "react-icons/gi"
import { MdOutlineLibraryBooks, MdAttachMoney } from "react-icons/md";
import { LuLibrary } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";


export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  if (session && session.user.role === "librarian") {
    redirect("/dashboard");
  }
  // Check if session exists before fetching user data
  let data, odData, rData, uData, cnt, oCnt, rCnt;
  if (session?.user.email) {
    const { data: userData } = await getParticularStudentByEmail(session.user.email);
    uData = userData;
    // Check if user data is available before passing id to lendData
    if (userData?._id) {
      const { data: fetchedData, overdueData, returnedData, count, overdueCount, retrunCount } = await getLendData({ studentId: userData._id.toString() });
      data = fetchedData;
      odData = overdueData;
      rData = returnedData;
      cnt = count;
      oCnt = overdueCount;
      rCnt = retrunCount;
    }
  }

  return (
    <div>
      {session ?
        <div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Hey, <span className="text-[#F65867]">{session.user.name}!</span></h1>
            <LoginButtons icon="logout" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-6">
            <SmallCard count={cnt} title="Currently Borrowed" icon={<MdOutlineLibraryBooks />} />
            <SmallCard count={oCnt} title="Overdue Books" icon={<GiSandsOfTime />} />
            <SmallCard count={rCnt} title="Returned Books" icon={<LuLibrary />} />
            <SmallCard count="$20" title="Fine Pending" icon={<MdAttachMoney />} />
          </div>
          <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
            <h1 className="text-2xl font-semibold py-3">Issued Books</h1>
            <DataTable
              columns={lendAttributesInfoStudent.filter((attribute) => attribute.key !== "returnedDate")}
              data={data.map(item => JSON.parse(JSON.stringify(item)))}
              url="lend"
              scroable
              headBgDiffernt
              textBig
              textFontNormal
            />
          </div>
          <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
            <h1 className="text-2xl font-semibold py-3">Overdue Books</h1>
            <DataTable
              columns={lendAttributesInfoStudent.filter((attribute) => attribute.key !== "returnedDate")}
              data={odData.map(item => JSON.parse(JSON.stringify(item)))}
              url="lend"
              scroable
              headBgDiffernt
              textBig
              textFontNormal
            />
          </div>
          <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
            <h1 className="text-2xl font-semibold py-3">Returned Books</h1>
            <DataTable
              columns={lendAttributesInfoStudent}
              data={rData.map(item => JSON.parse(JSON.stringify(item)))}
              url="lend"
              scroable
              headBgDiffernt
              textBig
              textFontNormal
            />
          </div>
        </div> :
          <div className="w-1/3 text-center rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
            <LoginButtons login icon={
              <div className="w-full text-xl flex justify-between rounded hover:bg-neutral-100 items-center px-5 py-2">
                <FcGoogle />
                <h1 className="text-[#F65867]">Login</h1>
              </div>
            } />
          </div>
      }
    </div>
  )
}
