import { Link } from "react-router-dom";

interface BlogCardProps{
    autherName : string;
    title:string;
    content:string;
    publishedDate:string;
    id:number;

}
export const BlogCard=({
    autherName,
    title,
    content,
    publishedDate,
    id
} : BlogCardProps)=>{
    return<Link to={`/blog/${id}`}>
        <div className="border-b-2 p-4 border-slate-600 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                    <Avatar name={autherName}/>
                <div className="font-extralight pl-2 pr-2 text-sm flex justify-center flex-col">{autherName} </div>
                <div className="text-sm flex justify-center flex-col">
                    <Circle/>
                </div>
                <div className="pl-2  text-slate-500 flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-bold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-slate-400 text-sm pt-4">
                {`${Math.ceil(content.length/100)} minute(s) Read` }
            </div>
            
        </div>
    </Link>
}


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}