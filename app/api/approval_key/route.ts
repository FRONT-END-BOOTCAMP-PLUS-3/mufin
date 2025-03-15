import { AcquireApprovalKeyUseCase } from "@/application/usecases/kis/AcquireApprovalKeyUseCase";
import { IAcquireApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IAcquireApprovalKeyUseCase";
import { IReleaseApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IReleaseApprovalKeyUseCase";
import { ReleaseApprovalKeyUseCase } from "@/application/usecases/kis/ReleaseApprovalKeyUseCase";
import { ApprovalKeyType } from "@/types/approvalKeyType";
import { NextRequest, NextResponse } from "next/server";

export interface ApprovalKeyRequest {
  type: ApprovalKeyType;
  status: "start" | "stop";
  usedApiKeyName?: string;
}


export async function POST(req: NextRequest) {
  
  try {

    const { type, status, usedApiKeyName }: ApprovalKeyRequest = await req.json();
    
    if (!type || !status) {
      return NextResponse.json({ error: "Body missing required field: type or status" }, { status: 400 });
    }

    if(status === "start") {
      const acquireApprovalKeyUseCase :IAcquireApprovalKeyUseCase = new AcquireApprovalKeyUseCase(); 
      const result  = await acquireApprovalKeyUseCase.execute(type);

      // result에는 approvalKey와 usedApiKeyName(환경변수 이름)이 포함되어 있습니다.
      return NextResponse.json({ approvalKey: result.approvalKey, usedApiKeyName: result.usedApiKeyName }, { status: 200 });

    } else if(status === "stop") {  
      if(!usedApiKeyName){
        return NextResponse.json({ error: "Missing usedApiKeyName for stop status" }, { status: 400 });
      }

      // 승인키 해제 UseCase 실행
      const releaseUseCase: IReleaseApprovalKeyUseCase = new ReleaseApprovalKeyUseCase();
      await releaseUseCase.execute(type, usedApiKeyName);

      return NextResponse.json({ message: "Approval key released successfully" },{ status: 200 });
    } else {
      return NextResponse.json({ error: "Body missing required field: type or status" }, { status: 400 });
    }
      
    } catch (error) {
      console.error("Approval Key 가져오기 실패:", error);
      return NextResponse.json({ error: "서버의 일시적인 오류가 발생했습니다." }, { status: 500 });
    }
}
