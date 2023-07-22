'use client'
import { signIn, signOut } from "next-auth/react"

const LoginButton = ({
    login,
    style,
    icon
}) => {
    return (
        <>
            {login ? <button onClick={signIn} className={style} >{icon}</button> :
            <button onClick={signOut} className={style} >{icon}</button>}
        </>

    );
}

export default LoginButton