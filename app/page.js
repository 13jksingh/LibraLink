'use client'
import {signIn , signOut} from "next-auth/react"
export default function Home() {
  return (
    <div>
      Welcome to Libra Link
      <button onClick={()=>signIn()} >Signin G</button>
      <button onClick={signOut} >Signin G</button>
    </div>
  )
}
