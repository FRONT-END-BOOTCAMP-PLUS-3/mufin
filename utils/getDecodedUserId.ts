import { env } from "@/config/env";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

/**
 * JWT 토큰에서 userId를 추출하는 함수
 * @returns userId (없으면 null)
 */
export async function getDecodedUserId(): Promise<string | null> {
    try {
        // 1️⃣ 쿠키에서 JWT 토큰 가져오기
        const accessToken = (await cookies()).get("accessToken")?.value; // kebab-case 사용 권장장
        console.log("accessToken = ", accessToken);
        if (!accessToken) {
            console.error("Access token not found in cookies");
            return null;
        }

        // 2️⃣ 토큰 검증 및 userId 추출
        const decoded = jwt.verify(accessToken, env.JWT_SECRET as string) as { userId: string };
        return decoded?.userId || null;
    } catch (error) {
        console.error("Error verifying JWT:", error);
        return null;
    }
}
