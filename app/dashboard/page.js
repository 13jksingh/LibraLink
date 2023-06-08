import Card from "../components/card";
import { HiOutlineUsers } from "react-icons/hi"
import { GiSandsOfTime } from "react-icons/gi"
import { AiOutlineUserAdd } from "react-icons/ai"
import { MdOutlineLibraryBooks } from "react-icons/md";
const Dashboard = () => {
    // var day =new Date();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const date = currentDate.getDate();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const Studentitms = [{ "ID": 21103055, "Name": "Jaskeerat Singh", "Email": "jaskeerat56.93@gmail.com", "Phone Number": 8360193664 },{ "ID": 21103055, "Name": "Jaskeerat Singh", "Email": "jaskeerat56.93@gmail.com", "Phone Number": 8360193664 },{ "ID": 21103055, "Name": "Jaskeerat Singh", "Email": "jaskeerat56.93@gmail.com", "Phone Number": 8360193664 },{ "ID": 21103055, "Name": "Jaskeerat Singh", "Email": "jaskeerat56.93@gmail.com", "Phone Number": 8360193664 }]
    const Booksitms = [{"Title" : "Life is Everywhere", "Author" : "Lucy lves" , "Description" : "Teaches about life" , "Code" : "#B-32521-31"},{"Title" : "Life is Everywhere", "Author" : "Lucy lves" , "Description" : "Teaches about life" , "Code" : "#B-32521-31"},{"Title" : "Life is Everywhere", "Author" : "Lucy lves" , "Description" : "Teaches about life" , "Code" : "#B-32521-31"},{"Title" : "Life is Everywhere", "Author" : "Lucy lves" , "Description" : "Teaches about life" , "Code" : "#B-32521-31"}]
    return (
        <div>
            <h1 className="text-3xl font-bold">Hey, <span className="text-[#F65867]">Jaskeerat!</span></h1>
            <h1 className="py-3 font-semibold">{month} {date}, {year} | {day}, {hours}:{minutes}</h1>
            <div className="flex flex-row w-full justify-around items-center py-6 gap-5">
                <Card count="1223" title="Total Visitors" icon={<HiOutlineUsers />} />
                <Card count="740" title="Borrowed Books" icon={<MdOutlineLibraryBooks />} />
                <Card count="22" title="Overdue Books" icon={<GiSandsOfTime />} />
                <Card count="60" title="New Members" icon={<AiOutlineUserAdd />} />
            </div>
            <div className="flex gap-5">
                <Card title="Students" listItems buttonTitle="Add New Student" items={Studentitms} action />
                <Card title="Books" listItems buttonTitle="Add New Book" items={Booksitms} action />
            </div>
            <div className="my-7">
                <Card title="Overdue Book List" listItems />
            </div>
            <div className="my-7 flex gap-5">
                <Card title="Overdue Book List" listItems  />
                <Card title="Overdue Book List" listItems />
            </div>
        </div>
    );
}

export default Dashboard;