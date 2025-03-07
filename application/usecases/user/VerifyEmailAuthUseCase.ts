import redisClient from "@/infrastructure/redis/redisClient";

export class VerifyEmailAuthCodeUseCase {
  async execute(email: string, authCode: string): Promise<void> {
    // Redis에서 저장된 데이터 가져오기
    const storedData = await redisClient.get(`emailAuth:${email}`);
    if (!storedData) {
      throw new Error("인증번호가 만료되었거나 존재하지 않습니다.");
    }

    // JSON 파싱하여 이메일과 인증번호 분리
    const { email: storedEmail, authCode: storedAuthCode } =
      JSON.parse(storedData);

    // 인증번호 검증
    if (storedAuthCode !== authCode || storedEmail !== email) {
      throw new Error("인증번호가 일치하지 않습니다.");
    }

    // 인증 성공 시, Redis에서 해당 키 삭제 (재사용 방지)
    await redisClient.del(`emailAuth:${email}`);
  }
}
