import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './route/user'
import { blogRouter } from './route/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET : string
  }
}>()


// middlewares
// app.use("/api/v1/blog/*", async (c,next)=>{
//   const header  = await c.req.header("Authorization") || "";
//   if (header) {
//     const token = header.split(" ")[1];
//   const response = await verify(token, c.env.JWT_SECRET)
//   console.log(token)
//   console.log(response)
//   if(response.id){
//     next()
//   }else{
//     c.status(403)
//     return c.json({error : "Authorized"})
//   }
//   }
//   //Bearer token
  

// })
app.use('/*', cors())
app.route("/api/v1/user" , userRouter);
app.route("/api/v1/blog" , blogRouter);



export default app
