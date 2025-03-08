import { TransferDto } from "@/application/usecases/transfer/dtos/TransferDto";
import { TransferUseCase } from "@/application/usecases/transfer/TransferUseCase";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { NextRequest, NextResponse } from "next/server";

const walletRepository = new PgWalletRepository();
const transferUseCase = new TransferUseCase(walletRepository);

export async function POST(req: NextRequest) {
  try {
    const body: TransferDto = await req.json();
    const { amount, type } = body;

    if (amount <= 0) {
      return NextResponse.json({ message: "이체 금액은 0보다 커야 합니다." }, { status: 400 });
    }
    if (!["toCash", "toAccount"].includes(type)) {
      return NextResponse.json({ message: "잘못된 요청 타입입니다." }, { status: 400 });
    }

    const userId: string | null = await getDecodedUserId();
    if (!userId) {
      return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 401 });
    }

    const result = await transferUseCase.transferFunds({ userId, amount, type });
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Error during transfer:", error);
    return NextResponse.json({ message:  "서버 내부 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userId: string | null = await getDecodedUserId();
    if (!userId) {
      return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 401 });
    }
    
    const walletData = await transferUseCase.getWallet(userId);

    return NextResponse.json(walletData, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return NextResponse.json({ message: "내부 서버 오류" }, { status: 500 });
  }
}

