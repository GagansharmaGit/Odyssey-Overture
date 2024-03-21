
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET : string
    },
    Variables: {
        userId: string;
    }
  }>()

  // middlewares
  blogRouter.use("/*", async (c,next)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
      const authHeader = c.req.header("Authorization") || "";
      const user = await verify(authHeader,c.env.JWT_SECRET)
      if(user){
          c.set("userId",user.id)
          await next()
      }else{
          c.status(403)
          return c.json({msg : "you are not logged in"})
      }
    } catch (error) {
         c.status(403)
          return c.json({msg : "you are not logged in"})
    }
  })

  blogRouter.post("/",async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();
      const { success } = createBlogInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({
              message: "Inputs not correct blogs error"
          })
      }
      const userId = c.get("userId")
      const blog = await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            autherId:Number(userId)
        }
      })
    return c.json({id : blog.id})
  })
  
  
  blogRouter.put("/",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json();
      const { success } = updateBlogInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({
              message: "Inputs not correct blog put error"
          })
      }
      const blog = await prisma.blog.update({
        where:{
            id : body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
      })
    return c.json({id : blog.id})
  })
  
  
  blogRouter.get("/bulk",async (c)=>{ // first bulk endpoint will check if it does not requested then it got to next endpoint
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const blogs = await prisma.blog.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          auther:{
            select:{
              name:true
            }
          }
        }
      })
      return c.json({ blogs })
  })


  blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const id = c.req.param('id')
      try {
        const blog = await prisma.blog.findFirst({
            where:{
                id : Number(id)
            },
            select:{
              id:true,
              title:true,
              content:true,
              auther:{
                select:{
                  name:true
                }
              }
            }
        })
    return c.json({blog})
      } catch (error) {
        c.status(411)
        return c.json({msg : "error while fetching the Blogs post"})
      }
  })
  
