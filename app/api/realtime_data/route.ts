import { WebSocketClient } from "@/infrastructure/websocket/WebSocketClient";
import { parseStockData } from "@/utils/parseStockData";
import { NextRequest, NextResponse } from "next/server";

function createMessage(approvalKey: string, trType: "1" | "2") {
  return {
    header: {
      approval_key: approvalKey,
      custtype: "P",
      tr_type: trType,
      "content-type": "utf-8",
    },
    body: {
      input: {
        tr_id: "H0STCNT0",
        tr_key: "005930",
      },
    },
  };
}

export async function GET(req: NextRequest) {
  try {
    const approvalKeyCookie = req.cookies.get("approval_key");

    if (!approvalKeyCookie) {
      return NextResponse.json(
        { error: "Approval key not found" },
        { status: 400 }
      );
    }

    const approvalKey = approvalKeyCookie.value;

    const wsUrl = "ws://ops.koreainvestment.com:21000/tryitout/H0STCNT0";

    const wsClient = new WebSocketClient(wsUrl);

    await wsClient.connect();

    const message = createMessage(approvalKey, "1");
    wsClient.sendMessage(message);
    // ReadableStream을 사용하여 SSE 스트림을 작성
    const stream = new ReadableStream({
      start(controller) {
        
        // 데이터 버퍼: onMessage에서 받은 데이터를 저장
        // const buffer: object[] = [];
        
        // 소켓에서 받은 원시 데이터를 onMessage 콜백으로 전달받음
        wsClient.onMessage((data: string) => {
          try {
            // JSON 형태의 구독 확인 메시지 무시 처리
            if (data.startsWith("{")) {
              const jsonData = JSON.parse(data);
              if (jsonData.body?.msg1 === "SUBSCRIBE SUCCESS") {
                console.log("✅ 구독 성공");
                return;
              }
            }

            const parsedData = parseStockData(data);
            console.log("parsedData", parsedData);
            // buffer.push(parsedData);
            controller.enqueue(`data: ${JSON.stringify(parsedData)}\n\n`);
          } catch (error) {
            console.error("❌ JSON 파싱 실패:", error);
          }
        });

        // const intervalId = setInterval(() => {
        //   if (buffer.length > 0) {
        //     // 버퍼에 쌓인 모든 데이터를 한 번에 출력하거나, 원하는 경우 마지막 데이터만 출력할 수 있음
        //     const aggregatedData = buffer.splice(0, buffer.length);
        //     controller.enqueue(`data: ${JSON.stringify(aggregatedData)}\n\n`);
        //   }
        // }, 3000);

        // 타임아웃 설정 예시
        setTimeout(() => {
          console.log("timeout 동작");
          // clearInterval(intervalId);

          const message = createMessage(approvalKey, "2");
          wsClient.sendMessage(message);

          controller.close();
          wsClient.disconnect();
        }, 30000); // 30초 후 타임아웃
      },
    });

    // NextResponse로 SSE 스트림을 반환
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("❌ WebSocket 데이터 요청 실패:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
