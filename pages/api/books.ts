import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // const token = req.headers.authorization?.replace("Bearer ", "");
    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    try {
      //   const decoded = jwt.verify(token, "8Eda0tiRC9xC3jmAAUCxkJ5F2tU25idM");

      const query = req.query;
      const { id } = query;
      if (id) {
        const bookById = await prisma.books.findUnique({
          where: {
            id: id as any,
          },
        });
        return res.status(200).json(bookById);
      } else {
        const books = await prisma.books.findMany();
        return res.status(200).json(books);
      }
    } catch (error) {
      return res.status(401).json({ error });
    }
  }

  if (req.method === "POST") {
    const { name, author } = req.body;
    console.log({ name, author });
    const newBook = await prisma.books.create({
      data: {
        name,
        author,
      },
    });
    return res
      .status(200)
      .json({ ...newBook, status: "tạo sách thành công !" });
  }
}
