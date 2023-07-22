import { CiUser } from "react-icons/ci"
import { BsPersonVcard } from "react-icons/bs"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"

export const BookAttributesInfo = [
    { label: "Code", key: "code", icon: <BsPersonVcard />, type: "number" },
    { label: "Title", key: "title", icon: <CiUser />, type: "text" },
    { label: "Author", key: "author", icon: <AiOutlineMail />, type: "text" },
    { label: "Description", key: "description", icon: <AiOutlinePhone />, type: "text" },
]

export const StudentAttributesInfo = [
    { label: "ID", key: "studentId", icon: <BsPersonVcard />, type: "number" },
    { label: "Name", key: "name", icon: <CiUser />, type: "text" },
    { label: "Email", key: "email", icon: <AiOutlineMail />, type: "text" },
    { label: "Phone Number", key: "phone", icon: <AiOutlinePhone />, type: "text" },
]

export const librarianAttributes = [
    { label: "ID", key: "lid", icon: <BsPersonVcard />, type: "number" },
    { label: "Name", key: "name", icon: <CiUser />, type: "text" },
    { label: "Email", key: "email", icon: <AiOutlineMail />, type: "text" },
    { label: "Phone Number", key: "phone", icon: <AiOutlinePhone />, type: "text" },
]

export const lendAttributesInfoDashboard = [
    { label: "Student Name", key: "studentName"},
    { label: "Book Code", key: "bookCode"},
    { label: "Author", key: "author"},
    { label: "Issue Date", key: "issueDate"},
    { label: "Due Date", key: "dueDate"},
]

export const lendAttributesInfoStudent = [
    { label: "Book Code", key: "bookCode"},
    { label: "Title", key: "title"},
    { label: "Author", key: "author"},
    { label: "Issue Date", key: "issueDate"},
    { label: "Due Date", key: "dueDate"},
    { label: "Return Date" , key: "returnedDate"}
]

export const lendAttributesInfoBook = [
    { label: "Student Id", key: "sid"},
    { label: "Name", key: "studentName"},
    { label: "Phone Number", key: "phone"},
    { label: "Issue Date", key: "issueDate"},
    { label: "Due Date", key: "dueDate"},
    { label: "Return Date" , key: "returnedDate"}
]