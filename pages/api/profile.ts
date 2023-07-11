import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, "8Eda0tiRC9xC3jmAAUCxkJ5F2tU25idM") as {
        userId: string;
      };
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });
      res.status(200).json({
        id: user?.id,
        username: user?.username,
        email: user?.email,
        createdAt: user?.createdAt,
      });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
