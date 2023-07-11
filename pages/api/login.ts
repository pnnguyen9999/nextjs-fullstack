import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        res.status(401).json({ error: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user?.hashedPassword as string
      );

      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign(
        { userId: user?.id },
        "8Eda0tiRC9xC3jmAAUCxkJ5F2tU25idM"
      );

      res.status(200).json(token);
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  }
}
