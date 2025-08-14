import { auth_user_by_sesion } from "../db/db";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

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
  const buffer = await file.arrayBuffer();
  return imagekit
    .upload({
      file: Buffer.from(buffer), // required
      fileName: file.name, // required
    })
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    });
};
