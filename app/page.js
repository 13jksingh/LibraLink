import LoginButtons from "./components/LoginButtons"
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  if (session && session.user.role==="librarian"){
    redirect("/dashboard");
  }
  return (
    <div>
      Welcome to Libra Link
      {session ? <LoginButtons icon="logout" /> : <LoginButtons login icon="login" />}
    </div>
  )
}
