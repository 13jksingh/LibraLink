'use client'

import { AiOutlineReload } from "react-icons/ai";
import CustomButton from "../CustomButton";

const RevalidateButton = ({ url }) => {
  const revalidatePages = async () => {
    const revalidate = await fetch(`/api/revalidate?path=${url}`);
    if (!revalidate.ok) {
      throw new Error(`Failed to revalidate ${url}`);
    }
  };

  return (
    <CustomButton
      action={revalidatePages}
      icon={<AiOutlineReload />}
      style="hover:bg-slate-400 transition rounded-md p-2 dark:text-white text-2xl font-bold"
      feedback={true}
    />
  );
};

export default RevalidateButton;
