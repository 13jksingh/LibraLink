'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
const AddForm = ({
    itemTitle,
    apiPostPath,
    name,
    title,
    inputClass,
    inputBoxClass,
    formClass,
    buttonBoxClass,
    buttonClass,
    divClass,
    inputBoxesDivClass,
    titleClass,
    url
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [sucess, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const onSubmit = async (data, e) => {
        setLoading(true);
        try {
            const response = await fetch(apiPostPath, {
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
                e.target.reset();
                const revalidate = await fetch(`/api/revalidate?path=${url}`);
                console.log(revalidate);
                setSuccess(true);
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

    return (<div className={divClass}>
        {sucess && <p className="text-green-400 text-sm">{name} added successfully</p>}
        {failure && <p className="text-red-400 text-sm">Error occoured, try again later</p>}
        <h1 className={titleClass}>{title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={formClass}>
            <div className={inputBoxesDivClass}>
                {Object.keys(itemTitle)
                    .filter(y => itemTitle[y].alise)
                    .map(y => (
                        <div className={inputBoxClass} key={y}>
                            <label htmlFor={itemTitle[y].alise}>{itemTitle[y].icon}</label>
                            <input
                                className={inputClass}
                                type={itemTitle[y].type}
                                id={itemTitle[y].alise}
                                placeholder={y}
                                {...register(itemTitle[y].alise, { required: true })}
                            />
                            {errors[itemTitle[y].alise] && <p className="text-xs text-center">{y} is required</p>}
                        </div>
                    ))}
            </div>
            {/* <div className="flex items-center">
                <label htmlFor="studentId"><BsPersonVcard /></label>
                <input
                    className="focus:outline-none rounded-md dark:bg-[#353334] w-40 px-2 mx-2"
                    type="text"
                    id="studentId"
                    placeholder="Student Id"
                    {...register("studentId", { required: true })}
                />
                {errors.studentId && <span>Student ID is required</span>}
            </div>

            <div className="flex items-center">
                <label htmlFor="name"><CiUser /></label>
                <input
                    className="focus:outline-none rounded-md dark:bg-[#353334] w-40 px-2 mx-2"
                    type="text"
                    id="name"
                    placeholder="Name"
                    {...register("name", { required: true })}
                />
                {errors.name && <span>Name is required</span>}
            </div>
            <div className="flex items-center">
                <label htmlFor="email"><AiOutlineMail /></label>
                <input
                    className="focus:outline-none rounded-md dark:bg-[#353334] w-40 px-2 mx-2"
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span>Email is required</span>}
            </div>
            <div className="flex items-center">
                <label htmlFor="phone"><AiOutlinePhone /></label>
                <input
                    className="focus:outline-none rounded-md dark:bg-[#353334] w-40 px-2 mx-2"
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    {...register("phone", { required: true })}
                />
                {errors.phone && <span>Phone Number is required</span>}
            </div> */}
            <div className={buttonBoxClass}>
                <button type="submit" disabled={loading} className={buttonClass}>{loading ? "Loading..." : "Submit"}</button>
            </div>
        </form>
    </div>
    );
};

export default AddForm;
