'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message"
import { useRouter } from 'next/navigation'
import CustomButton from "./CustomButton";

const AddForm = ({
    itemTitle,
    title,
    url,
    vertical
}) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });;
    const [loading, setLoading] = useState(false);
    const [sucess, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const router = useRouter()

    const onSubmit = async (data, e) => {
        setLoading(true);
        setSuccess(false);
        setFailure(false);
        try {
            const response = await fetch(`/api/${url}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(response);

            if (response.ok) {
                console.log("Form submitted successfully");
                await fetch(`/api/revalidate?path=${url}`);
                e.target.reset();
                setSuccess(true);
                router.refresh()
                setTimeout(() => {
                    setSuccess(false);
                }, 1000);
            } else {
                setFailure(true);
                console.error("Form submission failed");
            }
        } catch (error) {
            setFailure(true);
            console.error("Error occurred while submitting the form", error);
        }
        setLoading(false);
    };

    return (
        <div >
            {sucess && <p className="text-green-400 text-sm">{url.charAt(0).toUpperCase() + url.slice(1)} added successfully</p>}
            {failure && <p className="text-red-400 text-sm">Error occoured, try again later</p>}
            <h1 className="text-xl font-bold px-4 py-2">{title}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className={`${vertical ? "" :"md:flex-row w-full"} flex flex-col gap-2 text-lg py-4 pb-6 justify-items-center `}>
                    {itemTitle.map((x) => (
                        <div className="flex flex-col items-center gap-2" key={x.key}>
                            <div className="flex-auto flex items-center gap-1">
                                <label htmlFor={x.label}>{x.icon}</label>
                                <input
                                    className="w-full rounded-xl px-2 py-1 dark:bg-[#201C1D] bg-[#F9F9F9]"
                                    type={x.type}
                                    id={x.key}
                                    placeholder={x.label}
                                    {...register(x.key, {
                                        required: "This is required.",
                                        
                                    })}
                                />

                            </div>
                            <ErrorMessage
                                errors={errors}
                                name={x.key}
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-sm text-left w-full px-3">{message}</p>
                                    ))
                                }
                            />
                        </div>
                    ))}
                </div>
                <div className="w-full text-center">
                    <CustomButton
                        action={onSubmit}
                        icon="Submit"
                        style="bg-[#F65867] rounded-xl text-white px-10 py-1"
                        feedback={false}
                        isSubmitButton
                    />
                </div>
            </form>
        </div>
    );
};

export default AddForm;
