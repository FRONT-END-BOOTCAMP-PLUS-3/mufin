import { NextApiRequest, NextApiResponse } from "next";
import { RefreshAccessTokenUseCase } from "@/application/usecases/user/RefreshAccessTokenUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  const userRepository = new UserRepository();
  const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(userRepository);

  try {
    console.log("🔄 Refresh Token 검증 중...");
    const refreshResult = await refreshAccessTokenUseCase.execute(refreshToken);
    console.log("✅ Access Token 재발급 완료");

    res.status(200).json({ accessToken: refreshResult.accessToken });
  } catch (refreshError) {
    console.error("❌ Refresh Token 검증 실패:", refreshError);
    res.status(401).json({ error: "Invalid refresh token" });
  }
}

// ✅ API Route는 Node.js 환경에서 실행되도록 설정
export const config = {
  runtime: "nodejs",
};
