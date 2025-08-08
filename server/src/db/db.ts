import mongoose from "mongoose";
import z  from "zod";
import { sessionmodel, usermodel } from "../schema/schema";



const userzodscema = z.object({
  username: z.string(),
  password: z.string(),
  email:z.email(),
});


export const db_conect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Database connected successfully");
    } catch (error) {
        mongoose.connection.close();
        console.error("Database connection failed:", error);
    }
}

export const create_user = async(userdata: z.infer<typeof userzodscema>) => {
    try{
       await usermodel.create({
        name:userdata.username,
        email:userdata.email,
        password:userdata.password
        })
    }catch(e){
        console.log(e);
    }
}

export const find_user_by_sesion = async(token:string)=>{
    try{
      const se =  await sessionmodel.findOne({
        token:token
      });
      if(se){
        return se.user;
      }else{
        return;
      }

    } catch(e){
        console.log(e);
    }   
}

