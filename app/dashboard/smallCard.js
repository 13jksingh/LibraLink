const SmallCard = ({
    icon,
    count,
    title
}) => {
    return (
        <div className="w-full rounded-xl dark:bg-[#353334] dark:text-white bg-white px-8 py-7">
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-3xl font-bold">{count}</h1>
                <div className="text-4xl rounded-3xl bg-[#F65867] text-white p-3" >
                    {icon}
                </div>
            </div>
            <h1 className="text-sm font-semibold">{title}</h1>
        </div>
    );
}

export default SmallCard;