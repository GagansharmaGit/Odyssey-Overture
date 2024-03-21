import { BlogType } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : {blog:BlogType})=>{
    return <div>
            <Appbar/>
        <div className="flex justify-center ">
                <div className="grid grid-cols-12  w-full px-10 pt-200 max-w-screen-2xl pt-12">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd Dec 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                        <div className="flex w-full">
                            <div className="pr-5 flex flex-col justify-center">
                                <Avatar size={"big"} name ={blog.auther.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.auther.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                     I'll be back
                                </div>
                            </div>
                        </div>
                </div>
                
            </div>
        </div>
    </div>
}