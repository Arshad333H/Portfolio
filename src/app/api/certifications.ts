import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const certs = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" }
  });
  return res.json(certs);
}
