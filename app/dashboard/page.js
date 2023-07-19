//components
import Time from "./time";
import SmallCard from "./smallCard";
import DataTable from "../components/dataTable";
import Link from "next/link";
// Attributes for column name
import { BookAttributesInfo, StudentAttributesInfo, lendAttributesInfoDashboard } from "../constData";
// Data fetching functions
import { getStudentData } from "../Functions/Student";
import { getBookData } from "../Functions/Book";
import { getLendData } from "../Functions/Lend";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
// Icons 
import { HiOutlineUsers } from "react-icons/hi"
import { GiSandsOfTime } from "react-icons/gi"
import { MdOutlineLibraryBooks } from "react-icons/md";
import { LuLibrary } from "react-icons/lu"
import DashboardForm from "../components/DashboardForm";

const Dashboard = async () => {
    // User detail
    const session = await getServerSession(options);
    // Data fetch Students and Books
    const { data: studentData, count: totalStudents } = await getStudentData(1, 4);
    const { data: bookData, count: totalBooks } = await getBookData(1, 4);
    const { data: lendData, overdueData: overdueData, count: totalLend, overdueCount: overdueCount } = await getLendData({});

    return (
        <div>
            <h1 className="text-3xl font-bold">Hey, <span className="text-[#F65867]">{session.user.name}!</span></h1>
            <Time />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-6">
                <SmallCard count={totalStudents} title="Total Students" icon={<HiOutlineUsers />} />
                <SmallCard count={totalBooks} title="Total Books" icon={<MdOutlineLibraryBooks />} />
                <SmallCard count={totalLend} title="Borrowed Books" icon={<LuLibrary />} />
                <SmallCard count={overdueCount} title="Overdue Books" icon={<GiSandsOfTime />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold py-3">Students</h1>
                        <DashboardForm url={"student"} itemTitle={StudentAttributesInfo} title={"Add New Student"} buttonStyle={"border px-3 rounded-lg border-black dark:border-white hover:bg-neutral-200 dark:hover:bg-neutral-500"} />
                    </div>
                    <DataTable
                        columns={StudentAttributesInfo}
                        data={studentData.map(item => JSON.parse(JSON.stringify(item)))}
                        truncateTextLimit={15}
                        lightBorder
                        scroable
                    />
                    <Link href="/student" ><p className="text-right text-red-500">See more...</p></Link>
                </div>
                <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold py-3">Books</h1>
                        <DashboardForm url={"book"} itemTitle={BookAttributesInfo} title={"Add New Book"} buttonStyle={"border px-3 rounded-lg border-black dark:border-white hover:bg-neutral-200 dark:hover:bg-neutral-500"} />
                    </div>
                    <DataTable
                        columns={BookAttributesInfo}
                        data={bookData.map(item => JSON.parse(JSON.stringify(item)))}
                        truncateTextLimit={15}
                        lightBorder
                        scroable
                    />
                    <Link href="/book" ><p className="text-right text-red-500">See more...</p></Link>
                </div>
            </div>
            <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                <h1 className="text-2xl font-semibold py-3">Issued Books</h1>
                <DataTable
                    heading="Issued Books"
                    columns={lendAttributesInfoDashboard}
                    data={lendData.map(item => JSON.parse(JSON.stringify(item)))}
                    truncateTextLimit={15}
                    lightBorder
                    scroable
                />
            </div>
            <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7 mb-6">
                <h1 className="text-2xl font-semibold py-3">Overdue Books</h1>
                <DataTable
                    heading="Overdue Books"
                    columns={lendAttributesInfoDashboard}
                    data={overdueData.map(item => JSON.parse(JSON.stringify(item)))}
                    truncateTextLimit={15}
                    lightBorder
                    scroable
                />
            </div>
        </div>
    );
}

export default Dashboard;