// utils/auth.ts
import jwt from "jsonwebtoken";

/**
 * decodeToken
 *
 * @param authHeader - "Bearer <token>" 형식의 Authorization 헤더 값
 * @returns 토큰에서 추출한 userId 값 (토큰이 유효하지 않으면 null 반환)
 */
export function getDecodedUserId(authHeader: string): string | null {
  // "Bearer <token>" 형식에서 토큰 부분만 추출합니다.
  const token = authHeader.split(" ")[1];
  try {
    // 토큰을 검증하고 디코딩합니다.
    // secret은 환경변수 또는 안전하게 관리되는 값이어야 합니다.
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    // decoded 객체에서 userId 값을 반환합니다.
    return decoded.userId;
  } catch (error) {
    console.error("토큰 검증 오류:", error);
    return null;
  }
}
