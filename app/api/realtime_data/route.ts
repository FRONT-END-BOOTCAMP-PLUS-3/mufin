import { NextRequest, NextResponse } from "next/server";
import WebSocket from "ws";

export async function GET(req: NextRequest) {
  try {
    const approvalKey = req.cookies.get("approval_key");
    if (!approvalKey) {
      return NextResponse.json(
        { error: "Approval key not found" },
        { status: 400 }
      );
    }

    // 외부 WebSocket 서버에 연결
    const ws = new WebSocket("ws://ops.koreainvestment.com:21000/tryitout/H0STCNT0");

    const stream = new ReadableStream({
      start(controller) {
        let isClosed = false;
        let buffer: string[] = [];

        // 3초마다 버퍼에 쌓인 데이터를 SSE로 전송
        const intervalId = setInterval(() => {
          if (isClosed) return;
          if (buffer.length > 0) {
            const messages = buffer.join("\n");
            controller.enqueue(`data: ${messages}\n\n`);
            buffer = [];
          } else {
            // 데이터가 없을 경우 heartbeat를 보낼 수 있음 (옵션)
            controller.enqueue(`data: heartbeat\n\n`);
          }
        }, 3000);

        // 30초 후에 강제로 연결 종료 (한 번만 종료, 재시작하지 않음)
        const timeoutId = setTimeout(() => {
          if (!isClosed) {
            console.log("❌ 30초 타임아웃 발생, WebSocket 및 SSE 연결 종료");
            ws.close();
            clearInterval(intervalId);
            controller.close();
            isClosed = true;
          }
        }, 30000);

        ws.on("open", () => {
          console.log("✅ WebSocket 연결 성공");
          const message = {
            header: {
              approval_key: approvalKey.value,
              custtype: "P",
              tr_type: "1",
              "content-type": "utf-8",
            },
            body: {
              input: {
                tr_id: "H0STCNT0",
                tr_key: "005930",
              },
            },
          };

          ws.send(JSON.stringify(message));
          console.log("📨 메시지 전송 완료:", JSON.stringify(message));
        });

        ws.on("message", (data) => {
          try {
            const stockDataString = data.toString();
            console.log("📩 받은 데이터:", stockDataString);

            // 구독 성공 메시지는 버퍼에 추가하지 않음
            if (stockDataString.startsWith("{")) {
              const jsonData = JSON.parse(stockDataString);
              if (jsonData.body?.msg1 === "SUBSCRIBE SUCCESS") {
                console.log("✅ 구독 성공");
                return;
              }
            }
            buffer.push(stockDataString);
          } catch (error) {
            console.error("❌ JSON 파싱 실패:", error);
          }
        });

        ws.on("error", (err) => {
          console.error("❌ WebSocket 에러:", err);
          controller.error(err);
        });

        ws.on("close", () => {
          console.log("❎ WebSocket 연결 종료");
          if (!isClosed) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            controller.close();
            isClosed = true;
          }
        });
      },
      cancel(reason) {
        console.log("컨트롤러가 취소되어 ws를 종료합니다.", reason);
        ws.close();
      }
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      }
    });
  } catch (error) {
    console.error("❌ WebSocket 데이터 요청 실패:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
