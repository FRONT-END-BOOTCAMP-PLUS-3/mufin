import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

interface LoginRequestBody {
  userId: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, password } = req.body as LoginRequestBody;
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  // 받아온 id와 password가 db에 존재하는지 확인

  const cookieOptions = serialize("token", token, {
    httpOnly: true,
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookieOptions);
  return res.status(200).json({ message: "Logged in" });
};

export default handler;
