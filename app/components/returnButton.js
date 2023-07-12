'use client'
import { MdOutlineAssignmentReturned } from "react-icons/md";
import CustomButton from "./CustomButton";

const ReturnButton = ({ id }) => {
  const returnBook = async () => {
    const response = await fetch(`/api/lend?id=${id}`, {
      method: "PUT",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to update ${url}`);
    }
  };

  return (
    <CustomButton
      action={returnBook}
      icon={<MdOutlineAssignmentReturned />}
      style="text-green-400 shadow-md border border-[#F9F9F9] dark:border-[#201C1D] p-1 rounded-md hover:border-[#78b9ff] transition"
      feedback={true}
    />
  );
};

export default ReturnButton;
