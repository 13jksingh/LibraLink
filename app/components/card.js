'use client'
import Button from "./Button";
import Table from "./table";

const Card = (props) => {
    if (props.listItems) {
        return (
            <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">{props.title}</h1>
                    {props.buttonTitle && <Button title={props.buttonTitle} onClick={()=>{}} />}
                </div>
                <div className="mt-6">
                    <Table items={props.items} action={props.action} />
                </div>
                <a href="" className="flex justify-end text-[#F65867] text-sm font-semibold">See More</a>
            </div>
        )
    }
    return (
        <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-3xl font-bold">{props.count}</h1>
                <div className="text-4xl rounded-3xl bg-[#F65867] text-white p-3" >
                    {props.icon}
                </div>
            </div>
            <h1 className="text-sm font-semibold">{props.title}</h1>
        </div>
    );
}

export default Card;