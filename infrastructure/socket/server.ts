// 서버 실행을 해야하는데 ts-node로 인한 상대 경로로 해놨습니다.
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { WebSocketServer } from "ws";
import { KISApprovalKeyAdapter, KISRealtimeStockAdapter } from "../kis/index.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// HTTP 서버 생성
const server = http.createServer(app);
// WebSocket 서버 생성 (HTTP 서버와 공유)
const wss = new WebSocketServer({ server });

const approvalKeyAdapter = KISApprovalKeyAdapter.getInstance();
const realtimeStock = new KISRealtimeStockAdapter();


async function initializeApprovalKey(): Promise<void> {
  try {
     const approvalKey = await approvalKeyAdapter.fetchApprovalKey();
    console.log(`[Server] Approval Key 발급 완료: ${approvalKey}`);
    // global 전체 말고 나중에 배열로 받아 올듯
    await realtimeStock.connectSingleStock(["005930"],approvalKey);
  } catch (error) {
    console.error("[Server] Approval Key 발급 실패:", error);
  }
}

initializeApprovalKey();

app.get("/api/realtime/stock", async (req: Request, res: Response): Promise<void> => {
  try {

    const stockCode = req.body.stockCode || "005930"
    // Approval Key 가져오기
    const approvalKey = await approvalKeyAdapter.getApprovalKey();

    // 단일 종목 데이터(삼성전자 "005930")를 가져오기 위한 WebSocket 연결 설정 및 데이터 수신
    // 내부적으로 connectSingleStock과 processReceivedData가 호출됨
    const stockData = await realtimeStock.connectSingleStock([stockCode],approvalKey);

    res.json({ stockCode: "005930", data: stockData });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
});

// 웹소켓 연결된 클라이언트 로그 (옵션)
wss.on("connection", (ws) => {
  console.log("[Server] 클라이언트 WebSocket 연결됨");
  ws.on("message", (msg: string) => {
    console.log("[Server] 클라이언트 메시지:", msg);
  });
  ws.on("close", () => {
    console.log("[Server] 클라이언트 WebSocket 연결 종료");
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(
    `🚀 백엔드 API 및 WebSocket 서버 실행 중: http://localhost:${PORT}`
  );
});
