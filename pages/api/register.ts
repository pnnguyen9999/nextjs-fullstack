import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { username, email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(422).json({ error: "Email is already taken !" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          hashedPassword,
        },
      });

      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}
