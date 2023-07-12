'use client'
const Button = ({
    title,
    onClickEvent
}) => {
    return ( 
        <button className="
        text-sm
        dark:bg-white
        dark:text-black
        border 
        border-black
        rounded-lg 
        px-3
        py-1 
        hover:bg-[#f5f5f5]
        dark:hover:bg-[#e5e7eb]
        transition 
        " 
        onClick={onClickEvent}>
        {title}
        </button>
     );
}
 
export default Button;