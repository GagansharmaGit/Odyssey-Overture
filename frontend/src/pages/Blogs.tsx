import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"


export const Blogs = () => {
  const {loading,blogs} = useBlogs()
  if (loading) {
    return <div>
        <Appbar /> 
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
}
  return (
    <div>
        <Appbar/>
        <div className="flex justify-center">
          <div className="">
            {
              blogs.map((blog)=> <BlogCard key={blog.title}
              id={blog.id}
              autherName={blog.auther.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"10th Mar 2024"} 
        />)
            }
          
        </div>
      </div>
    </div>
  )
}



