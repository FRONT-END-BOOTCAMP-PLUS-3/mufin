import { ApprovalKeyUseCase } from "@/application/usecases/kis/ApprovalKeyUseCase";
import { IApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IApprovalKeyUseCase";
import { ApprovalKeyType } from "@/types/approvalKeyType";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {

    const { type }: {type: ApprovalKeyType} = await req.json();
    if(!type){
      return NextResponse.json({error: "Body Type missing value"}, {status: 400});
    }
      const kisApprovalKeyUseCase :IApprovalKeyUseCase = new ApprovalKeyUseCase(); 
      const approvalKey = await kisApprovalKeyUseCase.execute(type);

      if (!approvalKey) {
        return NextResponse.json({ error: "approvalKey not found in cookies" }, { status: 400 });
      }

      return NextResponse.json({ approvalKey }, {status:200});

    } catch (error) {
      console.error("Approval Key 가져오기 실패:", error);
      return NextResponse.json(
        { error: "서버의 일시적인 오류가 발생했습니다." },
        { status: 500 }
      );
    }
}
