'use client'
import { useState } from "react";
import { BiLoaderCircle, BiErrorCircle } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { useRouter } from 'next/navigation'

const CustomButton = ({
    action, // a function that performs the action on the server
    icon, // an icon component to show on the button
    style, // a string of class names to apply to the button
    feedback, // a boolean to indicate whether to show feedback icons or not
    isSubmitButton, // // a boolean to indicate whether it is of type submit
    needRefresh
}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        try {
            await action();
            setSuccess(true);
            needRefresh && router.refresh();
            setTimeout(() => {
                setSuccess(false);
              }, 100);
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <button className={style} onClick={isSubmitButton ? null :handleClick} type={isSubmitButton ? "submit" : null}>
            {feedback ? (
                loading ? (
                    <BiLoaderCircle className="animate-spin" />
                ) : error ? (
                    <BiErrorCircle className="text-red-500" />
                ) : success ? (
                    <MdDone className="text-green-500" />
                ) : (
                    icon
                )
            ) : (
                icon
            )}
        </button>
    );
};

export default CustomButton;
