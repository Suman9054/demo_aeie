import type z from "zod";
import { auth_user_by_sesion } from "../db/db";
import { Resend } from "resend";
import ImageKit from "imagekit";
import { verificationmodel } from "../schema/schema";

const imagekit = new ImageKit({
  publicKey: "public_qW9ugAdhoqs9mwvVOHR5xo6oGJk=",
  privateKey: "private_mrywzxmfA6Uz4CXAZxyZWu3EG5o=",
  urlEndpoint: "https://ik.imagekit.io/AEIE",
});
const resend = new Resend(process.env.resend_api_key as string);
export const hash_password = async (password: string) => {
  const hash = await Bun.password.hash(password);
  return hash;
};

export const verify_hash = async (password: string, hash: string) => {
  const is_match = await Bun.password.verify(password, hash);
  return is_match;
};
export const make_new_sesion_token = () => {
  const token = crypto.randomUUID();
  return token;
};

export const verify_admin = async (token: string) => {
  const user = await auth_user_by_sesion(token);
  if (!user) {
    return false;
  }

  return user.role === "admin";
};

export const image_upload = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    const result = imagekit.upload({
      file: buffer, // raw binary
      fileName: file.name,
      isPublished: true,
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
      transformation: {
        pre: "l-text,i-Imagekit,fs-50,l-end",
        post: [
          {
            type: "transformation",
            value: "w-100",
          },
        ],
      },
    });
    

    return (await result).url;
  } catch (e: any) {
    console.log("Image upload error:", e.response || e); // log more details
    return undefined;
  }
};


export const send_otp_onemil= async (to: string, otp: string,) => {
 const{data,error}= await resend.emails.send({
    from: " aeie-hit <onboarding@resend.dev>",
    to: [to],
    subject: "Your OTP Code",
    html: `<html>
    <body>
      <h1>hi well come to aeie-hit</h1>
      <p>verify link: <strong>${otp}</strong></p>
      <p>This code is valid for 60 minutes.</p>
    </body>
  </html>`,
  });
  if(error){
    console.log("Error sending OTP email:", error);
    return error;
  }
  return data;
}

export const genarateotp= async(userId:string)=>{
  const hash = await Bun.password.hash(userId+Date.now().toString()+crypto.randomUUID());
  const otp = hash.slice(0,20).toUpperCase();
  const url = "https://aeie-club-server-rxj0.onrender.com/verify/email/"+otp;
return {otp,url};
}
export const verifyotp= async(token:string)=>{
 const respons = await verificationmodel.findOne({value:token, expireAt:{$gt: new Date()}}).populate("user");
 return respons;

}