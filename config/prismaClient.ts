import { PrismaClient } from "@prisma/client";

// ✅ 환경 변수 상수화
const isProduction = process.env.NODE_ENV === "production";

// ✅ 글로벌 Prisma 객체 적용 (싱글톤 패턴)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], 
});

if (!isProduction) {
  globalForPrisma.prisma = prisma;
}

// ✅ Prisma 연결 종료 핸들러 함수
const handlePrismaShutdown = async (signal: string) => {
  await prisma.$disconnect();
  console.log(`🔌 Prisma 연결이 닫혔습니다. (${signal})`);
};

// ✅ 서버 종료 시 Prisma 연결 닫기 (중복 제거)
process.on("SIGTERM", () => handlePrismaShutdown("SIGTERM"));
process.on("SIGINT", () => handlePrismaShutdown("SIGINT"));
