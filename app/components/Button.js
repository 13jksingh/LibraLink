'use client'
const Button = (props) => {
    return ( 
        // <button className="">{props.title}</button>
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
        onClick={props.onClick}>
        {props.title}
        </button>
     );
}
 
export default Button;